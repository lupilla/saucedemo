Feature: Inventory feature

  @saucedemo
  @navigation
  Scenario Outline: Inventory feature
    Given try to login with several users
    When User click on back button in browser
    Then User go back to the login page with url <loginUrl>

    Examples:
      | TestID              | loginUrl                   |
      | INVENTORY_TC002     | https://www.saucedemo.com/ |