const data = {
  produtos: [
    { id: 1, nome: "iPhone 15 Pro", preco: 8999.90, categoria: "Celulares",
      imagem: "https://picsum.photos/seed/iphone15/300/200",
      descricao: "Smartphone Apple com chip A17 Pro, camera de 48MP e tela Super Retina XDR.",
      emEstoque: true },
    { id: 2, nome: "Samsung Galaxy S24", preco: 6499.00, categoria: "Celulares",
      imagem: "https://picsum.photos/seed/galaxy24/300/200",
      descricao: "Smartphone Samsung com tela AMOLED de 6.2 polegadas e camera de 50MP.",
      emEstoque: true },
    { id: 3, nome: "Notebook Dell Inspiron", preco: 4299.99, categoria: "Notebooks",
      imagem: "https://picsum.photos/seed/dell/300/200",
      descricao: "Notebook Dell com Intel Core i7, 16GB RAM e SSD de 512GB.",
      emEstoque: true },
    { id: 4, nome: "MacBook Air M3", preco: 12999.00, categoria: "Notebooks",
      imagem: "https://picsum.photos/seed/macbook/300/200",
      descricao: "Notebook Apple com chip M3, 16GB de RAM unificada e SSD de 512GB.",
      emEstoque: false },
    { id: 5, nome: "Fone Bluetooth JBL", preco: 349.90, categoria: "Acessorios",
      imagem: "https://picsum.photos/seed/jbl/300/200",
      descricao: "Fone de ouvido sem fio com cancelamento de ruido e bateria de 30 horas.",
      emEstoque: true },
    { id: 6, nome: "Mouse Gamer Logitech", preco: 299.00, categoria: "Acessorios",
      imagem: "https://picsum.photos/seed/mouse/300/200",
      descricao: "Mouse gamer com sensor optico de 25.000 DPI e 8 botoes programaveis.",
      emEstoque: true },
    { id: 7, nome: "PlayStation 5", preco: 4499.00, categoria: "Games",
      imagem: "https://picsum.photos/seed/ps5/300/200",
      descricao: "Console Sony de nova geracao com SSD ultra-rapido e controle DualSense.",
      emEstoque: true },
    { id: 8, nome: "Xbox Series X", preco: 4299.00, categoria: "Games",
      imagem: "https://picsum.photos/seed/xbox/300/200",
      descricao: "Console Microsoft com 1TB de SSD, 4K nativo e 120 FPS.",
      emEstoque: false },
    { id: 9, nome: "Nintendo Switch OLED", preco: 2799.00, categoria: "Games",
      imagem: "https://picsum.photos/seed/switch/300/200",
      descricao: "Console hibrido da Nintendo com tela OLED de 7 polegadas.",
      emEstoque: true },
    { id: 10, nome: "Teclado Mecanico Redragon", preco: 459.90, categoria: "Acessorios",
      imagem: "https://picsum.photos/seed/teclado/300/200",
      descricao: "Teclado mecanico com switches blue, RGB e layout ABNT2.",
      emEstoque: true }
  ]
};

const productListEl = document.getElementById("product-list");
const productDetailsEl = document.getElementById("product-details");
const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const btnRender = document.querySelector("#btnRender");

function formatPrice(preco) {
  return "R$ " + preco.toFixed(2).replace(".", ",");
}

function createProductCard(produto) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.setAttribute("data-id", produto.id);
  card.setAttribute("data-categoria", produto.categoria);
  card.style.padding = "14px";

  const img = document.createElement("img");
  img.setAttribute("src", produto.imagem);
  img.setAttribute("alt", produto.nome);
  card.appendChild(img);

  const titulo = document.createElement("h3");
  titulo.classList.add("card-title");
  titulo.textContent = produto.nome;
  card.appendChild(titulo);

  const categoria = document.createElement("p");
  categoria.classList.add("card-category");
  categoria.textContent = produto.categoria;
  card.appendChild(categoria);

  const preco = document.createElement("p");
  preco.classList.add("card-price");
  preco.textContent = formatPrice(produto.preco);
  card.appendChild(preco);

  const btnContainer = document.createElement("div");
  btnContainer.classList.add("card-buttons");

  const btnDetails = document.createElement("button");
  btnDetails.classList.add("btn-details");
  btnDetails.textContent = "Ver detalhes";
  btnDetails.addEventListener("click", function () {
    showProductDetails(produto);
  });
  btnContainer.appendChild(btnDetails);

  const btnHighlight = document.createElement("button");
  btnHighlight.classList.add("btn-highlight");
  btnHighlight.textContent = "Destacar";
  btnHighlight.addEventListener("click", function () {
    if (card.classList.contains("highlight")) {
      card.classList.remove("highlight");
    } else {
      card.classList.add("highlight");
    }
  });
  btnContainer.appendChild(btnHighlight);

  card.appendChild(btnContainer);
  return card;
}

function renderProducts(produtos) {
  productListEl.innerHTML = "";

  if (produtos.length === 0) {
    productListEl.innerHTML = "<p style='grid-column:1/-1;text-align:center;color:#94a3b8;'>Nenhum produto encontrado.</p>";
    return;
  }

  produtos.forEach(function (produto) {
    const card = createProductCard(produto);
    productListEl.appendChild(card);
  });

  const cards = document.querySelectorAll(".card");
  console.log("=== Cards renderizados (data-id) ===");
  cards.forEach(function (card, i) {
    const idProduto = card.getAttribute("data-id");
    console.log("Card " + (i + 1) + " -> data-id = " + idProduto);
    card.style.transition = "transform 0.2s ease";
  });
  console.log("Total de cards na tela: " + cards.length);
}

function renderCategories() {
  categorySelect.innerHTML = "<option value='Todas'>Todas</option>";

  const categoriasUnicas = [];
  data.produtos.forEach(function (p) {
    if (!categoriasUnicas.includes(p.categoria)) {
      categoriasUnicas.push(p.categoria);
    }
  });

  categoriasUnicas.forEach(function (cat) {
    const option = document.createElement("option");
    option.setAttribute("value", cat);
    option.textContent = cat;
    categorySelect.appendChild(option);
  });
}

function showProductDetails(produto) {
  const statusEstoque = produto.emEstoque
    ? "<span class='in-stock'>Disponivel</span>"
    : "<span class='out-of-stock'>Indisponivel</span>";

  productDetailsEl.innerHTML =
    "<h2>" + produto.nome + "</h2>" +
    "<div class='detail-row'><strong>Categoria:</strong> " + produto.categoria + "</div>" +
    "<div class='detail-row'><strong>Preco:</strong> " + formatPrice(produto.preco) + "</div>" +
    "<div class='detail-row'><strong>Estoque:</strong> " + statusEstoque + "</div>" +
    "<div class='detail-row'><strong>Descricao:</strong> " + produto.descricao + "</div>";

  productDetailsEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function filterProducts() {
  const termoBusca = searchInput.value.toLowerCase().trim();
  const categoriaSelecionada = categorySelect.value;

  const filtrados = data.produtos.filter(function (produto) {
    const nomeBate = produto.nome.toLowerCase().includes(termoBusca);
    const categoriaBate =
      categoriaSelecionada === "Todas" ||
      produto.categoria === categoriaSelecionada;
    return nomeBate && categoriaBate;
  });

  return filtrados;
}

searchInput.addEventListener("input", function () {
  const resultado = filterProducts();
  renderProducts(resultado);
});

categorySelect.addEventListener("change", function () {
  const resultado = filterProducts();
  renderProducts(resultado);
});

btnRender.addEventListener("click", function () {
  searchInput.value = "";
  categorySelect.value = "Todas";
  renderProducts(data.produtos);
  console.log("Catalogo recarregado com " + data.produtos.length + " produtos.");
});

renderCategories();
renderProducts(data.produtos);
console.log("Mini Ecommerce iniciado! " + data.produtos.length + " produtos disponiveis.");


  