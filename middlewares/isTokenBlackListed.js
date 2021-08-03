const RedisBackend = require("../database/redis");
const redisClient = RedisBackend.client;

module.exports = (request, response, next) => {
  // 1. take out the userId and token from the request
  const userId = request.userId;
  const token = request.query.secret_token;

  // 2. Check redis if the user exists
  redisClient.get(userId, (error, data) => {
    if (error) {
      return response.status(400).send({ error });
    }
    // 3. if so, check if the token provided in the request has been blacklisted. If so, redirect or send a response else move on with the request.
    if (data !== null) {
      const parsedData = JSON.parse(data);
      if (parsedData[userId].includes(token)) {
        return response.status(405).send({
          message: "You have to login!",
        });
      }
      return next();
    } else {
      return next();
    }
  });
};
