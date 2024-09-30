import JobModel from "../models/job.model.js";

export const ownership = (req, res, next) => {
  const id = req.params.id;
  const job = JobModel.getJobById(id);
  if (job && job.recruiterId == req.session.recruiterId) {
    next();
  } else {
    return res.status(403).render("404", {
      message:
        "You as a recruiter do no have the permission to modify this job listing.",
      pageCSS: "/css/404.css",
      userName: req.session.userName ? req.session.userName : null,
      isLoggedIn: req.session.isLoggedIn ? true : false,
    });
  }
};
