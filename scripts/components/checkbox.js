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
      this.update();
    });
  }

  prepend($target) {
    // @ts-ignore
    this.$el = compileTemplate(this.template());
    $target?.prepend(this.$el);
    this._setupListeners();
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

  update() {
    const new$el = compileTemplate(this.template());
    this.$el?.replaceWith(new$el);
    this.$el = new$el;
    this._setupListeners();
  }
}
