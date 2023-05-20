const ApiError = require('../error/ApiError');
const sequelize = require('../db');

class StatsController {
  async UsersContract(req, res, next) {
    const data = await sequelize.query(
      'SELECT  public.users."FIO", COUNT("userID") FROM public.contracts INNER JOIN public.users ON "userID" = public.users."ID" GROUP BY public.users."FIO"',
    );
    return res.json(data);
  }

  async CountOfServices(req, res) {
    const data = await sequelize.query(
      'SELECT public.services."Name", COUNT(public.services."Name") AS "count" FROM public.service_contracts INNER JOIN public.services ON public.service_contracts."serviceID" = public.services."ID" GROUP BY public.services."Name"',
    );
    return res.json(data);
  }
}

module.exports = new StatsController();
