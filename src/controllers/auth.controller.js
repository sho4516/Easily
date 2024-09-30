import UserModel from "../models/user.model.js";

export default class AuthController {
  getIndexPage(req, res) {
    return res.render("index", {
      pageCSS: "/css/index.css",
      jsPage: "/JS/index.js",
      showLogin: false,
      showRegister: false,
      errorMessage: null,
      userName: req.session.userName ? req.session.userName : null,
      isLoggedIn: req.session.isLoggedIn ? true : false,
    });
  }

  getLoginPage(req, res) {
    return res.render("index", {
      pageCSS: "/css/index.css",
      jsPage: "/JS/index.js",
      showLogin: true,
      showRegister: false,
      errorMessage: null,
      userName: req.session.userName ? req.session.userName : null,
      isLoggedIn: req.session.isLoggedIn ? true : false,
    });
  }

  getRegisterPage(req, res) {
    return res.render("index", {
      pageCSS: "/css/index.css",
      jsPage: "/JS/index.js",
      showLogin: false,
      showRegister: true,
      errorMessage: null,
      userName: req.session.userName ? req.session.userName : null,
      isLoggedIn: req.session.isLoggedIn ? true : false,
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
      showRegister: false,
      errorMessage: null,
      userName: req.session.userName ? req.session.userName : null,
      isLoggedIn: req.session.isLoggedIn ? true : false,
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
        showRegister: false,
        errorMessage: errors[0],
        userName: req.session.userName ? req.session.userName : null,
        isLoggedIn: req.session.isLoggedIn ? true : false,
      });
    } else {
      req.session.userEmail = email;
      req.session.userName = userName;
      req.session.isLoggedIn = true;
      req.session.recruiterId = UserModel.getUserId(email, password);
      return res.redirect("/jobs");
    }
  }

  getErrorPage(req, res) {
    return res.render("404", {
      pageCSS: "/css/404.css",
      userName: req.session.userName ? req.session.userName : null,
      isLoggedIn: req.session.isLoggedIn ? true : false,
    });
  }

  logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send("Could not log out. Please try again.");
      }
      res.redirect("/"); // Redirect to login or home page
    });
  }
}
