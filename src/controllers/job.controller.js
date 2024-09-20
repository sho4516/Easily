import JobModel from "../models/job.model.js";

export default class JobController {
  getJobs(req, res) {
    const jobs = JobModel.getJobs();
    return res.render("jobs", { jobs: jobs, pageCSS: "/css/jobs.css" });
  }

  getJobById(req, res) {
    const jobId = req.params.id;
    const job = JobModel.getJobById(jobId);
    console.log(job);
    res.render("job", { pageCSS: "/css/job.css", job: job });
  }
}
