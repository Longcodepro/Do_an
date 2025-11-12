function setlocalStorage(key, value){
    localStorage.setItem(key, JSON.stringify(value));
}

function getlocalStorage(key){
    return JSON.parse(localStorage.getItem(key));
}

function getBangNhap() {
    return getlocalStorage("nhapHang") || []; 
}
function getBangSP() {
    // Lưu ý: Hàm này yêu cầu dữ liệu 'product' (danh sách sản phẩm) được lưu trong localStorage.
    return getlocalStorage("product") || []; 
}

/**
 * Hàm tự động tạo mã nhập hàng (maNhap) tiếp theo
 * @returns {number} Mã nhập hàng tiếp theo
 */
function getNextMaNhap() {
    const bangNhap = getBangNhap();
    if (bangNhap.length === 0) {
        return 1;
    }
    // Tìm mã lớn nhất và cộng thêm 1
    const maxMa = Math.max(...bangNhap.map(p => p.maNhap));
    return maxMa + 1;
}

/**
 * Kiểm tra Mã SP vừa nhập, hiển thị tên sản phẩm nếu tìm thấy.
 * Lấy element từ event.target (vì function được gọi qua onclick).
 */
function kiemTraVaHienThiSP() {
    // Lấy nút (button) vừa được click từ đối tượng event toàn cục
    const btn = event.target; 
    
    const hangSP = btn.closest('.hangSP');
    const maSPInput = hangSP.querySelector('.maSP-input');
    const hienThiSpan = hangSP.querySelector('.tenSP-hienThi');
    const maSP = parseInt(maSPInput.value.trim());

    // Reset hiển thị trước khi kiểm tra
    hienThiSpan.dataset.maSp = "";
    hienThiSpan.textContent = "";

    if (isNaN(maSP) || maSP <= 0) {
        hienThiSpan.textContent = "❗ Mã SP không hợp lệ (phải là số nguyên dương).";
        hienThiSpan.style.display = 'block'; 
        // Vẫn giữ input và nút check hiện để người dùng sửa mã
        maSPInput.style.display = 'inline-block';
        btn.style.display = 'inline-block';
        return;
    }

    const bangSP = getBangSP();
    const sanPham = bangSP.find(sp => sp.maSP === maSP);

    if (sanPham) {
        // ✅ TRƯỜNG HỢP 1: TÌM THẤY SẢN PHẨM
        hienThiSpan.textContent = `✅ [ID: ${sanPham.maSP}] ${sanPham.tenSP}`;
        hienThiSpan.dataset.maSp = sanPham.maSP;
        
        // Ẩn input và nút kiểm tra, hiện span hiển thị tên
        maSPInput.style.display = 'none';
        btn.style.display = 'none';
        hienThiSpan.style.display = 'block'; 
        
    } else {
        // ✅ TRƯỜNG HỢP 2: KHÔNG TÌM THẤY SẢN PHẨM (YÊU CẦU CỦA BẠN)
        
        // Hiện thông báo lên span
        hienThiSpan.textContent = `❌ Mã SP ${maSP} không tồn tại.`;
        hienThiSpan.style.display = 'block';
        
        // Giữ lại ô input và nút check để người dùng nhập lại/thử lại
        maSPInput.style.display = 'inline-block';
        btn.style.display = 'inline-block';
        // Xóa mã SP vừa nhập để người dùng nhập mã mới
        maSPInput.value = '';
        
        // Đồng thời cảnh báo bằng alert để người dùng chú ý hơn
        alert(`❌ Không tìm thấy sản phẩm với Mã SP: ${maSP}. Vui lòng kiểm tra lại.`);
    }
}

// Khởi chạy hàm chính
quanLyNhapHang(); 

// ✅ Hiển thị giao diện
function quanLyNhapHang() {
  const noiDung = document.getElementById("noi_dung");
  noiDung.innerHTML = `<h2>Quản Lí Phiếu Nhập Hàng</h2>`;

  taoFormThem(noiDung);
  taoThanhCongCu(noiDung);

  const wrap = document.createElement("div");
  wrap.id = "table-wrap";
  noiDung.appendChild(wrap);

  renderTable(getBangNhap()); 
}

// ✅ Render bảng (Nhóm dữ liệu theo maNhap để hiển thị 1 phiếu 1 dòng)
function renderTable(list) {
  const wrap = document.getElementById("table-wrap");
  wrap.innerHTML = `
    <table id="bangNhap">
      <thead>
        <tr>
          <th>Mã nhập</th>
          <th>Sản phẩm</th> 
          <th>Số lượng</th> 
          <th>Ngày nhập</th>
          <th>Trạng thái</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  `;

  const tbody = wrap.querySelector("tbody");
  
  // 1. Nhóm dữ liệu theo maNhap
  const phieuGroup = {};
  list.forEach(item => {
    if (!phieuGroup[item.maNhap]) {
        phieuGroup[item.maNhap] = {
            maNhap: item.maNhap,
            ngayNhap: item.ngayNhap,
            trangThai: item.trangThai,
            // Thay vì dùng 1 array string, ta dùng 2 array để tách cột
            dsMaSP: [], 
            dsSoLuong: [],
        };
    }
    // Gộp tất cả các sản phẩm chi tiết của phiếu đó
    phieuGroup[item.maNhap].dsMaSP.push(item.maSP);
    phieuGroup[item.maNhap].dsSoLuong.push(item.soLuong);
  });
  
  // 2. Render dữ liệu đã nhóm
  Object.values(phieuGroup).forEach(p => {
    // Hàm tìm tên SP dựa vào mã (cần thiết cho chức năng sửa)
    const getTenSP = (ma) => {
        const bangSP = getBangSP();
        const sanPham = bangSP.find(sp => sp.maSP === ma);
        return sanPham ? sanPham.tenSP : `(Không tìm thấy SP ID: ${ma})`;
    };

    // Tạo nội dung cột Sản phẩm (bao gồm cả Tên SP và Mã SP)
    const dsSP = p.dsMaSP.map(ma => `Mã ${ma}: ${getTenSP(ma)}`).join("<br>");
    
    // Tạo nội dung cột Số lượng
    const dsSL = p.dsSoLuong.join("<br>");
    
    const daHoanThanh = p.trangThai === "Hoàn tất"; 

    const tr = document.createElement("tr");
    tr.dataset.maPhieu = p.maNhap;
    
    // Lấy dữ liệu chi tiết, bao gồm cả giá nhập, để lưu vào dataset
    const chiTietPhieu = list.filter(item => item.maNhap === p.maNhap).map(item => ({ 
        maSP: item.maSP, 
        soLuong: item.soLuong,
        giaNhap: item.giaNhap || 0 // Thêm giaNhap
    }));
    tr.dataset.maSPSl = JSON.stringify(chiTietPhieu);

    tr.innerHTML = `
      <td>${p.maNhap}</td>
      <td data-cells="MA_SP">${dsSP}</td> 
      <td data-cells="SO_LUONG">${dsSL}</td>
      <td>${p.ngayNhap}</td>
      <td>${p.trangThai}</td>
      <td class="hanh-dong">
        <button onclick="suaPhieu(this)" ${daHoanThanh ? 'style="display:none"' : ''}>Sửa</button> 
        <button onclick="hoanThanhPhieu(this)" ${daHoanThanh ? 'style="display:none"' : ''}>Hoàn thành</button>
        <button class="huy" style="display:none" onclick="huyPhieu(this)">Hủy</button>
        <button class="luu" style="display:none" onclick="luuPhieu(this)">Lưu</button>
      </td>`;
    tbody.appendChild(tr);
  });
}

// ✅ Thanh công cụ (Giữ nguyên)
function taoThanhCongCu(noiDung) {
  const box = document.createElement("div");
  box.className = "filter-box";
  box.innerHTML = `
    <input type="text" id="timPhieuInput" placeholder="Nhập mã phiếu...">
    <button onclick="timPhieuNhap()">Tìm</button>
    <button id="nutThem" onclick="hienThiForm()">+ Thêm phiếu</button>
  `;
  noiDung.appendChild(box);
}

// ✅ Tạo form nhập phiếu (ĐÃ SỬA CẤU TRÚC NÚT + và -)
function taoFormThem(parent) {
  const f = document.createElement("div");
  f.id = "formThemPhieu";
  f.style.display = "none";
  f.innerHTML = `
    <div class="form-row">
      <label>Mã nhập hàng:</label>
      <input type="text" id="maNhapHienThi" value="(Tự động cấp)" disabled style="border: none; background: #eee;">
      <input type="hidden" id="maNhap"> </div>

    <div class="form-row">
      <label>Ngày nhập:</label>
      <input type="date" id="ngayNhap" required>
    </div>

    <div class="form-row">
      <label>Sản phẩm:</label>
      <div id="dsSanPham">
        <div class="hangSP">
          <div class="chonSP-wrap">
            <input class="maSP-input" type="number" placeholder="Nhập Mã SP (ID)">
            <button class="kiem-tra-btn" onclick="kiemTraVaHienThiSP()">✔</button> 
            <span class="tenSP-hienThi" data-ma-sp="" style="display:none; border: 1px solid #ccc; padding: 6px 12px; line-height: 20px; min-width: 250px;"></span> 
          </div>
          <input type="number" class="soLuong" placeholder="SL" min="1">
          <input type="number" class="giaNhap" placeholder="Giá nhập"> 
          <button onclick="themDongSP(this)">+</button>
          <button onclick="xoaDongSP(this)" style="display:none">-</button> </div>
      </div>
    </div>

    <div id="hai-nut" style="display:flex; gap:8px;">
      <button onclick="luuPhieuMoi()">✔ Thêm</button>
      <button onclick="huyThemPhieu()">Hủy</button>
    </div>
  `;
  parent.appendChild(f);
}

// ✅ Mở form (ĐÃ CHỈNH SỬA)
function hienThiForm() {
  document.getElementById("formThemPhieu").style.display = "block";
  document.getElementById("nutThem").style.display = "none";
  
  // 1. Tự động cấp mã và hiển thị
  const newMa = getNextMaNhap();
  document.getElementById("maNhapHienThi").value = newMa;
  document.getElementById("maNhap").value = newMa; // Lưu mã vào input ẩn
  
  // 2. Gán ngày hiện tại cho Ngày nhập
  document.getElementById("ngayNhap").valueAsDate = new Date();
}

// ✅ Reset và Ẩn form (ĐÃ SỬA CẤU TRÚC NÚT + và -)
function huyThemPhieu() {
  document.getElementById("maNhapHienThi").value = "";
  document.getElementById("maNhap").value = "";
  document.getElementById("ngayNhap").value = "";

  const ds = document.getElementById("dsSanPham");
  // Cấu trúc mặc định của dòng sản phẩm đầu tiên
  ds.innerHTML = `
    <div class="hangSP">
      <div class="chonSP-wrap">
        <input class="maSP-input" type="number" placeholder="Nhập Mã SP (ID)">
        <button class="kiem-tra-btn" onclick="kiemTraVaHienThiSP()">✔</button> 
        <span class="tenSP-hienThi" data-ma-sp="" style="display:none; border: 1px solid #ccc; padding: 6px 12px; line-height: 20px; min-width: 250px;"></span>
      </div>
      <input type="number" class="soLuong" placeholder="SL" min="1">
      <input type="number" class="giaNhap" placeholder="Giá nhập"> 
      <button onclick="themDongSP(this)">+</button>
      <button onclick="xoaDongSP(this)" style="display:none">-</button> </div>
  `;
  
  document.getElementById("formThemPhieu").style.display = "none";
  document.getElementById("nutThem").style.display = "inline-block";
}

// ✅ Thêm dòng SP (ĐÃ SỬA LOGIC HIỂN THỊ NÚT)
function themDongSP(btn) {
  const hang = btn.closest(".hangSP");
  const newRow = hang.cloneNode(true);
  
  // Reset giá trị
  newRow.querySelectorAll("input").forEach(i => i.value = "");
  
  // Reset hiển thị cho dòng mới
  newRow.querySelector('.maSP-input').style.display = 'inline-block'; // Hiện lại input
  newRow.querySelector('.kiem-tra-btn').style.display = 'inline-block'; // Hiện lại nút check
  newRow.querySelector('.tenSP-hienThi').style.display = 'none';
  newRow.querySelector('.tenSP-hienThi').textContent = '';
  newRow.querySelector('.tenSP-hienThi').dataset.maSp = '';

  // 1. ẨN nút '+' và HIỆN nút '-' trên dòng HIỆN TẠI (dòng vừa nhân bản)
  hang.querySelector("button:nth-last-child(2)").style.display = "none"; // Nút +
  hang.querySelector("button:nth-last-child(1)").style.display = "inline-block"; // Nút -

  // 2. Thiết lập nút cho dòng MỚI
  newRow.querySelector("button:nth-last-child(2)").style.display = "inline-block"; // Nút +
  newRow.querySelector("button:nth-last-child(1)").style.display = "none"; // Nút - ẩn (sẽ được hiện khi thêm dòng tiếp theo)

  document.getElementById("dsSanPham").appendChild(newRow);
}

// ✅ Xóa dòng SP (Giữ nguyên)
function xoaDongSP(btn) {
  const ds = document.getElementById("dsSanPham");
  if (ds.children.length === 1)
    return alert("Phải có ít nhất 1 sản phẩm!");

  const hang = btn.closest(".hangSP");
  const isLast = !hang.nextElementSibling;
  
  hang.remove();

  // Nếu dòng cuối bị xóa, phải hiện lại nút '+' ở dòng áp cuối
  if (isLast) {
    const cuoi = ds.lastElementChild;
    // Hiện lại nút '+' (nút thứ 2 tính từ cuối) và ẩn nút '-' (nút cuối)
    cuoi.querySelector("button:nth-last-child(2)").style.display = "inline-block"; 
    cuoi.querySelector("button:nth-last-child(1)").style.display = "none";
  }
}

// ✅ Lưu phiếu mới (Giữ nguyên logic Giá nhập)
function luuPhieuMoi() {
  const maInput = document.getElementById("maNhap"); 
  const ngayInput = document.getElementById("ngayNhap");
  const rows = document.querySelectorAll("#dsSanPham .hangSP");
    
  const ma = parseInt(maInput.value); 
  const ngay = ngayInput.value.trim(); 

  if (isNaN(ma) || ma <= 0) return alert("Lỗi hệ thống: Mã nhập hàng không hợp lệ!");
  if (!ngay) return alert("Vui lòng chọn Ngày nhập hàng!");
    
  let bangNhap = getBangNhap(); 
  let bangSP = getBangSP(); 

  let sanPhamBiLoi = false; 
  let coSPHopLe = false; 
  let newEntries = [];

  rows.forEach(r => {
    const maSP_span = r.querySelector('.tenSP-hienThi');
    let maSP_str = maSP_span.dataset.maSp; 
    
    const sl = +r.querySelector('.soLuong').value;
    const giaNhap = +r.querySelector('.giaNhap').value; // LẤY GIÁ NHẬP

    if (maSP_str && sl > 0 && giaNhap >= 0) { // Kiểm tra giá nhập không âm
      coSPHopLe = true;
      const maSP_num = parseInt(maSP_str); 
      
      if (!bangSP.some(sp => sp.maSP === maSP_num)) {
          sanPhamBiLoi = true;
      }
      
      newEntries.push({
          maNhap: ma,
          maSP: maSP_num,
          soLuong: sl,
          giaNhap: giaNhap, // LƯU GIÁ NHẬP
          ngayNhap: ngay,
          trangThai: "Đang xử lý" 
      });
    } else if (maSP_str || sl > 0 || giaNhap > 0) {
        // Cảnh báo nếu một trong 3 trường có giá trị nhưng không hợp lệ (ví dụ: SL < 1 hoặc Giá < 0)
        return alert("Lỗi nhập liệu: Mã SP, Số lượng phải là số dương và Giá nhập phải là số không âm.");
    }
  });
  
  if (!coSPHopLe) {
      return alert("Vui lòng **nhập Mã SP, nhấn nút kiểm tra (✔)** và nhập Số lượng, Giá nhập hợp lệ cho ít nhất một sản phẩm!");
  }

  // Cập nhật bảng nhập hàng
  bangNhap = bangNhap.concat(newEntries);
  setlocalStorage("nhapHang", bangNhap); 
  
  alert(sanPhamBiLoi ? "⚠️ Đã thêm phiếu nhập (Đang xử lý), nhưng có sản phẩm không tồn tại trong bảng sản phẩm. Vui lòng kiểm tra lại trước khi 'Hoàn thành'." : "✅ Thêm phiếu nhập thành công! (Trạng thái: Đang xử lý. Tồn kho chưa được cập nhật)");

  huyThemPhieu();
  quanLyNhapHang();
}

// =================================================================
// CÁC HÀM SỬA VÀ CẬP NHẬT TRẠNG THÁI (Giữ nguyên)
// =================================================================

// Helper: Tìm tên SP dựa vào mã (Giữ nguyên)
function getTenSPById(maSP) {
    const bangSP = getBangSP();
    const sanPham = bangSP.find(sp => sp.maSP === maSP);
    return sanPham ? sanPham.tenSP : `(Không tìm thấy SP ID: ${maSP})`;
}


// ✅ Chỉnh sửa phiếu (Giữ nguyên)
function suaPhieu(btn) {
  const tr = btn.closest("tr");
  // Cấm sửa nếu đã hoàn tất
  if (tr.querySelector('td:nth-child(5)').textContent.trim() === 'Hoàn tất') {
      return alert("Không thể sửa phiếu đã 'Hoàn tất'.");
  }
    
  const action = tr.querySelector(".hanh-dong");

  action.querySelectorAll("button")[0].style.display = "none"; // Ẩn Sửa
  action.querySelectorAll("button")[1].style.display = "none"; // Ẩn Hoàn thành
  action.querySelector(".huy").style.display = "inline-block";
  action.querySelector(".luu").style.display = "inline-block";

  const maSPCell = tr.querySelector('[data-cells="MA_SP"]');
  const slCell = tr.querySelector('[data-cells="SO_LUONG"]');
  
  const currentItems = JSON.parse(tr.dataset.maSPSl);
  
  // Lưu trạng thái cũ để hủy
  tr.dataset.maSPSlOld = tr.dataset.maSPSl;
  tr.dataset.maSPHtmlOld = maSPCell.innerHTML;
  tr.dataset.slHtmlOld = slCell.innerHTML;
  
  let htmlMaSP = '';
  let htmlSL = ''; 

  currentItems.forEach((item) => {
    htmlMaSP += `<div class="edit-sp-row" data-old-ma-sp="${item.maSP}">
                    <input type="number" class="maSP-edit" value="${item.maSP}" style="width: 80px; display: inline-block;">
                    <span class="tenSP-info">${getTenSPById(item.maSP)}</span>
                    <br>
                 </div>`;
                 
    htmlSL += `<div class="edit-sl-row" data-old-sl="${item.soLuong}" data-old-gia-nhap="${item.giaNhap}"> 
                  <input type="number" class="soLuong-edit" value="${item.soLuong}" min="1" style="width: 50px;">
               </div>`;
  });

  maSPCell.innerHTML = htmlMaSP;
  slCell.innerHTML = htmlSL;
}

// ✅ Hủy sửa phiếu (Giữ nguyên)
function huyPhieu(btn) {
  const tr = btn.closest("tr");
  const action = tr.querySelector(".hanh-dong");

  action.querySelectorAll("button")[0].style.display = "inline-block"; // Hiện Sửa
  action.querySelectorAll("button")[1].style.display = "inline-block"; // Hiện Hoàn thành
  action.querySelector(".huy").style.display = "none";
  action.querySelector(".luu").style.display = "none";

  // Khôi phục HTML cũ
  tr.querySelector('[data-cells="MA_SP"]').innerHTML = tr.dataset.maSPHtmlOld;
  tr.querySelector('[data-cells="SO_LUONG"]').innerHTML = tr.dataset.slHtmlOld;
}


// ✅ Lưu phiếu (Giữ nguyên logic Giá nhập)
function luuPhieu(btn) {
  const tr = btn.closest("tr");
  const maNhap = parseInt(tr.dataset.maPhieu); // maNhap
  
  const maSPInputs = tr.querySelectorAll('[data-cells="MA_SP"] .maSP-edit');
  const slRows = tr.querySelectorAll('[data-cells="SO_LUONG"] .edit-sl-row');
  
  let bangNhap = getBangNhap();

  // 1. Chuẩn bị dữ liệu mới và kiểm tra hợp lệ
  let newEntries = [];
  const bangSP = getBangSP(); 
  
  for (let i = 0; i < maSPInputs.length; i++) {
    const maSPMoi = parseInt(maSPInputs[i].value);
    const soLuongMoi = parseInt(slRows[i].querySelector('.soLuong-edit').value);
    const giaNhapCu = parseFloat(slRows[i].dataset.oldGiaNhap) || 0; // LẤY GIÁ NHẬP CŨ

    if (isNaN(maSPMoi) || maSPMoi <= 0 || isNaN(soLuongMoi) || soLuongMoi <= 0) {
        return alert(`Giá trị mới tại dòng ${i+1} không hợp lệ. Vui lòng kiểm tra Mã SP (số nguyên dương) và Số lượng (số nguyên dương).`);
    }
    
    if (!bangSP.some(sp => sp.maSP === maSPMoi)) {
        return alert(`Mã SP mới: ${maSPMoi} tại dòng ${i+1} không tồn tại trong danh sách sản phẩm. Vui lòng kiểm tra lại.`);
    }

    newEntries.push({
        maNhap: maNhap,
        maSP: maSPMoi,
        soLuong: soLuongMoi,
        giaNhap: giaNhapCu, // GIỮ NGUYÊN GIÁ NHẬP CŨ
    });
  }
  
  const phieuCu = bangNhap.find(p => p.maNhap === maNhap);
  const ngayNhap = phieuCu?.ngayNhap || new Date().toISOString().slice(0, 10);
  const trangThai = phieuCu?.trangThai || "Đang xử lý";


  // 2. Cập nhật Bảng 'nhapHang':
  
  bangNhap = bangNhap.filter(p => p.maNhap !== maNhap);
  
  newEntries.forEach(item => {
    bangNhap.push({
        maNhap: maNhap,
        maSP: item.maSP,
        soLuong: item.soLuong,
        giaNhap: item.giaNhap, 
        ngayNhap: ngayNhap, 
        trangThai: trangThai 
    });
  });

  setlocalStorage("nhapHang", bangNhap); 
  alert("✅ Cập nhật phiếu nhập thành công! (Tồn kho chưa được cập nhật)");
  quanLyNhapHang();
}


// ✅ Hoàn thành phiếu (Giữ nguyên)
function hoanThanhPhieu(btn) {
  const maNhap = parseInt(btn.closest("tr").dataset.maPhieu);
  
  let bangNhap = getBangNhap();
  let bangSP = getBangSP(); 
  
  const itemsCanHoanThanh = bangNhap.filter(p => p.maNhap === maNhap && p.trangThai !== 'Hoàn tất');

  if (itemsCanHoanThanh.length === 0) {
      if (bangNhap.some(p => p.maNhap === maNhap && p.trangThai === 'Hoàn tất')) {
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
          // Cộng dồn số lượng
          let tonKhoHienTai = parseInt(bangSP[index].soLuong) || 0;
          bangSP[index].soLuong = tonKhoHienTai + item.soLuong;
          
          // Cập nhật tình trạng
          if (bangSP[index].tinhTrang !== "Còn hàng") {
              bangSP[index].tinhTrang = "Còn hàng";
          }
      }
  });
  
  // 2. LƯU BẢNG TỒN KHO ĐÃ CẬP NHẬT
  setlocalStorage("product", bangSP);

  // 3. CẬP NHẬT TRẠNG THÁI PHIẾU NHẬP
  bangNhap = bangNhap.map(p => {
    if (p.maNhap === maNhap) {
      p.trangThai = "Hoàn tất"; 
    }
    return p;
  });

  setlocalStorage("nhapHang", bangNhap); 
  
  alert(capNhatThanhCong ? "✅ Hoàn thành phiếu nhập và cập nhật tồn kho thành công!" : "⚠️ Hoàn thành phiếu nhập, nhưng có sản phẩm không tồn tại trong bảng sản phẩm nên tồn kho chưa được cập nhật đầy đủ.");
  
  quanLyNhapHang();
}

// ✅ Tìm phiếu (Giữ nguyên)
function timPhieuNhap() {
  const txt = document.getElementById("timPhieuInput").value.toLowerCase();
  
  document.querySelectorAll("#bangNhap tbody tr").forEach(row => {
    row.style.display = row.dataset.maPhieu.toLowerCase().includes(txt) ? "" : "none";
  });
}