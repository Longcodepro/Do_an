const sanPhamContainer = document.getElementById("products");

const phanTrangContainer = document.getElementById("phantrang");
const loaiMenu = document.querySelector(".loai");
const soSanPhamMoiTrang = 5;
let tatCaSanPham = [];
let sanPhamLoc = [];
let trangHienTai = 1;

// ======== LẤY DỮ LIỆU =========
async function getData() {
  try {
    const response = await fetch("data.json");
    const allData = await response.json();

    const sanPham = allData.find((item) => item.name === "san_pham");
    tatCaSanPham = sanPham.data.map((sp) => ({
      maSP: sp.MA_SAN_PHAM,
      maLoai: sp.MA_MAT_HANG,
      ten: sp.TEN_SP,
      gia: Number(sp.GIA_BAN),
      hinh: sp.HINH_ANH.trim(),
      moTa: sp.MO_TA,
    }));

    sanPhamLoc = tatCaSanPham;
    hienThiSanPham(1);
  } catch (error) {
    console.error("Lỗi khi tải dữ liệu:", error);
  }
}

// ======== HIỂN THỊ SẢN PHẨM =========
function hienThiSanPham(trang) {
  sanPhamContainer.innerHTML = "";
  // sanphammoi.innerHTML="";
  const batDau = (trang - 1) * soSanPhamMoiTrang;
  const ketThuc = batDau + soSanPhamMoiTrang;
  const mangHienThi = sanPhamLoc.slice(batDau, ketThuc);

  if (mangHienThi.length === 0) {
    sanPhamContainer.innerHTML = "<p>Không tìm thấy sản phẩm nào.</p>";
    phanTrangContainer.innerHTML = "";
    return;
  }

  mangHienThi.forEach((sp) => {
    const productHTML = `
      <div class="product">
        <div class="anh1">
          <img src="${sp.hinh}" alt="${sp.ten}">
        </div>
        <h4>${sp.ten}</h4>
        <div class="price">
          <span class="price-new">${sp.gia.toLocaleString()}đ</span>
        </div>
        <div class="tuongtac">
          <div class="sao"><i class="fa-solid fa-star"></i> 5.0</div>
          <div class="chitiet"><i class="fa-regular fa-square-plus"></i>
            <div class="note">Chi Tiết</div>
          </div>
        </div>
        <div class="hang">
          <div class="mua">Mua</div>
          <div><i class="nav-cart fa-solid fa-cart-shopping" style="margin-left:7px;"></i></div>
        </div>
      </div>
    `;
    sanPhamContainer.insertAdjacentHTML("beforeend", productHTML);
    // sanphammoi.insertAdjacentHTML("beforeend",productHTML);
  });

  taoPhanTrang();
}

// ======== TẠO PHÂN TRANG =========
function taoPhanTrang() {
  phanTrangContainer.innerHTML = "";
  const tongTrang = Math.ceil(sanPhamLoc.length / soSanPhamMoiTrang);

  for (let i = 1; i <= tongTrang; i++) {
    const li = document.createElement("li");
    li.textContent = i;
    li.classList.toggle("active", i === trangHienTai);
    li.addEventListener("click", () => {
      trangHienTai = i;
      hienThiSanPham(trangHienTai);
    });
    phanTrangContainer.appendChild(li);
  }
}

// ======== LỌC THEO LOẠI =========
loaiMenu.addEventListener("click", (e) => {
  if (e.target.classList.contains("sanpham")) {
    const ma = e.target.dataset.mamh;
    sanPhamLoc = tatCaSanPham.filter((sp) => sp.maLoai === ma);
    trangHienTai = 1;
    hienThiSanPham(trangHienTai);
  }
});

// ======== TÌM KIẾM =========
function timkiem(tukhoa) {
  tukhoa = tukhoa.trim().toLowerCase();
  if (tukhoa === "") {
    sanPhamLoc = tatCaSanPham;
  } else {
    sanPhamLoc = tatCaSanPham.filter((sp) =>
      sp.ten.toLowerCase().includes(tukhoa)
    );
  }
  trangHienTai = 1;
  hienThiSanPham(trangHienTai);
}
const submenu = document.querySelector(".sub-menu");
submenu.addEventListener("click", (e) => {
  if (e.target.classList.contains("sanpham")) {
    e.preventDefault();
    const ma = e.target.dataset.mamh;
    sanPhamLoc = tatCaSanPham.filter((sp) => sp.maLoai === ma);
    trangHienTai = 1;
    hienThiSanPham(trangHienTai);
  }
});
getData();
// ======== THÊM SẢN PHẨM MỚI (từ admin hoặc giao diện khác) =========
function themSpVoDanhSach(spMoi) {
  // thêm vào mảng sản phẩm chính
  tatCaSanPham.push(spMoi);
  // lưu vào localStorage để giữ lại khi reload
  localStorage.setItem("ds_sp", JSON.stringify(tatCaSanPham));

  // hiển thị lại giao diện
  sanPhamLoc = tatCaSanPham;
  hienThiSanPham(trangHienTai);
  console.log("Đã thêm sản phẩm mới:", spMoi);
}
