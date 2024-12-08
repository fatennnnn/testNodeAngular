const User = require('../models/User');
const getPagination = require('../utils/pagination');

exports.getUsers = async (page, size) => {
  const { limit, offset } = getPagination(page, size);

  const users = await User.find({ role: 'user' }).skip(offset).limit(limit);
  const totalUsers = await User.countDocuments({ role: 'user' });
  const totalPages = Math.ceil(totalUsers / limit);

  return {
    users,
    pagination: {
      totalUsers,
      totalPages,
      currentPage: parseInt(page) || 1,
      pageSize: limit,
    },
  };
};
exports.getUserById = async (id) => {
    try {
      const user = await User.findById(id).select('-password'); 
      return user;
    } catch (err) {
      throw new Error('Erreur lors de la récupération de l\'utilisateur');
    }
  };
exports.updateUser = async (id, updates) => {
  const updatedUser = await User.findByIdAndUpdate(
    id,
    updates,
    { new: true, runValidators: true }
  );

  if (!updatedUser) {
    throw new Error('Utilisateur introuvable');
  }

  return updatedUser;
};

exports.updateUserStatus = async (id) => {
  const user = await User.findById(id);

  if (!user) {
    throw new Error('Utilisateur introuvable.');
  }

  user.isActive = !user.isActive;
  await user.save();

  return user;
};

exports.deleteUser = async (id) => {
  const response = await User.findOneAndDelete({ _id: id });

  if (!response) {
    throw new Error('No user exists');
  }

  return response;
};



