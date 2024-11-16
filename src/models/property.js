const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        enum: ['small', 'medium', "large"],
        default: 'small'
    },
    tenant: {
        name: {
            type: String
        },
        _id : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tenant',
        }
    },
    images: [{
        path: {
            type: String
        }
    }]
});

module.exports = mongoose.model('Property', propertySchema);