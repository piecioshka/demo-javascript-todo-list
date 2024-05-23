function compileTemplate(template) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(template, "text/html");
  return doc.body.firstChild;
}
