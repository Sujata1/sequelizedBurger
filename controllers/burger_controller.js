var db = require("../models");

module.exports = function (app) {

  app.get("/", function (req, res) {
    db.Burger.findAll({}).then(function (dbBurger) {
      var burgerObject = {
        burgers: dbBurger
      };
      res.render("index", burgerObject);
    });
  });

  app.put("/api/burgers/:id", function (req, res) {
    console.log("customername:" + req.body.customername);
    var customerName = req.body.customername;
    ////
    db.Customer.findOne({
      where: {
        customer_name: customerName
      }
    }).then(function (dbCustomer) {
      ////

      if (dbCustomer !== null) {
        var customerid = dbCustomer.id;

        db.Burger.update({
          devoured: true,
          CustomerId: customerid
        }, {
            where: {
              id: req.params.id
            }
          })
          .then(function (result) {
            console.log("result: " + result);
            if (result.changedRows === 0) {
              return res.status(404).end();
            }
            res.status(200).end();
          });
      } else {
        db.Customer.create({
          customer_name: customerName
        }).then(function (dbCustomer) {
          if (dbCustomer !== null) {
            var customerid = dbCustomer.id;

            db.Burger.update({
              devoured: true,
              CustomerId: customerid
            }, {
                where: {
                  id: req.params.id
                }
              })
              .then(function (result) {
                console.log("result: " + result);
                if (result.changedRows === 0) {
                  return res.status(404).end();
                }
                res.status(200).end();
              });
          }
        });
      }
    });
  });


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
