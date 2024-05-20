class Task {
  id = Math.round(Math.random() * 1000000 + Date.now());

  /**
   * @param {string} value
   * @param {Object} callbacks
   */
  constructor(value, callbacks) {
    this.callbacks = callbacks;
    this.$el = this._createListElement(value);
    this._renderRemoveButton(this.$el);
  }

  /**
   * @param {HTMLElement} $element
   */
  _renderRemoveButton($element) {
    const $button = this._createRemoveButton();
    $button.addEventListener("click", () => {
      // Remove from UI
      if ($element.parentElement) {
        $element.parentElement.removeChild($element);
      }
      // Remove from memory
      if (this.callbacks.onRemove) {
        this.callbacks.onRemove(this.id);
      }
    });
    $element.insertBefore($button, $element.firstChild);
  }

  /**
   * @param {string} value
   * @returns {HTMLLIElement}
   */
  _createListElement(value) {
    const $item = document.createElement("li");
    $item.textContent = value;
    return $item;
  }

  /**
   * @returns {HTMLButtonElement}
   */
  _createRemoveButton() {
    const $button = document.createElement("button");
    $button.textContent = "x";
    $button.classList.add("remove-button");
    return $button;
  }
}
