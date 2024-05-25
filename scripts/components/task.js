class Task {
  /**
   * @type {HTMLElement|null}
   */
  $el = null;

  id = 0;
  value = "";
  done = false;
  handlers = {};

  template() {
    return `<li class="task">
      <label>${this.value}</label>
    </li>`;
  }

  constructor(
    { id, value, done, handlers } = {
      id: 0,
      value: "",
      done: false,
      handlers: {},
    }
  ) {
    this.id = id;
    this.value = value;
    this.done = done;
    this.handlers = handlers;
  }

  /**
   * @param {HTMLElement} $target
   */
  render($target) {
    // @ts-ignore
    this.$el = compileTemplate(this.template());

    new Checkbox({
      checked: this.done,
      handlers: {
        onClick: () => {
          this.handlers.onResolve?.(this.id);
        },
      },
    }).prepend(this.$el?.querySelector("label"));

    new CloseButton({
      handlers: {
        onClick: () => {
          this.handlers.onRemove?.(this.id);
        },
      },
    }).render(this.$el);

    $target.appendChild(this.$el);
  }
}
