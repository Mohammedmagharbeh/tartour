const addItemForm = document.getElementById("formadd");
const itemsTableBody = document.getElementById("itemsTableBody");
const totalPriceSpan = document.getElementById("totalPrice");

// تحميل المواد من الـ localStorage
let items = JSON.parse(localStorage.getItem("items")) || [];

// تحديث الجدول عند بدء الصفحة
updateTable();

// إضافة مادة جديدة
addItemForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const itemName = document.getElementById("Name").value.trim();
  const itemQuantity = parseInt(document.getElementById("Quantity").value);
  const itemPrice = parseFloat(document.getElementById("Price").value);

  // تحقق من صحة الإدخال
  if (!itemName || itemQuantity <= 0 || itemPrice <= 0) {
    alert("يرجى إدخال بيانات صحيحة.");
    return;
  }

  const newItem = { name: itemName, quantity: itemQuantity, price: itemPrice };
  items.push(newItem);

  updateTable();

  addItemForm.reset();
});

// تحديث الجدول
function updateTable() {
  itemsTableBody.innerHTML = "";

  items.forEach((item, index) => {
    const row = document.createElement("tr");

    const itemTotalPrice = (item.quantity * item.price).toFixed(2);

    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>${item.price.toFixed(2)}</td>
      <td>${itemTotalPrice}</td>
      <td><button onclick="removeItem(${index})">إزالة</button></td>
      <td><button onclick="editItem(${index})">تعديل</button></td>
    `;

    itemsTableBody.appendChild(row);
  });

  updateTotalPrice();

  localStorage.setItem("items", JSON.stringify(items));
}

// إزالة مادة
function removeItem(index) {
  items.splice(index, 1);
  updateTable();
}

// تعديل مادة
function editItem(index) {
  const item = items[index];
  document.getElementById("Name").value = item.name;
  document.getElementById("Quantity").value = item.quantity;
  document.getElementById("Price").value = item.price;

  // حذف المادة القديمة مؤقتًا
  items.splice(index, 1);
  updateTable();
}

// حساب المجموع الكلي
function updateTotalPrice() {
  const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  totalPriceSpan.textContent = total.toFixed(2);
}
