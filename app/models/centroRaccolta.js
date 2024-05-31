const mongoose = require('mongoose');

const centroRaccoltaSchema = new mongoose.Schema({
    descrizione:{
        type:String
    },
    indirizzo: {
        type: String
    },
    tipologia: {
        type: String,
        required: true
    },
    coordinates: {
        latitudine:{type:Number},
        longitudine:{type:Number}
    }
});

const centroRaccolta = mongoose.model('centroRaccolta', centroRaccoltaSchema);

module.exports = centroRaccolta;
