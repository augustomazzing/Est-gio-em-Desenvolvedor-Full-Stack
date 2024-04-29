function scrapeAmazon() {
  const keyword = document.getElementById('keyword').value.trim();
  if (!keyword) {
    alert('Por favor, digite uma palavra-chave de pesquisa.');
    return;
  }

  fetch(`/api/scrape?keyword=${keyword}`)
    .then(response => response.json())
    .then(data => displayResults(data))
    .catch(error => console.error('Erro ao raspar a página da Amazon:', error));
}

function displayResults(products) {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  if (products.length === 0) {
    resultsDiv.innerHTML = '<p>Nenhum produto encontrado.</p>';
    return;
  }

  products.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');

    const image = document.createElement('img');
    image.src = product.imageURL;

    const title = document.createElement('p');
    title.textContent = product.title;

    const rating = document.createElement('p');
    rating.textContent = `Classificação: ${product.rating} de 5 estrelas`;

    const reviewCount = document.createElement('p');
    reviewCount.textContent = `Número de avaliações: ${product.reviewCount}`;
    
    productDiv.appendChild(image);
    productDiv.appendChild(title);
    productDiv.appendChild(rating);
    productDiv.appendChild(reviewCount);

    resultsDiv.appendChild(productDiv);
  });
}
