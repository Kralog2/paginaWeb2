function isAdmin(req, res, next) {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).render("errors/403", { title: "Acceso denegado" });
  }
  next();
}

module.exports = { isAdmin };
