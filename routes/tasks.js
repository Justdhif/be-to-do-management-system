var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get All Tasks
router.get('/get-all', async function (req, res) {
  const tasks = await prisma.task.findMany();
  res.send(tasks);
});

// Get Task by ID
router.get('/get-task/:id', async function (req, res) {
  const { id } = req.params;
  const task = await prisma.task.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  res.send(task);
});

// Create Task
router.post('/create', async function (req, res) {
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
});

// Update Task
router.put('/update/:id', async function (req, res) {
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
});

// Delete Task
router.delete('/delete/:id', async function (req, res) {
  const { id } = req.params;
  const task = await prisma.task.delete({
    where: {
      id: parseInt(id),
    },
  });
  res.send(task);
});

module.exports = router;
