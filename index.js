//lắng Nghe sự kiện submit cho form
document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault(); //ngăn chặn load trang
  let name = document.querySelector("#name").value; //lấy giá trị input name
  let price = document.querySelector("#price").value; //lấy giá trị input price
  let amount = document.querySelector("#amount").value; //lấy giá trị input amount
  let description = document.querySelector("#description").value; //lấy giá trị input description

  //Kiểm tra thông tin nhập vào
  if (
    !name.trim() ||
    isNaN(price) ||
    price <= 0 ||
    isNaN(amount) ||
    amount < 0
  ) {
    alert("Vui lòng nhập đầy đủ thông tin hợp lệ");
    return;
  }

  let item = {
    id: new Date().toISOString(),
    name: name.trim(),
    price: price,
    oldPrice: (price * 2).toString(),
    amount: amount.trim(),
    description: description.trim(),
  };

  addItemToUI(item); // add item lên ui
  addItemToLocalStorage(item); // add item lên localStorage
  //hàm lấy danh sách từ localStorage
  clearnInputs(); // xóa input
});

//Hàm xóa nội dung inputs
const inputs = document.querySelectorAll("input");
const clearnInputs = () => {
  inputs.forEach((input) => {
    input.value = "";
  });
};

//Hàm add item lên giao diện
const addItemToUI = (item) => {
  const { id, name, price, oldPrice, amount, description } = item;

  let newCard = document.createElement("div");
  newCard.className = "card-block mb-3";
  newCard.innerHTML = `
<div class="card-img">
              <img
                src="https://nuochoa95.com/Data/images/san%20pham/Parfums%20de%20Marly/parfums-de-marly-delina-exclusif.jpg"
              />
            </div>
            <div class="card-info" data-id="1">
              <h5 class="card-title">${name}</h5>
              <div>
                <p class="card-price">${price}</p>
                <p class="old-price">${oldPrice}</p>
              </div>
            </div>
`;
  newCard.onclick = () => {
    viewProduct(item); // khi click vào card sẽ hiện thị thông thi bên inputs
  };

  document.querySelector(".card-carousel").appendChild(newCard);
};

//Hàm lấy danh sách từ localSotrage

const getList = () => {
  return JSON.parse(localStorage.getItem("list")) || [];
};
//Hàm lưu item vào localSotorage
const addItemToLocalStorage = (item) => {
  let list = getList(); //lấy danh sách từ localStorage
  list.push(item); // thêm item vào list
  localStorage.setItem("list", JSON.stringify(list)); //Lưu danh sách vào localStorage
};

//Khi load lại trang thì item vẫn hiển thị

const init = () => {
  let list = getList(); //lấy danh sách
  list.forEach((item) => {
    addItemToUI(item);
  }); // gọi hàm hiển thị tren giao diện
};
//Gọi hàm init() khi chạy lại trang
init();

// Hàm xem chi tiết sản phẩm

function viewProduct(item) {
  document.querySelector("#name").value = item.name;
  document.querySelector("#price").value = item.price;
  document.querySelector("#amount").value = item.amount;
  document.querySelector("#description").value = item.description;

  // xử lý nút "Detele"
  document.querySelector(".btn-danger").onclick = () => {
    deleteProduct(item.id);
  };
}

function deleteProduct(id) {
  let list = getList(); // Lấy danh sách
  list = list.filter((item) => {
    return item.id != id; //lọc id
  });
  if (confirm("Bạn có muốn xóa sản phẩm này không?")) {
    document.querySelector(".card-carousel").innerHTML = "";
    localStorage.setItem("list", JSON.stringify(list));
    list.forEach((item) => {
      addItemToUI(item);
    });
    clearnInputs();
  }
}

//Xử lý form Search

document.querySelector(".search").addEventListener("keyup", (event) => {
  let inputValue = event.target.value.toLowerCase();
  let list = getList();
  document.querySelector(".card-carousel").innerHTML = "";
  list.forEach((item) => {
    if (item.name.toLowerCase().includes(inputValue)) {
      addItemToUI(item);
    }
  });
});

//Xử lý nút clear
document.querySelector(".btn-secondary").addEventListener("click", () => {
  if (confirm("Bạn có muốn xóa toàn bộ danh sách không?")) {
    document.querySelector(".card-carousel").innerHTML = "";
    localStorage.removeItem("list");
    clearnInputs();
    alert("Dẫ xóa sản phẩm thành công!");
  }
});
