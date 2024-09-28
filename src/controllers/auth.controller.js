import UserModel from "../models/user.model.js";

export default class AuthController {
  getIndexPage(req, res) {
    return res.render("index", {
      pageCSS: "/css/index.css",
      jsPage: "/JS/index.js",
      showLogin: false,
      errorMessage: null,
      userName: req.session.userName ? req.session.userName : null,
    });
  }

  registerUser(req, res) {
    console.log(req);
    const userObj = req.body;
    UserModel.add(userObj);
    res.render("index", {
      pageCSS: "/css/index.css",
      jsPage: "/JS/index.js",
      showLogin: true,
      errorMessage: null,
      userName: req.session.userName ? req.session.userName : null,
    });
  }

  loginUser(req, res) {
    const { email, password } = req.body;
    const isUserValid = UserModel.validateUser(email, password);
    const userName = UserModel.getUserNameByEmail(email);
    var errors = [];
    if (!isUserValid) {
      errors.push("Invalid username or password");
      return res.render("index", {
        pageCSS: "/css/index.css",
        jsPage: "/JS/index.js",
        showLogin: true,
        errorMessage: errors[0],
        userName: req.session.userName ? req.session.userName : null,
      });
    } else {
      req.session.userEmail = email;
      req.session.userName = userName;
      req.session.isLoggedIn = true;
      return res.redirect("/jobs");
    }
  }

  getErrorPage(req, res) {
    return res.render("404", {
      pageCSS: "/css/404.css",
      userName: req.session.userName ? req.session.userName : null,
    });
  }
}
