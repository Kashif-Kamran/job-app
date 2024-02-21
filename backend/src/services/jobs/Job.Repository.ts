import { InternalServerError } from "../../core/ApiError";
import { jobModel, JobType } from "./Job.Model";
import _ from "lodash";
function getJobTypeObject(jobResponseDb: any) {
  if (jobResponseDb === null) return null;
  return _.pick(jobResponseDb, [
    "_id",
    "title",
    "salary",
    "description",
    "email",
    "address",
    "companyName",
    "industry",
    "jobType",
    "minEducation",
    "experience",
    "positions",
    "publishedDate",
    "lastDate",
    "userId",
  ]);
}

async function createJob(newJobInfo: JobType) {
  try {
    let saveResponse = await jobModel.create(newJobInfo);
    return getJobTypeObject(saveResponse);
  } catch (error) {
    throw new InternalServerError("Error occured while creating job.");
  }
}

async function getJobsForUser(userId: string) {
  try {
    let jobs = await jobModel.find({ userId: userId });
    return jobs.map((job) => getJobTypeObject(job));
  } catch (error) {
    throw new InternalServerError(
      `Error occured while getting jobs for user ${userId}`
    );
  }
}
async function getJobById(jobId: string) {
  try {
    let job = await jobModel.findOne({ _id: jobId });
    return getJobTypeObject(job);
  } catch (error) {
    throw new InternalServerError(
      `Error occured while getting job with id ${jobId}`
    );
  }
}
export default { createJob, getJobsForUser, getJobById };
