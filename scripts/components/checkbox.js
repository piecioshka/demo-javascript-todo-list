class Checkbox {
  /**
   * @type {HTMLElement|null}
   */
  $el = null;

  checked = false;
  handlers = {};

  constructor({ checked, handlers } = { checked: false, handlers: {} }) {
    this.checked = checked;
    this.handlers = handlers;
  }

  template() {
    return this.checked
      ? `<i class="checkbox checked">✓</i>`
      : `<i class="checkbox"></i>`;
  }

  _setupListeners() {
    this.$el?.addEventListener("click", () => {
      this.checked = !this.checked;
      this.handlers.onClick?.(this.checked);
      this.render();
    });
  }

  prepend($target) {
    // @ts-ignore
    this.$el = compileTemplate(this.template());
    $target?.prepend(this.$el);
    this._setupListeners();
  }

  /**
   * @param {HTMLElement} [$target]
   */
  render($target) {
    // @ts-ignore
    const $el = compileTemplate(this.template());

    if (this.$el == null) {
      $target?.appendChild($el);
    } else {
      this.$el?.replaceWith($el);
    }

    this.$el = $el;
    this._setupListeners();
  }
}
