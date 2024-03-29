/**
 * @typedef {Object} TodoListProps
 * @property {HTMLInputElement} $input
 * @property {HTMLUListElement} $list
*/

const ENTER_KEY_CODE = 13;

class TodoList {

    /**
     * @param {TodoListProps} options
     */
    constructor(options) {
        this.list = [];
        /**
         * @type {TodoListProps}
         */
        this.settings = Object.assign({
            $input: null,
            $list: null
        }, options);

        this._setupDOMEvents();
    }

    _setupDOMEvents() {
        this.settings.$input
            .addEventListener('keydown', ({ keyCode }) => {
                if (keyCode !== ENTER_KEY_CODE) {
                    return;
                }

                const value = this.settings.$input.value.trim();

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
          onRemove(taskId) {
            const index = this.list.findIndex(item => item.id === taskId);
            if (index !== -1) {
              this.list.splice(index, 1);
            }
          }
        });
        // Update UI
        this.settings.$list.appendChild(task.$el);
        // Update memory
        this.list.push(task);
    }

    _clearInput() {
        this.settings.$input.value = '';
    }

}
