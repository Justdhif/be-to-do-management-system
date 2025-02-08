var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const { stringify } = require('jade/lib/utils');

// Get all users
router.get('/all', async function (req, res) {
  const users = await prisma.user.findMany();
  res.json(users);
});

// Get user by id
router.get('/:id', async function (req, res) {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  res.json(user);
});

// Create a new user
router.post('/create', async function (req, res) {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const stringPassword = await stringify(hashedPassword);
  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: stringPassword,
    },
  });
  res.json(user);
});

// Update User
router.put('/update/:id', async function (req, res) {
  const { id } = req.params;
  const { name, email, password } = req.body;
  const hashPassword = bcrypt.hash(password, 10);
  const stringPassword = stringify(hashPassword);
  const user = await prisma.user.update({
    where: {
      id: parseInt(id),
    },
    data: {
      username: name,
      email,
      password: stringPassword,
    },
  });
  res.send(user);
});

// Soft Delete User
router.delete('/delete/:id', async function (req, res) {
  const { id } = req.params;
  const user = await prisma.user.update({
    where: {
      id: parseInt(id),
    },
    data: {
      deleted_at: new Date(),
      is_deleted: true,
    },
  });
  res.send(user);
});

// Hard Delete User
router.delete('/hard-delete/:id', async function (req, res) {
  const { id } = req.params;
  const user = await prisma.user.delete({
    where: {
      id: parseInt(id),
    },
  });
  res.send(user);
});

module.exports = router;
