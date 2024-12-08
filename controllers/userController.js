const userService = require('../services/userService');

exports.listUsers = async (req, res, next) => {
  try {
    const { page, size } = req.query;
    const data = await userService.getUsers(page, size);

    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};
exports.getCurrentUser = async (req, res, next) => {
    try {
      const userId = req.user.userId; 
      const user = await userService.getUserById(userId); 
  
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé.' });
      }
  
      res.status(200).json({ user });
    } catch (err) {
      next(err); 
    }
  };

exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedUser = await userService.updateUser(id, updates);

    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

exports.updateUserStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userService.updateUserStatus(id);

    res.status(200).json({
      message: `Le statut de l'utilisateur a été changé en ${user.isActive}.`,
      isActive: user.isActive,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUser = await userService.deleteUser(id);

    res.status(200).json(deletedUser);
  } catch (err) {
    next(err);
  }
};

