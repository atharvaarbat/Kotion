

export function getCursorPosition() {
    let cursorPosition = { x: 0, y: 0 };
    if (window.getSelection) {
      const selection = window.getSelection();
  
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0).cloneRange();
        range.collapse(true);
  
        const rect = range.getBoundingClientRect();
  
        cursorPosition = {
          x: rect.left + window.pageXOffset,
          y: rect.top + window.pageYOffset
        };
      }
    }
  
    console.log("Cursor Position:", cursorPosition);
    return cursorPosition;
  }