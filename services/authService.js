const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const jwtSecret = config.get("jwtSecret");

exports.getUserProfile = async (userId) => {
  const user = await User.findById(userId).select("-password");
  if (!user) {
    const error = new Error("Utilisateur non trouvé.");
    error.statusCode = 404;
    throw error;
  }
  return user;
};

exports.login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("Utilisateur introuvable.");
    error.statusCode = 401;
    error.data = [{ param: "email", msg: "Email incorrect." }];
    throw error;
  }

  const isEqual = await bcrypt.compare(password, user.password);
  if (!isEqual) {
    const error = new Error("Mot de passe incorrect.");
    error.statusCode = 401;
    error.data = [{ param: "password", msg: "Mot de passe incorrect." }];
    throw error;
  }

  const token = jwt.sign(
    {
      email: user.email,
      userId: user._id.toString(),
      role: user.role,
    },
    jwtSecret,
    { expiresIn: "24h" }
  );

  return {
    token,
    userId: user._id.toString(),
    role: user.role,
    cookieOptions: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "strict",
    },
  };
};

exports.signUp = async (userData) => {
  const { nom, prenom, email, phone, password } = userData;

  let user = await User.findOne({ email });
  if (user) {
    const error = new Error("Utilisateur existe déjà.");
    error.statusCode = 400;
    error.data = [{ param: "email", msg: "Email déjà utilisé." }];
    throw error;
  }

  user = new User({
    nom,
    prenom,
    email,
    phone,
    password,
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);

  await user.save();

  const token = jwt.sign(
    {
      email: user.email,
      userId: user._id.toString(),
      role: user.role,
    },
    jwtSecret,
    { expiresIn: "24h" }
  );

  return {
    message: "Utilisateur créé avec succès.",
    userId: user._id.toString(),
    role: user.role,
    token,
    cookieOptions: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "strict",
    },
  };
};
exports.logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,  
    secure: process.env.NODE_ENV === "production", 
    sameSite: "strict", 
  });
};