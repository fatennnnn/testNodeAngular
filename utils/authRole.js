// middleware to check the role
const authRole = (role) => {
  return (req, res, next) => {
    try {
      console.log('admin only',req.role,req.user,req.user.role === 'user'  && !role)

      // Les administrateurs ont toutes les permissions
      if (req.user.role === "admin") {
        console.log('admin only')
        return next();
      }

      // Si l'utilisateur n'est pas administrateur, vérifier son ID
      if (req.user.role === role) {
        const { id } = req.params; // ID cible (généralement passé dans les paramètres de l'URL)
        if (req.user.userId !== id) {
          return res.status(403).json({
            message: "Vous n'êtes pas autorisé à accéder ou modifier cet utilisateur.",
          });
        }
        return next();
      }
      if (req.user.role === 'user'  && !role) {
 
          return res.status(403).json({
            message: "Vous n'êtes pas autorisé à accéder ou modifier cet utilisateur.",
          });
        
        return next();
      }
      // Si aucune condition n'est remplie, l'accès est refusé
      const error = new Error("Not authorized");
      error.statusCode = 401;
      next(error);
    } catch (err) {
      next(err);
    }
  };
};

module.exports = authRole;