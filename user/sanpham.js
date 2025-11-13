(() => {
    const sanphan1 = document.getElementById("products");
    const phantrang1 = document.getElementById("phantrang");
    const submenu1 = document.querySelector(".loai");
    const thitiet1 = document.getElementById("chitiet");
    const locGiaElement = document.getElementById("locGia"); 

    const soSanPhamMoiTrang = 12;
    let mangsanpham = [];
    let sanPhamLoc = [];
    let trangHienTai = 1;

    // Các biến trạng thái lọc toàn cục
    let currentKeyword = "";
    let currentMaLoai = "all"; 
    let giaLocHienTai = "all"; 

    // ======== HÀM KIỂM TRA HIỂN THỊ =========
    function kiemTraHienThi(trangThai) {
        // Xử lý cả string và boolean
        if (typeof trangThai === 'boolean') {
            return trangThai === true; // true thì hiển thị
        } else if (typeof trangThai === 'string') {
            return trangThai === "true" || trangThai === "1"; // "true" hoặc "1" thì hiển thị
        }
        return false; // Mặc định ẩn
    }

    // ======== LƯU / LẤY LOCAL STORAGE =========
    const tableSp = localStorage.getItem("product");

    // Chỉ khởi tạo nếu chưa có dữ liệu
    if (!tableSp) {
        localStorage.setItem("product", JSON.stringify(tatCaSanPham || []));
        console.log("Đã khởi tạo dữ liệu sản phẩm mặc định");
    }

    function setlocalStore(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    function getlocalStore(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }
    
    // Hàm hỗ trợ: chuyển giá tiền chuỗi sang số
    function parsePrice(priceStr) {
        if (!priceStr) return 0;
        return parseInt(priceStr.replace(/[^0-9]/g, ''));
    }

    // ======== LỌC SẢN PHẨM THEO TRẠNG THÁI HIỂN THỊ =========
    function locTheoTrangThai(ds) {
        return ds.filter(sp => {
            const hienThi = kiemTraHienThi(sp.hienAn);
            console.log(`Sản phẩm: ${sp.tenSP}, hienAn: ${sp.hienAn}, Hiển thị: ${hienThi}`);
            return hienThi; // Chỉ hiển thị nếu true
        });
    }

    // ======== LỌC SẢN PHẨM THEO GIÁ =========
    function locTheoGia(ds, khoangGia) {
        if (khoangGia === 'all') return ds;

        return ds.filter(sp => {
            const giaBan = sp.gsht || parsePrice(sp.giaHienTai); 
            
            switch (khoangGia) {
                case 'duoi5':
                    return giaBan < 5000000;
                case '5den10':
                    return giaBan >= 5000000 && giaBan <= 10000000;
                case '10den20':
                    return giaBan > 10000000 && giaBan <= 20000000;
                case 'tren20':
                    return giaBan > 20000000;
                default:
                    return true;
            }
        });
    }

    // ======== HÀM LỌC TỔNG HỢP =========
    function locSanPhamTongHop() {
        let dsLoc = mangsanpham;

        // 1. Lọc theo LOẠI
        if (currentMaLoai !== "all") {
            dsLoc = dsLoc.filter(sp => String(sp.maMatHang) === String(currentMaLoai));
        }

        // 2. Lọc theo GIÁ BÁN
        dsLoc = locTheoGia(dsLoc, giaLocHienTai);

        // 3. Lọc theo TỪ KHÓA
        if (currentKeyword) {
            dsLoc = dsLoc.filter((sp) => sp.tenSP.toLowerCase().includes(currentKeyword));
        }
        
        sanPhamLoc = dsLoc;
        trangHienTai = 1;
        hienThiSanPham(trangHienTai);
    }

    // ======== ĐỒNG BỘ GIÁ HIỂN THỊ =========
    function dongBoGiaHienThi(sanPhamArray) {
        let coThayDoi = false;
        
        const ketQua = sanPhamArray.map(sp => {
            const spMoi = {...sp};
            
            // Nếu gsht có giá trị nhưng giaHienTai không khớp, thì cập nhật giaHienTai
            if (spMoi.gsht && spMoi.giaHienTai !== (spMoi.gsht.toLocaleString("vi-VN") + "đ")) {
                spMoi.giaHienTai = spMoi.gsht.toLocaleString("vi-VN") + "đ";
                coThayDoi = true;
            }
            
            // Nếu gsgg có giá trị nhưng giaGoc không khớp, thì cập nhật giaGoc
            if (spMoi.gsgg && spMoi.giaGoc !== (spMoi.gsgg.toLocaleString("vi-VN") + "đ")) {
                spMoi.giaGoc = spMoi.gsgg.toLocaleString("vi-VN") + "đ";
                coThayDoi = true;
            }
            
            return spMoi;
        });
        
        if (coThayDoi) {
            localStorage.setItem("product", JSON.stringify(ketQua));
            console.log("✅ Đã đồng bộ giá hiển thị và lưu vào localStorage");
        }
        
        return ketQua;
    }

    // ======== CẬP NHẬT DANH SÁCH SẢN PHẨM =========
    function capNhatLaiDanhSachSanPham() {
        const spLocal = getlocalStore("product");
        if (spLocal && spLocal.length > 0) {
            const spDaDongBo = dongBoGiaHienThi(spLocal).map(sp => ({
                ...sp,
                hienAn: (sp.hienAn === true || sp.hienAn === "true" || sp.hienAn === 1 || sp.hienAn === "1")
            }));
            mangsanpham = locTheoTrangThai(spDaDongBo);
            locSanPhamTongHop();
            console.log(`🔄 Đã cập nhật danh sách: ${mangsanpham.length} sản phẩm được hiển thị`);
        } else {
            console.log("⚠️ Không có dữ liệu sản phẩm trong localStorage");
            sanphan1.innerHTML = `<p>⚠️ Không có dữ liệu sản phẩm. Vui lòng thêm sản phẩm trước.</p>`;
        }
    }
    

    // ======== LẤY DỮ LIỆU VÀ KHỞI TẠO =========
    function getData() {
        const spLocal = getlocalStore("product");
        let keywordFromHome = localStorage.getItem("searchKeyword"); 
        let maMHToFilter = localStorage.getItem("filterMaMH");

        if (!spLocal || spLocal.length === 0) {
            sanphan1.innerHTML = `<p>⚠️ Không có dữ liệu trong localStorage. Vui lòng thêm sản phẩm trước.</p>`;
            return;
        }
        
        // QUAN TRỌNG: Chỉ gọi locTheoTrangThai một lần
        const spDaDongBo = dongBoGiaHienThi(spLocal);
        mangsanpham = locTheoTrangThai(spDaDongBo);

        console.log(`Tổng sản phẩm trong localStorage: ${spLocal.length}`);
        console.log(`Số sản phẩm được hiển thị: ${mangsanpham.length}`);

        // Thiết lập trạng thái lọc từ localStorage
        if (maMHToFilter) {
            currentMaLoai = maMHToFilter;
            localStorage.removeItem("filterMaMH");
        } else if (keywordFromHome) {
            currentKeyword = keywordFromHome.toLowerCase();
            localStorage.removeItem("searchKeyword");
        }
        
        // Thực hiện lọc và hiển thị
        locSanPhamTongHop();
        hienThiDanhMuc(); 
    }

    // ======== HIỂN THỊ SẢN PHẨM =========
    function hienThiSanPham(trang) {
        const matHang = JSON.parse(localStorage.getItem("matHang")) || [];
const product = JSON.parse(localStorage.getItem("product")) || [];
 const matHangHien = matHang.filter(mh => mh.hienThi === true);
const maMatHangHien = matHangHien.map(mh => mh.maMatHang);

// Lọc danh sách sản phẩm chỉ giữ loại đang hiển thị
const sanPhamLoc = product.filter(sp =>
  maMatHangHien.includes(Number(sp.maMatHang))
);
        sanphan1.innerHTML = "";
        const sanPhamHien = sanPhamLoc.filter(sp =>
        sp.hienThi === true ||
        sp.hienThi === "true" ||
        sp.hienThi === 1 ||
        sp.hienThi === "1"
    );
        const batDau = (trang - 1) * soSanPhamMoiTrang;
        const ketThuc = batDau + soSanPhamMoiTrang;
        const mangHienThi = sanPhamLoc.slice(batDau, ketThuc);

        if (mangHienThi.length === 0) {
            sanphan1.innerHTML = `
                <div class="no-products">
                    <p>Không tìm thấy sản phẩm nào phù hợp.</p>
                    <p>Sản phẩm được kích hoạt: ${mangsanpham.length}</p>
                    <p>Tổng sản phẩm tìm thấy: ${sanPhamLoc.length}</p>
                </div>
            `;
            phantrang1.innerHTML = "";
            return;
        }

<<<<<<< Updated upstream
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
=======
        mangHienThi.forEach((sp) => {
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
                            <div onclick="" class="mua">Mua</div>
                            <div><i class="nav-cart fa-solid fa-cart-shopping" style="margin-left:7px;"></i></div>
                        </div>
                    </div>
                </div>
            `;
            sanphan1.insertAdjacentHTML("beforeend", productHTML);
        });
>>>>>>> Stashed changes

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
    function locTheoLoai(maLoai) {
        currentMaLoai = String(maLoai); 
        currentKeyword = ""; // Reset từ khóa khi lọc theo loại

        const danhMucItems = document.querySelectorAll(".sanpham1");
        danhMucItems.forEach(item => {
            item.classList.toggle("active", String(item.dataset.mamh) === currentMaLoai);
        });
        
        locSanPhamTongHop();
    }

<<<<<<< Updated upstream
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
        mangsanpham.push(spMoi); 
        setlocalStore("product", mangsanpham);
        sanPhamLoc = mangsanpham;
        hienThiSanPham(trangHienTai);
        console.log("Đã thêm sản phẩm mới:", spMoi);
    }
    
    // SỬA LỖI HIỂN THỊ DANH MỤC (Giữ nguyên)
=======
    // ======== HIỂN THỊ DANH MỤC =========
>>>>>>> Stashed changes
    function hienThiDanhMuc() {
        const danhmuc = document.querySelector(".loai");
        if (!danhmuc) return;

        const data = mangsanpham || []; 
        danhmuc.innerHTML = ""; 

        const loaiKhacNhau = [...new Set(data.map(sp => sp.maMatHang))];

        const tenMatHang = (ma) => {
            // Đảm bảo biến matHang tồn tại
            if (typeof matHang === 'undefined') {
                return `Danh mục ${ma}`;
            }
            const item = matHang.find(mh => String(mh.maMatHang).toLowerCase() === String(ma).toLowerCase());
            return item ? item.tenMatHang : 'Khác';
        };

        loaiKhacNhau.forEach(maMH => {
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

    // ======== EVENT LISTENERS =========
    if(document.getElementById("timkiem")) {
        document.getElementById("timkiem").addEventListener("input",(e) =>{
            currentKeyword = e.target.value.toLowerCase();
            // Xóa active danh mục khi gõ từ khóa
            const danhMucItems = document.querySelectorAll(".sanpham1");
            danhMucItems.forEach((item) => item.classList.remove("active"));
            locSanPhamTongHop();
        })
    }
    
    if (locGiaElement) {
        locGiaElement.addEventListener("change", (e) => {
            giaLocHienTai = e.target.value;
            locSanPhamTongHop();
        });
    }

    submenu1.addEventListener("click", (e) => {
        const danhMucClick = e.target.closest(".sanpham1"); 
        if (danhMucClick) {
            e.preventDefault();
            locTheoLoai(danhMucClick.dataset.mamh); 
        }
    });

    // Xem chi tiết sản phẩm
    sanphan1.addEventListener("click", (e) => {
        const product = e.target.closest(".product");
        if (!product) return;

        const id = Number(product.dataset.id); 
        const sp = mangsanpham.find((item) => item.maSP === id); 
        if (!sp) return alert("Không tìm thấy sản phẩm!");

        sanphan1.style.display = "none";
        phantrang1.style.display = "none";
        thitiet1.style.display = "block";

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
                        <p><b>Trạng thái hiển thị:</b> ${sp.hienAn}</p>
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
    // ======== HIỂN THỊ COMBOBOX LOẠI =========
function hienThiComboLoai() {
    const theo_loai = document.getElementById("theo_loai");
    if (!theo_loai || typeof matHang === "undefined") return;

    theo_loai.innerHTML = "";

    matHang.forEach(row => {
        if (row.hienThi === true || row.hienThi === "true" || row.hienThi === 1 || row.hienThi === "1") {
            const option = document.createElement('option');
            option.textContent = row.tenMatHang;
            option.value = row.maMatHang;
            theo_loai.appendChild(option);
        }
    });
}

      

    // Sự kiện load trang
    window.addEventListener('load', function() {
        capNhatLaiDanhSachSanPham();
    });

    // Khởi chạy
    getData();
    hienThiComboLoai();
})();