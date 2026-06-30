import dotenv from 'dotenv';
dotenv.config();
import express  from 'express';
import cors  from 'cors';
import cookieParser  from 'cookie-parser';
import connectDB  from './src/config/db.js';
import { notFound, errorHandler } from './src/middleware/errorHandler.js';

import authRoutes  from './src/routes/authRoutes.js';
import formRoutes  from './src/routes/formRoutes.js';
import fieldRoutes  from './src/routes/fieldRoutes.js';
import submissionRoutes  from './src/routes/submissionRoutes.js';

connectDB();

const app = express();

app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      process.env.FRONTEND_URL, 
      'http://localhost:5173', 
      'http://localhost:5174',
      'http://localhost:5175'
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/forms', formRoutes);
app.use('/api/fields', fieldRoutes);
app.use('/api/submissions', submissionRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
