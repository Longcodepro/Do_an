function danhmuc() {
  const lmenu = document.querySelector(".l-menu");
  lmenu.classList.toggle("open");
}

function lichSuMuaHang() {
  const content = document.getElementById("content");
  content.innerHTML = "<h2>Lịch sử mua hàng</h2><div id='orderList'></div>";

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    content.innerHTML = "<p style='color:#ddd;'>Vui lòng đăng nhập để xem lịch sử mua hàng!</p>";
    return;
  }

  fetch("data.json")
    .then(res => res.json())
    .then(data => {
      const orders = data.don_hang.filter(
        d => d.ma_khach_hang === currentUser.ma_khach_hang
      );

      const container = document.getElementById("orderList");
      if (orders.length === 0) {
        container.innerHTML = `<p style="color:#ddd;">Chưa có đơn hàng nào.</p>`;
        return;
      }

      orders.forEach(o => {
        const div = document.createElement("div");
        div.classList.add("order-item");
        div.innerHTML = `
          <p><i class="fa-solid fa-receipt"></i> <b>${o.ma_don_hang}</b></p>
          <p><i class="fa-regular fa-clock"></i> ${o.ngay_dat}</p>
          <p><i class="fa-solid fa-money-bill"></i> ${o.tong_tien.toLocaleString()}đ</p>
          <p><i class="fa-solid fa-truck-fast"></i> ${o.trang_thai}</p>
          <hr>
        `;
        container.appendChild(div);
      });
    })
    .catch(err => console.error(err));
}