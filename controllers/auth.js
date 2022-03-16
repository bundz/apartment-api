const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UsersController = require("./users");

const secret = "s3cr3t";

class AuthController {
  static async signup({ name, age, email, password }) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const id = await UsersController.create({
      name,
      age,
      email,
      password: hash,
    });
    return id;
  }

  static async signin({ email, password }) {
    const user = await UsersController.getByEmail(email);

    if (!user) {
      throw new Error("Bad Request");
    }

    const isValidPassword = bcrypt.compareSync(password, user.password);

    if (!isValidPassword) {
      throw new Error("Bad Request");
    }

    const token = jwt.sign({ id: user.id, email: user.email }, secret);

    return token;
  }
}

module.exports = AuthController;
