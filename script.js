const defaultLinks = [
  {
    product: "Wireless Earbuds Max",
    category: "Tech",
    discount: "40% OFF",
    description: "Top-rated sound quality with all-day battery life.",
    url: "https://example.com/earbuds"
  },
  {
    product: "Vitamin C Glow Serum",
    category: "Beauty",
    discount: "30% OFF",
    description: "Customer favorite for brighter and smoother skin.",
    url: "https://example.com/serum"
  }
];

const form = document.querySelector("#affiliate-form");
const linkGrid = document.querySelector("#link-grid");
const postCount = document.querySelector("#post-count");
const currentYear = document.querySelector("#year");

const stored = JSON.parse(localStorage.getItem("dailyAffiliateLinks") || "null");
let links = Array.isArray(stored) && stored.length ? stored : defaultLinks;

function saveLinks() {
  localStorage.setItem("dailyAffiliateLinks", JSON.stringify(links));
}

function renderLinks() {
  linkGrid.innerHTML = "";

  links.forEach((item) => {
    const card = document.createElement("article");
    card.className = "link-card";

    card.innerHTML = `
      <div class="meta">
        <span>${item.category}</span>
        <span class="pill">${item.discount}</span>
      </div>
      <h3>${item.product}</h3>
      <p>${item.description}</p>
      <a href="${item.url}" target="_blank" rel="noopener noreferrer">Shop this deal →</a>
    `;

    linkGrid.appendChild(card);
  });

  postCount.textContent = String(links.length);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const product = document.querySelector("#product").value.trim();
  const category = document.querySelector("#category").value.trim();
  const discount = document.querySelector("#discount").value.trim();
  const url = document.querySelector("#url").value.trim();
  const description = document.querySelector("#description").value.trim();

  links.unshift({ product, category, discount, url, description });
  saveLinks();
  renderLinks();
  form.reset();
});

currentYear.textContent = new Date().getFullYear();
renderLinks();
saveLinks();
