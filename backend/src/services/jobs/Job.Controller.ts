import { checkIfValidMongooseId } from "../share/MongooseUtils";
import { NotFoundError } from "../../core/ApiError";
import { JobDTO } from "./Job.Model";
import jobsRepository from "./Job.Repository";
import { UserRO } from "../user/User.Model";

async function createJobForUser(jobInfo: JobDTO, user: UserRO) {
  let currentDate = new Date();
  let lastDate = new Date(currentDate.setDate(currentDate.getDate() + 7));
  let newJobInfo = {
    ...jobInfo,
    publishedDate: new Date(),
    lastDate: lastDate,
    userId: user._id,
  };
  let jobCreated = await jobsRepository.createJob(newJobInfo);
  return jobCreated;
}

async function getJobsForUser(user: UserRO) {
  let jobs = await jobsRepository.getJobsForUser(user._id);
  return jobs;
}

async function getUserJobById(jobId: string, user: UserRO) {
  if (!checkIfValidMongooseId(jobId)) throw new NotFoundError("Job Not Found");
  let job = await jobsRepository.getJobById(jobId);
  if (!job) throw new NotFoundError("Job Not Found");
  if (job.userId.toString() !== user._id.toString())
    throw new NotFoundError("Job Not Found");
  return job;
}
export default { createJobForUser, getJobsForUser, getUserJobById };
