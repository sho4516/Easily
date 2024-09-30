import { body, validationResult } from "express-validator";
import JobModel from "../models/job.model.js";
import {
  convertJobCategory,
  convertJobDesignation,
} from "../utils/JobUtils.js";

const loginRules = [
  body("email").notEmpty().withMessage("Email field cannot be empty"),
  body("email").isEmail().withMessage("Invalid Email"),
  body("password").notEmpty().withMessage("Password field cannot be empty"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password must be atleast 5 char long"),
];

const registrationRules = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").notEmpty().withMessage("Email field cannot be empty"),
  body("email").isEmail().withMessage("Invalid Email"),
  body("password").notEmpty().withMessage("Password field cannot be empty"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password must be atleast 5 char long"),
];

const applyRules = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").notEmpty().withMessage("Email field cannot be empty"),
  body("email").isEmail().withMessage("Invalid Email"),
  body("contact")
    .notEmpty()
    .withMessage("Contact number is required")
    .isLength({ min: 10, max: 10 })
    .withMessage("Contact number must be 10 digits")
    .isNumeric()
    .withMessage("Contact number must contain only numbers"),
  body("resume").custom((val, { req }) => {
    if (!req.file) {
      throw new Error("File is required");
    }
    if (req.file.mimetype !== "application/pdf") {
      throw new Error("Only PDF files are allowed");
    }
    return true;
  }),
];

export const loginValidation = async (req, res, next) => {
  await Promise.all(
    loginRules.map((rule) => {
      return rule.run(req);
    })
  );

  var errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("index", {
      pageCSS: "/css/index.css",
      jsPage: "/JS/index.js",
      showLogin: true,
      showRegister: false,
      errorMessage: errors.array()[0].msg,
      userName: req.session.userName ? req.session.userName : null,
      isLoggedIn: req.session.isLoggedIn ? true : false,
    });
  }
  next();
};

export const registerValidation = async (req, res, next) => {
  await Promise.all(
    registrationRules.map((rule) => {
      return rule.run(req);
    })
  );

  var errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("index", {
      pageCSS: "/css/index.css",
      jsPage: "/JS/index.js",
      showLogin: false,
      showRegister: true,
      errorMessage: errors.array()[0].msg,
      userName: req.session.userName ? req.session.userName : null,
      isLoggedIn: req.session.isLoggedIn ? true : false,
    });
  }
  next();
};

export const applyValidation = async (req, res, next) => {
  await Promise.all(
    applyRules.map((rule) => {
      return rule.run(req);
    })
  );

  var errors = validationResult(req);
  if (!errors.isEmpty()) {
    const jobId = req.params.id;
    const job = JobModel.getJobById(jobId);
    const jobCopy = { ...job };
    jobCopy.jobCategory = convertJobCategory(job.jobCategory);
    jobCopy.jobDesignation = convertJobDesignation(job.jobDesignation);
    const isLoggedIn = req.session.isLoggedIn || undefined;
    return res.render("job", {
      pageCSS: "/css/job.css",
      job: jobCopy,
      jsPage: "/JS/job.js",
      userName: req.session.userName ? req.session.userName : null,
      isLoggedIn: isLoggedIn,
      errorMessage: errors.array()[0].msg,
      showApplicationModel: true,
    });
  }
  next();
};
