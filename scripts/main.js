const $ = document.querySelector.bind(document);

function main() {
  const $app = $("#app");

  Array.from({ length: 3 }).forEach((_, index) => {
    const todo = new TodoList({
      label: `List no. ${index + 1}`,
    });
    todo.render($app);
  });
}

window.addEventListener("DOMContentLoaded", main);
