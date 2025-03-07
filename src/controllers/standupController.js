const StandupModel = require('../models/StandupModel');
const { validationResult } = require('express-validator');

exports.getUserStandups = async (req, res) => {
  try {
    // Validación de parámetros
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        errors: errors.array()
      });
    }

    const { userId } = req.params;
    
    const standups = await StandupModel.getByUserId(userId);
    
    if (!standups.length) {
      return res.status(404).json({
        status: 'success',
        message: 'No standup records found',
        data: []
      });
    }

    res.json({
      status: 'success',
      results: standups.length,
      data: standups
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
};

// controllers/userController.js
exports.getAllUsers = async (req, res) => {
    try {
      // Validar parámetros
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: 'error',
          errors: errors.array()
        });
      }
  
      // Obtener y sanitizar filtros
      const filters = {
        status: req.query.status,
        location: req.query.location
      };
  
      const users = await StandupModel.getAllUsers(filters);
  
      if (users.length === 0) {
        return res.status(404).json({
          status: 'success',
          message: 'No se encontraron usuarios con estos filtros',
          data: []
        });
      }
  
      res.status(200).json({
        status: 'success',
        results: users.length,
        data: users
      });
  
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? error : undefined
      });
    }
  };