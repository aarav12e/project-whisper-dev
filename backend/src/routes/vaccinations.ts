import { Router } from 'express';
import Vaccination from '../models/Vaccination';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const vaccinations = await Vaccination.find().sort({ createdAt: -1 });
    res.json(vaccinations);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const vaccination = await Vaccination.findById(req.params.id);
    if (!vaccination) {
      return res.status(404).json({ error: 'Vaccination not found' });
    }
    res.json(vaccination);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const vaccination = await Vaccination.create(req.body);
    res.status(201).json(vaccination);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const vaccination = await Vaccination.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!vaccination) {
      return res.status(404).json({ error: 'Vaccination not found' });
    }
    res.json(vaccination);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const vaccination = await Vaccination.findByIdAndDelete(req.params.id);
    if (!vaccination) {
      return res.status(404).json({ error: 'Vaccination not found' });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
