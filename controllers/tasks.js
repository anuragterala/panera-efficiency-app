const Task = require('../models/Task');

// Gets all of the tasks
exports.getTasks = (req, res) => {
  Task.find()
    .then(tasks => res.json(tasks))
    .catch(err => res.status(500).json({ message: err.message }));
};

// Creates a new task
exports.createTask = (req, res) => {
  const { title, assignedTo } = req.body;
  const newTask = new Task({ title, assignedTo });

  newTask.save()
    .then(task => res.status(201).json(task))
    .catch(err => res.status(400).json({ message: err.message }));
};

// Updates a task
exports.updateTask = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  Task.findByIdAndUpdate(id, { status }, { new: true })
    .then(task => res.json(task))
    .catch(err => res.status(400).json({ message: err.message }));
};
