import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

// Patch BigInt to be JSON serializable
// @ts-ignore
BigInt.prototype.toJSON = function () {
  return this.toString();
};


import departmentsRoutes from './src/modules/departments/departments.routes';
import projectsRoutes from './src/modules/projects/projects.routes';
import mediaRoutes from './src/modules/media/media.routes';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
    origin: process.env.CORS_ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
    credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/departments', departmentsRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/media', mediaRoutes);

// Health Check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date() });
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

// Error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err);
    if (err.message === 'Unauthenticated') {
        res.status(401).json({ error: 'Unauthorized' });
    } else {
        res.status(500).json({ error: 'Internal Server Error', message: err.message });
    }
});

// Start Server
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

export default app;
