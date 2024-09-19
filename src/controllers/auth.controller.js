export default class AuthController {
  getIndexPage(req, res) {
    return res.render("index", { pageCSS: "/css/index.css" });
  }
}
