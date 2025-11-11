// =================== KHỞI TẠO ===================
(() => {
const sanphan1 = document.getElementById("products");
const phantrang1 = document.getElementById("phantrang");
// const menu1 = document.querySelector(".loai");
const submenu1 = document.querySelector(".loai");
const thitiet1 = document.getElementById("chitiet");
const menusub=document.querySelector(".sub-menu");

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
  keywordFromHome = localStorage.getItem("searchKeyword");

  if (!spLocal || spLocal.length === 0) {
    sanphan1.innerHTML = `<p>⚠️ Không có dữ liệu trong localStorage. Vui lòng thêm sản phẩm trước.</p>`;
    return;
  }
  hienThiDanhMuc();
  mangsanpham = spLocal;
  sanPhamLoc = mangsanpham;
  hienThiSanPham(1);
  if (keywordFromHome) {
    // 2. Nếu có từ khóa, dùng nó để tìm kiếm
    timkiem(keywordFromHome); 
    
    // Tùy chọn: Đặt từ khóa vào ô input trên trang sản phẩm
    const productSearchInput = document.getElementById("timkiem");
    if (productSearchInput) {
        productSearchInput.value = keywordFromHome;
    }

    // 3. Xóa từ khóa sau khi dùng xong
    localStorage.removeItem("searchKeyword"); 
    
} else {
    // 4. Nếu KHÔNG có từ khóa, hiển thị tất cả (tìm kiếm rỗng)
    timkiem(""); 
}
  console.log("Dữ liệu lấy từ localStorage:", mangsanpham);
}
document.getElementById("timkiem").addEventListener("input",(e) =>{
  timkiem(e.target.value);
})
// function hienthiloai(){
//   const
// }

// ======== HIỂN THỊ SẢN PHẨM =========
function hienThiSanPham(trang) {
  sanphan1.innerHTML = "";
  const batDau = (trang - 1) * soSanPhamMoiTrang;
  const ketThuc = batDau + soSanPhamMoiTrang;
  const mangHienThi = sanPhamLoc.slice(batDau, ketThuc);

  if (mangHienThi.length === 0) {
    sanphan1.innerHTML = "<p>Không tìm thấy sản phẩm nào.</p>";
    phantrang1.innerHTML = "";
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
    sanphan1.insertAdjacentHTML("beforeend", productHTML);
  });

  taoPhanTrang();
}

// ======== TẠO PHÂN TRANG =========
// function taoPhanTrang() {
//   phantrang1.innerHTML = "";
//   const tongTrang = Math.ceil(sanPhamLoc.length / soSanPhamMoiTrang);

//   for (let i = 1; i <= tongTrang; i++) {
//     const li = document.createElement("li");
//     li.textContent = i;
//     li.classList.toggle("active", i === trangHienTai);
//     li.addEventListener("click", () => {
//       trangHienTai = i;
//       hienThiSanPham(trangHienTai);
//     });
//     phantrang1.appendChild(li);
//   }
// }
function taoPhanTrang(){
  phantrang1.innerHTML="";
  const tongTrang=Math.ceil(sanPhamLoc.length/soSanPhamMoiTrang);
  if(tongTrang<=1) return;
  const truoc=document.createElement("li");
  truoc.innerHTML="&laquo;";
  truoc.classList.add("arrow");
  truoc.addEventListener("click",()=>{
    if(trangHienTai>1){
      trangHienTai--;
      hienThiSanPham(trangHienTai);

    }
  });
  phantrang1.appendChild(truoc);
  const maxtrang=3;
  let batdau=Math.max(1,trangHienTai-maxtrang);
  let ketThuc=Math.min(tongTrang,trangHienTai+maxtrang);
  if(trangHienTai<=maxtrang){
    ketThuc=Math.min(tongTrang,maxtrang*2+1);

  }
  if(trangHienTai>=tongTrang-maxtrang){
    batdau=Math.max(1,tongTrang-maxtrang*2);
  }
  if(batdau>1){
    const dau=document.createElement("li");
    dau.textContent=1;
    dau.addEventListener("click", () =>{
      trangHienTai=1;
      hienThiSanPham(trangHienTai);
    })
    phantrang1.appendChild(dau);
  }
  if(batdau>2){
    const thu3=document.createElement("li");
    thu3.textContent="...";
    thu3.classList.add("Thu3");
    phantrang1.appendChild(thu3);
  }
  for(let i=batdau; i<=ketThuc;i++){
    const li=document.createElement("li");
    li.textContent=i;
    if(i==trangHienTai) li.classList.add("active");
    li.addEventListener("click", ()=>
    {
      trangHienTai=i;
      hienThiSanPham(trangHienTai);
    })
    phantrang1.appendChild(li);
  }
  if(ketThuc<tongTrang){
    if(ketThuc<tongTrang-1){
      const thu3=document.createElement("li");
      thu3.textContent='...';
      thu3.classList.add("thu3");
      phantrang1.appendChild(thu3);
    }
    const cuoi=document.createElement("li");
    cuoi.textContent=tongTrang;
    cuoi.addEventListener("click", () =>{
        trangHienTai=tongTrang;
        hienThiSanPham(trangHienTai);
    })
    phantrang1.appendChild(cuoi);
  }
  const sau=document.createElement("li");
  sau.textContent="&raquo;";
  sau.classList.add("arrow");
  sau.addEventListener("click", ()=>{
    if(trangHienTai<tongTrang){
        trangHienTai++;
        hienThiSanPham(trangHienTai);
    }
  })
  phantrang1.appendChild(sau);
}

// ======== LỌC THEO LOẠI =========
// ======== LỌC THEO LOẠI VÀ LÀM NỔI BẬT =========
function locTheoLoai(maLoai) {
  sanPhamLoc = mangsanpham.filter((sp) => sp.loaiSP === maLoai);
  trangHienTai = 1;

  const danhMucItems = document.querySelectorAll(".sanpham1"); 
  danhMucItems.forEach(item => {
    item.classList.remove("active");
    if (item.dataset.mamh === maLoai) {
      item.classList.add("active");
    }
  });

  hienThiSanPham(trangHienTai);
}

if (submenu1) {
  submenu1.addEventListener("click", (e) => {
      // Tìm thẻ <li> gần nhất có class 'sanpham'
      const danhMucClick = e.target.closest(".sanpham1"); 
      
      if (danhMucClick) {
          e.preventDefault();
          // Lấy mã loại từ dataset của thẻ <li> tìm được
          locTheoLoai(danhMucClick.dataset.mamh); 
      }
  });
}
if(menusub){
  menusub.addEventListener("click", (e)=>
  {
    const danhmucn=e.target.closest(".sp");
    if(danhmucn){
      e.preventDefault();
      locTheoLoai(danhmucn.dataset.mamh);
    }
  })
}
// Giữ nguyên logic else { console.warn... }

// menu1.addEventListener("click", (e) => {
//   if (e.target.classList.contains("sanpham")) {
//     locTheoLoai(e.target.dataset.mamh);
//   }
// });

// File JS của bạn (Phần Sự kiện)


  

// ======== XEM CHI TIẾT =========

sanphan1.addEventListener("click", (e) => {
  const product = e.target.closest(".product");
  if (!product) return;

  const id = product.dataset.id;
  const sp = mangsanpham.find((item) => item.maSP === id);
  if (!sp) return alert("Không tìm thấy sản phẩm!");

  sanphan1.style.display = "none";
  phantrang1.style.display = "none";
  thitiet1.style.display = "block";

  thitiet1.innerHTML = `
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
    thitiet1.style.display = "none";
    sanphan1.style.display = "";
    phantrang1.style.display = "";
  });
});

// ======== TÌM KIẾM =========
function timkiem(tukhoa) {
  tukhoa = tukhoa.trim().toLowerCase();
  sanPhamLoc = tukhoa
    ? mangsanpham.filter((sp) => sp.tenSP.toLowerCase().includes(tukhoa))
    : mangsanpham;
  trangHienTai = 1;
  hienThiSanPham(trangHienTai);
  const danhMucItems = document.querySelectorAll(".sanpham1");
  danhMucItems.forEach((item) => {
    item.classList.remove("active");
  });
}

// ======== THÊM SẢN PHẨM MỚI =========
function themSpVoDanhSach(spMoi) {
  mangsanpham.push(spMoi);
  setlocalStore("product", mangsanpham);
  sanPhamLoc = mangsanpham;
  hienThiSanPham(trangHienTai);
  console.log("Đã thêm sản phẩm mới:", spMoi);
}
// window.addEventListener("DOMContentLoaded", ()=>{
//   const danhmuc=document.querySelector(".loai");
//   if(!danhmuc) return;
//   const cacloai=[... new Set(tatCaSanPham.map(sp=>sp.loaiSP))];
//   cacloai.forEach(loai=>
//   {
//     const sanphamdaidien=tatCaSanPham.find(sp =>sp.loaiSP===loai);
//     const  li=document.createElement("li");
//     li.classList.add("sanpham");
//     li.dataset.mamh = loai;
//     li.innerHTML=`
//     <div class="anh">
//                 <img src="${sanphamdaidien?.hinhAnh}" alt="${loai}" />
//               </div>
//               <p>${chuyenTenLoai(loai)}</p>
//     `;
//     danhmuc.appendChild(li);
//   }
//   )
// })
// function chuyenTenLoai(maLoai) {
//   switch (maLoai) {
//     case "may_giat": return "Máy giặt";
//     case "tu_lanh": return "Tủ lạnh";
//     case "bep_dien": return "Bếp điện";
//     case "ban_ui": return "Bàn ủi";
//     default: return "Khác";
//   }
// }
function hienThiDanhMuc() {
  const danhmuc = document.querySelector(".loai");
  if (!danhmuc) return;

  const data = getlocalStore("product") || [];
  danhmuc.innerHTML = "";

  const loaiKhacNhau = [...new Set(data.map(sp => sp.loaiSP))];

  const chuyenTenLoai = {
      may_giat: "Máy Giặt",
      tv: "Tivi",
      tu_lanh: "Tủ Lạnh",
      may_lanh: "Máy Lạnh",
      may_loc_khong_khi: "Máy Lọc Không Khí"
  };

  loaiKhacNhau.forEach(loai => {
      const spDaiDien = data.find(sp => sp.loaiSP === loai);
      const li = document.createElement("li");
      li.classList.add("sanpham1");
      li.dataset.mamh = loai;

      li.innerHTML = `
          <div class="anh">
              <img src="${spDaiDien?.hinhAnh || './img/default.png'}" alt="${chuyenTenLoai[loai] || loai}">
          </div>
          <p>${chuyenTenLoai[loai] || loai}</p>
      `;

      danhmuc.appendChild(li);
  });
}


getData();
})();