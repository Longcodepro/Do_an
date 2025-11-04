function danhmuc() {
  const lmenu = document.querySelector(".l-menu");
  lmenu.classList.toggle("open");
}

function lichSuMuaHang() {
  const content = document.getElementById("content");
  content.innerHTML = "<h2>Lịch sử mua hàng</h2><div id='orderList'></div>";

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    content.innerHTML = "<p style='color:#333;'>Vui lòng đăng nhập để xem lịch sử mua hàng!</p>";
    return;
  }

  let db=null;

  function getBangDonHang() {
  return db.find(t => t.name === "don_hang").data;
}

  fetch("data.json")
    .then(res => res.json())
    .then(data => {
      db = data; // ✅ GÁN Ở ĐÂY

      const BANGDH = getBangDonHang(); // ✅ Gọi sau khi có dữ liệu
      const orders = BANGDH.filter(
          d => d.MA_KHACH_HANG === currentUser.MA_KHACH_HANG
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
          <p><i class="fa-solid fa-receipt"></i> <b>${o.MA_DON_HANG}</b></p>
          <p><i class="fa-regular fa-clock"></i> ${o.NGAY_DAT}</p>
          <p><i class="fa-solid fa-money-bill"></i> ${o.GIA_TRI.toLocaleString()}đ</p>
          <p><i class="fa-solid fa-truck-fast"></i> ${o.TINH_TRANG}</p>
          <hr>
        `;
        container.appendChild(div);
      });
    })
    .catch(err => console.error(err));
}