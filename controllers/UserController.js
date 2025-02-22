// Controller user
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const { stringify } = require('jade/lib/utils');

const userController = {
  // Get all users
  getAllUsers: async (req, res) => {
    const users = await prisma.user.findMany();
    if (users.length === 0 || users === null || users === undefined) {
      return res.status(404).json({
        status: 'error',
        message: 'No users found',
      });
    } else {
      return res.status(200).json({
        status: 'success',
        data: {
          users,
        },
      });
    }
  },

  // Get user by id
  getUserById: async (req, res) => {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (user === null || user === undefined) {
      return res.status(404).json({
        status: 'error',
        message: `User with id ${id} not found`,
      });
    } else {
      return res.status(200).json({
        status: 'success',
        data: {
          user,
        },
      });
    }
  },

  // Create user
  createUser: async (req, res) => {
    const { username, email, password } = req.body;

    if (username === '' || email === '' || password === '') {
      return res.status(400).json({
        status: 'error',
        message: 'Missing required fields',
      });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const stringPassword = await stringify(hashedPassword);
      const user = await prisma.user.create({
        data: {
          username,
          email,
          password: stringPassword,
        },
      });
      res.status(200).json({
        status: 'success',
        data: {
          user,
        },
      });
    }
  },

  // Update user
  updateUser: async (req, res) => {
    const { id } = req.params;
    const { username, email, password } = req.body;
    const userExist = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (userExist === null || userExist === undefined) {
      return res.status(404).json({
        status: 'error',
        message: `User with id ${id} not found`,
      });
    } else if (username === '' || email === '' || password === '') {
      return res.status(400).json({
        status: 'error',
        message: 'Missing required fields',
      });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const stringPassword = await stringify(hashedPassword);
      const user = await prisma.user.update({
        where: {
          id: parseInt(id),
        },
        data: {
          username,
          email,
          password: stringPassword,
        },
      });
      res.status(200).json({
        status: 'success',
        data: {
          user,
        },
      });
    }
  },

  // Soft delete user
  softDeleteUser: async (req, res) => {
    const { id } = req.params;
    const userExist = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (userExist === null || userExist === undefined) {
      return res.status(404).json({
        status: 'error',
        message: `User with id ${id} not found`,
      });
    } else {
      const user = await prisma.user.update({
        where: {
          id: parseInt(id),
        },
        data: {
          is_deleted: true,
          deleted_at: new Date(),
        },
      });
      res.status(200).json({
        status: 'success',
        data: {
          user,
        },
      });
    }
  },

  // Delete user
  deleteUser: async (req, res) => {
    const { id } = req.params;
    const user = await prisma.user.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  },
};

module.exports = userController;
