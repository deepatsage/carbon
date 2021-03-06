Feature: Experimental Select component
  I want to test Experimental Select component properties

  @positive
  Scenario: Disable filterable for Select component
    When I open default "Experimental Select" component in noIFrame with "select" json from "experimental" using "filterableFalse" object name
      And Type "aaa" text into input
    Then Select input has "" value

  @positive
  Scenario: Enable filterable for Select component
    When I open default "Experimental Select" component in noIFrame with "select" json from "experimental" using "filterable" object name
      And Type "aaa" text into input
    Then Select input has "aaa" value

  @positive
  Scenario: Disable typeAhead for Select component
    When I open default "Experimental Select" component in noIFrame with "select" json from "experimental" using "typeAheadFalse" object name
    Then Select typeAhead is disabled

  @positive
  Scenario: Enable typeAhead for Select component
    When I open default "Experimental Select" component in noIFrame with "select" json from "experimental" using "typeAhead" object name
    Then Select typeAhead is enabled

  @positive
  Scenario Outline: Set Select label to <label>
    When I open default "Experimental Select" component in noIFrame with "select" json from "experimental" using "<nameOfObject>" object name
    Then label on preview is <label> in NoIFrame
    Examples:
      | label                        | nameOfObject          |
      | mp150ú¿¡üßä                  | labelOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | labelSpecialCharacter |

  @positive
  Scenario: Disable Select
    When I open default "Experimental Select" component in noIFrame with "select" json from "experimental" using "disabled" object name
    Then Select is disabled

  @positive
  Scenario: Enable Select
    When I open default "Experimental Select" component in noIFrame with "select" json from "experimental" using "disabledFalse" object name
    Then Select is enabled

  @positive
  Scenario: Select is readOnly
    When I open default "Experimental Select" component in noIFrame with "select" json from "experimental" using "readOnly" object name
    Then Select is readOnly

  @positive
  Scenario: Select is not readOnly
    When I open default "Experimental Select" component in noIFrame with "select" json from "experimental" using "readOnlyFalse" object name
    Then Select is not readOnly

  @positive
  Scenario Outline: Change Select component placeholder to <placeholder>
    When I open default "Experimental Select" component in noIFrame with "select" json from "experimental" using "<nameOfObject>" object name
    Then Select placeholder on preview is set to <placeholder>
    Examples:
      | placeholder                  | nameOfObject                |
      | mp150ú¿¡üßä                  | placeholderOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | placeholderSpecialCharacter |

  @positive
  Scenario Outline: Change Select size to <size>
    When I open default "Experimental Select" component in noIFrame with "select" json from "experimental" using "<nameOfObject>" object name
    Then Select size on preview for default component is set to "<size>"
    Examples:
      | size   | nameOfObject |
      | small  | sizeSmall    |
      | medium | sizeMedium   |
      | large  | sizeLarge    |

  @positive
  Scenario: Select is transparent and has placeholder right aligned
    When I open default "Experimental Select" component in noIFrame with "select" json from "experimental" using "transparent" object name
    Then Select is transparent
      And Select placeholder align on preview is set to "right"

  @positive
  Scenario: Select is not transparent and has placeholder left aligned
    When I open default "Experimental Select" component in noIFrame with "select" json from "experimental" using "transparentFalse" object name
    Then Select is not transparent
      And Select placeholder align on preview is set to "start"

  @positive
  Scenario Outline: Verify the inner context of Select component typing <text> and getting <result>
    Given I open "Experimental Select" component page "default"
    When Type "<text>" text into input and select the value in iFrame
    Then Select input has "<result>" value in iFrame
    Examples:
      | text | result |
      | Amb  | Amber  |
      | Bla  | Black  |
      | Gre  | Green  |

  @positive
  Scenario: Check the change function call for Select component
    Given I open "Experimental Select" component page "default"
    Given clear all actions in Actions Tab
    When Type "Black" text into input and select the value in iFrame
    Then change action was called in Actions Tab