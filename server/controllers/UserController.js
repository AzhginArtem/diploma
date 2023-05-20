const bcrypt = require('bcrypt');
const ApiError = require('../error/ApiError');
const { EMPLOYEE } = require('../models/models');
const jwt = require('jsonwebtoken');

const generateJWT = (id, fio, role, age, phone, email) => {
  return jwt.sign(
    { id: id, fio: fio, role: role, age: age, phone: phone, email: email },
    process.env.SECRET_KEY,
    {
      expiresIn: '24h',
    },
  );
};

class UserController {
  async registration(req, res, next) {
    const { fio, age, password, phone, email } = req.body;

    const role = 'USER';

    if (!fio || !password) {
      return next(ApiError.badRequest('Некорректный логин или пароль!'));
    }

    const candidate = await EMPLOYEE.findOne({ where: { FIO: fio } });
    if (candidate) {
      return next(ApiError.badRequest('Такой пользователь уже существует'));
    }

    const hashPass = await bcrypt.hash(password, 5);
    const user = await EMPLOYEE.create({
      FIO: fio,
      Password: hashPass,
      Role: role,
      Age: age,
      Phone: phone,
      Email: email,
    });
    const token = generateJWT(user.ID, user.FIO, user.Age, user.Phone, user.Email, role);
    return res.json({ token });
  }

  async login(req, res, next) {
    const { fio, password } = req.body;

    const user = await EMPLOYEE.findOne({ where: { FIO: fio } });
    if (!user) {
      return next(ApiError.internal('User not found'));
    }

    let compare = bcrypt.compareSync(password, user.Password);
    if (!compare) {
      return next(ApiError.internal('Неправильный пароль!'));
    }

    const token = generateJWT(user.ID, user.FIO, user.Role, user.Age, user.Phone, user.Email);
    return res.json({ token });
  }

  async auth(req, res) {
    const token = generateJWT(
      req.user.id,
      req.user.fio,
      req.user.role,
      req.user.age,
      req.user.phone,
      req.user.email,
    );
    return res.json({ token });
  }

  async getAll(req, res) {
    const response = await EMPLOYEE.findAll();
    return res.json(response);
  }

  async delete(req, res) {
    const { id } = req.body;
    const deleted = await EMPLOYEE.destroy({ where: { ID: id } });
    return res.json(deleted);
  }

  async edit(req, res, next) {
    const ID = req.body.values[0];
    if (req.body.values[1] === undefined) {
      return next(ApiError.internal('Заполните поле, которое хотите изменить!'));
    }
    const { FIO, Age, Phone, Email, Role } = req.body.values[1];
    console.log(FIO, Age, Phone, Email, Role);
    const updated = await EMPLOYEE.update({ FIO, Age, Phone, Email, Role }, { where: { ID } })
      .then((result) => {
        return res.json(FIO);
      })
      .catch((result) => next(ApiError.badRequest('Что-то пошло не так!')));
  }
}

module.exports = new UserController();
