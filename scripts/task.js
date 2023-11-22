class Task {

    constructor(value) {
        this.$el = this._createListElement(value);
        this._renderRemoveButton(this.$el);
    }

    /**
     * @param {HTMLElement} $element
     */
    _renderRemoveButton($element) {
        const $button = this._createRemoveButton();
        $button.addEventListener('click', () => {
            $element.parentElement.removeChild($element);
        });
        $element.insertBefore($button, $element.firstChild);
    }

    _createListElement(value) {
        const $item = document.createElement('li');
        $item.textContent = value;
        return $item;
    }

    _createRemoveButton() {
        const $button = document.createElement('button');
        $button.textContent = 'x';
        $button.classList.add('remove-button');
        return $button;
    }
}
