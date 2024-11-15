const User = require('../models/user');

const validateKey = async (req, res, next) => {
    const key = req.headers['x-access-key']; // Key enviada no cabeçalho

    if (!key) {
        return res.status(403).json({ message: 'Nenhuma chave fornecida.' });
    }

    try {
        const user = await User.findById(key); // Busque pelo _id no MongoDB

        if (!user) {
            return res.status(401).json({ message: 'Chave inválida.' });
        }

        // Armazena informações do usuário no req para uso nas rotas
        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor.', error });
    }
};

module.exports = validateKey;