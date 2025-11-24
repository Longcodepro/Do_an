// ===============================================
// === CÁC HÀM XỬ LÝ LOCALSTORAGE (DỮ LIỆU) ===
// ===============================================

function luuLocalStorage(key, giaTri) {
    localStorage.setItem(key, JSON.stringify(giaTri));
}

function layLocalStorage(key) {
    const giaTri = localStorage.getItem(key);
    return giaTri ? JSON.parse(giaTri) : null;
}

function layBangNhap() {
    return layLocalStorage("nhapHang") || []; 
}

function layBangSP() {
    return layLocalStorage("product") || []; 
}

/**
 * Hàm tự động tạo mã nhập hàng (maPhieu) tiếp theo. 
 * Giả định mã phiếu có format "PN" + 3 chữ số (VD: PN001, PN010)
 * @returns {string} Mã nhập hàng tiếp theo
 */
function taoMaPhieuTiepTheo() {
    const bangNhap = layBangNhap();
    if (bangNhap.length === 0) {
        return "PN001"; 
    }

    let maxNumber = 0;
    
    bangNhap.forEach(p => {
        const maString = String(p.maPhieu);
        
        if (maString.toUpperCase().startsWith("PN")) {
            const numberPart = parseInt(maString.substring(2)); 
            if (!isNaN(numberPart) && numberPart > maxNumber) {
                maxNumber = numberPart;
            }
        }
    });

    const newNumber = maxNumber + 1;
    const newMa = "PN" + newNumber.toString().padStart(3, '0');
    return newMa;
}

// Helper: Tìm tên SP dựa vào mã (Chỉ dùng cho bảng chính)
function layTenSPTheoMa(maSP) {
    const bangSP = layBangSP();
    const sanPham = bangSP.find(sp => sp.maSP === maSP);
    return sanPham ? sanPham.tenSP : `(Không tìm thấy SP ID: ${maSP})`;
}


// ==================================================
// === CÁC HÀM XỬ LÝ GIAO DIỆN VÀ LOGIC FORM ===
// ==================================================

/**
 * Helper: Tạo danh sách options cho select Sản phẩm
 * @param {number|string} selectedMaSP Mã SP cần được chọn (selected)
 * @returns {string} HTML cho các options
 */
function layDanhSachOptionsSP(selectedMaSP = '') {
    const bangSP = layBangSP();
    let options = '<option value="">-- Chọn Sản phẩm --</option>'; // Placeholder

    bangSP.forEach(sp => {
        // So sánh dưới dạng chuỗi để đảm bảo so sánh đúng
        const selected = (String(sp.maSP) === String(selectedMaSP)) ? 'selected' : '';
        options += `<option value="${sp.maSP}" ${selected}>[ID: ${sp.maSP}] ${sp.tenSP}</option>`;
    });
    return options;
}

/**
 * Helper: Tạo một dòng sản phẩm mới
 * Đã thay đổi hiển thị tên SP thành thẻ <select>
 * @param {number|string} maSP Mã SP (nếu có)
 * @param {number} soLuong Số lượng (nếu có)
 * @param {number} giaNhap Giá nhập (nếu có)
 * @returns {string} HTML cho dòng sản phẩm
 */
function taoDongSanPham(maSP = '', soLuong = '', giaNhap = '') {
    // Ẩn nút +,- mặc định (sẽ được bật lại trong chế độ Sửa/Thêm)
    const nutThemDisplay = 'style="display:none"'; 
    const nutXoaDisplay = 'style="display:none"'; 

    const optionsHTML = layDanhSachOptionsSP(maSP); 

    return `
    <div class="hangSP">
      <input class="maSP-input" type="text" inputmode="numeric" placeholder="Mã SP (ID)" value="${maSP}">
      <button class="kiem-tra-btn" onclick="kiemTraVaHienThiSP(this)">✔</button> 
      <select class="tenSP-select" onchange="capNhatMaSPTuSelect(this)">
         ${optionsHTML}
      </select>
      <input type="number" class="soLuong" placeholder="SL" min="1" value="${soLuong}">
      <input type="number" class="giaNhap" placeholder="Giá nhập" min="0" value="${giaNhap}"> 
      <button class="nut-them" onclick="themDongSanPham(this)" ${nutThemDisplay}>+</button>
      <button onclick="xoaDongSanPham(this)" ${nutXoaDisplay}>-</button>
    </div>
    `;
}

/**
 * Xử lý khi người dùng CHỌN Sản phẩm từ select.
 * Cập nhật Mã SP (input) tương ứng. (Logic đồng bộ Select -> Input)
 */
function capNhatMaSPTuSelect(select) {
    const hangSP = select.closest('.hangSP');
    const inputMaSP = hangSP.querySelector('.maSP-input');
    
    // Cập nhật giá trị input Mã SP bằng giá trị đã chọn
    inputMaSP.value = select.value;
}

/**
 * Xử lý khi người dùng NHẬP Mã SP và nhấn kiểm tra.
 * Cập nhật select tương ứng. (Logic đồng bộ Input -> Select)
 * @param {HTMLElement} nut Nút kiểm tra (✔)
 */
function kiemTraVaHienThiSP(nut) {
    const hangSP = nut.closest('.hangSP');
    const inputMaSP = hangSP.querySelector('.maSP-input');
    const selectSP = hangSP.querySelector('.tenSP-select');
    const maSP = inputMaSP.value.trim();

    selectSP.value = ""; // Reset select

    if (!maSP) {
        alert("Vui lòng nhập Mã SP hoặc chọn từ danh sách.");
        return;
    }
    
    const maSP_num = parseInt(maSP);

    if (isNaN(maSP_num) || maSP_num <= 0) {
        alert("❗ Mã SP không hợp lệ (phải là số nguyên dương).");
        return;
    }

    const bangSP = layBangSP();
    const sanPham = bangSP.find(sp => sp.maSP === maSP_num);

    if (sanPham) {
        // TÌM THẤY SẢN PHẨM -> Cập nhật select
        selectSP.value = sanPham.maSP; 
    } else {
        // KHÔNG TÌM THẤY SẢN PHẨM -> Báo lỗi và xóa input
        alert(`❌ Mã SP ${maSP} không tồn tại. Vui lòng kiểm tra lại.`);
        inputMaSP.value = ""; 
    }
}

// ✅ Mở form Thêm mới
function hienThiFormThem() {
    // 1. Reset form về trạng thái mặc định
    huyThemPhieu(); 
    
    document.getElementById("formThemPhieu").style.display = "block";
    document.getElementById("nutThem").style.display = "none";
    document.getElementById("nutLuuForm").textContent = "✔ Thêm Phiếu";
    document.getElementById("formThemPhieu").querySelector('h3').textContent = `Thêm Phiếu Nhập Mới`;
    
    // 2. Tự động cấp mã và hiển thị
    const newMa = taoMaPhieuTiepTheo();
    document.getElementById("maPhieuHienThi").value = newMa;
    document.getElementById("maPhieu").value = newMa; 
    
    // 3. Gán ngày hiện tại cho Ngày nhập
    document.getElementById("ngayNhap").valueAsDate = new Date();

    // 4. Khởi tạo dòng sản phẩm mặc định
    const ds = document.getElementById("dsSanPham");
    ds.innerHTML = taoDongSanPham(); 
    
    // 5. Bật chế độ Sửa/Thêm cho dòng sản phẩm
    const firstRow = ds.querySelector(".hangSP");
    firstRow.querySelector(".nut-them").style.display = "inline-block";
    firstRow.querySelector("button:last-child").style.display = "inline-block"; 
    firstRow.querySelector(".kiem-tra-btn").style.display = "inline-block"; // Đảm bảo nút này hiển thị
}

// ✅ Hàm chuyển form Chi tiết sang chế độ Sửa
function chuyenFormSangCheDoSua(maPhieu) {
    document.getElementById("formThemPhieu").querySelector('h3').textContent = `Sửa Phiếu Nhập [${maPhieu}]`;
    document.getElementById("nutLuuForm").textContent = "✔ Lưu Chỉnh Sửa";

    // 1. Hiển thị nút Lưu, ẩn nút Sửa/Xóa/Đóng
    document.getElementById("nutLuuForm").style.display = "inline-block";
    document.getElementById("nutSuaChiTiet").style.display = 'none';
    document.getElementById("nutXoaChiTiet").style.display = 'none';
    document.getElementById("nutDongForm").textContent = "Hủy";

    // 2. Bật input và nút + / -
    document.getElementById("ngayNhap").disabled = false;
    const ds = document.getElementById("dsSanPham");
    ds.querySelectorAll('.hangSP input').forEach(input => input.disabled = false);
    
    const allRows = ds.querySelectorAll('.hangSP');
    allRows.forEach((row, index) => {
        // Hiển thị nút kiểm tra
        row.querySelector('.kiem-tra-btn').style.display = 'inline-block';
        // Hiển thị nút xóa
        row.querySelector('button:last-child').style.display = 'inline-block';
        
        const nutThem = row.querySelector('.nut-them');
        // Chỉ hiển thị nút thêm ở dòng cuối
        nutThem.style.display = (index < allRows.length - 1) ? 'none' : 'inline-block';
    });
}

/**
 * ✅ Load dữ liệu phiếu nhập vào form để xem chi tiết
 * @param {HTMLElement} nut Nút "Chi tiết" được click
 */
function chiTietPhieu(nut) {
    const tr = nut.closest("tr");
    const maPhieu = tr.dataset.maPhieu;
    const ngayNhap = tr.querySelector('td:nth-child(3)').textContent; 
    const trangThai = tr.querySelector('td:nth-child(4)').textContent.trim(); 

    const daHoanThanh = trangThai === 'Hoàn tất'; 
    
    // 1. Lấy chi tiết sản phẩm
    const chiTiet = JSON.parse(tr.dataset.chiTiet);
    
    // 2. Load form
    document.getElementById("formThemPhieu").style.display = "block";
    document.getElementById("nutThem").style.display = "none";
    
    // 3. Cập nhật tiêu đề và nút Đóng/Hủy
    document.getElementById("formThemPhieu").querySelector('h3').textContent = `Chi Tiết Phiếu Nhập [${maPhieu}] - (${trangThai})`;
    document.getElementById("nutDongForm").textContent = "Đóng"; 
    
    // 4. Gán giá trị Mã và Ngày
    document.getElementById("maPhieuHienThi").value = maPhieu;
    document.getElementById("maPhieu").value = maPhieu; 
    document.getElementById("ngayNhap").value = ngayNhap; 
    
    // 5. Load các dòng sản phẩm chi tiết
    const ds = document.getElementById("dsSanPham");
    ds.innerHTML = ''; 
    chiTiet.forEach((item) => {
        ds.innerHTML += taoDongSanPham(item.maSP, item.soLuong, item.giaNhap);
    });
    
    // 6. Cài đặt chế độ Chi tiết/Hoàn tất
    
    // Luôn ẩn nút Lưu ở chế độ Chi tiết ban đầu
    document.getElementById("nutLuuForm").style.display = "none";
    
    const nutSua = document.getElementById("nutSuaChiTiet");
    const nutXoa = document.getElementById("nutXoaChiTiet");

    // Vô hiệu hóa input và ẩn nút + / - và nút kiểm tra (Chế độ Chi tiết mặc định)
    document.getElementById("ngayNhap").disabled = true;
    ds.querySelectorAll('.hangSP input').forEach(input => input.disabled = true);
    ds.querySelectorAll('.hangSP button').forEach(button => button.style.display = 'none');


    if (daHoanThanh) {
        // Hoàn tất: Chỉ hiện nút Đóng 
        nutSua.style.display = 'none';
        nutXoa.style.display = 'none';

    } else {
        // Đang xử lý: Hiển thị nút Sửa/Xóa
        nutSua.style.display = 'inline-block';
        nutXoa.style.display = 'inline-block';
        
        // Gán sự kiện cho nút Sửa và Xóa trong form chi tiết
        nutSua.onclick = function() {
            // Chuyển sang chế độ Sửa thực sự
            chuyenFormSangCheDoSua(maPhieu);
        };

        nutXoa.onclick = function() {
            // Gọi hàm xóa phiếu và đóng form
            xoaPhieuForm(maPhieu); 
        };
    }
}

// Thay thế hàm xoaPhieu cũ để gọi hàm xóa phiếu sau đó gọi huyThemPhieu()
function xoaPhieuForm(maPhieu) {
    if (confirm(`Bạn có chắc chắn muốn xóa phiếu nhập [${maPhieu}] này không? Thao tác này sẽ xóa tất cả các sản phẩm thuộc phiếu này.`)) {
        let bangNhap = layBangNhap();
        
        bangNhap = bangNhap.filter(p => p.maPhieu !== maPhieu);
        
        luuLocalStorage("nhapHang", bangNhap); 
        
        alert(`✅ Đã xóa phiếu nhập [${maPhieu}] thành công!`);

        // Đóng form và cập nhật lại bảng
        huyThemPhieu(); 
    }
}

/**
 * ✅ Hàm gọi xóa phiếu (Dùng cho nút Xóa trên bảng chính)
 * @param {HTMLElement} nut Nút "Xóa" được click
 */
function xoaPhieu(nut) {
    const tr = nut.closest("tr");
    const maPhieu = tr.dataset.maPhieu;
    const trangThai = tr.querySelector('td:nth-child(4)').textContent.trim();

    if (trangThai === 'Hoàn tất') {
        return alert("Không thể xóa phiếu đã 'Hoàn tất'.");
    }

    xoaPhieuForm(maPhieu);
}

// ✅ Reset và Ẩn form
function huyThemPhieu() {
    document.getElementById("maPhieuHienThi").value = "";
    document.getElementById("maPhieu").value = "";
    document.getElementById("ngayNhap").value = "";

    document.getElementById("dsSanPham").innerHTML = ''; 
    
    document.getElementById("formThemPhieu").style.display = "none";
    document.getElementById("nutThem").style.display = "inline-block";

    // Khôi phục lại trạng thái form mặc định 
    document.getElementById("nutLuuForm").style.display = "inline-block"; 
    document.getElementById("nutLuuForm").textContent = "✔ Thêm Phiếu";
    document.getElementById("formThemPhieu").querySelector('h3').textContent = `Thêm/Sửa Phiếu Nhập`;
    
    // Đảm bảo các nút Sửa/Xóa chi tiết bị ẩn và nút Hủy/Đóng trở về mặc định
    document.getElementById("nutSuaChiTiet").style.display = 'none';
    document.getElementById("nutXoaChiTiet").style.display = 'none';
    document.getElementById("nutDongForm").textContent = "Hủy";
    document.getElementById("ngayNhap").disabled = false;
    
    // Đảm bảo các input không bị disabled cho lần sửa/thêm tiếp theo
    document.querySelectorAll('#formThemPhieu input').forEach(input => input.disabled = false);

    // Cập nhật lại giao diện sau khi đóng form sửa/thêm
    quanLyNhapHang(); 
}

// ✅ Thêm dòng SP
function themDongSanPham(nut) {
    const hang = nut.closest(".hangSP");
    const ds = document.getElementById("dsSanPham");
    
    const soLuongValue = hang.querySelector('.soLuong').value;
    const giaNhapValue = hang.querySelector('.giaNhap').value;

    if (!soLuongValue || !giaNhapValue || parseFloat(soLuongValue) <= 0 || parseFloat(giaNhapValue) < 0) {
        return alert("Vui lòng nhập Số lượng (> 0) và Giá nhập (>= 0) hợp lệ cho sản phẩm hiện tại trước khi thêm dòng mới.");
    }
    
    // ẨN nút '+' trên dòng HIỆN TẠI (dòng vừa click)
    hang.querySelector(".nut-them").style.display = "none"; 

    // Thêm dòng sản phẩm MỚI vào cuối danh sách và BẬT nút +,- cho dòng mới
    const newRow = taoDongSanPham(); 
    ds.insertAdjacentHTML('beforeend', newRow);
    
    const newRowElement = ds.lastElementChild;
    newRowElement.querySelector(".nut-them").style.display = "inline-block";
    newRowElement.querySelector("button:last-child").style.display = "inline-block"; 
    newRowElement.querySelector(".kiem-tra-btn").style.display = "inline-block"; 
}

// ✅ Xóa dòng SP
function xoaDongSanPham(nut) {
    const ds = document.getElementById("dsSanPham");
    const hang = nut.closest(".hangSP");
    
    if (ds.children.length === 1)
        return alert("Phải có ít nhất 1 sản phẩm!");

    const isLast = !hang.nextElementSibling;
    
    hang.remove();

    // Nếu dòng cuối bị xóa, phải hiện lại nút '+' ở dòng áp cuối (dòng mới nhất còn lại)
    if (isLast) {
        const cuoi = ds.lastElementChild;
        cuoi.querySelector(".nut-them").style.display = "inline-block"; 
    }
}

// ✅ Lưu phiếu (Cả thêm mới và chỉnh sửa)
function luuPhieu() {
    const ma = document.getElementById("maPhieu").value.trim();
    const ngay = document.getElementById("ngayNhap").value.trim(); 
    const rows = document.querySelectorAll("#dsSanPham .hangSP");
    
    if (!ma) return alert("Lỗi hệ thống: Mã nhập hàng không hợp lệ! Vui lòng tải lại form.");
    if (!ngay) return alert("Vui lòng chọn Ngày nhập hàng!");
        
    let bangNhap = layBangNhap(); 
    let bangSP = layBangSP(); 

    let sanPhamBiLoi = false; 
    let coSPHopLe = false; 
    let newEntries = [];

    const phieuCu = bangNhap.find(p => p.maPhieu === ma);
    const trangThaiCu = phieuCu ? (phieuCu.trangThai === true || phieuCu.trangThai === "Hoàn tất" ? true : false) : false; 


    rows.forEach(r => {
        // Lấy Mã SP từ input (đã được đồng bộ với select)
        let maSP_str = r.querySelector('.maSP-input').value.trim(); 
        
        const sl = +r.querySelector('.soLuong').value;
        const giaNhap = +r.querySelector('.giaNhap').value; 
        
        const maSP_num = parseInt(maSP_str); 
        let sanPhamTonTai = false;

        if (!isNaN(maSP_num) && maSP_num > 0) {
            sanPhamTonTai = bangSP.some(sp => sp.maSP === maSP_num);
        }
        
        // Kiểm tra hợp lệ: SP tồn tại VÀ SL > 0 VÀ Giá >= 0
        if (sanPhamTonTai && sl > 0 && giaNhap >= 0) { 
            coSPHopLe = true;
            
            newEntries.push({
                maPhieu: ma, 
                maSP: maSP_num,
                soLuong: sl,
                giaNhap: giaNhap, 
                ngayNhap: ngay,
                trangThai: trangThaiCu 
            });
        } else if (maSP_str || sl > 0 || giaNhap > 0) {
            // Trường hợp có nhập liệu nhưng không hợp lệ
            if (!sanPhamTonTai && maSP_str) {
                // Đánh dấu lỗi nếu ID được nhập nhưng không tồn tại
                sanPhamBiLoi = true; 
            }
            // Vẫn hiển thị cảnh báo để người dùng biết dòng nào bị lỗi
            if (sl <= 0 || giaNhap < 0) {
                return alert(`Lỗi nhập liệu: Số lượng phải là số dương và Giá nhập phải là số không âm cho Mã SP ${maSP_str}.`);
            }
        }
    });
    
    if (!coSPHopLe) {
        return alert("Vui lòng **nhập Mã SP, nhấn nút kiểm tra (✔)** hoặc **chọn Sản phẩm từ danh sách** và nhập Số lượng, Giá nhập hợp lệ cho ít nhất một sản phẩm!");
    }

    // 1. Xóa các entry cũ (Nếu là sửa phiếu)
    bangNhap = bangNhap.filter(p => p.maPhieu !== ma);
    
    // 2. Cập nhật bảng nhập hàng với các entry mới
    bangNhap = bangNhap.concat(newEntries);
    luuLocalStorage("nhapHang", bangNhap); 
    
    const trangThaiHienTai = trangThaiCu ? "Hoàn tất" : "Đang xử lý";
    alert(sanPhamBiLoi ? `⚠️ Đã lưu phiếu nhập (${trangThaiHienTai}), nhưng có sản phẩm không tồn tại trong bảng sản phẩm. Vui lòng kiểm tra lại trước khi 'Hoàn thành'.` : `✅ Lưu phiếu nhập thành công! (Trạng thái: ${trangThaiHienTai})`);

    huyThemPhieu();
}


// ✅ Hoàn thành phiếu CÓ XÁC NHẬN
function hoanThanhPhieuXacNhan(nut) {
    const maPhieu = nut.closest("tr").dataset.maPhieu;
    
    if (confirm(`Bạn có chắc chắn muốn **HOÀN THÀNH** phiếu nhập [${maPhieu}] này không? Thao tác này sẽ **CẬP NHẬT TỒN KHO**!`)) {
        hoanThanhPhieu(nut); 
    }
}

// ✅ Hàm xử lý hoàn thành phiếu (Không thay đổi logic)
function hoanThanhPhieu(nut) {
    const maPhieu = nut.closest("tr").dataset.maPhieu;
    
    let bangNhap = layBangNhap();
    let bangSP = layBangSP(); 
    
    const itemsCanHoanThanh = bangNhap.filter(p => p.maPhieu === maPhieu && p.trangThai !== true && p.trangThai !== "Hoàn tất");

    if (itemsCanHoanThanh.length === 0) {
        if (bangNhap.some(p => p.maPhieu === maPhieu && (p.trangThai === true || p.trangThai === "Hoàn tất"))) {
            return alert("Phiếu nhập này đã được hoàn thành trước đó.");
        }
        return alert("Lỗi: Không tìm thấy chi tiết phiếu nhập để hoàn thành.");
    }
    
    let capNhatThanhCong = true;
    
    // 1. CẬP NHẬT TỒN KHO TRƯỚC (Cộng dồn)
    itemsCanHoanThanh.forEach(item => {
        const index = bangSP.findIndex(sp => sp.maSP === item.maSP);

        if (index === -1) {
            console.error(`Sản phẩm có mã ${item.maSP} không tồn tại trong bảng 'product'. Không cập nhật tồn kho.`);
            capNhatThanhCong = false;
        } else {
            let tonKhoHienTai = Number(bangSP[index].soLuong || 0);
            
            bangSP[index].soLuong = tonKhoHienTai + item.soLuong;
            
            if (bangSP[index].tinhTrang !== "Còn hàng") {
                bangSP[index].tinhTrang = "Còn hàng";
            }
        }
    });
    
    luuLocalStorage("product", bangSP);

    // 2. CẬP NHẬT TRẠNG THÁI PHIẾU NHẬP
    bangNhap = bangNhap.map(p => {
        if (p.maPhieu === maPhieu) {
            p.trangThai = true; 
        }
        return p;
    });

    luuLocalStorage("nhapHang", bangNhap); 
    
    alert(capNhatThanhCong ? "✅ Hoàn thành phiếu nhập và cập nhật tồn kho thành công!" : "⚠️ Hoàn thành phiếu nhập, nhưng có sản phẩm không tồn tại trong bảng sản phẩm nên tồn kho chưa được cập nhật đầy đủ.");
    
    quanLyNhapHang();
}


// ✅ Tìm phiếu (Không thay đổi logic)
function timPhieuNhap() {
    const txt = document.getElementById("timPhieuInput").value.trim(); 
    
    if (!txt) {
         document.querySelectorAll("#bangNhap tbody tr").forEach(row => {
            row.style.display = "";
        });
        return;
    }

    const bangNhap = layBangNhap(); 
    const phieuGroup = {};
    bangNhap.forEach(item => {
        if (!phieuGroup[item.maPhieu]) {
            phieuGroup[item.maPhieu] = {
                maPhieu: item.maPhieu,
                dsMaSP: []
            };
        }
        phieuGroup[item.maPhieu].dsMaSP.push(String(item.maSP)); 
    });
    
    const maPhieuThoaMan = new Set();
    Object.values(phieuGroup).forEach(p => {
        if (p.dsMaSP.some(maSP => maSP === txt)) { 
            maPhieuThoaMan.add(p.maPhieu);
        }
    });

    document.querySelectorAll("#bangNhap tbody tr").forEach(row => {
        const maPhieuCuaDong = row.dataset.maPhieu;
        row.style.display = maPhieuThoaMan.has(maPhieuCuaDong) ? "" : "none";
    });
}
// ==================================================
// === CÁC HÀM XỬ LÝ GIAO DIỆN CHUNG (LAYOUT) ===
// ==================================================

// Khởi chạy hàm chính
quanLyNhapHang(); 

// ✅ Hiển thị giao diện chính
function quanLyNhapHang() {
    const noiDung = document.getElementById("noi_dung");
    noiDung.innerHTML = `<h2>Quản Lí Phiếu Nhập Hàng</h2>`;

    taoForm(noiDung);
    taoThanhCongCu(noiDung);

    const wrap = document.createElement("div");
    wrap.id = "table-wrap";
    noiDung.appendChild(wrap);

    veBang(layBangNhap()); 
}

// ✅ Render bảng (Chỉnh sửa cột hiển thị và Hành động)
function veBang(danhSach) {
    const wrap = document.getElementById("table-wrap");
    wrap.innerHTML = `
        <table id="bangNhap">
          <thead>
            <tr>
              <th>Mã nhập</th>
              <th>Sản phẩm</th> 
              <th>Ngày nhập</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
    `;

    const tbody = wrap.querySelector("tbody");
    
    // 1. Nhóm dữ liệu theo maPhieu
    const phieuGroup = {};
    danhSach.forEach(item => {
        if (!phieuGroup[item.maPhieu]) {
            phieuGroup[item.maPhieu] = {
                maPhieu: item.maPhieu,
                ngayNhap: item.ngayNhap,
                trangThai: item.trangThai === true || item.trangThai === "Hoàn tất" ? true : false, 
                dsMaSP: [], 
                dsSoLuong: [],
                dsGiaNhap: [], 
            };
        }
        phieuGroup[item.maPhieu].dsMaSP.push(item.maSP);
        phieuGroup[item.maPhieu].dsSoLuong.push(item.soLuong);
        phieuGroup[item.maPhieu].dsGiaNhap.push(item.giaNhap); 
    });
    
    // 2. Render dữ liệu đã nhóm
    Object.values(phieuGroup).forEach(p => {
        
        const dsSP = p.dsMaSP.map(ma => `Mã ${ma}: ${layTenSPTheoMa(ma)}`).join("<br>");
        
        const daHoanThanh = p.trangThai === true; 
        const trangThaiHienThi = daHoanThanh ? "Hoàn tất" : "Đang xử lý";

        const tr = document.createElement("tr");
        tr.dataset.maPhieu = p.maPhieu;
        
        const chiTietPhieu = danhSach.filter(item => item.maPhieu === p.maPhieu).map(item => ({ 
            maSP: item.maSP, 
            soLuong: item.soLuong,
            giaNhap: item.giaNhap || 0 
        }));
        tr.dataset.chiTiet = JSON.stringify(chiTietPhieu); 

        tr.innerHTML = `
            <td>${p.maPhieu}</td>
            <td data-cells="MA_SP">${dsSP}</td> 
            <td>${p.ngayNhap}</td>
            <td>${trangThaiHienThi}</td>
            <td class="hanh-dong">
                <button onclick="chiTietPhieu(this)">Chi tiết</button> 
                <button onclick="hoanThanhPhieuXacNhan(this)" ${daHoanThanh ? 'style="display:none"' : ''}>Hoàn thành</button>
            </td>`;
        tbody.appendChild(tr);
    });
}

// ✅ Thanh công cụ (Không thay đổi)
function taoThanhCongCu(noiDung) {
    const box = document.createElement("div");
    box.className = "filter-box";
    box.innerHTML = `
        <div class="search-group">
            <input type="text" id="timPhieuInput" placeholder="Nhập Mã SP (ID)...">
            <button onclick="timPhieuNhap()">Tìm</button>
        </div>
        <button id="nutThem" onclick="hienThiFormThem()">+ Thêm phiếu</button>
    `;
    noiDung.appendChild(box);
}

// ✅ Tạo form nhập phiếu (Đã thêm nút Sửa/Xóa/Đóng)
function taoForm(parent) {
    const f = document.createElement("div");
    f.id = "formThemPhieu";
    f.style.display = "none";
    f.innerHTML = `
        <h3>Thêm/Sửa Phiếu Nhập</h3>
        <div class="form-row">
            <label>Mã nhập hàng:</label>
            <input type="text" id="maPhieuHienThi" value="(Tự động cấp)" disabled style="border: none; background: #eee;">
            <input type="hidden" id="maPhieu"> </div>

        <div class="form-row">
            <label>Ngày nhập:</label>
            <input type="date" id="ngayNhap" required>
        </div>

        <div class="form-row">
            <label>Sản phẩm:</label>
            <div id="dsSanPham">
            </div>
        </div>

        <div id="hai-nut" style="display:flex; gap:8px; justify-content: flex-end; margin-top: 20px;">
            <button id="nutLuuForm" onclick="luuPhieu()">✔ Lưu</button>
            
            <button id="nutSuaChiTiet" style="display:none; background-color: #f39c12; color: white; border: none; padding: 10px 20px; cursor: pointer;" >Sửa</button> 
            
            <button id="nutXoaChiTiet" style="display:none; background-color: #e74c3c; color: white; border: none; padding: 10px 20px; cursor: pointer;">Xóa</button> 

            <button id="nutDongForm" onclick="huyThemPhieu()" style="background-color: #95a5a6; color: white; border: none; padding: 10px 20px; cursor: pointer;">Hủy</button> 
        </div>
    `;
    parent.appendChild(f);
}