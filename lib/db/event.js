const Sequelize = require('sequelize');

class Event extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                id: {
                    type: DataTypes.INTEGER, primaryKey: true,
                    autoIncrement: true
                }, 
                event_id: DataTypes.STRING,
                event_name: DataTypes.STRING,
                cost: DataTypes.INTEGER
            },
            {
                tableName: 'events',
                freezeTableName: true,
                timestamps: false,
                sequelize
            }
        );
    }
}
module.exports = Event;