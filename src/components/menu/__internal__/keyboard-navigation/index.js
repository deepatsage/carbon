import Events from "../../../../utils/helpers/events";
import MenuItem from "../../menu-item";

function characterNavigation(event, focusableItems, currentFocusedIndex) {
  event.stopPropagation();
  let newIndex;
  let firstMatch;
  let nextMatch;
  const selectedKey = event.key.toLowerCase();
  const getMenuText = (element) => {
    if (element.submenu) {
      return element.submenu;
    }

    return element.children;
  };

  focusableItems.forEach((child, i) => {
    if (
      child.type === MenuItem &&
      getMenuText(child.props).toLowerCase().startsWith(selectedKey)
    ) {
      if (firstMatch === undefined) {
        firstMatch = i;
      }
      if (i > currentFocusedIndex && !nextMatch) {
        nextMatch = i;
      }
    }
  });

  if (nextMatch !== undefined) {
    newIndex = nextMatch;
  } else if (firstMatch !== undefined) {
    newIndex = firstMatch;
  }

  return newIndex;
}

function menuKeyboardNavigation(event, focusableItems, currentFocusedIndex) {
  let newIndex = currentFocusedIndex;

  if (Events.isRightKey(event)) {
    event.preventDefault();
    if (currentFocusedIndex === focusableItems.length - 1) {
      newIndex = 0;
    } else {
      newIndex = currentFocusedIndex + 1;
    }
  }

  if (Events.isLeftKey(event)) {
    event.preventDefault();
    if (currentFocusedIndex === 0) {
      newIndex = focusableItems.length - 1;
    } else {
      newIndex = currentFocusedIndex - 1;
    }
  }

  if (Events.isHomeKey(event)) {
    event.preventDefault();
    newIndex = 0;
  }

  if (Events.isEndKey(event)) {
    event.preventDefault();
    newIndex = focusableItems.length - 1;
  }

  if (Events.isAlphabetKey(event)) {
    newIndex = characterNavigation(event, focusableItems, currentFocusedIndex);
  }

  if (Events.isTabKey(event)) {
    newIndex = undefined;
  }

  return newIndex;
}

export { characterNavigation, menuKeyboardNavigation };
