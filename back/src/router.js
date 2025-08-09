import { Router } from 'express';

import { AnunciosController } from './controllers/anuncios.js';

const router = Router();

router.get('/anuncios', AnunciosController.list);
router.post('/anuncios', AnunciosController.create);
router.delete('/anuncios/:id', AnunciosController.delete);

export { router };