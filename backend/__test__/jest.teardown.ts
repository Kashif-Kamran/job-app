import connection from "../src/database";
module.exports = async () => {
  //   Close Mongoose Connnection
  await connection.dropDatabase();
  console.log("Deleted Database");
  await connection.close();
};
