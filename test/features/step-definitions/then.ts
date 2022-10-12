import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "chai";

Given(/^Login to inventory web app$/, async function() {
  await browser.url("/");
  await browser.pause(1000);
  
});

Then(/^Inventory page should list 6 products$/, async function() {

});

Then(/^Validate all products have valid prive (price > 0)$/, async function() {

});