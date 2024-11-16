const mongoose = require('mongoose');

const tenantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    overdue: {
        type: Boolean,
        default: false
    },
    overdueTime: {
        type: Number
    },
    phone: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        required: true,
        unique: true
    },
    properties: [{
        type: mongoose.Types.ObjectId,
        ref: 'property'
    }],

    value: {
        type: Number,
        required: true,
        default: 0
    }
});

module.exports = mongoose.model('Tenant', tenantSchema);