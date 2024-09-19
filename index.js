import express from "express";
import path from "path";
import ejsLayouts from "express-ejs-layouts";
import AuthController from "./src/controllers/auth.controller.js";
import JobController from "./src/controllers/job.controller.js";

const authController = new AuthController();
const jobController = new JobController();

const app = express();

app.use(express.static(path.join(path.resolve(), "public")));

//set ejs config
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "src", "views"));
app.use(ejsLayouts);

app.get("/", authController.getIndexPage);

app.get("/jobs", jobController.getJobs);

export default app;
