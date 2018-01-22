DROP TABLE IF EXISTS shoppingCartItems;
DROP TABLE IF EXISTS orderitems;
DROP TABLE IF EXISTS products_products;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS productgroups;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS users;


CREATE TABLE users (
    pk_userName VARCHAR(500) NOT NULL UNIQUE,
    pwHash CHAR(44) NOT NULL,
    email VARCHAR(120) NOT NULL,
    isAdmin BOOLEAN,
    name VARCHAR(120),
    surname VARCHAR(120),
    companyName VARCHAR(120),
    billingAddress VARCHAR(500),
    deliveryAddress VARCHAR(500),
    vat VARCHAR(120),
    nameOnCC VARCHAR(120),
    creditCardNr VARCHAR(200),
    validYear INT,
    validMonth INT,
    ccv INT,
    PRIMARY KEY(pk_userName)
);

CREATE TABLE orders (
    pk_orderID SERIAL PRIMARY KEY,
    orderDate DATE NOT NULL,
    deliveryDate DATE,
    paymentState VARCHAR(120) NOT NULL,
    paymentMethod VARCHAR(120),
    price DECIMAL NOT NULL,
    fk_userName VARCHAR(500) REFERENCES users(pk_userName) ON DELETE CASCADE
);

CREATE TABLE productGroups (
    pk_groupID SERIAL PRIMARY KEY,
    description TEXT,
    name VARCHAR(120) NOT NULL,
    iconClass VARCHAR(500)
);

CREATE TABLE products (
    pk_productID SERIAL PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    description TEXT,
    soldPer VARCHAR(500) NOT NULL,
    price DECIMAL NOT NULL,
    amountAvailable INT NOT NULL,
    vatRate INT NOT NULL,
    imageName VARCHAR(500),
    fk_groupID INT REFERENCES productGroups(pk_groupID)
);

CREATE TABLE products_products(
    fk_pk_product1 INT REFERENCES products(pk_productID) ON DELETE CASCADE,
    fk_pk_product2 INT REFERENCES products(pk_productID) ON DELETE CASCADE,
    PRIMARY KEY(fk_pk_product1, fk_pk_product2)
);

CREATE TABLE orderItems(
    pk_fk_itemID INT NOT NULL,
    price DECIMAL NOT NULL,
    amount INT NOT NULL,
    fk_pk_orderID INT REFERENCES orders(pk_orderID) ON DELETE CASCADE,
    fk_productID INT REFERENCES products(pk_productID) ON DELETE RESTRICT,
    PRIMARY KEY(fk_pk_orderID, pk_fk_itemID)
);

CREATE TABLE shoppingCartItems(
    pk_cartID SERIAL PRIMARY KEY,
    amount INT NOT NULL,
    price DECIMAL NOT NULL,
    fk_pk_userName VARCHAR(500) REFERENCES users(pk_userName) ON DELETE CASCADE,
    fk_pk_productID INT REFERENCES products(pk_productID) ON DELETE RESTRICT
);
