import { Router } from 'express';
import AncRecord from '../models/AncRecord';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const records = await AncRecord.find().sort({ createdAt: -1 });
    res.json(records);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const record = await AncRecord.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ error: 'ANC record not found' });
    }
    res.json(record);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const record = await AncRecord.create(req.body);
    res.status(201).json(record);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const record = await AncRecord.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!record) {
      return res.status(404).json({ error: 'ANC record not found' });
    }
    res.json(record);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const record = await AncRecord.findByIdAndDelete(req.params.id);
    if (!record) {
      return res.status(404).json({ error: 'ANC record not found' });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
