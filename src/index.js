const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const userRoutes = require('./routes/user-route');
const tenantRoutes = require('./routes/tenant-route');
const propertyRoutes = require('./routes/property-route');
const invoiceRoute = require('./routes/invoice-route');

dotenv.config()
const app = express();
const port = process.env.PORT || 3001;

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => { console.log('🗄️ Connected to MongoDB!')})
.catch((err) => {
    console.error('Error connecting to  MongoDB: ', err.message);
});

// Permitir requisições CORS de localhost:3000
app.use(cors({
    origin: 'http://localhost:3000',
}));

app.use(express.json());

//  ROUTES
app.use('/api/users', userRoutes);
app.use('/api/tenants', tenantRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/invoices', invoiceRoute);

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`🔥 Server is running on port ${port}`)
})