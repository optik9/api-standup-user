const express = require('express');
const router = express.Router();
const standupController = require('../controllers/standupController');
const { check } = require('express-validator');

router.get('/:userId', 
  [
    check('userId')
      .isNumeric().withMessage('User ID must be a number')
      .toInt()
  ],
  standupController.getUserStandups
);

router.get(
    '/',
    [
      check('status')
        .optional()
        .isIn(['active', 'inactive']) // Valores permitidos
        .withMessage('El estado debe ser active o inactive'),
        
      check('location')
        .optional()
        .isString()
        .trim()
        .escape()
    ],
    standupController.getAllUsers
  );

module.exports = router;