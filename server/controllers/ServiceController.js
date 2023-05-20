const { SERVICE } = require('../models/models');
const ApiError = require('../error/ApiError');

class ServiceController {
  async getAll(req, res, next) {
    const contracts = await SERVICE.findAll({});
    return res.json(contracts);
  }

  async delete(req, res, next) {
    const { id } = req.body;
    const deleted = await SERVICE.destroy({ where: { ID: id } });
    return res.json(deleted);
  }

  async create(req, res, next) {
    const Name = req.body.values[0];
    const created = await SERVICE.create({ Name });
    return res.json(created);
  }

  async edit(req, res, next) {
    const ID = req.body.values[0];
    if (req.body.values[1] === undefined) {
      return next(ApiError.internal('Заполните поле, которое хотите изменить!'));
    }
    const { Name } = req.body.values[1];
    const updated = await SERVICE.update({ Name }, { where: { ID } })
      .then((result) => {
        return res.json(Name);
      })
      .catch((result) => next(ApiError.badRequest('Что-то пошло не так!')));
  }
}
module.exports = new ServiceController();
