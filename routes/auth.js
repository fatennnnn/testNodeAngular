const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/is-auth");
const authController = require("../controllers/authController");
const { check, validationResult } = require("express-validator");

// GET user profile
router.get("/", isAuth, authController.getUserProfile);

// POST login
router.post(
  "/login",
  [
    check("email", "Veuillez entrer un email valide.").isEmail(),
    check("password", "Le mot de passe est requis.").isLength({ min: 3 }),
  ],
  authController.login
);

// POST sign-up
router.post(
  "/sign-up",
  [
    check("nom", "Nom est requis.").isLength({ min: 3 }),
    check("prenom", "Prénom est requis.").isLength({ min: 3 }),
    check("email", "Veuillez entrer un email valide.").isEmail(),
    check("phone", "Le téléphone est requis.").isNumeric({ no_symbols: true }),
    check("password", "Le mot de passe est requis.").isLength({ min: 3 }),
  ],
  authController.signUp
);
router.post("/logout", isAuth, authController.logout);


module.exports = router;
