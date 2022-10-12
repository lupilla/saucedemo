import { config as baseConfig } from '../wdio.conf';
const testConfig = {
  environment: "TEST",
  sauseDemoURL: "https://www.saucedemo.com"
}
export const config = {...baseConfig, ...testConfig};