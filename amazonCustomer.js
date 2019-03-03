// Required Variables
var Table = require('cli-table'); //for neat console table
var mysql = require('mysql'); //to connect to db
var inquirer = require('inquirer'); //for prompts

// Connect to MYSQL Database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "figwin",
    database: "bamazon"
});
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    startPrompt();
});

// Inquirer Prompt Begins 
function startPrompt() {
    inquirer.prompt([{
        type: "confirm",
        name: "confirm",
        message: "Welcome to Bamazon! Would you like to view our inventory?",
        default: true
    }]).then(function(user) {
            if (user.confirm === true) {
                inventory();
            } else {
                console.log("Thank you! Come back soon!");
                endConnection();
            }
    });
}

// if user confirms...

// Console-Inventory View
function inventory() {
    // table for pretty viewing of inventory
    var table = new Table({
        head: ['ID', 'Item', 'Department', 'Price', 'Stock'],
        colWidths: [10, 30, 30, 30, 30]
    });
    
    //runs below function to list inventory in table
    listInventory();

    function listInventory() {
        connection.query("SELECT * FROM products", function(err, res) { //gets all the db info
            for (var i = 0; i < res.length; i++) {//loops through it, indexing each item and saving them as indexed variables

                var itemId = res[i].item_id,
                    productName = res[i].product_name,
                    departmentName = res[i].department_name,
                    price = res[i].price,
                    stockQuantity = res[i].stock_quantity;

              table.push(//pushes indexed variables to table to be console logged below
                  [itemId, productName, departmentName, price, stockQuantity]
            );
          }
            console.log("");
            console.log("================================================== Bamazon Inventory ======================================================");
            console.log("");
            console.log(table.toString());
            console.log("");
            continuePrompt();
        });
    }
}

// Inquirer Prompt Continues after table has been displayed

function continuePrompt() {

    inquirer.prompt([{

        type: "confirm",
        name: "continue",
        message: "Would you like to purchase an item?",
        default: true

    }]).then(function(user) {
        if (user.continue === true) {
            selectionPrompt();
        } else {
            console.log("Thank you! Come back soon!");
            endConnection();
        }
    });
}

// Inquirer Prompt Continues after purchase wish is confirmed

function selectionPrompt() {

    inquirer.prompt([{

            type: "input",
            name: "inputId",
            message: "Please enter the ID number of the item you would like to purchase.",
        },
        {
            type: "input",
            name: "inputNumber",
            message: "How many units of this item would you like to purchase?",

        }
    ]).then(function(userPurchase) {

        //connect to database to find item-id in database. If id input doesn't exist , restart item selection prompt
        if(userPurchase.inputId>11){
            console.log("Sorry, that item does not exist, please try again");
            return selectionPrompt();
        }
        //connect to database to find stock_quantity in database. If user quantity input is greater than stock, decline purchase.
        connection.query("SELECT * FROM products WHERE item_id=?", userPurchase.inputId, function(err, res) {
            for (var i = 0; i < res.length; i++) {

                if (userPurchase.inputNumber > res[i].stock_quantity) {

                    console.log("===================================================");
                    console.log("Sorry! Not enough in stock. Please try again later.");
                    console.log("===================================================");
                    return selectionPrompt();

                } else {
                    //list item information for user for confirm prompt
                    console.log("===================================");
                    console.log("Awesome! We can fulfull your order.");
                    console.log("===================================");
                    console.log("You've selected:");
                    console.log("----------------");
                    console.log("Item: " + res[i].product_name);
                    console.log("Department: " + res[i].department_name);
                    console.log("Price: " + res[i].price);
                    console.log("Quantity: " + userPurchase.inputNumber);
                    console.log("----------------");
                    console.log("Total: " + res[i].price * userPurchase.inputNumber);
                    console.log("===================================");

                    //creating variables for updating the database, to be used if purchase is confirmed
                    var newStock = (res[i].stock_quantity - userPurchase.inputNumber);
                    var purchaseId = (userPurchase.inputId);
                    confirmPrompt(newStock, purchaseId);
                }
            }
        });
    });
}

// Confirm Purchase

function confirmPrompt(newStock, purchaseId) {

    inquirer.prompt([{

        type: "confirm",
        name: "confirmPurchase",
        message: "Are you sure you would like to purchase this item and quantity?",
        default: true

    }]).then(function(userConfirm) {
        if (userConfirm.confirmPurchase === true) {

            //if user confirms purchase, update mysql database with new stock quantity by subtracting user quantity purchased (variables created on line 145/6)

            connection.query("UPDATE products SET ? WHERE ?", [{
                stock_quantity: newStock
            }, {
                item_id: purchaseId
            }], function(err, res) {});

            console.log("=================================");
            console.log("Transaction completed. Thank you.");
            console.log("=================================");
            startPrompt();
        } else {
            console.log("=================================");
            console.log("No worries. Maybe next time!");
            console.log("=================================");
            startPrompt();
        }
    });
}
function endConnection() {
    connection.end();
  }