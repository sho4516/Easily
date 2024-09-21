import UserModel from "../models/user.model.js";

export default class AuthController {
  getIndexPage(req, res) {
    return res.render("index", {
      pageCSS: "/css/index.css",
      jsPage: "/JS/index.js",
      showLogin: false,
      errorMessage: null,
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
    });
  }

  loginUser(req, res) {
    const { email, password } = req.body;
    const isUserValid = UserModel.validateUser(email, password);
    var errors = [];
    if (!isUserValid) {
      errors.push("Invalid username or password");
      return res.render("index", {
        pageCSS: "/css/index.css",
        jsPage: "/JS/index.js",
        showLogin: true,
        errorMessage: errors[0],
      });
    } else {
      req.session.userEmail = email;
      return res.redirect("/jobs");
    }
  }
}
