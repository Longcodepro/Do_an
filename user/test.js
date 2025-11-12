// =================== KHỞI TẠO ===================
const sanPhamContainer = document.getElementById("products");
const phanTrangContainer = document.getElementById("phantrang");
const loaiMenu = document.querySelector(".loai");
const submenu = document.querySelector(".sub-menu");
const chiTietDiv = document.getElementById("chitiet");


const soSanPhamMoiTrang = 12;
let mangsanpham = [];
let sanPhamLoc = [];
let trangHienTai = 1;

// ======== LƯU / LẤY LOCAL STORAGE =========
const tableSp = localStorage.getItem("product");

if (tableSp) {
  console.log("Đã có dữ liệu sản phẩm");
} else {
  localStorage.setItem("product", JSON.stringify(tatCaSanPham));
}

setlocalStore("product", tatCaSanPham);

function setlocalStore(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getlocalStore(key) {
  return JSON.parse(localStorage.getItem(key));
}

// ======== LẤY DỮ LIỆU TỪ LOCALSTORAGE =========
function getData() {
  const spLocal = getlocalStore("product");

  if (!spLocal || spLocal.length === 0) {
    sanPhamContainer.innerHTML = `<p>⚠️ Không có dữ liệu trong localStorage. Vui lòng thêm sản phẩm trước.</p>`;
    return;
  }

  mangsanpham = spLocal;
  sanPhamLoc = mangsanpham;
  hienThiSanPham(1);
  console.log("Dữ liệu lấy từ localStorage:", mangsanpham);
}

// ======== HIỂN THỊ SẢN PHẨM =========
function hienThiSanPham(trang) {
  sanPhamContainer.innerHTML = "";
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
      <div class="product" data-id="${sp.maSP}">
        <div class="anh1">
          <img src="${sp.hinhAnh}" alt="${sp.tenSP}">
            <h4 style="">${sp.tenSP}</h4>
        </div>
      
       <div class="nho">
        <div class="price">
          <span class="price-new">${sp.giaGoc}</span>
          <span class="price-old">${sp.giaHienTai}</span>
        </div >
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
      </div>
    `;
    sanPhamContainer.insertAdjacentHTML("beforeend", productHTML);
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
function locTheoLoai(maLoai) {
  sanPhamLoc = mangsanpham.filter((sp) => sp.maLoai === maLoai);
  trangHienTai = 1;
  hienThiSanPham(trangHienTai);
}

loaiMenu.addEventListener("click", (e) => {
  if (e.target.classList.contains("sanpham")) {
    locTheoLoai(e.target.dataset.mamh);
  }
});

if (submenu) {
    submenu.addEventListener("click", (e) => {
      if (e.target.classList.contains("sanpham")) {
        e.preventDefault();
        locTheoLoai(e.target.dataset.mamh);
      }
    });
  } else {
    console.warn("Không tìm thấy .sub-menu trong DOM!");
  }

  

// ======== XEM CHI TIẾT =========

sanPhamContainer.addEventListener("click", (e) => {
  const product = e.target.closest(".product");
  if (!product) return;

  const id = product.dataset.id;
  const sp = mangsanpham.find((item) => item.maSP === id);
  if (!sp) return alert("Không tìm thấy sản phẩm!");

  sanPhamContainer.style.display = "none";
  phanTrangContainer.style.display = "none";
  chiTietDiv.style.display = "block";

  chiTietDiv.innerHTML = `
    <div class="chitiet-sanpham">
      <button id="backBtn">← Quay lại</button>
      <div class="chitiet-content">
        <img src="${sp.hinh}" alt="${sp.ten}">
        <div class="info">
          <h2>${sp.ten}</h2>
          <p>${sp.moTa || "Không có mô tả"}</p>
          <p><b>Giá:</b> ${Number(sp.gia).toLocaleString()}đ</p>
          <p><b>Mã loại:</b> ${sp.maLoai}</p>
        </div>
      </div>
    </div>
  `;

  document.getElementById("backBtn").addEventListener("click", () => {
    chiTietDiv.style.display = "none";
    sanPhamContainer.style.display = "";
    phanTrangContainer.style.display = "";
  });
});

// ======== TÌM KIẾM =========
function timkiem(tukhoa) {
  tukhoa = tukhoa.trim().toLowerCase();
  sanPhamLoc = tukhoa
    ? mangsanpham.filter((sp) => sp.ten.toLowerCase().includes(tukhoa))
    : mangsanpham;
  trangHienTai = 1;
  hienThiSanPham(trangHienTai);
}

// ======== THÊM SẢN PHẨM MỚI =========
function themSpVoDanhSach(spMoi) {
  mangsanpham.push(spMoi);
  setlocalStore("product", mangsanpham);
  sanPhamLoc = mangsanpham;
  hienThiSanPham(trangHienTai);
  console.log("Đã thêm sản phẩm mới:", spMoi);
}


// ======== KHỞI CHẠY =========
getData();
