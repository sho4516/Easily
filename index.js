import express from "express";
import path from "path";
import ejsLayouts from "express-ejs-layouts";
import AuthController from "./src/controllers/auth.controller.js";
import JobController from "./src/controllers/job.controller.js";
import { uploadResume } from "./src/middlewares/fileUpload.middleware.js";
import session from "express-session";
import { auth } from "./src/middlewares/auth.middleware.js";
import { ownership } from "./src/middlewares/ownership.middleware.js";

const authController = new AuthController();
const jobController = new JobController();

const app = express();

app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "veryverysecretkey",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

//set ejs config
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "src", "views"));
app.use(ejsLayouts);

// Auth
app.get("/", authController.getIndexPage);
app.get("/login", authController.getLoginPage);
app.get("/register", authController.getRegisterPage);
app.get("/logout", authController.logout);
app.post("/register", authController.registerUser);
app.post("/login", authController.loginUser);

//jobs
app.get("/jobs", jobController.getJobs);
app.get("/jobs/update/:id", auth, ownership, jobController.getUpdateJobPage);
app.get("/jobs/new", auth, jobController.getNewJobPage);
app.get("/jobs/:id", jobController.getJobById);
app.post("/jobs/create", auth, jobController.postANewJob);
app.post("/jobs/:id", auth, jobController.updateJobById);
app.delete("/jobs/:id", auth, ownership, jobController.deleteJobById);

//apply
app.post("/apply/:id", uploadResume.single("resume"), jobController.applyJob);

//error
app.get("/404", authController.getErrorPage);

//applicants
app.get(
  "/jobs/:id/applicants",
  auth,
  ownership,
  jobController.getApplicantsByJobId
);

export default app;
