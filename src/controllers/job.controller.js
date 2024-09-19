import JobModel from "../models/job.model.js";

export default class JobController {
  getJobs(req, res) {
    const jobs = JobModel.getJobs();
    return res.render("jobs", { jobs: jobs, pageCSS: "/css/jobs.css" });
  }
}
