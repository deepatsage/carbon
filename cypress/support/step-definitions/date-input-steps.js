import {
  dateInput, dayPickerDay, minDate, maxDate,
  dayPickerWrapper, dateIcon, dateInputNoIFrame,
} from '../../locators/date-input/index';

const DAY_PICKER_PREFIX = 'DayPicker-Day--';
const TODAY_CALENDAR = Cypress.moment().format('ddd MMM D, YYYY');
const YESTERDAY_CALENDAR = Cypress.moment().subtract(1, 'days').format('ddd MMM D, YYYY');
const TOMORROW_CALENDAR = Cypress.moment().add(1, 'days').format('ddd MMM D, YYYY');
const TODAY_KNOBS = Cypress.moment().format('YYYY-MM-DD');
const TODAY_DATE_INPUT = Cypress.moment().format('DD/MM/YYYY');

Then('Date input is disabled', () => {
  dateInputNoIFrame().should('have.attr', 'disabled');
});

Then('Date input is enabled', () => {
  dateInputNoIFrame().should('not.have.attr', 'disabled');
});

Then('Date input component is readOnly', () => {
  dateInputNoIFrame().should('have.attr', 'readonly');
});

Then('Date input component is not readOnly', () => {
  dateInputNoIFrame().should('not.have.attr', 'readonly');
});

When('I set dateInput to today', () => {
  dateInput().clear().type(TODAY_DATE_INPUT);
});

When('I set minDate to today', () => {
  minDate().clear().type(TODAY_KNOBS);
});

When('I set maxDate to today', () => {
  maxDate().clear().type(TODAY_KNOBS);
});

Then('the date before minDate is not available', () => {
  dayPickerDay(YESTERDAY_CALENDAR).should('have.attr', 'aria-disabled')
    .and('contains', 'true');
  dayPickerDay(YESTERDAY_CALENDAR).should('have.attr', 'aria-selected')
    .and('contains', 'false');
});

Then('the date after maxDate is not available', () => {
  dayPickerDay(TOMORROW_CALENDAR).should('have.attr', 'aria-disabled')
    .and('contains', 'true');
  dayPickerDay(TOMORROW_CALENDAR).should('have.attr', 'aria-selected')
    .and('contains', 'false');
});

When('I click dateInput', () => {
  dateInput().click();
});

When('I choose date yesterday via DayPicker', () => {
  dayPickerDay(YESTERDAY_CALENDAR).click();
});

When('I choose date tomorrow via DayPicker', () => {
  dayPickerDay(TOMORROW_CALENDAR).click();
});

Then('the date is set to today', () => {
  dayPickerDay(TODAY_CALENDAR).should('have.attr', 'aria-label')
    .and('contains', TODAY_CALENDAR);
  dayPickerDay(TODAY_CALENDAR).should('have.attr', 'class')
    .and('contains', `${DAY_PICKER_PREFIX}today`);
  dayPickerDay(TODAY_CALENDAR).should('have.attr', 'class')
    .and('contains', `${DAY_PICKER_PREFIX}selected`);
});

Then('dayPickerDay is visible', () => {
  dayPickerWrapper().should('be.visible');
});

Then('dayPickerDay is not visible', () => {
  dayPickerWrapper().should('not.exist');
});

When('I click onto date icon', () => {
  dateIcon().click({ force: true });
});

When('I click onto date icon twice', () => {
  dateIcon().click().then(($el) => {
    $el.click();
  });
});

When('I click dateInput twice', () => {
  dateInput().click().then(($el) => {
    $el.click();
  });
});
