INSERT INTO users(pk_userName, pwHash, email, isAdmin, name, surname, billingAddress, deliveryAddress, nameOnCC, creditCardNr, validYear, validMonth, ccv)
VALUES('paul.meier','jGl25bVBBBW96Qi9Te4V37Fnqchz/Eu4qB9vKrRIqRg=','paul.meier@gmx.at',FALSE,'Paul','Meier','Sackgasse 25/1 1010 Wien','Sackgasse 20 1010 Wien','Paul Arthur Meier','204038810305038',2020,06,421);

INSERT INTO users(pk_userName, pwHash, email, isAdmin, name, surname)
VALUES('admin','jGl25bVBBBW96Qi9Te4V37Fnqchz/Eu4qB9vKrRIqRg=','admin@lovefoods.at',TRUE,'Admin','Istrator');

INSERT INTO users(pk_userName, pwHash, email, isAdmin, name, surname, companyName, billingAddress, deliveryAddress, vat)
VALUES('hubers.restaurant','jGl25bVBBBW96Qi9Te4V37Fnqchz/Eu4qB9vKrRIqRg=','office@hubers.at',FALSE,'Thomas','Huber', 'Hubers GmbH', 'Einbahnstrasse 6 1210 Wien','Einbahnstrasse 6 1210 Wien', '4939DJD93');



INSERT INTO orders(orderDate, paymentState, paymentmethod, price, fk_userName)
VALUES(DATE '2017-12-17','open','bill',1.4,'hubers.restaurant'),(DATE '2018-01-01','payed','cc',3.19,'paul.meier');



INSERT INTO productGroups(description, name, iconClass)
VALUES('Here are Fruits and Vegetables from all over the World.','Fruits/Vegetables','fa fa-lemon-o'),('All products, which need to be stored between 4 and 8°C','Cooling','fa fa-thermometer'),('All products, which need to be stored under 0°C','Freezing','fa fa-snowflake-o'),('Here are Alcoholic as well as non-Alcoholic Drinks','Drinks','fa fa-tint'),('Everything, which is not fitting in the other categories','Other','fa fa-cutlery');



INSERT INTO products(name, description, soldPer, price, amountAvailable, vatRate, imageName, fk_groupID)
VALUES('Apple', 'Apples "Pink Lady". Great sweet taste. Country of origin: Austria.', 'piece', 0.5, 5, 20, 'apple.jpg', 1),('Banana', 'SanLucar Bananas. SanLucar gourmet bananas are harvested in Ecuador all around the year.', 'piece', 0.4, 10, 20, 'banana.jpg', 1),('Cheese', 'Schaerdinger Bergbaron. Semi-hard sliced cheese. 45% fat, made from pasteurized milk.', '150 grams pack', 2.29, 3, 20, 'cheese.jpg', 2),('Cherries', 'Delicious sweet Ja! Natuerlich Cherries. Also great for juice, jam or compote. Country of origin: Italy.', '500 grams', 3.49, 15, 20, 'cherries.jpg', 1),('Frozen_Dill', '50 grams of frozen Dill from Iglo. Great alternative for winter months.', 'piece', 1.29, 7, 20, 'frozen_dill.jpg', 3),('Frozen_French_Fries', '11er Pommes Frites. Frozen 11 minutes french fries. French fries for the oven, prebaked in pure vegetable oil.', '600 grams pack', 2.59, 12, 20, 'frozen_french_fries.jpg', 3),('Frozen_Pizza', 'Frozen Pizza Ristaurante "Pizza Vegetale" from Dr.Oetker. Pizza rich with tomatoes, fresh vegetables and herbs. Suitable for vegans.', '385 grams piece', 3.19, 6, 20, 'frozen_pizza.jpg', 3),('Milchschnitten', 'Ferrero Kinder Milchschnitte. Cool milk cream between two loose cuts. Fresh from the fridge, Milchschnitte is a very delicious snack for a little break in everyday life.', '5 pieces', 1.39, 30, 20, 'milchschnitten.jpg', 2),('Milk', 'NOEM Whole Milk - Longer Fresh.  3.5% fat, pasteurized and filtered.', '1 liter', 1.19, 23, 20, 'milk.jpg', 2),('Raspberries', 'Very delicious Ja! Natuerlich Bio Raspberries. Also great for juice, jam or compote. Country of origin: Austria.', '250 grams', 3.99, 4, 20, 'raspberries.jpg', 1);



INSERT INTO products_products(fk_pk_product1, fk_pk_product2)
VALUES(1,2),(8,9);



INSERT INTO orderItems(pk_fk_itemID, price, amount, fk_pk_orderID, fk_productID)
VALUES(1, 1.0, 2, 1, 1),(2, 0.4, 1, 1, 2),(1,3.19,1,2,7);



INSERT INTO shoppingCartItems(amount, price, fk_pk_userName, fk_pk_productID)
VALUES(1, 1.39, 'hubers.restaurant', 8),(2, 6.38, 'hubers.restaurant', 7),(1, 0.4, 'paul.meier', 2);