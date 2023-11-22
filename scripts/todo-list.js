const ENTER_KEY_CODE = 13;

class TodoList {
    constructor(options) {
        this.list = [];
        this.settings = Object.assign({
            $input: null,
            $list: null
        }, options);

        this.bindInput();
    }

    bindInput() {
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

    _addTask(value) {
        const task = new Task(value);
        // Update UI
        this.settings.$list.appendChild(task.$el);
        // Update model
        this.list.push(task);
    }

    _clearInput() {
        this.settings.$input.value = '';
    }

}
