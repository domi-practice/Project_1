Feature: Client meeting management

  Scenario: Schedule a new meeting
    Given I have a client with ID "1"
    And I have a new meeting with date "2023-05-01", time "14:00", location "Office", and description "Project discussion"
    When I schedule the new meeting for the client with ID "1"
    Then I should see the new meeting in the list of meetings

  Scenario: Delete a meeting
    Given I have a list of meetings
    When I delete a meeting with ID "1"
    Then I should no longer see the meeting with ID "1" in the list of meetings
