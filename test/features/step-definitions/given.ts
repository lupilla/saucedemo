import { Given } from "@cucumber/cucumber";
import { expect } from "chai";

Given(/^Login to inventory web app$/, async function() {
  /** 1. Launch browser */
  await browser.url("https://www.saucedemo.com");
  await browser.setTimeout({
    implicit: 15000,
    pageLoad: 10000
  });

  await browser.pause(1000);
  /** 2. Login to inventory */
  await $(`[data-test="username"]`).setValue("standard_user");
  await $(`[data-test="password"]`).setValue("secret_sauce");
  await browser.pause(1000);
  await $(`[data-test="login-button"]`).click();
  await browser.pause(1000);
});
