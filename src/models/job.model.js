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
    applicants,
    recruiterId
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
    this.recruiterId = recruiterId;
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

  static addANewJob(job, recruiterId) {
    const newJob = new JobModel(
      jobs.length + 1,
      job.jobCategory,
      job.jobDesignation,
      job.jobLocation,
      job.companyName,
      job.salary,
      job.applyBy,
      job.skillsRequired,
      job.noOfOpenings,
      new Date().toLocaleString(),
      [],
      recruiterId
    );

    jobs.push(newJob);
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

  static deleteJobById(id) {
    const index = jobs.findIndex((j) => j.id == id);
    if (index != null) {
      jobs.splice(index, 1);
      return true;
    }
    return false;
  }

  static addApplicantForAJob(newApplicant, jobId) {
    const index = jobs.findIndex((j) => j.id == jobId);
    jobs[index].applicants.push(newApplicant);
    return this.getJobById(jobId);
  }

  static getApplicantsByJobId(id) {
    const index = jobs.findIndex((j) => j.id == id);
    return jobs[index].applicants;
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
    [],
    2
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
    [],
    2
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
    [],
    2
  ),
];
