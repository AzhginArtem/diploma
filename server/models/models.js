const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const EMPLOYEE = sequelize.define('user', {
  ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  FIO: { type: DataTypes.STRING, unique: true, allowNull: false },
  Age: { type: DataTypes.INTEGER, allowNull: false },
  Password: { type: DataTypes.STRING, allowNull: false },
  Phone: { type: DataTypes.STRING, allowNull: false, unique: true },
  Email: { type: DataTypes.STRING, allowNull: false, unique: true },
  Role: { type: DataTypes.STRING, defaultValue: 'USER' },
});

const OWNER = sequelize.define('owner', {
  ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  FIO: { type: DataTypes.STRING, unique: true, allowNull: false },
  Age: { type: DataTypes.INTEGER },
  Phone: { type: DataTypes.STRING, allowNull: false, unique: true },
  Email: { type: DataTypes.STRING, allowNull: false, unique: true },
});

const OBJECT = sequelize.define('object', {
  ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  Name: { type: DataTypes.STRING, unique: true, allowNull: false },
  Square: { type: DataTypes.DOUBLE },
  Address: { type: DataTypes.STRING },
});

const CONTRACT = sequelize.define('contract', {
  ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  Summary: { type: DataTypes.INTEGER },
  Image: { type: DataTypes.STRING, unique: true },
});

const SERVICE = sequelize.define('service', {
  ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  Name: { type: DataTypes.STRING, allowNull: false, unique: true },
});

const TYPE = sequelize.define('type', {
  ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  Name: { type: DataTypes.STRING, allowNull: false, unique: true },
});

const SERVICE_CONTRACT = sequelize.define('service_contract', {
  ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

OBJECT.hasOne(CONTRACT);
CONTRACT.belongsTo(OBJECT);

TYPE.hasOne(CONTRACT);
CONTRACT.belongsTo(TYPE);

EMPLOYEE.hasOne(CONTRACT);
CONTRACT.belongsTo(EMPLOYEE);

SERVICE.hasMany(CONTRACT);
CONTRACT.belongsToMany(SERVICE, { through: SERVICE_CONTRACT });

OWNER.hasOne(CONTRACT);
CONTRACT.belongsTo(OWNER);

OWNER.hasOne(OBJECT);
OBJECT.belongsTo(OWNER);

CONTRACT.afterCreate((contract) => {
  const created = SERVICE_CONTRACT.create({
    contractID: contract.ID,
    serviceID: contract.serviceID,
  });
  return created;
});

module.exports = {
  EMPLOYEE,
  OWNER,
  CONTRACT,
  OBJECT,
  SERVICE,
  TYPE,
  sequelize,
};
