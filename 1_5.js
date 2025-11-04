// ✅ Load data.json lần đầu
if (!localStorage.getItem('du_lieu')) {
  fetch('./data.json')
    .then(res => res.json())
    .then(data => {
      localStorage.setItem('du_lieu', JSON.stringify(data));
      quanLyNhapHang();
    });
} else {
  quanLyNhapHang();
}

// ✅ Truy cập DB
function getDB() {
  return JSON.parse(localStorage.getItem("du_lieu"));
}
function getBangNhap(db = getDB()) {
  return db.find(t => t.name === "nhap_hang").data;
}
function getBangCTNH(db = getDB()) {
  return db.find(t => t.name === "chi_tiet_nhap_hang").data;
}

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

// ✅ Render bảng
function renderTable(list) {
  const wrap = document.getElementById("table-wrap");
  wrap.innerHTML = `
    <table id="bangNhap">
      <thead>
        <tr>
          <th>Mã nhập</th>
          <th>Sản phẩm</th>
          <th>Ngày nhập</th>
          <th>Tổng giá trị</th>
          <th>Trạng thái</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  `;

  const tbody = wrap.querySelector("tbody");
  const bangCT = getBangCTNH();

  list.forEach(p => {
    const dsCT = bangCT.filter(ct => ct.MA_NHAP_HANG === p.MA_NHAP_HANG);
    const dsMaSP = dsCT.map(ct => ct.MA_SAN_PHAM).join("<br>");
    const tongGiaTri = p.TONG_GIA_TRI;

    const tr = document.createElement("tr");
    tr.dataset.maPhieu = p.MA_NHAP_HANG;

    tr.innerHTML = `
      <td>${p.MA_NHAP_HANG}</td>
      <td>${dsMaSP}</td>
      <td data-cells="NGAY_NHAP">${p.NGAY_NHAP}</td>
      <td data-cells="TONG_GIA_TRI">${tongGiaTri}</td>
      <td>${p.TRANG_THAI || "Chưa hoàn thành"}</td>
      <td class="hanh-dong">
        <button onclick="suaPhieu(this)">Sửa</button>
        <button onclick="hoanThanhPhieu(this)">Hoàn thành</button>
        <button class="huy" style="display:none" onclick="huyPhieu(this)">Hủy</button>
        <button class="luu" style="display:none" onclick="luuPhieu(this)">Lưu</button>
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
    <button id="nutThem" onclick="hienThiForm()">+ Thêm phiếu</button>
  `;
  noiDung.appendChild(box);
}

// ✅ Tạo form nhập phiếu
function taoFormThem(parent) {
  const f = document.createElement("div");
  f.id = "formThemPhieu";
  f.style.display = "none";
  f.innerHTML = `
    <div class="form-row">
      <label>Mã nhập hàng:</label>
      <input type="text" id="maNhap" placeholder="NHxxx">
    </div>

    <div class="form-row">
      <label>Sản phẩm:</label>
      <div id="dsSanPham">
        <div class="hangSP">
          <input class="maSP" placeholder="Mã SP">
          <input type="number" class="soLuong" placeholder="SL" min="1">
          <input type="number" class="giaNhap" placeholder="Giá nhập">
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

// ✅ Mở form
function hienThiForm() {
  document.getElementById("formThemPhieu").style.display = "block";
  document.getElementById("nutThem").style.display = "none";
}

// ✅ Reset và Ẩn form
function huyThemPhieu() {
  document.getElementById("maNhap").value = "";
  document.getElementById("ngayNhap").value = "";

  const ds = document.getElementById("dsSanPham");
  ds.innerHTML = `
    <div class="hangSP">
      <input class="maSP" placeholder="Mã SP">
      <input type="number" class="soLuong" placeholder="SL" min="1">
      <input type="number" class="giaNhap" placeholder="Giá nhập">
      <button onclick="themDongSP(this)">+</button>
      <button onclick="xoaDongSP(this)" style="display:none">-</button>
    </div>
  `;

  document.getElementById("formThemPhieu").style.display = "none";
  document.getElementById("nutThem").style.display = "inline-block";
}

// ✅ Thêm dòng SP
function themDongSP(btn) {
  const hang = btn.closest(".hangSP");
  const newRow = hang.cloneNode(true);
  newRow.querySelectorAll("input").forEach(i => i.value = "");

  hang.querySelectorAll("button")[0].style.display = "none";
  hang.querySelectorAll("button")[1].style.display = "inline-block";

  newRow.querySelectorAll("button")[0].style.display = "inline-block";
  newRow.querySelectorAll("button")[1].style.display = "none";

  document.getElementById("dsSanPham").appendChild(newRow);
}

// ✅ Xóa dòng SP
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

// ✅ Lưu phiếu mới
function luuPhieuMoi() {
  const ma = maNhap.value.trim();
  const ngay = ngayNhap.value.trim();
  const rows = document.querySelectorAll("#dsSanPham .hangSP");

  if (!ma || !ngay) return alert("Nhập đầy đủ!");

  const db = getDB();
  const bangNhap = getBangNhap(db);
  const bangCT = getBangCTNH(db);

  if (bangNhap.some(p => p.MA_NHAP_HANG === ma))
    return alert("Mã phiếu trùng");

  let tong = 0;
  rows.forEach((r, i) => {
    const maSP = r.querySelector('.maSP').value.trim();
    const sl = +r.querySelector('.soLuong').value;
    const gia = +r.querySelector('.giaNhap').value;

    if (maSP && sl > 0 && gia > 0) {
      tong += sl * gia;
      bangCT.push({
        MA_CTNH: "CTNH" + String(bangCT.length + i + 1).padStart(3, "0"),
        MA_SAN_PHAM: maSP,
        SO_LUONG: sl,
        GIA_NHAP: gia,
        MA_NHAP_HANG: ma
      });
    }
  });

  bangNhap.push({
    MA_NHAP_HANG: ma,
    NGAY_NHAP: ngay,
    TONG_GIA_TRI: tong.toString(),
    TRANG_THAI: "Chưa hoàn thành"
  });

  localStorage.setItem("du_lieu", JSON.stringify(db));
  alert("✅ Thêm thành công!");

  huyThemPhieu();
  quanLyNhapHang();
}

// ✅ Chỉnh sửa phiếu
function suaPhieu(btn) {
  const tr = btn.closest("tr");
  const action = tr.querySelector(".hanh-dong");

  action.querySelectorAll("button")[0].style.display = "none";
  action.querySelectorAll("button")[1].style.display = "none";
  action.querySelector(".huy").style.display = "inline-block";
  action.querySelector(".luu").style.display = "inline-block";

  const ngayCell = tr.querySelector('[data-cells="NGAY_NHAP"]');
  const giaCell = tr.querySelector('[data-cells="TONG_GIA_TRI"]');

  tr.dataset.ngayOld = ngayCell.textContent.trim();
  tr.dataset.giaOld = giaCell.textContent.trim();

  ngayCell.innerHTML = `<input type="date" value="${tr.dataset.ngayOld}">`;
  giaCell.innerHTML = `<input type="number" min="0" value="${tr.dataset.giaOld}">`;
}

function huyPhieu(btn) {
  const tr = btn.closest("tr");
  const action = tr.querySelector(".hanh-dong");

  action.querySelectorAll("button")[0].style.display = "inline-block";
  action.querySelectorAll("button")[1].style.display = "inline-block";
  action.querySelector(".huy").style.display = "none";
  action.querySelector(".luu").style.display = "none";

  tr.querySelector('[data-cells="NGAY_NHAP"]').textContent = tr.dataset.ngayOld;
  tr.querySelector('[data-cells="TONG_GIA_TRI"]').textContent = tr.dataset.giaOld;
}

function luuPhieu(btn) {
  const tr = btn.closest("tr");
  const ma = tr.dataset.maPhieu;

  const db = getDB();
  const bangNhap = getBangNhap(db);
  const p = bangNhap.find(x => x.MA_NHAP_HANG === ma);

  p.NGAY_NHAP = tr.querySelector('input[type="date"]').value;
  p.TONG_GIA_TRI = tr.querySelector('input[type="number"]').value;

  localStorage.setItem("du_lieu", JSON.stringify(db));
  quanLyNhapHang();
}

// ✅ Hoàn thành phiếu
function hoanThanhPhieu(btn) {
  const ma = btn.closest("tr").dataset.maPhieu;
  const db = getDB();
  const bangNhap = getBangNhap(db);
  const p = bangNhap.find(x => x.MA_NHAP_HANG === ma);

  p.TRANG_THAI = "Đã hoàn thành";
  localStorage.setItem("du_lieu", JSON.stringify(db));
  quanLyNhapHang();
}

// ✅ Tìm phiếu
function timPhieuNhap() {
  const txt = document.getElementById("timPhieuInput").value.toLowerCase();
  document.querySelectorAll("#bangNhap tbody tr").forEach(row => {
    row.style.display = row.dataset.maPhieu.toLowerCase().includes(txt) ? "" : "none";
  });
}
