import { Router } from 'express';
import Visit from '../models/Visit';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const visits = await Visit.find().sort({ createdAt: -1 });
    res.json(visits);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const visit = await Visit.findById(req.params.id);
    if (!visit) {
      return res.status(404).json({ error: 'Visit not found' });
    }
    res.json(visit);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const visit = await Visit.create(req.body);
    res.status(201).json(visit);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const visit = await Visit.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!visit) {
      return res.status(404).json({ error: 'Visit not found' });
    }
    res.json(visit);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const visit = await Visit.findByIdAndDelete(req.params.id);
    if (!visit) {
      return res.status(404).json({ error: 'Visit not found' });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
