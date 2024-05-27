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

  allTasks = [];
  activeTasks = [];
  completedTasks = [];
  label = "";
  mode = "active"; // all | active | completed

  template = () => {
    return `
      <div class="todo">
        <form class="add-task-form">
          <input class="add-task-input" type="text" placeholder="(${this.label}) What needs to be done?" required autofocus />
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
      this.allTasks.push({
        id: Math.round(Math.random() * 1000000 + Date.now()),
        value,
        done: false,
      });
      this._updateRelativeTasks();
      this.$form?.reset();
      this._renderTasks();
      this._notifyUpdateTasks();
    });

    this._renderTasks();
  }

  _updateRelativeTasks() {
    this.activeTasks = this.allTasks.filter((t) => !t.done);
    this.completedTasks = this.allTasks.filter((t) => t.done);
  }

  _buildRenderedTasks() {
    switch (this.mode) {
      case "active":
        return this.activeTasks;
      case "completed":
        return this.completedTasks;
      case "all":
      default:
        return this.allTasks;
    }
  }

  _removeTask(taskId) {
    const index = this.allTasks.findIndex((task) => task.id === taskId);
    if (index !== -1) {
      this.allTasks.splice(index, 1);
    }
    this._updateRelativeTasks();
  }

  _removeCompletedTasks() {
    this.allTasks = this.allTasks.filter((task) => !task.done);
    this._updateRelativeTasks();
  }

  _resolveTask(taskId) {
    const index = this.allTasks.findIndex((task) => task.id === taskId);
    if (index !== -1) {
      this.allTasks[index].done = !this.allTasks[index].done;
    }
    this._updateRelativeTasks();
  }

  _renderTasks() {
    while (this.$list.firstChild) {
      this.$list?.firstChild.remove();
    }

    const tasks = this._buildRenderedTasks();

    tasks.forEach((task) => {
      new Task({
        id: task.id,
        value: task.value,
        done: task.done,
        handlers: {
          onRemove: (taskId) => {
            this._removeTask(taskId);
            this._renderTasks();
            this._notifyUpdateTasks();
          },
          onResolve: (taskId) => {
            this._resolveTask(taskId);
            this._renderTasks();
            this._notifyUpdateTasks();
          },
        },
      }).render(this.$list);
    });
  }

  _notifyUpdateTasks() {
    this.$el?.dispatchEvent(
      new CustomEvent("todo-update-tasks", {
        detail: {
          allTasks: this.allTasks,
          activeTasks: this.activeTasks,
          completedTasks: this.completedTasks,
        },
      })
    );
  }

  /**
   * @param {HTMLElement} $target
   */
  render($target) {
    this.$el = compileTemplate(this.template());
    const footer = new Footer(this);
    this.$el?.addEventListener("todo-update-filter-mode", (evt) => {
      const { mode } = evt.detail;
      if (this.mode !== mode) {
        this.mode = mode;
        this._renderTasks();
      }
    });
    this.$el?.addEventListener("todo-clear-completed-tasks", () => {
      this._removeCompletedTasks();
      this._renderTasks();
    });
    footer.render(this.$el);
    $target.appendChild(this.$el);
    this._setupListeners();
  }
}
