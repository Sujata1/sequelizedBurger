
module.exports = function (sequelize, DataTypes) {
  var Customer = sequelize.define("Customer", {
    customer_name: {
      type: DataTypes.STRING,
      notNull: true,
      validate: { len: [1, 140] },
    },

  });
  // establish association
  Customer.associate = models => {
    Customer.hasMany(models.Burger, {
      onDelete: "cascade"
    });
  };
  return Customer;
};