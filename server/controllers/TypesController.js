const { TYPE } = require('../models/models');

class TypesController {
  async getAll(req, res, next) {
    const contracts = await TYPE.findAll();
    return res.json(contracts);
  }

  async delete(req, res, next) {
    const { id } = req.body;
    const deleted = await TYPE.destroy({ where: { ID: id } });
    return res.json(deleted);
  }

  async create(req, res, next) {
    console.log(req.body.values);
    const Name = req.body.values[0];
    console.log(Name);
    const created = await TYPE.create({ Name: Name });
    return res.json(created);
  }

  async edit(req, res) {
    const ID = req.body.values[0];
    const { Name } = req.body.values[1];
    const edited = await TYPE.update({ Name: Name }, { where: { ID: ID } });
    return res.json(edited);
  }
}
module.exports = new TypesController();
