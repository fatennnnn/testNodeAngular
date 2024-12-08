const authService = require("../services/authService");
const { validationResult } = require("express-validator");

exports.getUserProfile = async (req, res, next) => {
  try {
    const user = await authService.getUserProfile(req.user.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation échouée.");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }

    const { email, password } = req.body;
    const result = await authService.login(email, password);
    
    res.cookie("token", result.token, result.cookieOptions);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

exports.signUp = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const result = await authService.signUp(req.body);
    res.cookie("token", result.token, result.cookieOptions);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.logout = async (req, res, next) => {
  try {
    await authService.logout(req, res); 
    res.status(200).json({ message: "Déconnexion réussie." });
  } catch (err) {
    next(err);
  }
};