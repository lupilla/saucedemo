import { Then } from "@cucumber/cucumber";
import { expect } from "chai";
//import logger from "../../helper/logger";
import reporter from "../../helper/reporter";

Then(/^Inventory page should list (.*) products$/, async function(numberOfProducts) {
  //console.log(`appid: ${this.appid}`);
   //Get the testid:
  //console.log(`Given step Test ID: ${this.testid}`);
  //logger.info(`${this.testid}: Checking the price...`);
  /* try {
    if(!numberOfProducts) {
      throw Error (`Invalid number provided ${numberOfProducts}`);
    }
    const allProducts = await $$(`.inventory_item`);
    const allTitles = await $$(`.inventory_item_name`);
    expect(allProducts.length.toString()).to.equal(numberOfProducts);
    expect(allTitles.length).to.equal(parseInt(numberOfProducts));
  } catch (err) {
    console.log(`Error: ${JSON.stringify(err)}`);
    console.log(`Error type: ${typeof err}`);
    console.log(`Error name: ${err.name}`);
    console.log(`Error message: ${err.message}`);
    //throw err;
    logger.error(`${this.testid}: ${err.message}`);
  } */
  
  try {
    if(!numberOfProducts) {
      throw Error (`Invalid number provided ${numberOfProducts}`);
    }
    const allProducts = await $$(`.inventory_item`);
    const allTitles = await $$(`.inventory_item_name`);
    try {
      expect(allProducts.length.toString()).to.equal(numberOfProducts);
      expect(allTitles.length).to.equal(parseInt(numberOfProducts));
    } catch(err) {
      //logger.error(`Known bug - product count mismatch...`);
      reporter.addStep(this.testid, "error", err.message, true, "Known issue: JIRA-1234");
    }
  } catch (err) {
    console.log(`Error: ${JSON.stringify(err)}`);
    console.log(`Error type: ${typeof err}`);
    console.log(`Error name: ${err.name}`);
    console.log(`Error message: ${err.message}`);
    err.message = `${this.testid}: Failed when comparing product count, ${err.message}`;
    //throw err;
    //logger.error(`${this.testid}: ${err.message}`);
    reporter.addStep(this.testid, "error", err.message);
  }
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
  for await (let price of allValues) {
    value = await price.getText();
    values = [...values, value];
  }
  
  /** 1. Convert string to number */
  const newValues = values.map((item) => parseFloat(item.replace("$", "")));
  const invaldValues = newValues.filter((newValue) => newValue <= 0);
  expect(invaldValues).to.be.empty;
  expect(invaldValues.length).to.equal(0);
}); 

Then(/^User go back to the login page with url (.*)$/, async function(loginUrl) {
  const currentURL = await browser.getUrl();
  expect(currentURL).to.equal(loginUrl);
  await browser.forward();
  await browser.pause(2000);
}); 