/**
 * @typedef {Object} TodoListProps
 * @property {string} label
 */

const ENTER_KEY_CODE = 13;

class TodoList {
  /**
   * @type {HTMLInputElement|null}
   */
  $input = null;

  /**
   * @type {HTMLUListElement|null}
   */
  $list = null;

  template = ({ label }) => {
    return `
      <div class="todo-list">
        <label>
          ${label}
          <input type="text" placeholder="Enter a task..." />
        </label>
        <ul></ul>
      </div>;
    `;
  };

  /**
   * @param {TodoListProps} options
   */
  constructor(options) {
    this.list = [];
    /**
     * @type {TodoListProps}
     */
    this.settings = Object.assign(
      {
        label: null,
      },
      options
    );
  }

  _setupDOMEvents() {
    this.$input.addEventListener("keydown", ({ keyCode }) => {
      if (keyCode !== ENTER_KEY_CODE) {
        return;
      }

      const value = this.$input.value.trim();

      if (value.length === 0) {
        return;
      }

      this._addTask(value);
      this._clearInput();
    });
  }

  /**
   * @param {string} value
   */
  _addTask(value) {
    const task = new Task(value, {
      onRemove: this._onRemove.bind(this),
    });
    // Update UI
    this.$list.appendChild(task.$el);
    // Update memory
    this.list.push(task);
  }

  /**
   * @param {string} taskId
   */
  _onRemove(taskId) {
    const index = this.list.findIndex((item) => item.id === taskId);
    if (index !== -1) {
      this.list.splice(index, 1);
    }
  }

  _clearInput() {
    this.$input.value = "";
  }

  render($target) {
    const $element = compileTemplate(
      this.template({ label: this.settings.label })
    );
    $target.appendChild($element);
    this.$input = $element.querySelector('input');
    this.$list = $element.querySelector('ul');
    this._setupDOMEvents();
  }
}
