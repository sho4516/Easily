// jobUtils.js
export function convertJobDesignation(designation) {
  const designationMap = {
    hr: "HR",
    sde: "SDE",
    devops: "DevOps",
    mernDeveloper: "MERN Developer",
    meanDeveloper: "MEAN Developer",
    javaDeveloper: "Java Developer",
    frontEndDeveloper: "FrontEnd Developer",
    backEndDeveloper: "BackEnd Developer",
    fullStackDeveloper: "FullStack Developer",
  };

  return designationMap[designation] || designation;
}

export function convertJobCategory(category) {
  const categoryMap = {
    tech: "Tech",
    nonTech: "Non Tech",
  };

  return categoryMap[category] || category;
}
