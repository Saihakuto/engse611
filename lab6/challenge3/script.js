
const navLinks = document.querySelectorAll('nav a');

navLinks.forEach((link) => {
  link.onclick = function () {
    alert('Clicked!');
  };
});
