import { Given } from "@cucumber/cucumber";
import reporter from "../../helper/reporter";
import sauseHomePage from "../../page-objects/sause.home.page";

Given(/^Login to inventory web app$/, async function() {
  /** 1. Launch browser */
  try {
    reporter.addStep(this.testid, "info", "Login started");
    // @ts-ignore
    await sauseHomePage.navigateTo(browser.config.sauseDemoURL);
    await sauseHomePage.loginToSauseApp(this.testid, process.env.TEST_STANDARD_USERNAME, process.env.TEST_STANDARD_PASSWORD);
  } catch (err) {
    err.message = `${this.testid} Failed login step, ${err.message}`;
  }

  //WORLD USAGE:
  this.appid = "ABC123";
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