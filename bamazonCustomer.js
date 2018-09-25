var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon_db"
});


connection.connect(function (err) {
  if (err) throw err;



  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      console.log("id: " + res[i].item_id + " / product name: " + res[i].product_name + "price: " + res[i].price + " / " + "stock: " + res[i].stock_quantity);
    };
    question();
  });


})

function question() {
    inquirer
      .prompt([
        {
          name: "id",
          type: "input",
          message: "What is the product id you would like you to buy?"
        },
        {
          name: "quantity",
          type: "input",
          message: "How many unit of the product you would like to buy?"
        },

      ])
      .then(function (answer) {
        console.log("this is your product id: " + answer.id);
        console.log("this is your quantity: " + answer.quantity);

        connection.query("SELECT * from products WHERE item_id = ?", [answer.id], function (err, res) {
          if (err) throw err;
          // for (var i = 0; i < res.length; i++) {
          console.log("price: " + res[0].price);
          console.log("product name: " + res[0].product_name);
          console.log("item_id: " + res[0].item_id);

          let amount = res[0].stock_quantity
          console.log("quanity left:" + amount)
          if (answer.quantity <= amount) {
            console.log("we have enough products");
            let newAmount = amount - answer.quantity;
            console.log("new amount: " + newAmount);
            let totalcost = answer.quantity * res[0].price;
            console.log("totalcost is: " + totalcost);

            connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?",
              [newAmount, answer.id], function (err, res) {
                console.log("updated!");
              }
            )
          }
          else {
            console.log("insufficient quantity!");
          }

          // }
        }
        );
      });
  }