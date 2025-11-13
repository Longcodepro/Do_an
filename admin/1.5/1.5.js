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

// Helper: Tìm tên SP dựa vào mã
function layTenSPTheoMa(maSP) {
    const bangSP = layBangSP();
    const sanPham = bangSP.find(sp => sp.maSP === maSP);
    return sanPham ? sanPham.tenSP : `(Không tìm thấy SP ID: ${maSP})`;
}


// ==================================================
// === CÁC HÀM XỬ LÝ GIAO DIỆN VÀ LOGIC FORM ===
// ==================================================

/**
 * Helper: Tạo một dòng sản phẩm mới
 * Đảm bảo tất cả các thành phần luôn hiển thị.
 * @param {number|string} maSP Mã SP (nếu có)
 * @param {number} soLuong Số lượng (nếu có)
 * @param {number} giaNhap Giá nhập (nếu có)
 * @returns {string} HTML cho dòng sản phẩm
 */
function taoDongSanPham(maSP = '', soLuong = '', giaNhap = '') {
    // Nút '+' sẽ được ẩn/hiện trong hàm themDongSanPham để chỉ hiển thị ở dòng cuối
    const nutThemDisplay = 'style="display:inline-block"'; 
    // Nút '-' luôn hiển thị theo yêu cầu
    const nutXoaDisplay = 'style="display:inline-block"'; 

    const tenSP = maSP ? layTenSPTheoMa(maSP) : 'Chưa kiểm tra Mã SP'; 
    const tenSPDisplay = maSP ? `✅ [ID: ${maSP}] ${tenSP}` : tenSP;

    return `
    <div class="hangSP">
      <input class="maSP-input" type="number" placeholder="Mã SP (ID)" value="${maSP}">
      <button class="kiem-tra-btn" onclick="kiemTraVaHienThiSP()">✔</button> 
      <span class="tenSP-hienThi" data-ma-sp="${maSP}">${tenSPDisplay}</span> 
      <input type="number" class="soLuong" placeholder="SL" min="1" value="${soLuong}">
      <input type="number" class="giaNhap" placeholder="Giá nhập" min="0" value="${giaNhap}"> 
      <button class="nut-them" onclick="themDongSanPham(this)" ${nutThemDisplay}>+</button>
      <button onclick="xoaDongSanPham(this)" ${nutXoaDisplay}>-</button>
    </div>
    `;
}

/**
 * Kiểm tra Mã SP vừa nhập, hiển thị tên sản phẩm nếu tìm thấy. 
 * Luôn giữ các ô Mã SP, nút kiểm tra và tên hiển thị.
 */
function kiemTraVaHienThiSP() {
    // Lấy nút (button) vừa được click từ đối tượng event toàn cục
    const nut = event.target; 
    
    const hangSP = nut.closest('.hangSP');
    const inputMaSP = hangSP.querySelector('.maSP-input');
    const hienThiTenSP = hangSP.querySelector('.tenSP-hienThi');
    const maSP = parseInt(inputMaSP.value.trim());

    // Reset hiển thị trước khi kiểm tra
    hienThiTenSP.dataset.maSp = "";
    hienThiTenSP.textContent = "Đang kiểm tra...";

    if (isNaN(maSP) || maSP <= 0) {
        hienThiTenSP.textContent = "❗ Mã SP không hợp lệ (phải là số nguyên dương).";
        return;
    }

    const bangSP = layBangSP();
    const sanPham = bangSP.find(sp => sp.maSP === maSP);

    if (sanPham) {
        // ✅ TRƯỜNG HỢP 1: TÌM THẤY SẢN PHẨM -> Cập nhật tên và gán mã
        hienThiTenSP.textContent = `✅ [ID: ${sanPham.maSP}] ${sanPham.tenSP}`;
        hienThiTenSP.dataset.maSp = sanPham.maSP;
    } else {
        // ❌ TRƯỜNG HỢP 2: KHÔNG TÌM THẤY SẢN PHẨM -> Báo lỗi trên span
        hienThiTenSP.textContent = `❌ Mã SP ${maSP} không tồn tại.`;
        // Giữ lại input.value để người dùng sửa
        alert(`❌ Không tìm thấy sản phẩm với Mã SP: ${maSP}. Vui lòng kiểm tra lại.`);
    }
}

// ✅ Mở form
function hienThiFormThem() {
    document.getElementById("formThemPhieu").style.display = "block";
    document.getElementById("nutThem").style.display = "none";
    document.getElementById("nutLuuForm").textContent = "✔ Thêm Phiếu";
    
    // 1. Tự động cấp mã và hiển thị
    const newMa = taoMaPhieuTiepTheo();
    document.getElementById("maPhieuHienThi").value = newMa;
    document.getElementById("maPhieu").value = newMa; 
    
    // 2. Gán ngày hiện tại cho Ngày nhập
    document.getElementById("ngayNhap").valueAsDate = new Date();

    // 3. Khởi tạo dòng sản phẩm mặc định
    const ds = document.getElementById("dsSanPham");
    // Tạo dòng SP đầu tiên (không cần truyền tham số vì là form thêm mới)
    ds.innerHTML = taoDongSanPham(); 
    // Ẩn nút '+' trên dòng đầu tiên vì nó là dòng cuối cùng
    ds.querySelector(".hangSP").querySelector("button:nth-last-child(2)").style.display = "inline-block";
}

/**
 * ✅ Load dữ liệu phiếu nhập vào form để chỉnh sửa
 * @param {HTMLElement} nut Nút "Sửa" được click
 */
function suaPhieu(nut) {
    const tr = nut.closest("tr");
    const maPhieu = tr.dataset.maPhieu;
    const ngayNhap = tr.querySelector('td:nth-child(4)').textContent; 
    const trangThai = tr.querySelector('td:nth-child(5)').textContent.trim();
    
    // Cấm sửa nếu đã hoàn tất
    if (trangThai === 'Hoàn tất') {
        return alert("Không thể sửa phiếu đã 'Hoàn tất'.");
    }

    // 1. Lấy chi tiết sản phẩm
    const chiTiet = JSON.parse(tr.dataset.chiTiet);
    
    // 2. Load form (Chỉ hiển thị form, không reset nội dung)
    document.getElementById("formThemPhieu").style.display = "block";
    document.getElementById("nutThem").style.display = "none";
    document.getElementById("nutLuuForm").textContent = "✔ Lưu Chỉnh Sửa";
    
    // 3. Gán giá trị mã và ngày
    document.getElementById("maPhieuHienThi").value = maPhieu;
    document.getElementById("maPhieu").value = maPhieu; 
    document.getElementById("ngayNhap").value = ngayNhap; 

    // 4. Load các dòng sản phẩm chi tiết
    const ds = document.getElementById("dsSanPham");
    ds.innerHTML = ''; // Xóa nội dung cũ
    
    chiTiet.forEach((item) => {
        // Tạo dòng sản phẩm với dữ liệu đã có (sử dụng hàm mới đã luôn hiển thị Mã SP và Tên SP)
        ds.innerHTML += taoDongSanPham(item.maSP, item.soLuong, item.giaNhap);
    });
    
    // 5. Điều chỉnh nút '+' (chỉ hiển thị ở dòng cuối cùng)
    const allRows = ds.querySelectorAll('.hangSP');
    allRows.forEach((row, index) => {
        const nutThem = row.querySelector('button:nth-last-child(2)'); // Nút '+'
        if (index < allRows.length - 1) {
            nutThem.style.display = 'none'; // Ẩn nút '+' trên các dòng cũ
        } else {
            nutThem.style.display = 'inline-block'; // Dòng cuối luôn có nút '+'
        }
    });
}

// ✅ Reset và Ẩn form
function huyThemPhieu() {
    document.getElementById("maPhieuHienThi").value = "";
    document.getElementById("maPhieu").value = "";
    document.getElementById("ngayNhap").value = "";

    document.getElementById("dsSanPham").innerHTML = ''; 
    
    document.getElementById("formThemPhieu").style.display = "none";
    document.getElementById("nutThem").style.display = "inline-block";
}

// ✅ Thêm dòng SP
function themDongSanPham(nut) {
    const hang = nut.closest(".hangSP");
    const ds = document.getElementById("dsSanPham");
    
    const soLuongValue = hang.querySelector('.soLuong').value;
    const giaNhapValue = hang.querySelector('.giaNhap').value;

    // Kiểm tra nếu người dùng chưa nhập SL hoặc Giá trên dòng hiện tại
    if (!soLuongValue || !giaNhapValue || parseFloat(soLuongValue) <= 0 || parseFloat(giaNhapValue) < 0) {
        return alert("Vui lòng nhập Số lượng (> 0) và Giá nhập (>= 0) hợp lệ cho sản phẩm hiện tại trước khi thêm dòng mới.");
    }
    
    // ẨN nút '+' trên dòng HIỆN TẠI (dòng vừa click)
    hang.querySelector("button:nth-last-child(2)").style.display = "none"; 

    // Thêm dòng sản phẩm MỚI vào cuối danh sách
    const newRow = taoDongSanPham(); 
    ds.insertAdjacentHTML('beforeend', newRow);
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
        // Hiện lại nút '+' (nút thứ 2 tính từ cuối) 
        cuoi.querySelector("button:nth-last-child(2)").style.display = "inline-block"; 
    }
}

// ✅ Lưu phiếu (Cả thêm mới và chỉnh sửa)
function luuPhieu() {
    const ma = document.getElementById("maPhieu").value.trim();
    const ngay = document.getElementById("ngayNhap").value.trim(); 
    const rows = document.querySelectorAll("#dsSanPham .hangSP");
    
    // KIỂM TRA MÃ PHIẾU (CHỈ CẦN KIỂM TRA RỖNG VÌ ĐÃ CÓ LOGIC TỰ CẤP)
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
        const maSP_span = r.querySelector('.tenSP-hienThi');
        let maSP_str = maSP_span.dataset.maSp; 
        
        const sl = +r.querySelector('.soLuong').value;
        const giaNhap = +r.querySelector('.giaNhap').value; 

        if (maSP_str && sl > 0 && giaNhap >= 0) { 
            coSPHopLe = true;
            const maSP_num = parseInt(maSP_str); 
            
            if (!bangSP.some(sp => sp.maSP === maSP_num)) {
                sanPhamBiLoi = true;
            }
            
            newEntries.push({
                maPhieu: ma, // Dùng chuỗi
                maSP: maSP_num,
                soLuong: sl,
                giaNhap: giaNhap, 
                ngayNhap: ngay,
                trangThai: trangThaiCu 
            });
        } else if (maSP_str || sl > 0 || giaNhap > 0) {
            return alert("Lỗi nhập liệu: Mã SP phải được kiểm tra (✔), Số lượng phải là số dương và Giá nhập phải là số không âm.");
        }
    });
    
    if (!coSPHopLe) {
        return alert("Vui lòng **nhập Mã SP, nhấn nút kiểm tra (✔)** và nhập Số lượng, Giá nhập hợp lệ cho ít nhất một sản phẩm!");
    }

    // 1. Xóa các entry cũ (Nếu là sửa phiếu)
    bangNhap = bangNhap.filter(p => p.maPhieu !== ma);
    
    // 2. Cập nhật bảng nhập hàng với các entry mới
    bangNhap = bangNhap.concat(newEntries);
    luuLocalStorage("nhapHang", bangNhap); 
    
    const trangThaiHienTai = trangThaiCu ? "Hoàn tất" : "Đang xử lý";
    alert(sanPhamBiLoi ? `⚠️ Đã lưu phiếu nhập (${trangThaiHienTai}), nhưng có sản phẩm không tồn tại trong bảng sản phẩm. Vui lòng kiểm tra lại trước khi 'Hoàn thành'.` : `✅ Lưu phiếu nhập thành công! (Trạng thái: ${trangThaiHienTai})`);

    huyThemPhieu();
    quanLyNhapHang();
}


// ✅ Hoàn thành phiếu
function hoanThanhPhieu(nut) {
    // Lấy mã phiếu dưới dạng chuỗi
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
            // ✅ SỬA LỖI TỒN KHO KHÔNG CỘNG LÊN
            let tonKhoHienTai = bangSP[index].soLuong === undefined ? 0 : bangSP[index].soLuong;
            tonKhoHienTai = Number(tonKhoHienTai);
            if (isNaN(tonKhoHienTai)) {
                tonKhoHienTai = 0;
            }
            // END SỬA LỖI TỒN KHO KHÔNG CỘNG LÊN
            
            bangSP[index].soLuong = tonKhoHienTai + item.soLuong;
            
            if (bangSP[index].tinhTrang !== "Còn hàng") {
                bangSP[index].tinhTrang = "Còn hàng";
            }
        }
    });
    
    // 2. LƯU BẢNG TỒN KHO ĐÃ CẬP NHẬT
    luuLocalStorage("product", bangSP);

    // 3. CẬP NHẬT TRẠNG THÁI PHIẾU NHẬP
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

// ✅ Xóa phiếu (chỉ phiếu chưa Hoàn thành) - HÀM MỚI
function xoaPhieu(nut) {
    const maPhieu = nut.closest("tr").dataset.maPhieu;

    if (confirm(`Bạn có chắc chắn muốn xóa phiếu nhập [${maPhieu}] này không? Thao tác này sẽ xóa tất cả các sản phẩm thuộc phiếu này.`)) {
        let bangNhap = layBangNhap();
        
        // Lấy lại các item KHÔNG thuộc phiếu cần xóa
        bangNhap = bangNhap.filter(p => p.maPhieu !== maPhieu);
        
        luuLocalStorage("nhapHang", bangNhap); 
        
        alert(`✅ Đã xóa phiếu nhập [${maPhieu}] thành công!`);

        // Cập nhật lại giao diện
        quanLyNhapHang();
    }
}

// ✅ Tìm phiếu
function timPhieuNhap() {
    const txt = document.getElementById("timPhieuInput").value.toLowerCase();
    
    document.querySelectorAll("#bangNhap tbody tr").forEach(row => {
        row.style.display = row.dataset.maPhieu.toLowerCase().includes(txt) ? "" : "none";
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

// ✅ Render bảng (Nhóm dữ liệu theo maPhieu để hiển thị 1 phiếu 1 dòng)
function veBang(danhSach) {
    const wrap = document.getElementById("table-wrap");
    wrap.innerHTML = `
        <table id="bangNhap">
          <thead>
            <tr>
              <th>Mã nhập</th>
              <th>Sản phẩm</th> 
              <th>Số lượng</th> 
              <th>Giá nhập</th> <th>Ngày nhập</th>
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
        const dsSL = p.dsSoLuong.join("<br>");
        
        // ✅ CẬP NHẬT: Hiển thị giá nhập đơn vị là số thuần
        const dsGiaNhap = p.dsGiaNhap.join("<br>"); 
        
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
            <td data-cells="SO_LUONG">${dsSL}</td>
            <td data-cells="GIA_NHAP">${dsGiaNhap}</td> 
            <td>${p.ngayNhap}</td>
            <td>${trangThaiHienThi}</td>
            <td class="hanh-dong">
                <button onclick="suaPhieu(this)" ${daHoanThanh ? 'style="display:none"' : ''}>Sửa</button> 
                <button onclick="hoanThanhPhieu(this)" ${daHoanThanh ? 'style="display:none"' : ''}>Hoàn thành</button>
                <button onclick="xoaPhieu(this)" class="nut-xoa-phieu" ${daHoanThanh ? 'style="display:none"' : ''}>Xóa</button> 
            </td>`;
        tbody.appendChild(tr);
    });
}

// ✅ Thanh công cụ
function taoThanhCongCu(noiDung) {
    const box = document.createElement("div");
    box.className = "filter-box";
    box.innerHTML = `
        <input type="text" id="timPhieuInput" placeholder="Nhập mã phiếu...">
        <button onclick="timPhieuNhap()">Tìm</button>
        <button id="nutThem" onclick="hienThiFormThem()">+ Thêm phiếu</button>
    `;
    noiDung.appendChild(box);
}

// ✅ Tạo form nhập phiếu
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

        <div id="hai-nut" style="display:flex; gap:8px;">
            <button id="nutLuuForm" onclick="luuPhieu()">✔ Thêm Phiếu</button>
            <button onclick="huyThemPhieu()">Hủy</button>
        </div>
    `;
    parent.appendChild(f);
}