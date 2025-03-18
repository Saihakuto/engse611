const p = document.querySelectorAll('#main p');

p.forEach((paragraph) => {
  paragraph.setAttribute('style','color:red; font-size:24px;');
});
