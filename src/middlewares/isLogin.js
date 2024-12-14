function isLogin(req, res, next) {
    console.log('checking login status', req.session.idUser);
  if (req.session.idUser) {
    return next();
  } 
    res.redirect('/login');
}

module.exports = {isLogin};