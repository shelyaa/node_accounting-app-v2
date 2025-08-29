/* eslint-disable @typescript-eslint/no-var-requires */
const expensesService = require('../services/expensesService');
const userService = require('../services/userService');

const getAllController = (req, res) => {
  const expenses = expensesService.getAll({
    userId: req.query.userId,
    categories: req.query.categories,
    from: req.query.from,
    to: req.query.to,
  });

  res.json(expenses);
};

const getByIdController = (req, res) => {
  if (!req.params.id)
    return res.status(400).json({
      message: 'The required path parameter id is missing or invalid',
    });

  const expense = expensesService.getById(Number(req.params.id));

  if (!expense) return res.status(404).json({ message: 'Expense not found' });
  res.json(expense);
};

const createController = (req, res) => {
  const { title, userId, spentAt, amount, category, note } = req.body;

  if (!title || !userId || !spentAt || !amount || !category || !note) {
    return res.status(400).json({ message: 'Required field missing' });
  }

  const user = userService.getById(Number(userId));

  if (!user) return res.status(400).json({ message: 'User not found' });

  const expense = expensesService.create(
    title,
    Number(userId),
    new Date(spentAt).toISOString(),
    amount,
    category,
    note,
  );

  res.status(201).json(expense);
};

const deleteOneController = (req, res) => {
  const deleted = expensesService.deleteById(Number(req.params.id));

  if (!deleted) return res.status(404).json({ message: 'Not found' });
  res.sendStatus(204);
};

const updateController = (req, res) => {
  const { title, userId, spentAt, amount, category, note } = req.body;
  const expense = expensesService.getById(Number(req.params.id));

  if (!expense) return res.status(404).json({ message: 'Not found' });

  let numericUserId;

  if (userId !== undefined) {
    const user = userService.getById(Number(userId));

    if (!user) return res.status(400).json({ message: 'User not found' });
    numericUserId = Number(userId);
  }

  const updated = expensesService.update({
    id: Number(req.params.id),
    title,
    userId: numericUserId ?? expense.userId,
    spentAt: spentAt ? new Date(spentAt).toISOString() : expense.spentAt,
    amount,
    category,
    note,
  });

  res.json(updated);
};

module.exports = {
  getAllController,
  getByIdController,
  createController,
  deleteOneController,
  updateController,
};
