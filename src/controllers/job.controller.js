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
    });
  }

  updateJobById(req, res) {
    const id = req.params.id;
    JobModel.updateJobById(id, req.body);
    return res.redirect("/jobs/"+id);
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
}
