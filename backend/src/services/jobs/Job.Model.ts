import { prop, getModelForClass } from "@typegoose/typegoose";
class Job {
  @prop()
  title!: string;
  @prop()
  salary!: number;
  @prop()
  description!: string;
  @prop()
  email!: string;
  @prop()
  address!: string;
  @prop()
  companyName!: string;
  @prop()
  industry!: string;
  @prop()
  jobType!: string;
  @prop()
  minEducation!: string;
  @prop()
  experience!: string;
  @prop()
  positions!: number;
  @prop()
  publishedDate!: Date;
  @prop()
  lastDate!: Date;
}

const jobModel = getModelForClass(Job);

type JobType = Omit<Job, "">;

type JobDTO = Omit<Job, "publishedDate" | "lastDate"> & {
  publishedDate?: string;
  lastDate?: string;
};

export { jobModel, JobDTO, JobType };
