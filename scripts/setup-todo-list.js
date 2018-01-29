function setup() {
    new TestTODOList({
        $input: document.querySelector('.input-1'),
        $list: document.querySelector('.list-1')
    });
    new TestTODOList({
        $input: document.querySelector('.input-2'),
        $list: document.querySelector('.list-2')
    });
    new TestTODOList({
        $input: document.querySelector('.input-3'),
        $list: document.querySelector('.list-3')
    });
}

window.addEventListener('DOMContentLoaded', setup);
