import { draggableItem, draggableItemByPosition } from '../../locators/draggable';
import { dragAndDrop } from '../helper';

Then('Draggable {string} is dragged to {int}', (record, destinationId) => {
  draggableItemByPosition(destinationId).should('contain', record);
});

When('I drag Draggable {string} to {int}', (record, destinationId) => {
  const startPosition = 0;
  dragAndDrop(draggableItem(record), destinationId, startPosition);
});
