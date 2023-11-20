// 使用 Axios 請求數據
const apiPath =
  "https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json";

axios
  .get(apiPath)
  .then((res) => {
    if (res.data && res.data.data) {
      init(res.data.data);
      initialCardCount = res.data.data.length;
      updateInitialCardCount();
    } else {
      console.error("Invalid data structure:", res.data);
    }
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

// 遍歷 data資料渲染 card
function init(data) {
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
let initialCardCount = 0;

function updateInitialCardCount() {
  const searchResult = document.querySelector("#search-result");
  searchResult.textContent = `本次搜尋共 ${initialCardCount} 筆資料`;
}

// // 新增 card
const ticketName = document.querySelector(".ticket-name");
const imgUrl = document.querySelector(".ticket-img-url");
const area = document.querySelector(".ticket-area");
const ticketPrice = document.querySelector(".ticket-price");
const setNum = document.querySelector(".ticket-set-num");
const ticketStar = document.querySelector(".ticket-star");
const intro = document.querySelector(".ticket-intro");
const ticketBtn = document.querySelector(".ticket-btn");

const getInputValue = (element) => {
  return element.value.trim();
};

const validateInput = () => {
  const inputs = [
    ticketName,
    imgUrl,
    area,
    ticketPrice,
    setNum,
    ticketStar,
    intro,
  ];

  for (const input of inputs) {
    if (getInputValue(input) === "") {
      alert("請填寫所有欄位");
      return false;
    }
  }

  return true;
};

ticketBtn.addEventListener("click", () => {
  if (!validateInput()) {
    return;
  }

  let ticketObj = {
    name: getInputValue(ticketName),
    imgUrl: getInputValue(imgUrl),
    area: getInputValue(area),
    price: getInputValue(ticketPrice),
    group: getInputValue(setNum),
    rate: getInputValue(ticketStar),
    description: getInputValue(intro),
  };

  data.push(ticketObj);
  init();

  // 清空输入框
  ticketName.value = "";
  imgUrl.value = "";
  area.value = "";
  ticketPrice.value = "";
  setNum.value = "";
  ticketStar.value = "";
  intro.value = "";
});
