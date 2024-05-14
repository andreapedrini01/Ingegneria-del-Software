const mongoose = require('mongoose');

const centroRaccoltaSchema = new mongoose.Schema({
    indirizzo: {
        type: String,
        required: true
    },
    tipoCentro: {
        type: String,
        required: true
    },
    orari: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const CentroRaccolta = mongoose.model('CentroRaccolta', centroRaccoltaSchema);

module.exports = CentroRaccolta;