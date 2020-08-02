const express = require('express');
const monk = require('monk');
const Joi = require('@hapi/joi');

const db = monk(process.env.MONGO_URI);
const faqs = db.get('faqs');

const schema = Joi.object({
  firstName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required,
  username: Joi.string().trim(),
  email: Joi.string().trim(),
  createdAt: Joi.string().trim(),
});

const router = express.Router();

// Get all records
router.get('/:id', async (req, res, next) => {
  try {
    const items = faqs.find({});
    res.json(items);
  } catch (error) {
    next(error);
  }
});

// Get one record
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await faqs.findOne({ _id: id });
    if (!item) return next();
    return res.json(item);
  } catch (error) {
    next(error);
  }
});

// Create record
router.post('/', async (req, res, next) => {
  try {
    console.log(req.body);
    const value = await schema.validateAsync(req.body);
    const inserted = await faqs.insert(value);
    res.json(inserted);
  } catch (error) {
    next(error);
  }
});

// Update record by id
router.put(':/id', (req, res, next) => {
  res.json({
    message: 'Hello by update',
  });
});

// Delete record by id
router.delete('/:id', (req, res, next) => {
  res.json({
    message: 'Hello by delete',
  });
});

module.exports = router;
