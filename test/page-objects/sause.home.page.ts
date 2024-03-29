import Page from "./page";
import chai from "chai";
import reporter from "../helper/reporter";

class HomePage extends Page {
    constructor() {
      super();
    }

    /** Page objects */
    get usernameInputBox() {
      return $(`[data-test="username"]`);
    }
    get passwordInputBox() {
      return $(`[data-test="password"]`);
    }
    get loginButton() {
      return $(`[data-test="login-button"]`);
    }

    /** Page actions */
    async enterUsername(testid: string, username: string) {
      if(!username) {
        throw Error(`Given username ${username} is not valid`);
      }
      
      try {
        username = username.trim();
        await this.typeInto(await this.usernameInputBox, username);
        reporter.addStep(testid, "info", `Username: ${username} entered successfully`);
      } catch (err) {
        err.message = `Error entering username ${username}, ${err.message}`;
        throw err;
      }
    }
    
    async enterPassword(testid: string, password: string) {
      if(!password) {
        throw Error(`Given password is not valid`);
      }
      
      try {
        password = password.trim();
        await this.typeInto(await this.passwordInputBox, password);
        reporter.addStep(testid, "info", `Password entered successfully`);
      } catch (err) {
        err.message = `Error entering password, ${err.message}`;
        throw err;
      }
    }
    
    async clickLoginButton(testid: string) {
      try {
        await this.click(await this.loginButton);
        reporter.addStep(testid, "info", `Login successful`);
      } catch (err) {
        err.message = `Error when user click in login button, ${err.message}`;
        throw err;
      }
    }
    async loginToSauseApp(testid: string, username: string, password: string) {
      try {
        await this.enterUsername(testid, username);
        await this.enterPassword(testid, password);
        await this.clickLoginButton(testid);
      } catch (err) {
        err.message = `Login to app error: testid ${testid}, username ${username}, ${err.message}`;
        throw err;
      }
    }

}
export default new HomePage();
