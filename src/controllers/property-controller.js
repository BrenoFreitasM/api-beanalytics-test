const property = require('../models/property');
const Property = require('../models/property');

exports.register = async (req, res) => {
    try {
        
        const existingProperty = await Property.findOne({ $or: [ { code: req.body.code }, { name: req.body.name}]});

        if ( existingProperty ) {
            return res.status(400).json({ message: 'Propriedade já cadastrada.'});
        }

        const newProperty = await Property.create(req.body);

        res.status(201).json(newProperty)

    } catch (error) {
        res.status(500).json({ message: 'Error no servidor', error });
    }
}

exports.update = async (req, res) => {
    try {
        const { _id, code, name, size, tenant, images } = req.body;

        const existingProperty = await Property.findOne({ _id: _id });
        
        if ( !existingProperty ) {
            return res.status(404).json({ message: "Propriedade não encontrada."});
        }

        existingProperty.code = code || existingProperty.code;
        existingProperty.name = name || existingProperty.name;
        existingProperty.size = size || existingProperty.size;
        existingProperty.tenant = tenant || existingProperty.tenant;
        existingProperty.images = images || existingProperty.images;

        await existingProperty.save();

        res.status(200).json({ message: 'Propriedade atualizada com sucesso!', property: existingProperty });

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Erro no servidor', error : error});
    }
}

exports.delete = async (req, res) => {
    try {
        const id = req.params.id; 

        const existingProperty = await Property.findOne({ _id: id });

        if ( !existingProperty ) {
            return res.statu(404).json({ message: 'Propriedade não encontrada.'});
        }

        await Property.deleteOne({ _id: id });

        res.status(200).json({ message: 'Inquilino excluído com sucesso!'});
        
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor', error });
    }
}

exports.listAll = async (req, res) => {
    try {

        const data = await Property.find({})

        res.status(200).json(data)

    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor', error });
    }
}