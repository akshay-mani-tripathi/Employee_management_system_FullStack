require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');


const authRoutes = require('./routes/auth.routes');
const taskRoutes = require('./routes/task.routes');


const app = express();

app.use(cors());
app.use(express.json());


connectDB(process.env.MONGO_URI).then(() => console.log('MongoDB connected'))
.catch(err => console.error('DB connect error', err));


app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);


app.get('/', (req, res) => res.send('EMS backend running'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));