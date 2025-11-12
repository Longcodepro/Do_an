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
  noiDung.innerHTML = ` `;
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
          <th>Sản phẩm & Số lượng</th>
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
            items: [],
        };
    }
    // Gộp tất cả các sản phẩm chi tiết của phiếu đó
    phieuGroup[item.maNhap].items.push(`Mã ${item.maSP}: ${item.soLuong}`);
  });
  
  // 2. Render dữ liệu đã nhóm
  Object.values(phieuGroup).forEach(p => {
    const dsSP_SL = p.items.join("<br>");
    const daHoanThanh = p.trangThai === "Hoàn tất"; 

    const tr = document.createElement("tr");
    tr.dataset.maPhieu = p.maNhap;

    tr.innerHTML = `
      <td>${p.maNhap}</td>
      <td>${dsSP_SL}</td>
      <td data-cells="NGAY_NHAP">${p.ngayNhap}</td>
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

// ✅ Tạo form nhập phiếu (ĐÃ CẬP NHẬT CẤU TRÚC CHỌN SP)
function taoFormThem(parent) {
  const f = document.createElement("div");
  f.id = "formThemPhieu";
  f.style.display = "none";
  f.innerHTML = `
    <div class="form-row">
      <label>Mã nhập hàng:</label>
      <input type="number" id="maNhap" placeholder="Chỉ nhập số (ID)">
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
          <input type="number" class="giaNhap" placeholder="Giá nhập (tạm bỏ qua)">
          <button onclick="themDongSP(this)">+</button>
          <button onclick="xoaDongSP(this)" style="display:none">-</button>
        </div>
      </div>
    </div>

    <div class="form-row">
      <label>Ngày nhập:</label>
      <input type="date" id="ngayNhap">
    </div>

    <div id="hai-nut" style="display:flex; gap:8px;">
      <button onclick="luuPhieuMoi()">✔ Thêm</button>
      <button onclick="huyThemPhieu()">Hủy</button>
    </div>
  `;
  parent.appendChild(f);
}

// ✅ Mở form (BỎ QUA GẮN SỰ KIỆN TÌM KIẾM)
function hienThiForm() {
  document.getElementById("formThemPhieu").style.display = "block";
  document.getElementById("nutThem").style.display = "none";
  // BỎ QUA ganSuKienTimKiem();
}

// ✅ Reset và Ẩn form (ĐÃ CẬP NHẬT CẤU TRÚC SP)
function huyThemPhieu() {
  document.getElementById("maNhap").value = "";
  document.getElementById("ngayNhap").value = "";

  const ds = document.getElementById("dsSanPham");
  ds.innerHTML = `
    <div class="hangSP">
      <div class="chonSP-wrap">
        <input class="maSP-input" type="number" placeholder="Nhập Mã SP (ID)">
        <button class="kiem-tra-btn" onclick="kiemTraVaHienThiSP()">✔</button> 
        <span class="tenSP-hienThi" data-ma-sp="" style="display:none; border: 1px solid #ccc; padding: 6px 12px; line-height: 20px; min-width: 250px;"></span>
      </div>
      <input type="number" class="soLuong" placeholder="SL" min="1">
      <input type="number" class="giaNhap" placeholder="Giá nhập (tạm bỏ qua)">
      <button onclick="themDongSP(this)">+</button>
      <button onclick="xoaDongSP(this)" style="display:none">-</button>
    </div>
  `;
  
  document.getElementById("formThemPhieu").style.display = "none";
  document.getElementById("nutThem").style.display = "inline-block";
}

// ✅ Thêm dòng SP (ĐÃ CẬP NHẬT RESET)
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

  // Chỉnh lại nút + và -
  hang.querySelectorAll("button")[0].style.display = "none";
  hang.querySelectorAll("button")[1].style.display = "inline-block";

  newRow.querySelectorAll("button")[0].style.display = "inline-block";
  newRow.querySelectorAll("button")[1].style.display = "none";

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

  if (isLast) {
    const cuoi = ds.lastElementChild;
    cuoi.querySelectorAll("button")[0].style.display = "inline-block";
  }
}

// ✅ Lưu phiếu mới (LẤY MÃ SP CHỈ TỪ DATA ATTRIBUTE ĐÃ XÁC THỰC)
function luuPhieuMoi() {
  const maInput = document.getElementById("maNhap");
  const ngayInput = document.getElementById("ngayNhap");
  const rows = document.querySelectorAll("#dsSanPham .hangSP");
    
  const ma = parseInt(maInput.value);
  const ngay = ngayInput.value.trim();

  if (isNaN(ma) || !ngay) return alert("Vui lòng nhập Mã nhập hàng (số) và Ngày nhập!");
    
  let bangNhap = getBangNhap(); 
  let bangSP = getBangSP(); 

  // Kiểm tra trùng mã nhập
  if (bangNhap.some(p => p.maNhap === ma))
    return alert(`Mã phiếu nhập ${ma} đã tồn tại! Vui lòng chọn mã khác.`);

  let daCapNhatSP = true; 
  let coSPHopLe = false; // Biến kiểm tra có ít nhất 1 SP được chọn VÀ ĐÃ XÁC THỰC

  rows.forEach(r => {
    // LẤY MÃ SP TỪ SPAN ĐÃ CHỌN VÀ ĐƯỢC XÁC THỰC
    const maSP_span = r.querySelector('.tenSP-hienThi');
    // Chỉ lấy mã SP nếu đã được gán (sau khi kiểm tra thành công)
    let maSP_str = maSP_span.dataset.maSp; 
    
    // Bỏ qua logic lấy từ input
    
    const sl = +r.querySelector('.soLuong').value;

    if (maSP_str && sl > 0) {
      coSPHopLe = true;
      const maSP_num = parseInt(maSP_str); 
      
      // 1. Thêm entry vào bảng 'nhapHang'
      bangNhap.push({
          maNhap: ma,
          maSP: maSP_num,
          soLuong: sl,
          ngayNhap: ngay,
          trangThai: "Đang xử lý" 
      });

      // 2. CẬP NHẬT BẢNG 'product' (TỒN KHO)
      const index = bangSP.findIndex(sp => sp.maSP === maSP_num);
      
      if (index !== -1) {
          // Cộng dồn số lượng
          bangSP[index].soLuong = parseInt(bangSP[index].soLuong) + sl;
          // Cập nhật tình trạng
          if (bangSP[index].tinhTrang !== "Còn hàng") {
              bangSP[index].tinhTrang = "Còn hàng";
          }
      } else {
          console.warn(`Sản phẩm có mã ${maSP_str} không tồn tại trong bảng 'product'.`);
          daCapNhatSP = false;
      }
    }
  });
  
  // Kiểm tra nếu form không có sản phẩm nào hợp lệ
  if (!coSPHopLe) {
      return alert("Vui lòng **nhập Mã SP, nhấn nút kiểm tra (✔)** và nhập số lượng hợp lệ cho ít nhất một sản phẩm!");
  }


  // 3. LƯU CẢ 2 BẢNG VÀO LOCALSTORAGE
  setlocalStorage("nhapHang", bangNhap); 
  setlocalStorage("product", bangSP); // LƯU BẢNG SẢN PHẨM ĐÃ CẬP NHẬT
  
  // Hiển thị thông báo
  alert(daCapNhatSP ? "✅ Thêm phiếu nhập và cập nhật số lượng sản phẩm thành công!" : "⚠️ Đã thêm phiếu nhập, nhưng có sản phẩm không tồn tại trong bảng sản phẩm.");

  huyThemPhieu();
  quanLyNhapHang();
}

// =================================================================
// CÁC HÀM SỬA VÀ CẬP NHẬT TRẠNG THÁI (Giữ nguyên)
// =================================================================

// ✅ Chỉnh sửa phiếu (Chỉ cho sửa Ngày nhập)
function suaPhieu(btn) {
  const tr = btn.closest("tr");
  const action = tr.querySelector(".hanh-dong");

  action.querySelectorAll("button")[0].style.display = "none";
  action.querySelectorAll("button")[1].style.display = "none";
  action.querySelector(".huy").style.display = "inline-block";
  action.querySelector(".luu").style.display = "inline-block";

  const ngayCell = tr.querySelector('[data-cells="NGAY_NHAP"]');
  
  tr.dataset.ngayOld = ngayCell.textContent.trim();

  ngayCell.innerHTML = `<input type="date" value="${tr.dataset.ngayOld}">`;
}

function huyPhieu(btn) {
  const tr = btn.closest("tr");
  const action = tr.querySelector(".hanh-dong");

  action.querySelectorAll("button")[0].style.display = "inline-block";
  action.querySelectorAll("button")[1].style.display = "inline-block";
  action.querySelector(".huy").style.display = "none";
  action.querySelector(".luu").style.display = "none";

  tr.querySelector('[data-cells="NGAY_NHAP"]').textContent = tr.dataset.ngayOld;
}

// ✅ Lưu phiếu (Cập nhật tất cả các dòng có cùng maNhap)
function luuPhieu(btn) {
  const tr = btn.closest("tr");
  const ma = parseInt(tr.dataset.maPhieu); // maNhap

  let bangNhap = getBangNhap();
  
  const newNgay = tr.querySelector('input[type="date"]').value;

  // Duyệt và cập nhật NGAY_NHAP cho tất cả các dòng có cùng mã phiếu nhập
  bangNhap.forEach(p => {
    if (p.maNhap === ma) {
      p.ngayNhap = newNgay;
    }
  });

  setlocalStorage("nhapHang", bangNhap); 
  quanLyNhapHang();
}

// ✅ Hoàn thành phiếu (Cập nhật tất cả các dòng có cùng maNhap)
function hoanThanhPhieu(btn) {
  const ma = parseInt(btn.closest("tr").dataset.maPhieu);
  
  let bangNhap = getBangNhap();
  
  // Duyệt và cập nhật TRANG_THAI cho tất cả các dòng có cùng mã phiếu nhập
  bangNhap.forEach(p => {
    if (p.maNhap === ma) {
      p.trangThai = "Hoàn tất"; 
    }
  });

  setlocalStorage("nhapHang", bangNhap); 
  quanLyNhapHang();
}

// ✅ Tìm phiếu (Giữ nguyên)
function timPhieuNhap() {
  const txt = document.getElementById("timPhieuInput").value.toLowerCase();
  
  document.querySelectorAll("#bangNhap tbody tr").forEach(row => {
    row.style.display = row.dataset.maPhieu.toLowerCase().includes(txt) ? "" : "none";
  });
}