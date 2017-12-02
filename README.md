# Node Shopping Cart
A basic shopping cart implementation as command-line application using NodeJS. This application executes multiple shopping carts and prints the total amount for each cart based on the given JSON file which contains details:
- Inventory: List of unique items available in the shop
- Rules: List of unique discount rules applicable on any possible item
- Carts: List of multiple carts which will be checked out

This application has been built upon the requirements detailed in the following gist: [DiUS Shopping Coding Exercise](https://gist.github.com/codingricky/2913880).

## Using the application

To run the application use the following command:

```
node index.js data_set/test.json
```

Based on the given test.json, you can write your own data set to execute on this application.

To run the test cases use the following command:

```
npm run test
```

## Implemenation Details

For the implementation I have used a TDD style of development, where I have written unit test cases for each feature I have implemented.

#### Design Approach

The application contains 3 main entities/objects:
- **Inventory:** The inventory object contains a map of key value pairs, where the key is the sku of a given item and value is the item object derived from the data set input. The inventory maintains the list of unique items only.
- **Rules:** The rules objects contains a map of key value pairs, where the key is the sku of the item on which a specific discount rule needs to applied and the value is the object with an applyRule function for the specific discount rule. Here I have tried to apply a **Strategy Type Design Pattern** to make sure checkout is unaware of the rule specifics. Same rule can be applied to multiple items, but multiple rules cannot be applied to same item. There are 3 types of rules that has been defined:
  - **Bulk Order Rule:** If quantity of the defined item in cart is more than minimum quantity in the rule then discounted price is applicable.
  - **Free Item Rule:** If an item is to be given for free with another item and if both items are in cart, then total amount of free item will be 0 if quantity <= another item, otherwise total amount of free item will be (free item quantity - item quantity) * (free item price).
  - **Three for Two Rule:** If quanitiy of the defined item in cart is 3, then total amount applicable for that item will be that of 2 only.
- **Checkout:** The checkout object takes the rules and inventory objects as arguments and scans the items in cart and maintains an internal cart where total amount of each item is calculated and discount rules applied. When total amount is asked it prints the total amount and flushes the internal cart.

#### Environment Details

- For the development of this application, I have used Javascript with ES5 conventions using the NodeJS environment.
- For writing and executing test cases for the developed code, I have used mocha, chai and sinon. I have used mocha for setting and executing test cases, chai for expect rules and sinon for sniffing console logs.
