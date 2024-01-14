const mongo = require("mongodb");
const config = require("./config");
const mongoUtil = {};
mongoUtil.runner = async (collection) => {
    const connection = await mongo.MongoClient.connect(config.MONGO_URL);
    const db = connection.db("plan-it");
    return db.collection(collection)
}
module.exports = mongoUtil;