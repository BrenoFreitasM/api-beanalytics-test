const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
    const { name, cpf, email, password } = req.body;

    try {

        const existingUser = await User.findOne({ $or: [ { email: email }, { cpf: cpf}]});

        if ( existingUser ) {
            return res.status(400).json({ message: 'Usuário já cadastrado.'});
        }

        // criptografando senha
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name: name,
            cpf: cpf,
            email: email,
            password: hashedPassword
        });
        
        res.status(201).json({ message: 'Usuário criado com sucesso!', user: newUser });

    } catch (error) {
        res.status(500).json({ message: 'Error no servidor', error });
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if ( !user ) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        // Comparando a senha informada com a senha criptografada
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if ( !isPasswordValid) {
            return res.status(401).json({ message: 'Credenciais inválidas'})
        }

        res.status(200).json({ message: 'Login bem-sucedido', user: user });

    } catch (error) {
        res.status(500).json({ message: 'Error no servidor', error });
    }
}