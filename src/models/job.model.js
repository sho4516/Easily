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
    4
  ),
  new JobModel(
    1,
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
    4
  ),
  new JobModel(
    1,
    "Tech",
    "SDE",
    "Pune",
    "Coding Ninjas",
    "14-18 LPA",
    "2 Oct",
    [
      "NodeJs",
      "React",
    ],
    5,
    "today",
    4
  ),
];
