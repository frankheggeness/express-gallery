function profileVerify(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect(`/${req.user.id}`);
  } else {
    return res.render('./templates/login');
  }
}

module.exports = profileVerify;
