import { When } from "@cucumber/cucumber";
import { expect } from "chai";

When(/^User click on back button in browser$/, async function() {
  await browser.back();
  await browser.pause(2000);
}); 