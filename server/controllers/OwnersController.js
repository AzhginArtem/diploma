const { OWNER } = require('../models/models');

class OwnersController {
  async get(req, res, next) {
    const contracts = await OWNER.findAll({});
    return res.json(contracts);
  }

  async delete(req, res) {
    const { id } = req.body;
    const deleted = await OWNER.destroy({ where: { ID: id } });
    return res.json(deleted);
  }
}
module.exports = new OwnersController();
