import { Given } from "@cucumber/cucumber";
/* import { expect } from "chai";
import logger from "../../helper/logger";
import allure from "@wdio/allure-reporter"; */
import reporter from "../../helper/reporter";

Given(/^Login to inventory web app$/, async function() {
  //Get the testid:
  //console.log(`Given step Test ID: ${this.testid}`);
  //const log = `${this.testid}: Started to login...`;
  reporter.addStep(this.testid, "info", "Login started");
  /* logger.info(log);
  allure.addStep(log); */
  /** 1. Launch browser */
  // @ts-ignore
  await browser.url(browser.config.sauseDemoURL);
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
  //WORLD:
  this.appid = "ABC123";
  /* const finalLog = `${this.testid}: Login successful...`;
  logger.info(finalLog);
  allure.addStep(finalLog); */
  reporter.addStep(this.testid, "info", "Login successful");
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
    await browser.refresh();
    await browser.pause(1000);
    await $(`[data-test="username"]`).setValue("standard_user");
    await $(`[data-test="password"]`).setValue("secret_sauce");
    await browser.pause(1000);
    await $(`[data-test="login-button"]`).click();
  }
  
  await browser.pause(1000);
});