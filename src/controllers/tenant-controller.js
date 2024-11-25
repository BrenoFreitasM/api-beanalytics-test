const Tenant = require('../models/tenant');
const Property = require('../models/property');
const mongoose = require('mongoose');

exports.register = async (req, res) => {
    try {

        var name = req.body.name
        var overdue = req.body.overdue ? req.body.overdue : false;
        var overdueTime = req.body.overdueTime ? req.body.overdueTime : 0;
        var phone = req.body.phone ? req.body.phone : ''
        var cpf = req.body.cpf ? req.body.cpf : ''
        var propertires = req.body.propertires
        
        const existingTenant = await Tenant.findOne({ cpf: cpf});

        if ( existingTenant ) {
            return res.status(400).json({ message: 'Inquilino já cadastrado.'});
        }

        const newTenant = await Tenant.create({
            name: name,
            overdue: overdue,
            overdueTime: overdueTime,
            phone: phone,
            cpf: cpf,
            propertires: propertires,
        });

        res.status(201).json({ message: 'Inquilino criado com sucesso!', tenant: newTenant})

    } catch (error) {
        res.status(500).json({ message: 'Error no servidor', error });
    }
}

exports.update = async (req, res) => {
    try {
        const id = req.body._id;
        const { name, overdue, value, overdueTime, phone, properties } = req.body;

        // Verificar se o inquilino com o id especificado existe
        const existingTenant = await Tenant.findOne({ _id: id });

        if (!existingTenant) {
            return res.status(404).json({ message: 'Inquilino não encontrado.' });
        }

        // Atualizar os dados do inquilino com os novos valores, se fornecidos
        existingTenant.name = name || existingTenant.name;
        existingTenant.value = value || existingTenant.value;
        existingTenant.overdue = overdue !== undefined ? overdue : existingTenant.overdue;
        existingTenant.overdueTime = overdueTime || existingTenant.overdueTime;
        existingTenant.phone = phone || existingTenant.phone;
        existingTenant.properties = properties || existingTenant.properties;

        // Salvar as atualizações no banco de dados
        await existingTenant.save();

        res.status(200).json(existingTenant);
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor', error });
    }
};

exports.delete = async (req, res) => {
    try {
        const id = req.params.id; 

        // Verificar se o inquilino com o _id especificado existe
        const existingTenant = await Tenant.findOne({ _id: id });

        if (!existingTenant) {
            console.log('Inquilino não encontrado')
            return res.status(404).json({ message: 'Inquilino não encontrado.' });
        }

        // Remover o inquilino do banco de dados
        await Tenant.deleteOne({ _id: id });

        res.status(200).json({ message: 'Inquilino excluído com sucesso!' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Erro no servidor', error: error });
    }
};

exports.listAll = async (req, res) => {
    try {
        const data = await Tenant.find({});
        const properties = await Property.find({});

        for (let i = 0; i < data.length; i++) {
            properties.forEach((property) => {
                if (property?.tenant?._id?.toString() === data[i]._id.toString()) {
                    data[i].properties = (data[i].properties || 0) + 1; // Incrementa o contador
                }
            });
        }

        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro no servidor', error });
    }
};


exports.list