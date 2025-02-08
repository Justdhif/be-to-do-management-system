var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const { stringify } = require('jade/lib/utils');

// Get all users
router.get('/all', async function (req, res) {
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
});

// Get user by id
router.get('/:id', async function (req, res) {
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
});

// Create a new user
router.post('/create', async function (req, res) {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const stringPassword = await stringify(hashedPassword);

  username === ''
    ? res.status(400).json({
        status: 'error',
        message: 'Missing username',
      })
    : email === ''
      ? res.status(400).json({
          status: 'error',
          message: 'Missing email',
        })
      : password === ''
        ? res.status(400).json({
            status: 'error',
            message: 'Missing password',
          })
        : async () => {
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
          };
});

// Update User
router.put('/update/:id', async function (req, res) {
  const { id } = req.params;
  const { name, email, password } = req.body;
  const hashPassword = bcrypt.hash(password, 10);
  const stringPassword = stringify(hashPassword);

  name === ''
    ? res.status(400).json({
        status: 'error',
        message: 'Missing username',
      })
    : email === ''
      ? res.status(400).json({
          status: 'error',
          message: 'Missing email',
        })
      : password === ''
        ? res.status(400).json({
            status: 'error',
            message: 'Missing password',
          })
        : async () => {
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
            res.status(200).json({
              status: 'success',
              data: {
                user,
              },
            });
          };
});

// Soft Delete User
router.delete('/delete/:id', async function (req, res) {
  const { id } = req.params;
  const userExist = await prisma.user.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  userExist === null
    ? res.json({
        status: 'error',
        message: `User with id ${id} not found`,
      })
    : async () => {
        const user = await prisma.user.update({
          where: {
            id: parseInt(id),
          },
          data: {
            is_deleted: true,
          },
        });
        res.status(200).json({
          status: 'success',
          data: {
            user,
          },
        });
      };
});

// Hard Delete User
router.delete('/hard-delete/:id', async function (req, res) {
  const { id } = req.params;
  const userExist = await prisma.user.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  userExist === null
    ? res.json({
        status: 'error',
        message: `User with id ${id} not found`,
      })
    : async () => {
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
      };
});

module.exports = router;
