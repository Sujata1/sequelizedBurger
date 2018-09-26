var db = require("../models");

module.exports = function (app) {

  app.get("/", function (req, res) {
    db.Burger.findAll({ where: {}, include: [{ model: db.Customer }] }).then(function (dbBurger) {
      var burgerObject = {
        burgers: dbBurger
      };
      res.render("index", burgerObject);
    });
  });

  app.post("/:id", function (req, res) {
    var burger_id = req.params.id;
    var customerName = req.body.customerName;
    var resVar = res;
    db.Customer.findOne({ where: { customer_name: customerName } }).then(function (dbCustomer) {
      if (dbCustomer !== null) {
        var customerid = dbCustomer.id;
        burgerUpdate(customerid, burger_id, resVar);
      }
      else {
        db.Customer.create({
          customer_name: customerName
        }).then(function (dbCustomer) {
          var customerid = dbCustomer.id;
          burgerUpdate(customerid, burger_id, resVar);
        });
      };
    });
  });

  function burgerUpdate(customerid, burgerId, resVar) {
    db.Burger.update({
      devoured: true,
      CustomerId: customerid
    }, {
        where: {
          id: burgerId
        }
      })
      .then(function (result) {
        resVar.redirect("/");
      });
  };

  app.post("/api/burgers", function (req, res) {
    db.Burger.create({
      burger_name: req.body.burger_name
    }).then(function () {
      res.end();
    });
  });

  app.delete("/api/burgers", function (req, res) {
    db.Burger.destroy({
      where: {},
      truncate: true
    }).then(function (result) {
      res.end();
    });
  });

};
