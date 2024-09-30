import JobModel from "../models/job.model.js";
import ApplicantModel from "../models/applicant.model.js";
import { sendEmail } from "../utils/Mailer.js";
import {
  convertJobDesignation,
  convertJobCategory,
} from "../utils/JobUtils.js";

export default class JobController {
  getJobs(req, res) {
    const jobs = JobModel.getJobs();
    const emailSent = req.session.emailSent || false;
    const jobsCopy = jobs.map((job) => {
      return { ...job };
    });
    jobsCopy.forEach((job) => {
      job.jobCategory = convertJobCategory(job.jobCategory);
      job.jobDesignation = convertJobDesignation(job.jobDesignation);
    });
    return res.render("jobs", {
      jobs: jobsCopy,
      pageCSS: "/css/jobs.css",
      userName: req.session.userName ? req.session.userName : null,
      emailSent: emailSent,
      isLoggedIn: req.session.isLoggedIn ? true : false,
    });
  }

  getJobById(req, res) {
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
    });
  }

  getUpdateJobPage(req, res) {
    const jobId = req.params.id;
    const job = JobModel.getJobById(jobId);
    return res.render("updateJob", {
      pageCSS: "/css/updateJob.css",
      userName: req.session.userName ? req.session.userName : null,
      job: job,
      isLoggedIn: req.session.isLoggedIn ? true : false,
      isEdit: true,
    });
  }

  getNewJobPage(req, res) {
    return res.render("updateJob", {
      pageCSS: "/css/updateJob.css",
      userName: req.session.userName ? req.session.userName : null,
      isLoggedIn: req.session.isLoggedIn ? true : false,
      isEdit: false,
      job: null,
    });
  }

  deleteJobById(req, res) {
    const jobId = req.params.id;
    const deleted = JobModel.deleteJobById(jobId); // Assuming this deletes the job
    if (deleted) {
      return res.status(200).json({ message: "Job deleted successfully!" });
    } else {
      return res.status(404).json({ message: "Job not found!" });
    }
  }

  updateJobById(req, res) {
    const id = req.params.id;
    JobModel.updateJobById(id, req.body);
    return res.redirect("/jobs/" + id);
  }

  postANewJob(req, res) {
    const job = req.body;
    const recruiterId = req.session.recruiterId;
    JobModel.addANewJob(job, recruiterId);
    return res.redirect("/jobs");
  }

  async applyJob(req, res) {
    const jobId = req.params.id;
    const { name, email, contact } = req.body;
    const resumePath = "resume/" + req.file.filename;
    const newApplicant = ApplicantModel.add(name, email, contact, resumePath);
    const job = JobModel.addApplicantForAJob(newApplicant, jobId);
    let emailSent = false;
    try {
      await sendEmail(
        "Job Application",
        `Thank you ${name}. You have successfully applied for ${job.companyName}. We will get back to you shortly`,
        email
      );
      emailSent = true;
    } catch (err) {
      console.log(err);
    }
    req.session.emailSent = emailSent;
    return res.redirect("/jobs");
  }

  getApplicantsByJobId(req, res) {
    const jobId = req.params.id;
    const applicants = JobModel.getApplicantsByJobId(jobId);
    return res.render("applicants", {
      pageCSS: "/css/applicants.css",
      userName: req.session.userName ? req.session.userName : null,
      applicants: applicants,
      isLoggedIn: req.session.isLoggedIn ? true : false,
    });
  }
}
