const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({

    tenant: {
        type: mongoose.Types.ObjectId,
        ref: 'property'
    },
    totalValue: {
        type: Number,
        required: true
    },
    dueDate: {
        type: Date,
        default: Date.now
    },
    properties: [{
        property: {
            type: mongoose.Types.ObjectId,
            ref: 'property'
        },
        value: {
            type: Number,
            default: 0
        }
    }]
});

module.exports = mongoose.model('Invoice', invoiceSchema);