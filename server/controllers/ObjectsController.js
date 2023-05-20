const { OBJECT, OWNER } = require('../models/models');
const ApiError = require('../error/ApiError');

class ObjectsController {
  async getAll(req, res, next) {
    const contracts = await OBJECT.findAll({
      include: [{ model: OWNER, attributes: ['FIO'] }],
    });
    return res.json(contracts);
  }

  async delete(req, res, next) {
    const { id } = req.body;
    const deleted = await OBJECT.destroy({ where: { ID: id } });
    return res.json(deleted);
  }

  async create(req, res, next) {
    const Name = req.body.values[0];
    const Square = req.body.values[1];
    const Address = req.body.values[2];
    const OwnerID = req.body.values[3];
    const created = await OBJECT.create({ Name, Square: Square, Address, ownerID: OwnerID });
    return res.json(created);
  }

  async edit(req, res, next) {
    const ID = req.body.values[0];
    if (req.body.values[1] === undefined) {
      return next(ApiError.internal('Заполните поле, которое хотите изменить!'));
    }
    const { Name, Square, Address, ownerID } = req.body.values[1];
    const updated = await OBJECT.update({ Name, Square, Address, ownerID }, { where: { ID } })
      .then((result) => {
        return res.json(Name);
      })
      .catch((result) => next(ApiError.badRequest('Что-то пошло не так!')));
  }
}
module.exports = new ObjectsController();
