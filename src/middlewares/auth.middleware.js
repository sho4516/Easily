export const auth = (req, res, next) => {
  if (req.session.isLoggedIn) {
    next();
  } else {
    return res.status(404).render("404", {
      message:
        "Only recruiters are allowed to access this page. Please login as a recruiter to continue.",
      pageCSS: "/css/404.css",
      userName: req.session.userName ? req.session.userName : null,
      isLoggedIn: req.session.isLoggedIn ? true : false,
    });
  }
};
