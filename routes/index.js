//const fundme = require("./webapp/fundme");
const mobilefundme = require("./mobile/fundme");

module.exports = (app) => {
  //app.use("/api/v1/webapp/fundme", fundme);
  app.use("/api/v1/mobileapp/fundme", mobilefundme);
};
