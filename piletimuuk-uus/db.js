const { Sequelize, DataTypes} = require("Sequelize");

const sequelize = new Sequelize(process.env.DB_DATANAME, process.env.DB_USERNAME, process.env.DB_PASSWORD {
    host: process.env.DB_HOSTNAME,
    dialect: "mariadb",
    logging: console.log,
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has bee established succesfully.");
    } catch (error) {
        console.error("Connection failed: " + error)
    }
})();

const db = {}
db.Sequelize = Sequelize;
db.Sequelize = sequelize;
db.games = require("./models/game")(sequelize, DataTypes);

const sync = (async () => {
    await sequelize.sync({alter: true});
    console.log("models have been synchronised succesfully")
})