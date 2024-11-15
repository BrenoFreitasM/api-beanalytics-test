const Invoice = require('../models/invoice');

exports.register = async (req, res) => {
    try {

        const newInvoice = await Invoice.create(req.body);

        res.status(201).json({ message: 'Nota criada com sucesso!', invoice: newInvoice})

    } catch (error) {
        res.status(500).json({ message: 'Error no servidor', error });
    }
}

exports.update = async (req, res) => {
    try {
        const { code, name, size, tenant, images } = req.body;

        const existingProperty = await Property.findOne({ code: code });
        
        if ( !existingProperty ) {
            return res.statu(404).json({ message: "Propriedade não encontrada."});
        }

        existingProperty.code = code || existingProperty.code;
        existingProperty.name = name || existingProperty.name;
        existingProperty.size = size || existingProperty.size;
        existingProperty.tenant = tenant || existingProperty.tenant;
        existingProperty.images = images || existingProperty.images;

        await existingProperty.save();

        res.status(200).json({ message: 'Propriedade atualizada com sucesso!', tenant: existingProperty });

    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor', error });
    }
}
