const express = require('express');
const router = express.Router();
const Centro = require('./models/centroRaccolta.js');

router.get('', async (req, res) => {
    try {
        const centri = await Centro.find().exec();
 /*       centri = centri.map( (entry) => {
            return {
                self: '/app/crm/' + entry.id,
                email: entry.coordinates
            }
        });*/
        

        res.status(200).json(centri);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
});



module.exports = router;