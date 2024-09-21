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

  static addApplicantForAJob(newApplicant, jobId) {
    const index = jobs.findIndex((j) => j.id == jobId);
    jobs[index].applicants.push(newApplicant);
  }
}

var jobs = [
  new JobModel(
    1,
    "IT",
    "SDE",
    "Pune",
    "Coding Ninjas",
    "14-18 LPA",
    "2 Oct",
    ["NodeJs", "React", "MongoDb", "Express"],
    5,
    "today",
    []
  ),
  new JobModel(
    2,
    "Tech",
    "SDE",
    "Pune",
    "Coding Ninjas",
    "14-18 LPA",
    "2 Oct",
    [
      "NodeJs",
      "React",
      "MongoDb",
      "Express",
      "NodeJs",
      "React",
      "MongoDb",
      "Express",
      "NodeJs",
      "React",
      "MongoDb",
      "Express",
      "NodeJs",
      "React",
      "MongoDb",
      "Express",
    ],
    5,
    "today",
    []
  ),
  new JobModel(
    3,
    "Tech",
    "Java Developer",
    "Pune",
    "Coding Ninjas",
    "14-18 LPA",
    "2 Oct",
    ["NodeJs", "React"],
    5,
    "today",
    []
  ),
];
