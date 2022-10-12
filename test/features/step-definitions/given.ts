import { Given } from "@cucumber/cucumber";
import { expect } from "chai";

Given(/^Login to inventory web app$/, async function() {
  console.log(`Test username: ${process.env.TEST_STANDARD_USERNAME}`);
  console.log(`Test password: ${process.env.TEST_STANDARD_PASSWORD}`);
  /** 1. Launch browser */
  await browser.url("https://www.saucedemo.com");
  await browser.setTimeout({
    implicit: 15000,
    pageLoad: 10000
  });

  await browser.pause(1000);
  /** 2. Login to inventory */
  await $(`[data-test="username"]`).setValue(process.env.TEST_STANDARD_USERNAME);
  await $(`[data-test="password"]`).setValue(process.env.TEST_STANDARD_PASSWORD);
  await browser.pause(1000);
  await $(`[data-test="login-button"]`).click();
  await browser.pause(1000);
});

/** RELOAD EXAMPLE */
Given(/^try to login with several users$/, async function() {
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
  
  /** 3. Login with another usery */
  await browser.reloadSession();
  await browser.url("https://www.saucedemo.com");
  await browser.pause(1000);
  await $(`[data-test="username"]`).setValue("problem_user");
  await $(`[data-test="password"]`).setValue("secret_sauce");
  await browser.pause(1000);
  await $(`[data-test="login-button"]`).click();
  await browser.pause(1000);
  
  await browser.reloadSession();
  await browser.url("https://www.saucedemo.com");
  await browser.pause(1000);
  
  /** 4. Forcing an error */
  try {
    await $(`[data-test="username"]`).setValue("standard_user");
    await $(`[data-test="password"]`).setValue("secret_sauce");
    await browser.pause(1000);
    await $(`[data-test="login-button"]`).click();
  } catch(error) {
    console.log(`Error in login: ${error}`);
    await browser.refresh();
    await browser.pause(1000);
    await $(`[data-test="username"]`).setValue("standard_user");
    await $(`[data-test="password"]`).setValue("secret_sauce");
    await browser.pause(1000);
    await $(`[data-test="login-button"]`).click();
  }
  
  await browser.pause(1000);
});