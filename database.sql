DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

DROP TABLE IF EXISTS products;

CREATE TABLE IF NOT EXISTS products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,4) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (flavor, price, quantity)
VALUES 
("game", "gaming", 60.00, 100),
("bench", "furniture", 20.50, 200),
("bbq", "cooking", 80.99, 50),
("bed", "furniture", 399.99, 10),
("chair", "furniture", 45.50, 30),
("forks", "cooking", 10.00, 500),
("joystick", "gaming", 30.00, 800),
("spoons", "cooking", 10.00, 600),
("tent", "outdoors", 260.50, 40),
("lantern", "outdoors", 40.00, 250),
("canteen", "outdoors", 21.99, 300);

-- SELECT * FROM products;
