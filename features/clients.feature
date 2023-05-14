Feature: Client management

  Scenario: Add a new client
    Given I have a new client with name "John Doe", email "john@example.com" and phone "555-1234"
    When I add the new client
    Then I should see the new client in the list of clients

  Scenario: Delete a client
    Given I have a list of clients
    When I delete a client with ID "1"
    Then I should no longer see the client with ID "1" in the list of clients
