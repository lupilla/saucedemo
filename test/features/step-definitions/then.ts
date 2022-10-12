import { Then } from "@cucumber/cucumber";
import { expect } from "chai";

Then(/^Inventory page should list (.*) products$/, async function(numberOfProducts) {
  console.log(`numberOfProducts: ${numberOfProducts}`);
  if(!numberOfProducts) {
    throw Error (`Invalid number provided ${numberOfProducts}`);
  }
  const allProducts = await $$(`.inventory_item`);
  const allTitles = await $$(`.inventory_item_name`);
  expect(allProducts.length.toString()).to.equal(numberOfProducts);
  expect(allTitles.length).to.equal(parseInt(numberOfProducts));
});

/**
  Steps:
  1. Get price list
  2. Convert string to number
  3. assert if any value is 0
 */
Then(/^Validate all products have valid price$/, async function() {
  /** 1. Get price list */
  const allValues = await $$(`.inventory_item_price`);
  let value = '';
  let values = [];
  console.log(`all values: ${allValues}`);
  for await (let price of allValues) {
    value = await price.getText();
    values = [...values, value];
  }
  console.log(values);
  
  /** 1. Convert string to number */
  const newValues = values.map((item) => parseFloat(item.replace("$", "")));
  console.log(newValues);
  const invaldValues = newValues.filter((newValue) => newValue <= 0);
  expect(invaldValues).to.be.empty;
  expect(invaldValues.length).to.equal(0);
}); 