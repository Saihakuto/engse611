
const paragraphs = document.querySelectorAll('#main p');
const llama = Array.from(paragraphs).find((p) => p.textContent === 'Llamas and Chickens!');
llama.setAttribute('style','color:red;');