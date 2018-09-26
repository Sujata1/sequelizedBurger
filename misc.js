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
        console.log("customername in else:" + req.body.customername);
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