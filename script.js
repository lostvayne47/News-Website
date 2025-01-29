const API_KEY = "d45adaf1be234f9a9576726aa10f2f4e";
let url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

async function fetchNews(query) {
  const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
  const data = await res.json();
  bindData(data.articles);
}

function bindData(articles) {
  const cardsContainer = document.getElementById("cards-container");
  const newsCardTemplate = document.getElementById("news-card-template");

  cardsContainer.innerHTML = "";

  articles.forEach((article) => {
    if (!article.urlToImage) return;

    const cardClone = newsCardTemplate.content.cloneNode(true);
    fillDataInCard(cardClone, article);
    cardsContainer.appendChild(cardClone);
  });
}

function fillDataInCard(card, data) {
  const newsImg = card.querySelector("#news-image");
  const newsTitle = card.querySelector("#news-title");
  const newsSource = card.querySelector("#news-source");
  const newsDesc = card.querySelector("#news-desc");

  newsImg.src = data.urlToImage;
  newsTitle.innerHTML = data.title;

  newsDesc.innerHTML = data.description;

  const date = new Date(data.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });
  newsSource.innerHTML = `${data.source.name} . ${date}`;

  card.firstElementChild.addEventListener("click", () => {
    window.open(data.url, "_blank");
  });
}

let curSelectedNav = null;
function onNavItemClick(id) {
  fetchNews(id);
  const navItem = document.getElementById(id);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = navItem;
  curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("news-input");

searchButton.addEventListener("click", () => {
  const query = searchText.value;
  if (!query) return;
  fetchNews(query);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = null;
});

function reload() {
  window.location.reload();
}
