class Footer {
  /**
   * @type {HTMLElement|null}
   */
  $el = null;

  allTasks = [];
  activeTasks = [];
  completedTasks = [];

  mode = null;

  template() {
    return `
      <footer class="footer">
        <span class="items-left">${this.activeTasks.length} items left</span>
        <ul class="filters">
          <li><button class="button js-btn-all" data-mode="all">All</button></li>
          <li><button class="button js-btn-active" data-mode="active">Active</button></li>
          <li><button class="button js-btn-completed" data-mode="completed">Completed</button></li>
        </ul>
        <button class="text-link clear-completed">Clear completed</button>
      </footer>
    `;
  }

  constructor({ allTasks, activeTasks, completedTasks, mode }) {
    this.allTasks = allTasks;
    this.activeTasks = activeTasks;
    this.completedTasks = completedTasks;
    this.mode = mode;
  }

  _updateActiveFilterButton(mode) {
    const $filters = this.$el?.querySelector(".filters");
    $filters?.querySelector(".active")?.classList.remove("active");
    $filters?.querySelector(".js-btn-" + mode)?.classList.add("active");
  }

  _setupListeners() {
    const $filters = this.$el?.querySelector(".filters");
    const $clearCompleted = this.$el?.querySelector(".clear-completed");

    $filters?.addEventListener("click", (evt) => {
      // @ts-ignore
      this.mode = evt.target.dataset.mode;
      this._updateActiveFilterButton(this.mode);
      this.$el?.parentElement?.dispatchEvent(
        new CustomEvent("todo-update-filter-mode", {
          detail: { mode: this.mode },
        })
      );
    });

    $clearCompleted?.addEventListener("click", () => {
      this.$el?.parentElement?.dispatchEvent(
        new CustomEvent("todo-clear-completed-tasks")
      );
    });

    this._updateActiveFilterButton(this.mode);
  }

  _renderFilters($target) {
    let $el = null;

    if (this.$el === null) {
      // @ts-ignore
      $el = compileTemplate(`<div style="display: none;"></div>`);
      $target.appendChild($el);
      this.$el = $el;
    }

    if (this.allTasks.length === 0) {
      // @ts-ignore
      $el = compileTemplate(`<div style="display: none;"></div>`);
    } else {
      // @ts-ignore
      $el = compileTemplate(this.template());
    }

    this.$el?.replaceWith($el);
    this.$el = $el;

    this._setupListeners();
  }

  render($target) {
    this._renderFilters($target);

    $target.addEventListener("todo-update-tasks", (evt) => {
      const { allTasks, activeTasks, completedTasks } = evt.detail;
      this.allTasks = allTasks;
      this.activeTasks = activeTasks;
      this.completedTasks = completedTasks;
      this._renderFilters($target);
    });
  }
}
