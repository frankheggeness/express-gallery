function profileVerify(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect(`/${req.user.id}`);
  } else {
    return res.redirect('/login');
  }
}

module.exports = profileVerify;
