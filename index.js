import dotenv from 'dotenv';
dotenv.config({ path: './config/.env' });

import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './config/db.js';

import userRoutes from './routes/userRoutes.js';

const app = express();

app.use(bodyParser.json());

// connectng database 
connectDB();


// routing 
 app.use('/api/v1/', userRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});