module.exports = (sequelize, DataTypes) => {
    const Ticket = sequelize.define(
        'Ticket',
        {
            TicketID: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            TicketName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Price: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
            Quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            EventID: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            timestamps: true, 
        }
    );

    console.log(Ticket === sequelize.models.Ticket);
    return Ticket;
};
