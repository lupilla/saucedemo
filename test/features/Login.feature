Feature: Login feature

  @login
  Scenario Outline: Login feature
    Given a <typeOfUser> user I login to inventory web app
      | UserType        | Username                |
      | standardUser    | standard_user           |
      | problemUser     | problem_user            |
      | performanceUser | performance_glitch_user |
    Then Inventory page should list <NumberOfProducts> products
    Then Validate all products have valid price

    Examples:
      | TestID              | NumberOfProducts |
      | INVENTORY_TC001     | 6                |