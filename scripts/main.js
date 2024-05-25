const $ = document.querySelector.bind(document);

function main() {
  const $app = $("#app");

  Array.from({ length: 2 }).forEach((_, index) => {
    const todo = new Todo({
      label: `List no. ${index + 1}`,
    });
    todo.render($app);
  });
}

window.addEventListener("DOMContentLoaded", main);
