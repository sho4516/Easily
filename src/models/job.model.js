export default class JobModel {
  constructor(
    id,
    jobCategory,
    jobDesignation,
    jobLocation,
    companyName,
    salary,
    applyBy,
    skillsRequired,
    noOfOpenings,
    jobPosted,
    applicants
  ) {
    this.id = id;
    this.jobCategory = jobCategory;
    this.jobDesignation = jobDesignation;
    this.jobLocation = jobLocation;
    this.companyName = companyName;
    this.salary = salary;
    this.applyBy = applyBy;
    this.skillsRequired = skillsRequired;
    this.noOfOpenings = noOfOpenings;
    this.jobPosted = jobPosted;
    this.applicants = applicants;
  }

  static getJobs() {
    return jobs;
  }

  static getJobById(id) {
    const job = jobs.find((j) => {
      return j.id == Number(id);
    });
    return job;
  }

  static updateJobById(id, job) {
    const index = jobs.findIndex((j) => j.id == id);
    jobs[index].jobCategory = job.jobCategory;
    jobs[index].jobDesignation = job.jobDesignation;
    jobs[index].jobLocation = job.jobLocation;
    jobs[index].companyName = job.companyName;
    jobs[index].salary = job.salary;
    jobs[index].noOfOpenings = job.noOfOpenings;
    jobs[index].applyBy = job.applyBy;
    jobs[index].skillsRequired = job.skillsRequired;
  }

  static addApplicantForAJob(newApplicant, jobId) {
    const index = jobs.findIndex((j) => j.id == jobId);
    jobs[index].applicants.push(newApplicant);
    return this.getJobById(jobId);
  }
}

var jobs = [
  new JobModel(
    1,
    "tech",
    "mernDeveloper",
    "Pune",
    "Coding Ninjas",
    "14-18 LPA",
    "2024-09-30",
    ["NodeJS", "React", "MongoDB", "Express"],
    5,
    new Date().toLocaleString(),
    []
  ),
  new JobModel(
    2,
    "tech",
    "sde",
    "Pune",
    "Coding Ninjas",
    "14-18 LPA",
    "2024-09-30",
    ["NodeJS", "React", "MongoDB", "Express"],
    5,
    new Date().toLocaleString(),
    []
  ),
  new JobModel(
    3,
    "nonTech",
    "mernDeveloper",
    "Pune",
    "Coding Ninjas",
    "14-18 LPA",
    "2024-09-30",
    ["NodeJS", "React", "AWS", "SQL"],
    5,
    new Date().toLocaleString(),
    []
  ),
];
