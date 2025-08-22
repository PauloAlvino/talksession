const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("talksession", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

try {
  sequelize.authenticate();
  console.log("Conectado com sucesso ao banco de dados");
} catch(err) {
  console.log(err);
}
module.exports = sequelize;
