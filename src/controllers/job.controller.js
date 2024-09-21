import JobModel from "../models/job.model.js";
import ApplicantModel from "../models/applicant.model.js";

export default class JobController {
  getJobs(req, res) {
    const jobs = JobModel.getJobs();
    return res.render("jobs", {
      jobs: jobs,
      pageCSS: "/css/jobs.css",
    });
  }

  getJobById(req, res) {
    const jobId = req.params.id;
    const job = JobModel.getJobById(jobId);
    console.log(job);
    res.render("job", {
      pageCSS: "/css/job.css",
      job: job,
      jsPage: "/JS/job.js",
    });
  }

  applyJob(req, res) {
    const jobId = req.params.id;
    const { name, email, contact } = req.body;
    const resumePath = "resume/" + req.file.filename;
    const newApplicant = ApplicantModel.add(name, email, contact, resumePath);
    JobModel.addApplicantForAJob(newApplicant, jobId);
    const jobs = JobModel.getJobs();
    return res.render("jobs", { jobs: jobs, pageCSS: "/css/jobs.css" });
  }
}
