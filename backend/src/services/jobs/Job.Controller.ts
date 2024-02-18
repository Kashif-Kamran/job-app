import { JobDTO } from "./Job.Model";
import jobsRepository from "./Job.Repository";

async function createJob(jobInfo: JobDTO) {
  let currentDate = new Date();
  let lastDate = new Date(currentDate.setDate(currentDate.getDate() + 7));
  let newJobInfo = {
    ...jobInfo,
    publishedDate: new Date(),
    lastDate: lastDate,
  };
  let jobCreated = await jobsRepository.createJob(newJobInfo);
  return jobCreated;
}

export default { createJob };
