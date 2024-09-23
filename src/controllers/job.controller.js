import JobModel from "../models/job.model.js";
import ApplicantModel from "../models/applicant.model.js";
import { sendEmail } from "../utils/Mailer.js";

export default class JobController {
  getJobs(req, res) {
    const jobs = JobModel.getJobs();
    const emailSent = req.session.emailSent || false;
    return res.render("jobs", {
      jobs: jobs,
      pageCSS: "/css/jobs.css",
      userName: req.session.userName ? req.session.userName : null,
      emailSent: emailSent,
    });
  }

  getJobById(req, res) {
    const jobId = req.params.id;
    const job = JobModel.getJobById(jobId);
    const isLoggedIn = req.session.isLoggedIn || undefined;
    return res.render("job", {
      pageCSS: "/css/job.css",
      job: job,
      jsPage: "/JS/job.js",
      userName: req.session.userName ? req.session.userName : null,
      isLoggedIn: isLoggedIn,
    });
  }

  updateJobById(req, res) {
    return res.render("updateJob", {
      pageCSS: "/css/updateJob.css",
      userName: req.session.userName ? req.session.userName : null,
    });
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
