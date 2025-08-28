// eslint-disable-next-line @typescript-eslint/no-var-requires
const userService = require('../services/userService'); // повний об'єкт

const getAllController = (req, res) => {
  const users = userService.getAll();

  res.json(users);
};

const getByIdController = (req, res) => {
  const id = Number(req.params.id);
  const user = userService.getById(id);

  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
};

const createController = (req, res) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: 'Required field missing' });

  const user = userService.create(name);

  res.status(201).json(user);
};

const deleteOneController = (req, res) => {
  const deleted = userService.deleteById(Number(req.params.id));

  if (!deleted) return res.status(404).json({ message: 'User not found' });
  res.sendStatus(204);
};

const updateController = (req, res) => {
  const { name } = req.body;
  const user = userService.getById(Number(req.params.id));

  if (!user) return res.status(404).json({ message: 'User not found' });

  const updatedUser = userService.update({ id: Number(req.params.id), name });

  res.json(updatedUser);
};

module.exports = {
  getAllController,
  getByIdController,
  createController,
  deleteOneController,
  updateController,
};
