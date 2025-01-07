module.exports = (sequelize, DataTypes) => {
    const Ticket = sequelize.define('Ticket', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    });
    return Ticket;
};
