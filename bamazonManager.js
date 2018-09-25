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
  console.log("connected as id ");
  question();
});
function function1() {
  connection.query("SELECT product_name, stock_quantity,price, item_id FROM products", function (error, results) {
    if (error) throw error;
    for (var i = 0; i < results.length; i++) {
      console.log("item_id: " + results[i].item_id + "/product name: " + results[i].product_name + "/stock quantity: " + results[i].stock_quantity + "/price: $" + results[i].price);
    }

  });
};

function function2() {
  connection.query("SELECT stock_quantity, product_name FROM products", function (error, results) {
    for ( var i=0; i< results.length; i++){
      if(results[i].stock_quantity< 5){
        console.log(results[i].product_name);
      }
    };
      

  });
};
function function3(){
  connection.query("UPDATE products SET stock_quantity = 100 WHERE id <5;", function (error, results) {
    if (error) throw error;
    inquirer.prompt([
      {
        name: "question",
        type: "input",
        message: "Would you like to add more inventory???"
      }

    ]).then(function(res){
      console.log(res);
    })
      });
}
function question() {
  inquirer
    .prompt([
      {
        name: "sale",
        type: "list",
        choices: ["view product for sale", "view low inventory", "add to inventory", "add new product"],
        message: "manager choose the option!!"
      }
    ]).then(function (res) {
      console.log(res);
      console.log(res.sale);
      if (res.sale === "view product for sale") {
        function1();
      }
      else if (res.sale === "view low inventory") {
        function2();
      }
      else if (res.sale === "add to inventory") {
        function3();
      }
      else {
        function4();
      }
    })
  };


