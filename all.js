let data = [
  {
    id: 0,
    name: "肥宅心碎賞櫻3日",
    imgUrl:
      "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
    area: "高雄",
    description: "賞櫻花最佳去處。肥宅不得不去的超讚景點！",
    group: 87,
    price: 1400,
    rate: 10,
  },
  {
    id: 1,
    name: "貓空纜車雙程票",
    imgUrl:
      "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    area: "台北",
    description:
      "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
    group: 99,
    price: 240,
    rate: 2,
  },
  {
    id: 2,
    name: "台中谷關溫泉會1日",
    imgUrl:
      "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    area: "台中",
    description:
      "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
    group: 20,
    price: 1765,
    rate: 7,
  },
];

// 遍歷 data資料渲染 card
function init() {
  const cards = document.querySelector(".cards");

  let card = "";

  data.forEach((item) => {
    card += `
    <li class="card" id=${item.id}>
        <div class="card-img">
            <a href="#">
                <img
                src=${item.imgUrl}
                alt=""
                />
            </a>
            <div class="card-img-region">${item.area}</div>
            <div class="card-img-rank">${item.rate}</div>
            </div>
            <div class="card-content">
            <div>
                <h3>
                <a href="#" class="card-content-name">${item.name}</a>
                </h3>
                <p class="card-content-set">
                ${item.description}
                </p>
            </div>
            <div class="card-info">
                <p class="card-num">
                <span><i class="fas fa-exclamation-circle"></i></span>
                剩下最後 <span id="card-num">${item.group}</span> 組
                </p>
                <p class="card-price">TWD <span id="cardprice">$${item.price}</span></p>
            </div>
        </div>
    </li>`;
  });
  cards.innerHTML = card;
}
init();

// 監聽 seclect選擇地區則顯示該地區card
const selectElement = document.querySelector("#select-search");

selectElement.addEventListener("change", () => {
  const selectedValue =
    selectElement.options[selectElement.selectedIndex].value;
  const cards = document.querySelectorAll(".card");
  let matchedCount = 0;

  cards.forEach((card) => {
    const area = card.querySelector(".card-img-region").textContent;
    if (selectedValue === "" || area === selectedValue) {
      card.style.display = "block";
      matchedCount++;
    } else {
      card.style.display = "none";
    }
    // 更新搜尋結果筆數
    const searchResult = document.querySelector("#search-result");
    searchResult.textContent = `本次搜尋共 ${matchedCount} 筆資料`;
  });
});

// 初始卡片筆數
const initialCardCount = data.length;
const searchResult = document.querySelector("#search-result");
searchResult.textContent = `本次搜尋共 ${initialCardCount} 筆資料`;
