// let data = [
//   {
//     id: 0,
//     name: "肥宅心碎賞櫻3日",
//     imgUrl:
//       "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
//     area: "高雄",
//     description: "賞櫻花最佳去處。肥宅不得不去的超讚景點！",
//     group: 87,
//     price: 1400,
//     rate: 10,
//   },
//   {
//     id: 1,
//     name: "貓空纜車雙程票",
//     imgUrl:
//       "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
//     area: "台北",
//     description:
//       "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
//     group: 99,
//     price: 240,
//     rate: 2,
//   },
//   {
//     id: 2,
//     name: "台中谷關溫泉會1日",
//     imgUrl:
//       "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
//     area: "台中",
//     description:
//       "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
//     group: 20,
//     price: 1765,
//     rate: 7,
//   },
//   {
//     id: 3,
//     name: "台中清水高美濕地1日",
//     imgUrl:
//       "https://images.unsplash.com/photo-1601489311534-5ff2bb2d8c64?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     area: "台中",
//     description: "天然濕地奇景，人生必來之地。",
//     group: 43,
//     price: 1444,
//     rate: 5,
//   },
// ];

// 遍歷 data資料渲染 card

let data;
axios
  .get(
    "https://raw.githubusercontent.com/hexschool/js-training/main/travelAPI-lv1.json"
  )
  .then((res) => {
    data = res.data;
    renderC3();
    init();
  });

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
// init();

function renderC3() {
  // 遍歷data area並賦予到新物件
  let total = {};

  data.forEach((item) => {
    total[item.area] === undefined
      ? (total[item.area] = 1)
      : (total[item.area] += 1);
    // if (total[item.area] === undefined) {
    //   total[item.area] = 1;
    // } else {
    //   total[item.area] += 1;
    // }
  });

  //透過資料關聯，做物件取值
  const areaAry = Object.keys(total);
  const areaValue = Object.values(total);

  //重組陣列資料 I
  // let newData = [];
  // areaAry.forEach((item) => {
  //   let obj = {};
  //   obj.area = item;
  //   obj.num = total[item];
  //   newData.push(obj);
  // });

  //重組陣列資料 II-為 C3.js 所用
  let newData = [];
  areaAry.forEach((item, index) => {
    let ary = [];
    ary.push(item);
    ary.push(total[item]);
    newData.push(ary);
  });

  // 將 total 物件轉換為 c3.js columns 所需的格式
  // const columns = [];
  // for (const key in total) {
  //   if (total.hasOwnProperty(key)) {
  //     columns.push([key, total[key]]);
  //   }
  // }

  const chart = c3.generate({
    data: {
      columns: newData,
      type: "donut",
      colors: {
        台北: "#26BFC7",
        台中: "#5151D3",
        高雄: "#E68618",
      },
    },
    donut: {
      title: "套票區域比重",
      width: 10,
      label: {
        show: false,
      },
    },
  });
  chart.load({
    columns: newData,
  });
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
// const initialCardCount = data.length;
const initialCardCount = data ? data.length : 0;
const searchResult = document.querySelector("#search-result");
searchResult.textContent = `本次搜尋共 ${initialCardCount} 筆資料`;

// // 新增 card
const ticketForm = document.querySelector(".addTicket-form");
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
  renderC3();
  // 清空输入框
  ticketForm.reset();
});
