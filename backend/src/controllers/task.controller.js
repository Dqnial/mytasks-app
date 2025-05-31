import Task from "../models/task.model.js";

export const getTasks = async (req, res) => {
  try {
    const status = req.query.status; // optional
    const filter = { userId: req.user._id };
    if (status) filter.status = status;

    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Ошибка при получении задач" });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;

    const newTask = new Task({
      userId: req.user._id,
      title,
      description,
      dueDate,
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(500).json({ message: "Ошибка при создании задачи" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ message: "Задача не найдена" });
    }

    const updatedFields = req.body;
    Object.assign(task, updatedFields);
    const updatedTask = await task.save();

    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: "Ошибка при обновлении задачи" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!deletedTask) {
      return res.status(404).json({ message: "Задача не найдена" });
    }

    res.json({ message: "Задача удалена" });
  } catch (err) {
    res.status(500).json({ message: "Ошибка при удалении задачи" });
  }
};
