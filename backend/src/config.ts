export const port = process.env.PORT || 8080;
export const environment = process.env.NODE_ENV || "development";

export const tokenInfo = {
  accessTokenValidityDays: 7,
  secrat: "secrat_key_by_kashif_kamran",
};

export const db = {
  uri: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/job-app",
  minPoolSize: 5,
  maxPoolSize: 10,
};
