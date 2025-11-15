(() => {
  const sanphan1 = document.getElementById("products");
  const phantrang1 = document.getElementById("phantrang");
  const submenu1 = document.querySelector(".loai");
  const thitiet1 = document.getElementById("chitiet");

  // **[ĐÃ CẬP NHẬT]** Lấy element cho lọc giá
  const locGiaElement = document.getElementById("locGia");

  const soSanPhamMoiTrang = 12;
  let mangsanpham = [];
  let sanPhamLoc = [];
  let trangHienTai = 1;

  // Các biến trạng thái lọc toàn cục
  let currentKeyword = "";
  let currentMaLoai = "all";
  let giaLocHienTai = "all";
  let matHang = [];

  // ======== LƯU / LẤY LOCAL STORAGE (Giữ nguyên) =========
  const tableSp = localStorage.getItem("product");

  if (!tableSp) {
    // Chỉ set khi Local Storage chưa có dữ liệu
    setlocalStore("product", tatCaSanPham);
    console.log("Đã khởi tạo dữ liệu sản phẩm mặc định.");
  } else {
    console.log("Đã có dữ liệu sản phẩm trong localStorage.");
  }
  // function setlocalStore(key, value) {
  //     localStorage.setItem(key, JSON.stringify(value));
  // }

  function getlocalStore(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  // Hàm hỗ trợ: chuyển giá tiền chuỗi sang số
  function parsePrice(priceStr) {
    if (!priceStr) return 0;
    return parseInt(priceStr.replace(/[^0-9]/g, ""));
  }

  // ======== [MỚI] LỌC SẢN PHẨM THEO GIÁ =========
  function locTheoGia(ds, khoangGia) {
    if (khoangGia === "all") return ds;

    return ds.filter((sp) => {
      // Dùng gsht (giá số hiện tại) nếu có, nếu không thì parse giaHienTai
      const giaBan = sp.gsht || parsePrice(sp.giaHienTai);

      switch (khoangGia) {
        case "duoi5":
          return giaBan < 5000000;
        case "5den10":
          return giaBan >= 5000000 && giaBan <= 10000000;
        case "10den20":
          return giaBan > 10000000 && giaBan <= 20000000;
        case "tren20":
          return giaBan > 20000000;
        default:
          return true;
      }
    });
  }

  // ======== HÀM LỌC TỔNG HỢP (KẾT HỢP TẤT CẢ BỘ LỌC) =========
  function locSanPhamTongHop() {
    let dsLoc = mangsanpham;

    // 1. Lọc theo LOẠI
    if (currentMaLoai !== "all") {
      dsLoc = dsLoc.filter(
        (sp) => String(sp.maMatHang) === String(currentMaLoai)
      );
    }

    // 2. Lọc theo GIÁ BÁN
    dsLoc = locTheoGia(dsLoc, giaLocHienTai);

    // 3. Lọc theo TỪ KHÓA
    if (currentKeyword) {
      dsLoc = dsLoc.filter((sp) =>
        sp.tenSP.toLowerCase().includes(currentKeyword)
      );
    }

    sanPhamLoc = dsLoc;
    trangHienTai = 1;
    hienThiSanPham(trangHienTai);
  }

  // ======== LẤY DỮ LIỆU VÀ KHỞI TẠO BỘ LỌC =========
  function getData() {
    let spLocal = getlocalStore("product");
    let keywordFromHome = localStorage.getItem("searchKeyword");
    let maMHToFilter = localStorage.getItem("filterMaMH");
    let matHangLocal = getlocalStore("matHang") || [];

    if (!spLocal || spLocal.length === 0) {
      sanphan1.innerHTML = `<p>⚠️ Không có dữ liệu trong localStorage. Vui lòng thêm sản phẩm trước.</p>`;
      return;
    }
    spLocal=spLocal.map(sp =>({...sp,
      maSP:Number(sp.maSP),
      maMatHang:sp.maMatHang?Number(sp.maMatHang):null
    }))

    // 1. Lấy toàn bộ sản phẩm và lọc ẩn/hiện
    mangsanpham = spLocal.filter((sp) => sp.hienAn === "1");
    matHang = matHangLocal;
    const maMatHangDuocHienThi = matHang
        .filter(mh => mh.hienThi === true)
        .map(mh => String(mh.maMatHang));
        mangsanpham = spLocal
        .filter((sp) => sp.hienAn === "1") // Lọc theo trạng thái sản phẩm
        .filter((sp) => maMatHangDuocHienThi.includes(String(sp.maMatHang)));
    // 2. Thiết lập trạng thái lọc từ localStorage
    if (maMHToFilter) {
      currentMaLoai = maMHToFilter;
      localStorage.removeItem("filterMaMH");
    } else if (keywordFromHome) {
      currentKeyword = keywordFromHome;
      localStorage.removeItem("searchKeyword");
    }
    // const spDaChuyenDoi = spLocal.map(sp => {
    //     // Đảm bảo maSP là số. Sử dụng Number() hoặc parseInt().
    //     sp.maSP = Number(sp.maSP); 
    //     // Đảm bảo maMatHang cũng là số (nếu cần thiết cho việc lọc)
    //     if (sp.maMatHang) {
    //         sp.maMatHang = Number(sp.maMatHang);
    //     }
    //     return sp;
    // });

    // 3. Thực hiện lọc và hiển thị
    locSanPhamTongHop();
    hienThiDanhMuc();

    console.log("Dữ liệu lấy từ localStorage:", mangsanpham);
  }

  // Gắn sự kiện cho ô tìm kiếm (Gọi lọc tổng hợp)
  if (document.getElementById("timkiem")) {
    document.getElementById("timkiem").addEventListener("input", (e) => {
      currentKeyword = e.target.value;
      // Xóa active danh mục khi gõ từ khóa
      const danhMucItems = document.querySelectorAll(".sanpham1");
      danhMucItems.forEach((item) => item.classList.remove("active"));
      locSanPhamTongHop();
    });
  }

  // **[MỚI]** Lắng nghe sự kiện thay đổi lọc giá
  if (locGiaElement) {
    locGiaElement.addEventListener("change", (e) => {
      giaLocHienTai = e.target.value;
      locSanPhamTongHop(); // Gọi hàm lọc tổng hợp
    });
  }

  // ======== HIỂN THỊ SẢN PHẨM (Giữ nguyên) =========
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
                          <div onclick="addToCart(${sp.maSP})" class="mua">Mua</div>
                          <div><i class="nav-cart fa-solid fa-cart-shopping" style="margin-left:7px;"></i></div>
                      </div>
                  </div>
              </div>
          `;
      sanphan1.insertAdjacentHTML("beforeend", productHTML);
    });

    taoPhanTrang();
  }

  // ======== CÁC HÀM KHÁC (Giữ nguyên) =========
  // ... (bao gồm taoPhanTrang, locTheoLoai, event listeners cho submenu, chi tiết sản phẩm, v.v...)

  // ======== TẠO PHÂN TRANG (Giữ nguyên) =========
  function taoPhanTrang() {
    phantrang1.innerHTML = "";
    const tongTrang = Math.ceil(sanPhamLoc.length / soSanPhamMoiTrang);
    if (tongTrang <= 1) return;
    const truoc = document.createElement("li");
    truoc.innerHTML = "&laquo;";
    truoc.classList.add("arrow");
    truoc.addEventListener("click", () => {
      if (trangHienTai > 1) {
        trangHienTai--;
        hienThiSanPham(trangHienTai);
      }
    });
    phantrang1.appendChild(truoc);
    const maxtrang = 3;
    let batdau = Math.max(1, trangHienTai - maxtrang);
    let ketThuc = Math.min(tongTrang, trangHienTai + maxtrang);
    if (trangHienTai <= maxtrang) {
      ketThuc = Math.min(tongTrang, maxtrang * 2 + 1);
    }
    if (trangHienTai >= tongTrang - maxtrang) {
      batdau = Math.max(1, tongTrang - maxtrang * 2);
    }
    if (batdau > 1) {
      const dau = document.createElement("li");
      dau.textContent = 1;
      dau.addEventListener("click", () => {
        trangHienTai = 1;
        hienThiSanPham(trangHienTai);
      });
      phantrang1.appendChild(dau);
    }
    if (batdau > 2) {
      const thu3 = document.createElement("li");
      thu3.textContent = "...";
      thu3.classList.add("Thu3");
      phantrang1.appendChild(thu3);
    }
    for (let i = batdau; i <= ketThuc; i++) {
      const li = document.createElement("li");
      li.textContent = i;
      if (i == trangHienTai) li.classList.add("active");
      li.addEventListener("click", () => {
        trangHienTai = i;
        hienThiSanPham(trangHienTai);
      });
      phantrang1.appendChild(li);
    }
    if (ketThuc < tongTrang) {
      if (ketThuc < tongTrang - 1) {
        const thu3 = document.createElement("li");
        thu3.textContent = "...";
        thu3.classList.add("thu3");
        phantrang1.appendChild(thu3);
      }
      const cuoi = document.createElement("li");
      cuoi.textContent = tongTrang;
      cuoi.addEventListener("click", () => {
        trangHienTai = tongTrang;
        hienThiSanPham(trangHienTai);
      });
      phantrang1.appendChild(cuoi);
    }
    const sau = document.createElement("li");
    sau.textContent = "&raquo;";
    sau.classList.add("arrow");
    sau.addEventListener("click", () => {
      if (trangHienTai < tongTrang) {
        trangHienTai++;
        hienThiSanPham(trangHienTai);
      }
    });
    phantrang1.appendChild(sau);
  }

  // ======== LỌC THEO LOẠI (Cập nhật để gọi hàm lọc tổng hợp) =========
  function locTheoLoai(maLoai) {
    currentMaLoai = String(maLoai);
    currentKeyword = ""; // Reset từ khóa khi lọc theo loại

    const danhMucItems = document.querySelectorAll(".sanpham1");
    danhMucItems.forEach((item) => {
      item.classList.toggle(
        "active",
        String(item.dataset.mamh) === currentMaLoai
      );
    });

    locSanPhamTongHop();
  }

  submenu1.addEventListener("click", (e) => {
    const danhMucClick = e.target.closest(".sanpham1");
    if (danhMucClick) {
      e.preventDefault();
      locTheoLoai(danhMucClick.dataset.mamh);
    }
  });

  // ======== XEM CHI TIẾT (Giữ nguyên) =========

  sanphan1.addEventListener("click", (e) => {
    const product = e.target.closest(".product");
    if (!product) return;

    const id = Number(product.dataset.id);
    const sp = mangsanpham.find((item) => item.maSP === id);
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
                      <p><b>Mã mặt hàng:</b> ${sp.maMatHang}</p>
                      <div class="hang">
                          <div onclick="addToCart(${sp.maSP})" class="mua">Mua</div>
                          <div><i class="nav-cart fa-solid fa-cart-shopping" style="margin-left:7px;"></i></div>
                      </div>
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

  // ======== TÌM KIẾM (Đã cập nhật) =========
  function timkiem(tukhoa) {
    currentKeyword = tukhoa.trim().toLowerCase();
    locSanPhamTongHop();
  }

  // ======== THÊM SẢN PHẨM MỚI (Giữ nguyên) =========
  function themSpVoDanhSach(spMoi) {
    // 1. Cập nhật mảng gốc và Local Storage
    mangsanpham.push(spMoi);
    setlocalStore("product", mangsanpham);

    // 2. Thực hiện lọc tổng hợp để cập nhật sanPhamLoc và hiển thị sản phẩm
    // Điều này đảm bảo sản phẩm mới tuân theo mọi bộ lọc (Loại, Giá, Từ khóa) đang được áp dụng.
    locSanPhamTongHop();

    console.log("Đã thêm sản phẩm mới và áp dụng bộ lọc:", spMoi);
  }

  // SỬA LỖI HIỂN THỊ DANH MỤC (Giữ nguyên)
  function hienThiDanhMuc() {
    const danhmuc = document.querySelector(".loai");
    if (!danhmuc) return;

    const data = mangsanpham || [];
    danhmuc.innerHTML = "";

    const loaiKhacNhau = [...new Set(data.map((sp) => sp.maMatHang))];
   
    const tenMatHang = (ma) => {
      const item = matHang.find(
        (mh) => String(mh.maMatHang).toLowerCase() === String(ma).toLowerCase()
      );
      return item ? item.tenMatHang : "Khác";
    };
  //   const maMHCanHienThi = loaiKhacNhau.filter(maMH => 
  //     matHangDuocHienThi.some(mh => String(mh.maMatHang) === String(maMH))
  // );

    loaiKhacNhau.forEach((maMH) => {
      const spDaiDien = data.find((sp) => sp.maMatHang === maMH);
      const tenDM = tenMatHang(maMH);
     
        const li = document.createElement("li");
        li.classList.add("sanpham1");
        li.dataset.mamh = maMH;
  
        li.innerHTML = `
                  <div class="anh">
                      <img src="${
                        spDaiDien?.hinhAnh || "./img/default.png"
                      }" alt="${tenDM}">
                  </div>
                  <p>${tenDM}</p>
              `;
  
        danhmuc.appendChild(li);
    
      
    });
  }
  const menusub = document.querySelector(".sub-menu");
  if (menusub) {
    menusub.addEventListener("click", (e) => {
      const danhmucn = e.target.closest(".sp");
      if (danhmucn) {
        e.preventDefault();
        locTheoLoai(danhmucn.dataset.mamh);
      }
    });
  }

  getData();
})();
