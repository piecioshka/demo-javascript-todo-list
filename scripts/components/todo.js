class Todo {
  /**
   * @type {HTMLElement|null}
   */
  $el = null;
  /**
   * @type {HTMLFormElement|null}
   */
  $form = null;
  /**
   * @type {HTMLInputElement|null}
   */
  $input = null;

  /**
   * @type {HTMLUListElement|null}
   */
  $list = null;

  tasks = [];
  label = "";

  template = () => {
    return `
      <div class="todo">
        <form class="add-task-form">
          <input class="add-task-input" type="text" placeholder="(${this.label}) What needs to be done?" required />
        </form>
        <ul class="tasks"></ul>
      </div>;
    `;
  };

  constructor({ label }) {
    this.label = label;
  }

  _setupListeners() {
    this.$form = this.$el.querySelector("form");
    this.$input = this.$el.querySelector("input");
    this.$list = this.$el.querySelector("ul");

    this.$form?.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const value = this.$input?.value.trim() ?? "";
      this.tasks.push({
        id: Math.round(Math.random() * 1000000 + Date.now()),
        value,
        done: false,
      });
      this.$form?.reset();
      this._renderTasks();
    });

    this._renderTasks();
  }

  _renderTasks() {
    while (this.$list.firstChild) {
      this.$list?.firstChild.remove();
    }

    this.tasks.forEach((task) => {
      new Task({
        id: task.id,
        value: task.value,
        done: task.done,
        handlers: {
          onRemove: (taskId) => {
            const index = this.tasks.findIndex((item) => item.id === taskId);
            if (index !== -1) {
              this.tasks.splice(index, 1);
            }
            this.update();
          },
          onResolve: (taskId) => {
            const index = this.tasks.findIndex((item) => item.id === taskId);
            if (index !== -1) {
              this.tasks[index].done = !this.tasks[index].done;
            }
            this.update();
          },
        },
      }).render(this.$list);
    });
  }

  /**
   * @param {HTMLElement} $target
   */
  render($target) {
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
