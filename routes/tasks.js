var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
// const bcrypt = require('bcrypt');
// const { stringify } = require('jade/lib/utils');

// Get All Tasks
router.get('/all', async function (req, res) {
  const tasks = await prisma.task.findMany({
    where: {
      priority: 'High',
      is_deleted: false,
    },
  });
  res.json(tasks);
});

// Get Task By Id
router.get('/:id', async function (req, res) {
  const { id } = req.params;
  const tasks = await prisma.task.findUnique({
    where: {
      id: parseInt(id),
      is_deleted: false,
    },
  });
  res.json(tasks);
});

// Create Tasks
router.post('/create', async function (req, res) {
  const { title, desc, priority, deadline, is_done, created_by } = req.body;
  const task = await prisma.task.create({
    data: {
      title,
      desc,
      priority,
      deadline,
      is_done,
      created_by,
    },
  });
  res.json(task);
});

// Update Tasks
router.put('/update/:id', async function (req, res) {
  const { id } = req.params;
  const { title, desc, priority, deadline, created_by } = req.body;
  const task = await prisma.task.update({
    where: {
      id: parseInt(id),
    },
    data: {
      title,
      desc,
      priority,
      deadline,
      created_by,
    },
  });
  res.json(task);
});

// Soft Delete Tasks
router.delete('/delete/:id', async function (req, res) {
  const { id } = req.params;
  const task = await prisma.task.update({
    where: {
      id: parseInt(id),
    },
    data: {
      deleted_at: new Date(),
      is_deleted: true,
    },
  });
  res.send(task);
});

// Hard Delete Tasks
router.delete('/hard-delete/:id', async function (req, res) {
  const { id } = req.params;
  const task = await prisma.task.delete({
    where: {
      id: parseInt(id),
    },
  });
  res.send(task);
});

module.exports = router;
