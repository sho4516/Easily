export const auth = (req, res, next) => {
  if (req.session.userEmail) {
    res.locals.isLoggedIn = true;
  } else {
    res.locals.isLoggedIn = false;
  }
  next();
};
