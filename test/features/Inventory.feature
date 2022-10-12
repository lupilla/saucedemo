Feature: Inventory feature

  @saucedemo
  @inventory
  Scenario Outline: <TestID>: Inventory feature
    Given Login to inventory web app
    Then Inventory page should list <NumberOfProducts> products
    Then Validate all products have valid price

    Examples:
      | TestID              | NumberOfProducts |
      | INVENTORY_TC001     | 6                |