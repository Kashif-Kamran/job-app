import { JobDTO } from "./Job.Model";
import jobsRepository from "./Job.Repository";

async function createJobForUser(jobInfo: JobDTO, userId: string) {
  let currentDate = new Date();
  let lastDate = new Date(currentDate.setDate(currentDate.getDate() + 7));
  let newJobInfo = {
    ...jobInfo,
    publishedDate: new Date(),
    lastDate: lastDate,
    userId: userId,
  };
  let jobCreated = await jobsRepository.createJob(newJobInfo);
  return jobCreated;
}

async function getJobsForUser(userId: string) {
  let jobs = await jobsRepository.getJobsForUser(userId);
  return jobs;
}
export default { createJobForUser, getJobsForUser };
