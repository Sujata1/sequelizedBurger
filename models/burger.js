
module.exports = function (sequelize, DataTypes) {
  var Burger = sequelize.define("Burger", {
    burger_name: {
      type: DataTypes.STRING,
      notNull: true,
      validate: { len: [1, 140] },
    },
    devoured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
  // establish association
  Burger.associate = models => {
    Burger.belongsTo(models.Customer, {
      foreignKey: {
        allowNull: true
      }
    });
  };
  return Burger;
};