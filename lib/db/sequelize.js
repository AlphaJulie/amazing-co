const Sequelize = require('sequelize');

const config = require("../config/db-config.json").development;
const sequelize = new Sequelize(`${config.dialect}://${config.username}:${config.password}@${config.host}:5432/${config.database}`,{logging: false});

const EventModel = require('./event');
const models = { sequelize, Event: EventModel.init(sequelize, Sequelize) };

module.exports = models;