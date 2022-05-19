import express from 'express';
import superAdminRoutes from './superAdmin';
import timeSheets from './timeSheets';
import Tasks from './tasks';

const router = express.Router();

router.use('/tasks', Tasks);

router.use('/superadmins', superAdminRoutes);

export default router;
