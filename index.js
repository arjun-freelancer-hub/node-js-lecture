import dotenv from 'dotenv';
dotenv.config({ path: './config/.env' });

import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './config/db.js';

import userRoutes from './routes/userRoutes.js';
import errorMiddleware from './middleware/error.middleware.js';

const app = express();

app.use(bodyParser.json());

// connectng database 
connectDB();


// routing 
 app.use('/api/v1/', userRoutes);

 app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

 app.use(errorMiddleware);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});