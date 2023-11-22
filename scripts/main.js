function main() {
    const $ = document.querySelector.bind(document);
    new TodoList({
        $input: $('.input-1'),
        $list: $('.list-1')
    });
    new TodoList({
        $input: $('.input-2'),
        $list: $('.list-2')
    });
    new TodoList({
        $input: $('.input-3'),
        $list: $('.list-3')
    });
}

window.addEventListener('DOMContentLoaded', main);
