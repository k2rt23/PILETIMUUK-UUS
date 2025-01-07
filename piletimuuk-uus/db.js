const { Sequelize, DataTypes } = require("sequelize"); // V�ike t�ht "sequelize"

const sequelize = new Sequelize(
    process.env.DB_DATANAME, // Andmebaasi nimi
    process.env.DB_USERNAME, // Kasutajanimi
    process.env.DB_PASSWORD, // Parool
    {
        host: process.env.DB_HOSTNAME, // Andmebaasi host (nt "localhost")
        dialect: "mariadb", // Dialekt, mida kasutate
        logging: console.log, // Logib SQL-p�ringud konsooli
    }
);

// Testi �hendust
(async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Connection failed: " + error);
    }
})();

// DB objekt mudelite jaoks
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize; // Muutujanimi parandatud v�iket�heks

// Lisa mudelid
db.games = require("./models/game")(sequelize, DataTypes);

// S�nkroniseeri mudelid andmebaasiga
(async () => {
    try {
        await sequelize.sync({ alter: true }); // Kui on muutusi, muudab skeemi
        console.log("Models have been synchronized successfully.");
    } catch (error) {
        console.error("Error syncing models: " + error);
    }
})();

module.exports = db; // Ekspordi db objekt
