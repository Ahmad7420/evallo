import express from 'express';
import cors from 'cors';
import logRoutes from './routes/logRoutes';


const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());


app.use('/logs', logRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});