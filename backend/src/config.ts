export const port = process.env.PORT || 8080;
export const environment = process.env.NODE_ENV || "development";

export const tokenInfo = {
  accessTokenValidityDays: 7,
  secrat: "secrat_key_by_kashif_kamran",
};
let mongoUri = "mongodb://127.0.0.1:27017/job-app";
if (process.env.NODE_ENV === "test")
  mongoUri = "mongodb://127.0.0.1:27017/job-app-test";

export const db = {
  uri: mongoUri,
  minPoolSize: 5,
  maxPoolSize: 10,
};
