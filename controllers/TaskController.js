// Task Controller
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const taskController = {
  // Get all task
  getAllTasks: async function (req, res) {
    const tasks = await prisma.task.findMany();
    if (tasks.length === 0 || tasks === null || tasks === undefined) {
      return res.status(404).json({
        status: 'error',
        message: 'No tasks found',
      });
    } else {
      return res.status(200).json({
        status: 'success',
        data: {
          tasks,
        },
      });
    }
  },

  // Get task by id
  getTaskById: async function (req, res) {
    const { id } = req.params;
    const task = await prisma.task.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (task === null || task === undefined) {
      return res.status(404).json({
        status: 'error',
        message: `Task with id ${id} not found`,
      });
    } else {
      return res.status(200).json({
        status: 'success',
        data: {
          task,
        },
      });
    }
  },

  // Create task
  createTask: async function (req, res) {
    const { title, desc, priority, is_done, created_by } = req.body;
    if (is_done === undefined || is_done === null) {
      const task = await prisma.task.create({
        data: {
          title,
          desc,
          priority,
          is_done: false,
          deadline: new Date(),
          created_by,
        },
      });
      res.send(task);
    } else {
      const task = await prisma.task.create({
        data: {
          title,
          desc,
          priority,
          is_done,
          deadline: new Date(),
          created_by,
        },
      });
      res.send(task);
    }
  },

  // Update task
  updateTask: async function (req, res) {
    const { id } = req.params;
    const { title, desc, priority, is_done, created_by } = req.body;
    if (is_done === undefined || is_done === null) {
      const task = await prisma.task.update({
        where: {
          id: parseInt(id),
        },
        data: {
          title,
          desc,
          priority,
          is_done: false,
          deadline: new Date(),
          created_by,
        },
      });
      res.send(task);
    } else {
      const task = await prisma.task.update({
        where: {
          id: parseInt(id),
        },
        data: {
          title,
          desc,
          priority,
          is_done,
          deadline: new Date(),
          created_by,
        },
      });
      res.send(task);
    }
  },

  // Soft delete task
  softDeleteTask: async function (req, res) {
    const { id } = req.params;
    const task = await prisma.task.update({
      where: {
        id: parseInt(id),
      },
      data: {
        is_done: true,
      },
    });
    res.send(task);
  },

  // Delete task
  deleteTask: async function (req, res) {
    const { id } = req.params;
    const task = await prisma.task.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.send(task);
  },
};

module.exports = taskController;
