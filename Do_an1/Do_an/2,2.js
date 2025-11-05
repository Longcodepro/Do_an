async function loadSanPham() {
  try {
    const response = await fetch("data.json");
    const data = await response.json();
    const sanPhamData = data.find(tbl => tbl.name === "san_pham").data;
    const container = document.getElementById("products");

    sanPhamData.slice(0, 5).forEach(sp => {
      // Tính ngẫu nhiên phần trăm giảm và đánh giá
      const giamGia = Math.floor(Math.random() * 30) + 10; // 10% - 40%
      const giaGoc = Math.round(sp.GIA_BAN / (1 - giamGia / 100));
      const danhGia = (Math.random() * 1 + 4).toFixed(1); // 4.0 - 5.0

      const card = document.createElement("div");
      card.className = "product";

      const img = document.createElement("img");
      img.className="anh1";
      img.src = sp.HINH_ANH;
      img.alt = sp.TEN_SP;

      const discount = document.createElement("small");
      discount.textContent = `-${giamGia}%`;

      const name = document.createElement("h4");
      name.className = "name";
      name.textContent = sp.TEN_SP; 
      const tuongtac=document.createElement("div");
      tuongtac.className="tuongtac";
    //  const sao=document.createElement("div")
    //  sao.className="sao";
      const price = document.createElement("div");
      price.className = "price";
      price.innerHTML = `${parseInt(sp.GIA_BAN).toLocaleString("vi-VN")} ₫ <span class="price-old">${giaGoc.toLocaleString("vi-VN")} ₫</span>`;

      const rating = document.createElement("div");
      rating.innerHTML = ` <div class="tuongtac">
                <div class="sao"><i class="fa-solid fa-star"></i> ${danhGia}</div>
                <div class="chitiet">
                  <i class="fa-regular fa-square-plus"></i>
                  <div class="note">Chi Tiết</div>
                </div>
              </div>`;
                        
      const btn = document.createElement("div");
      btn.className = "hang";
      
      const muahang=document.createElement("div");
      muahang.className="mua";
      muahang.innerHTML=`Mua`;
      
      const gio = document.createElement("div");
      gio.innerHTML = `<i class="nav-cart fa-solid fa-cart-shopping" style="margin-left: 7px;"></i>`;
      btn.appendChild(muahang)
      btn.appendChild(gio);
      
      card.appendChild(img);
      card.appendChild(discount);
      card.appendChild(name);
      card.appendChild(price);
      card.appendChild(rating);
      card.appendChild(btn);
      // card.appendChild(btnGio);
      container.appendChild(card);

    });

  } catch (error) {
    console.error("Lỗi tải dữ liệu:", error);
  }
}

loadSanPham();
