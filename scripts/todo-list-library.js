const ENTER_KEY_CODE = 13;

class TestTODOList {
    constructor(options) {
        this.settings = {
            $input: null,
            $list: null
        };

        Object.assign(this.settings, options);

        this.bindInput();
    }

    bindInput() {
        const $input = this.settings.$input;
        $input.addEventListener('keydown', ({ keyCode }) => {
            if (keyCode !== ENTER_KEY_CODE) {
                return;
            }

            const $element = this.renderListElement($input.value);
            this.renderRemoveButton($element);
            this.clearInput();
        });
    }

    renderListElement(value) {
        const $listElement = this.createListElement();
        $listElement.textContent = value;
        this.settings.$list.appendChild($listElement);
        return $listElement;
    }

    createListElement() {
        return document.createElement('li');
    }

    clearInput() {
        this.settings.$input.value = '';
    }

    renderRemoveButton($element) {
        const $list = $element.parentNode;
        const $button = this.createRemoveButton();
        $button.addEventListener('click', () => {
            $list.removeChild($element);
        });
        $element.appendChild($button);
    }

    createRemoveButton() {
        const $button = document.createElement('button');
        $button.textContent = 'x';
        return $button;
    }
}
