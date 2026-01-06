const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const cors = require('cors'); 

const ReportRoute = require('./routes/product.route.js');


const app = express(); // 1. Create app first

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 2. Middlewares (CORS must come before Routes)
app.use(cors()); 
app.use(express.json());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// 3. Routesnpm audit fix
app.use('/api/Reports', ReportRoute);
app.use("/api/Report", ReportRoute);

app.get('/', (req, res) => {
    res.send('Node API is running!');
});

// 4. Database & Server Start
mongoose.connect('mongodb+srv://admin:Aalok9971@ecoclean.inli0nu.mongodb.net/?appName=EcoClean')
.then(() => {
    console.log('connected to database..!');
    app.listen(3000, () => {
        console.log('server is running on port 3000');
    });
})
.catch((err) => {
    console.log('connection failed...!', err);
});