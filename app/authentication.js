const express = require('express');
const router = express.Router();
const RegisteredUser = require('./models/registeredUser'); // get our mongoose model
const { masterKey, client_url, bcrypt_salt } = require('../config');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const Token = require("./models/token");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const sendEmail = require("../utils/sendEmail");
const path = require("path");

/**
 * @swagger
 * /:
 *   post:
 *     summary: Autentica un utente
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Token generato con successo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *                 email:
 *                   type: string
 *                 id:
 *                   type: string
 *                 self:
 *                   type: string
 *       400:
 *         description: Autenticazione fallita
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
router.post('', async function(req, res) {
  try {
    let user = await RegisteredUser.findOne({ email: req.body.email }).exec()
    if (!user) {
        res.json({ success: false, message: 'Autenticazione fallita. Non esiste nessun utente con le email fornita.' });
        throw new Error("Autenticazione fallita. Non esiste nessun utente con le email fornita.");
        return
    }

    //controlla se la password è corretta, facendo un check con quella criptata nel db
    const isValid = await bcrypt.compare(req.body.password, user.password);
    if (!isValid) {
        res.json({ success: false, message: 'Autenticazione fallita. Password non corretta.' });
        throw new Error("Autenticazione fallita. Password non corretta.");
        return
    }
    
    //elimina il token precedente se esiste
    if(await Token.findOneAndDelete({ userId: user._id }).exec()) {
      console.log('Previous token deleted for user ' + user.username);
    }

    //user authenticated -> crea il token
    var payload = {
        email: user.email,
        id: user._id,
        //other_data: encrypted_in_the_token
    }
    var options = {
        expiresIn: 86400 // expires in 24 hours
    }
    var token = jwt.sign(payload,
        masterKey,
        options
    );

    // salva il token nel db
    let tkn = new Token({
        userId: payload.id,
        token: token,
    });
    tkn = await tkn.save();

    res.json({
        success: true,
        message: 'Enjoy your token!',
        token: tkn.token,
        email: user.email,
        id: user._id,
        self: '/api/v1/' + user._id
    });
    console.log('Token created for user ' + user.username);
  } catch (error) {
    console.log(error);
  }
});

/**
 * @swagger
 * /requestPasswordReset:
 *   post:
 *     summary: Richiede il reset della password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: Link per il reset della password generato con successo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 link:
 *                   type: string
 */
router.post('/requestPasswordReset', async function(req, res) {

  const user = await RegisteredUser.findOne({ email: req.body.email });
  if (!user) throw new Error("Email does not exist");

  let token = await Token.findOne({ userId: user._id });
  if (token) await token.deleteOne();

  let resetToken = crypto.randomBytes(32).toString("hex");
  const hash = await bcrypt.hash(resetToken, Number(bcrypt_salt));

  await new Token({
    userId: user._id,
    token: hash,
    createdAt: Date.now(),
  }).save();

  //console.log(client_url);
  const link = `${client_url}/api/v1/authentications/passwordReset?token=${resetToken}&id=${user._id}`;

  sendEmail(
    user.email,
    "Password Reset Request",
    {
      name: user.username,
      link: link,
    },
    "../utils/template/requestResetPassword.handlebars"
  );

  res.json({ link: link });
});

router.get('/passwordReset', async function(req, res) {
  res.sendFile(path.join(__dirname, '../static', 'passwordReset.html'));
});

/**
 * @swagger
 * /passwordReset:
 *   post:
 *     summary: Resetta la password dell'utente
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: 60d0fe4f5311236168a109ca
 *               token:
 *                 type: string
 *                 example: 123456
 *               password:
 *                 type: string
 *                 example: newpassword123
 *     responses:
 *       200:
 *         description: Password resettata con successo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Password reset was successful for User
 */
router.post('/passwordReset', async function(req, res) {
  let passwordResetToken = await Token.findOne({ userId: req.body.userId });

  if (!passwordResetToken) {
    throw new Error("Invalid or expired password reset token1");
  }

  //console.log(passwordResetToken.token, req.body.token);

  const isValid = await bcrypt.compare(req.body.token, passwordResetToken.token);

  //console.log(isValid + " " + req.body.token + " " + passwordResetToken.token);

  if (!isValid) {
    throw new Error("Invalid or expired password reset token2");
  }

  const hash = await bcrypt.hash(req.body.password, Number(bcrypt_salt));

  await RegisteredUser.updateOne(
    { _id: req.body.userId },
    { $set: { password: hash } },
    { new: true }
  );

  const user = await RegisteredUser.findById({ _id: req.body.userId });

  sendEmail(
    user.email,
    "Password Reset Successfully",
    {
      username: user.username,
    },
    "./template/resetPassword.handlebars"
  );

  await passwordResetToken.deleteOne();

  res.json({ message: "Password reset was successful for User: " + user.username });
});

module.exports = router;
