Feature: Inventory feature

  @saucedemo
  @inventory
  Scenario Outline: Inventory feature
    Given Login to inventory web app
    Then Inventory page should list <NumberOfProducts> products
    Then Validate all products have valid price

    Examples:
      | TestID              | NumberOfProducts |
      | VALIDATEPRICE_TC001 | 6                |