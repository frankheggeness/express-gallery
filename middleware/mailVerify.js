function mailVerify(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect(`/${req.user.id}/inbox`);
  } else {
    return res.render('./templates/login');
  }
}

module.exports = mailVerify;
