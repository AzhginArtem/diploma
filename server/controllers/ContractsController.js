const { CONTRACT, OWNER, OBJECT, TYPE, SERVICE } = require('../models/models');
const ApiError = require('../error/ApiError');

class ContractsController {
  async get(req, res, next) {
    const { id } = req.body;
    const contracts = await CONTRACT.findAll({
      where: { userID: id },
      include: [
        { model: OWNER, attributes: ['FIO'] },
        { model: OBJECT, attributes: ['Name'] },
        { model: TYPE, attributes: ['Name'] },
        { model: SERVICE, attributes: ['Name'] },
      ],
    });
    return res.json(contracts);
  }

  async edit(req, res, next) {
    const ID = req.body.values[0];
    if (req.body.values[1] === undefined) {
      return next(ApiError.internal('Заполните поле, которое хотите изменить!'));
    }
    const { Summary, Image, objectID, typeID, userID, serviceID, ownerID } = req.body.values[1];
    const edited = await CONTRACT.update(
      { Summary, Image, objectID, typeID, userID, serviceID, ownerID },
      { where: { ID } },
    );
    return res.json(edited);
  }

  async create(req, res, next) {
    const Summary = req.body.values[0];
    const Image = req.body.values[1];
    const objectID = req.body.values[2];
    const typeID = req.body.values[3];
    const userID = req.body.values[4];
    const serviceID = req.body.values[5];
    const ownerID = req.body.values[6];
    const created = await CONTRACT.create({
      Summary,
      Image,
      objectID,
      typeID,
      userID,
      serviceID,
      ownerID,
    });
    console.log(Summary, Image, objectID, typeID, userID, serviceID, ownerID);
    const finded = await CONTRACT.findAll({
      where: { ID: created.ID },
      include: [{ model: OWNER, attributes: ['FIO'] }],
    });
    return res.json(finded.owner);
  }

  async delete(req, res) {
    const { id } = req.body;
    const deleted = await CONTRACT.destroy({ where: { ID: id } });
    return res.json(deleted);
  }
}
module.exports = new ContractsController();
