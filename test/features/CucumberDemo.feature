@smoke
Feature: Cucumber Demo
  I can have more info about the feature...
  I can have more info about the feature...
  I can have more info about the feature...
  I can have more info about the feature...
  - Questions/clarifications
  - Known issues
  - Todo
  
  Background: Launch google page
    Given Google page is opened
  
  Scenario:  Scenario name
    When Searh with WDIO
    Then Click on the first search result
    Then URL should match https://webdriver.io/
    
  Scenario:  Scenario name
      When Searh with WDIO
      Then Click on the first search
      Then URL should match