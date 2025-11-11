(() => {
  const sanphan1 = document.getElementById("products");
  const phantrang1 = document.getElementById("phantrang");
  // const menu1 = document.querySelector(".loai");
  const submenu1 = document.querySelector(".loai");
  const thitiet1 = document.getElementById("chitiet");
  

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
  
  // **LƯU Ý:** Dòng này sẽ ghi đè dữ liệu nếu bạn không muốn nó tự động reset
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
      let keywordFromHome = localStorage.getItem("searchKeyword"); 
      let maMHToFilter = localStorage.getItem("filterMaMH");// Sửa keywordFromHome

      if (!spLocal || spLocal.length === 0) {
          sanphan1.innerHTML = `<p>⚠️ Không có dữ liệu trong localStorage. Vui lòng thêm sản phẩm trước.</p>`;
          return;
      }
      
      mangsanpham = spLocal;
      sanPhamLoc = mangsanpham;
      
      hienThiDanhMuc(); // Gọi hàm hiển thị danh mục
      hienThiSanPham(1);
      if (maMHToFilter) {
        // Áp dụng lọc ngay lập tức
        locTheoLoai(maMHToFilter);
        // Xóa mã lọc để lần sau truy cập trang sản phẩm sẽ hiển thị TẤT CẢ
        localStorage.removeItem("filterMaMH");
        
    } else if (keywordFromHome) {
        // ... (logic tìm kiếm cũ)
        timkiem(keywordFromHome);
        localStorage.removeItem("searchKeyword");
        
    }
          // 3. Xóa từ khóa sau khi dùng xong
          
          
      else {
          // 4. Nếu KHÔNG có từ khóa, hiển thị tất cả (tìm kiếm rỗng)
          timkiem("");
      }
      console.log("Dữ liệu lấy từ localStorage:", mangsanpham);
  }
  
  // Đảm bảo phần này có thể truy cập được document.getElementById("timkiem")
  if(document.getElementById("timkiem")) {
       document.getElementById("timkiem").addEventListener("input",(e) =>{
          timkiem(e.target.value);
      })
  }


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
          // LƯU Ý: Đổi giaGoc và giaHienTai để hiển thị đúng giá Gốc và giá Giảm
          const productHTML = `
              <div class="product" data-id="${sp.maSP}">
                  <div class="anh1">
                      <img src="${sp.hinhAnh}" alt="${sp.tenSP}">
                      <h4 style="">${sp.tenSP}</h4>
                  </div>
                  
                  <div class="nho">
                      <div class="price">
                          <span class="price-old">${sp.giaGoc}</span> 
                          <span class="price-new">${sp.giaHienTai}</span> 
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
  // SỬA LỖI LỌC: Đã đổi sp.loaiSP thành sp.maMatHang
  function locTheoLoai(maLoai) {
    maLoai = parseInt(maLoai); // ✅ ép kiểu sang số
  
    sanPhamLoc = mangsanpham.filter(sp => Number(sp.maMatHang) === maLoai);
  
    trangHienTai = 1;
  
    const danhMucItems = document.querySelectorAll(".sanpham1");
    danhMucItems.forEach(item => {
      item.classList.toggle("active", Number(item.dataset.mamh) === maLoai);
    });
  
    hienThiSanPham(trangHienTai);
  }
  
  
  submenu1.addEventListener("click", (e) => {
    const danhMucClick = e.target.closest(".sanpham1"); 
    if (danhMucClick) {
      e.preventDefault();
      locTheoLoai(danhMucClick.dataset.mamh); 
    }
  });
  
  

  // ======== XEM CHI TIẾT =========

  sanphan1.addEventListener("click", (e) => {
      const product = e.target.closest(".product");
      if (!product) return;

      const id = Number(product.dataset.id); // Ép kiểu id sang number để tìm
      const sp = mangsanpham.find((item) => item.maSP === id); // Sửa tìm kiếm bằng maSP (number)
      if (!sp) return alert("Không tìm thấy sản phẩm!");

      sanphan1.style.display = "none";
      phantrang1.style.display = "none";
      thitiet1.style.display = "block";

      // LƯU Ý: Trong dữ liệu gốc, các thuộc tính là: tenSP, hinhAnh, giaHienTai, maMatHang.
      // Cần sửa các thuộc tính hiển thị trong chi tiết
      thitiet1.innerHTML = `
          <div class="chitiet-sanpham">
              <button id="backBtn">← Quay lại</button>
              <div class="chitiet-content">
                  <img src="${sp.hinhAnh}" alt="${sp.tenSP}">
                  <div class="info">
                      <h2>${sp.tenSP}</h2>
                      <p><b>Giá Gốc:</b> ${sp.giaGoc}</p>
                      <p><b>Giá Khuyến Mãi:</b> ${sp.giaHienTai}</p>
                      <p><b>Thương hiệu:</b> ${sp.thuongHieu}</p>
                      <p><b>Mã mặt hàng:</b> ${sp.maMatHang}</p>
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
  
  // SỬA LỖI HIỂN THỊ DANH MỤC: Dùng mảng matHang và maMH để tìm tên
  function hienThiDanhMuc() {
    const danhmuc = document.querySelector(".loai");
    if (!danhmuc) return;

    const data = getlocalStore("product") || [];
    danhmuc.innerHTML = ""; 

    // Lấy danh sách mã mặt hàng duy nhất
    const loaiKhacNhau = [...new Set(data.map(sp => sp.maMatHang))];

    // Hàm lấy tên danh mục
    const tenMatHang = (ma) => {
      const item = matHang.find(mh => String(mh.maMatHang).toLowerCase() === String(ma).toLowerCase());
      return item ? item.tenMatHang : 'Khác';
    };

    loaiKhacNhau.forEach(maMH => {
        // Lấy 1 sản phẩm đại diện để lấy hình ảnh
        const spDaiDien = data.find(sp => sp.maMatHang === maMH);
        const tenDM = tenMatHang(maMH);

        const li = document.createElement("li");
        li.classList.add("sanpham1");
        li.dataset.mamh = maMH;

        li.innerHTML = `
            <div class="anh">
                <img src="${spDaiDien?.hinhAnh || './img/default.png'}" alt="${tenDM}">
            </div>
            <p>${tenDM}</p>
        `;

        danhmuc.appendChild(li);
    });
  }
  const menusub = document.querySelector(".sub-menu");
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
  
  getData();
})();
