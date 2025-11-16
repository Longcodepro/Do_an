function danhmuc() {
  const lmenu = document.querySelector(".l-menu");
  lmenu.classList.toggle("open");
}

function lichSuMuaHang() {
  const content = document.getElementById("content");
  content.innerHTML = "<h2>Lịch sử mua hàng</h2><div id='orderList'></div>";

  // lấy thông tin khách hàng đăng đăng nhập hiện tại
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    content.innerHTML = "<p style='color:red;'>Vui lòng đăng nhập để xem lịch sử mua hàng!</p>";
    return;
  }

  // lấy danh bảng bill
  let tableBill = localStorage.getItem("bill");
  if( tableBill == null){
    console.log("Không lấy được bill");
    return;
  }
  else{
    console.log("Đã lấy được bảng bill");
  }

  // lọc ra các đơn thuộc về khách hàng này
  tableBill = tableBill.filter( row => row.maKH === currentUser.maKH);
  tableBill.forEach(o => {
    const div = document.createElement("div");
    div.classList.add("order-item");
    div.innerHTML = `
      <p><i class="fa-solid fa-receipt"></i> <b>${o.MA_DON_HANG}</b></p>
      <p><i class="fa-regular fa-clock"></i> ${o.NGAY_DAT}</p>
      <p><i class="fa-solid fa-money-bill"></i> ${o.GIA_TRI.toLocaleString()}đ</p>
      <p><i class="fa-solid fa-truck-fast"></i> ${o.TINH_TRANG}</p>
      <hr>
    `;
    container.appendChild(div);
  });
}