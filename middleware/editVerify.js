function editVerify(req, res, next) {
  if (req.isAuthenticated()) {
    return;
  } else {
    return res.render('./templates/login');
  }
}

module.exports = editVerify;
