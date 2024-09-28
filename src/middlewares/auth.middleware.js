export const auth = (req, res, next) => {
  if (req.session.isLoggedIn) {
    next();
  } else {
    return res.redirect("/404");
  }
};
