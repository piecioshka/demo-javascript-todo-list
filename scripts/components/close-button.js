class CloseButton {
  /**
   * @type {HTMLElement|null}
   */
  $el = null;

  handlers = {};

  template() {
    return `<button class="remove-button">x</button>`;
  }

  constructor({ handlers } = { handlers: {} }) {
    this.handlers = handlers;
  }

  _setupListeners() {
    this.$el?.addEventListener("click", () => {
      this.handlers.onClick?.();
    });
  }

  /**
   * @param {HTMLElement} $target
   */
  render($target) {
    // @ts-ignore
    this.$el = compileTemplate(this.template());
    $target.appendChild(this.$el);
    this._setupListeners();
  }
}
