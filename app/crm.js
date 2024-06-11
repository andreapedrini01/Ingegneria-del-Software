const express = require('express');
const router = express.Router();
const Centro = require('./models/centroRaccolta.js');

/**
 * @swagger
 * /centri:
 *   get:
 *     summary: Retrieve a list of collection centers
 *     description: Retrieve a list of all collection centers from the database.
 *     responses:
 *       200:
 *         description: A list of collection centers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: object
 *                     properties:
 *                       $oid:
 *                         type: string
 *                         description: The center ID.
 *                         example: 6655a2e730fd1223143ed6ab
 *                   descrizione:
 *                     type: string
 *                     description: The center description.
 *                     example: Dolomiti Energia S.p.a.
 *                   indirizzo:
 *                     type: string
 *                     description: The center address.
 *                     example: Tangenziale Ovest 11
 *                   tipologia:
 *                     type: string
 *                     description: The type of center.
 *                     example: gestione pubblica rifiuti
 *                   coordinates:
 *                     type: object
 *                     properties:
 *                       latitudine:
 *                         type: number
 *                         description: Latitude of the center.
 *                         example: 11.109799334010086
 *                       longitudine:
 *                         type: number
 *                         description: Longitude of the center.
 *                         example: 46.05776821434423
 *                   __v:
 *                     type: number
 *                     description: Version key.
 *                     example: 0
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: Internal server error
 */
router.get('', async (req, res) => {
    try {
        const centri = await Centro.find().exec();
        res.status(200).json(centri);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;