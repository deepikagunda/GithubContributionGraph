var Orders = require("../model/Orders");

exports.showDashboard = function(req, res) {
  {
      
    Orders.aggregate(
      [
        {
          '$project': {
              createdOn: {'$dateToString': {format: '%Y-%m-%d', date: '$Date'}},
              price:1
       
          }
        },
        {
          $group: {
            _id: "$createdOn",
            totalprice: { $sum: "$price" }
          }
        }
      ],
      function(err, results) {
        if (err) {
          console.log(err);
        } else {
          //format results
          console.log(typeof results);
          console.log(results.size);

          var datesTable = {};
          var maxPrice = 0;
          for (var i = 0; i < results.length; i++) {
            var obj = results[i];
            //console.log(JSON.stringify(obj)+ "  "+i+" i ");
            if (maxPrice < parseFloat(obj.totalprice)) {
              //console.log("here"+maxPrice + " "+parseFloat(obj.totalprice)); 
              maxPrice = parseFloat(obj.totalprice);
               
            }
            try {
            datesTable[obj._id] = (parseFloat(obj.totalprice));
           // console.log( datesTable[obj._id]);
            }catch(err)
            {
              console.log(err);
            }

          }
          console.log("maxprice"+maxPrice+"maxprice");
          res.render("index", { result: datesTable, price: maxPrice });
        }
      }
    );
  }
};
