const property = require('../models/property');
const Property = require('../models/property');

exports.register = async (req, res) => {
    try {
        
        const existingProperty = await Property.findOne({ $or: [ { code: req.body.code }, { name: req.body.name}]});

        if ( existingProperty ) {
            return res.status(400).json({ message: 'Propriedade já cadastrada.'});
        }

        const newProperty = await Property.create(req.body);

        res.status(201).json({ message: 'Propriedade criada com sucesso!', tenant: newProperty})

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

        res.status(200).json({ message: 'Propriedade atualizada com sucesso!', property: existingProperty });

    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor', error });
    }
}

exports.delete = async (req, res) => {
    try {
        const code = req.params.code; 

        const existingProperty = await Property.findOne({ code: code });

        if ( !existingProperty ) {
            return res.statu(404).json({ message: 'Propriedade não encontrada.'});
        }

        await Property.deleteOne({ code: code });

        res.status(200).json({ message: 'Inquilino excluído com sucesso!'});
        
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor', error });
    }
}