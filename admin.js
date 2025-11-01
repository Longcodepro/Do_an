function openLogin(){
    let overlay=document.getElementById("loginOverlay")
    overlay.style.display="flex";
    setTimeout(() => overlay.classList.add("show"), 10);
}
function closeLogin(){
    let overlay=document.getElementById("loginOverlay")
    overlay.classList.remove("show");
    setTimeout(() => overlay.style.display = "none", 300);
}
function account(){
    const menu = document.getElementById("menuAdmin");
    // Ẩn/hiện menu thả xuống
    menu.style.display = menu.style.display === "block" ? "none" : "block";
}
//Hàm đăng xuất
function logout(){
    document.getElementById("nutlogin").style.display = "block"; // Hiện lại nút đăng nhập
    document.getElementById("nutaccount").style.display = "none";// Ẩn nút admin
    document.getElementById("menuAdmin").style.display = "none"; // Ẩn menu admin
    alert("Bạn đã LogOut thành công ");
}

function loginSuccess() {
    // Ẩn nút "Đăng nhập"
    document.getElementById("nutlogin").style.display = "none";
    // Hiện nút "Tài khoản"
    document.getElementById("nutaccount").style.display = "block";
    // Ẩn form đăng nhập (với hiệu ứng)
    closeLogin();
}
// ✅ Kiểm tra đăng nhập
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Tài khoản cố định
        const tkadmin = "admin";
        const mkadmin = "123";

        // Lấy giá trị nhập
        const user = document.getElementById("username").value.trim();
        const pass = document.getElementById("password").value.trim();

        // So sánh
        if (user === tkadmin && pass === mkadmin) {
            alert("Đăng nhập thành công!");

            // Ẩn form
            loginSuccess();
        } else {
            alert("Sai tài khoản hoặc mật khẩu!");
        }
    });
});
//Ẩn menu khi click ra ngoài
window.addEventListener("click", function (e) {
    const menu = document.getElementById("menuAdmin");
    const button = document.getElementById("nutAdmin");
    if (menu && !button.contains(e.target) && !menu.contains(e.target)) {
        menu.style.display = "none";
    }
});

function danhmuc() {
  const lmenu = document.querySelector(".l-menu");
  lmenu.classList.toggle("open");
}
////////////////////////////////////////////////////////////////////////////////////////////
function ensureDataLoaded() {
  if (!localStorage.getItem("du_lieu")) {
    fetch("./data.json")
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("du_lieu", JSON.stringify(data));
        localStorage.setItem("du_lieu_original", JSON.stringify(data)); // lưu bản gốc để reset
        console.log("Dữ liệu được load từ data.json và lưu vào localStorage.");
      })
      .catch((err) => {
        console.error("Lỗi load data.json:", err);
      });
  } else if (!localStorage.getItem("du_lieu_original")) {
    localStorage.setItem("du_lieu_original", localStorage.getItem("du_lieu"));
  }
}
ensureDataLoaded();

// ===================== Helpers =====================
function getDB() {
  try {
    return JSON.parse(localStorage.getItem("du_lieu")) || [];
  } catch {
    return [];
  }
}
function saveDB(db) {
  localStorage.setItem("du_lieu", JSON.stringify(db));
}
function getOriginalDB() {
  try {
    return JSON.parse(localStorage.getItem("du_lieu_original")) || [];
  } catch {
    return [];
  }
}
function getTable(name) {
  const db = getDB();
  return db.find((t) => t.name === name);
}
function getOriginalTable(name) {
  const db = getOriginalDB();
  return db.find((t) => t.name === name);
}

// ===================== Hiển thị danh sách khách hàng =====================
function quanLyKhachHang() {
  const db = getDB();
  if (!db || db.length === 0) {
    ensureDataLoaded();
    setTimeout(quanLyKhachHang, 250);
    return;
  }

  const khachHangTable = getTable("khach_hang");
  const dangNhapTable = getTable("dang_nhap");
  if (!khachHangTable || !dangNhapTable) {
    alert("Không tìm thấy bảng khách hàng hoặc đăng nhập trong data.json");
    return;
  }

  const rows = khachHangTable.data;
  const noiDung = document.getElementById("noi_dung");
  noiDung.innerHTML = "<h2 style='color:#333'>Quản Lí Khách Hàng</h2>";

  const wrap = document.createElement("div");
  wrap.className = "table-wrap";

  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const trHead = document.createElement("tr");
  const headers = [
    "Mã KH",
    "Tên KH",
    "Giới tính",
    "Năm sinh",
    "Cấp độ",
    "SĐT",
    "Password",
    "Trạng thái",
    "Thao tác",
  ];
  headers.forEach((h) => {
    const th = document.createElement("th");
    th.textContent = h;
    trHead.appendChild(th);
  });
  thead.appendChild(trHead);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");

  rows.forEach((kh) => {
    const tr = document.createElement("tr");

    // Mã KH
    const tdMa = document.createElement("td");
    tdMa.textContent = kh.MA_KHACH_HANG;
    tr.appendChild(tdMa);

    // Tên KH
    const tdTen = document.createElement("td");
    tdTen.textContent = kh.TEN_KHACH_HANG;
    tr.appendChild(tdTen);

    // Giới tính
    const tdGioi = document.createElement("td");
    tdGioi.textContent = kh.GIOI_TINH == 1 ? "Nam" : "Nữ";
    tr.appendChild(tdGioi);

    // Năm sinh
    const tdNs = document.createElement("td");
    tdNs.textContent = kh.NAM_SINH;
    tr.appendChild(tdNs);

    // Cấp độ
    const tdCap = document.createElement("td");
    tdCap.textContent = kh.CAP_DO_THANH_VIEN;
    tr.appendChild(tdCap);

    // SĐT
    const tdSdt = document.createElement("td");
    tdSdt.textContent = kh.SO_DIEN_THOAI;
    tr.appendChild(tdSdt);

    // Password
    const tdPass = document.createElement("td");
    const loginRow = dangNhapTable.data.find(
      (dn) => dn.MA_KHACH_HANG === kh.MA_KHACH_HANG
    );
    tdPass.textContent = loginRow ? loginRow.PASSWORD : "";
    tr.appendChild(tdPass);

    // Trạng thái
    const tdTrang = document.createElement("td");
    const tinhTrang =
      loginRow && (loginRow.TINH_TRANG === "0" || loginRow.TINH_TRANG === 0)
        ? "0"
        : "1";
    tdTrang.textContent = tinhTrang === "1" ? "Hoạt động" : "Đã khóa";
    tr.appendChild(tdTrang);

    // Nút thao tác
    const tdAction = document.createElement("td");
    const btnReset = document.createElement("button");
    btnReset.textContent = "Reset MK";
    btnReset.className = "reset small";

    const btnToggle = document.createElement("button");
    btnToggle.textContent = tinhTrang === "1" ? "Khóa" : "Mở";
    btnToggle.className = (tinhTrang === "1" ? "khoa" : "mo") + " small";
    btnToggle.style.marginLeft = "8px";

    tdAction.appendChild(btnReset);
    tdAction.appendChild(btnToggle);
    tr.appendChild(tdAction);

    // ====== SỰ KIỆN ======
    // ✅ Reset mật khẩu — cập nhật ngay trên bảng
    // ✅ Reset mật khẩu — cập nhật ngay trên bảng
btnReset.addEventListener("click", () => {
  const dbNow = getDB();
  const dnNow = dbNow.find((t) => t.name === "dang_nhap");
  if (!dnNow) {
    alert("Không tìm thấy bảng đăng nhập để reset.");
    return;
  }

  const rowNow = dnNow.data.find(
    (x) => x.MA_KHACH_HANG === kh.MA_KHACH_HANG
  );
  if (!rowNow) return;

  // Gán lại mật khẩu mặc định
  rowNow.PASSWORD = "123456";
  saveDB(dbNow);

  // Cập nhật cột hiển thị mật khẩu ngay lập tức
  tdPass.textContent = rowNow.PASSWORD;

  alert(`Đã reset mật khẩu của ${kh.TEN_KHACH_HANG} về mặc định: 123456`);
});

    // 🔁 Khóa / Mở khóa tài khoản
    btnToggle.addEventListener("click", () => {
      const dbNow = getDB();
      const dnNow = dbNow.find((t) => t.name === "dang_nhap");
      if (!dnNow) return;

      const rowNow = dnNow.data.find(
        (x) => x.MA_KHACH_HANG === kh.MA_KHACH_HANG
      );
      if (!rowNow) return;

      // Đảo trạng thái
      rowNow.TINH_TRANG =
        rowNow.TINH_TRANG === "1" || rowNow.TINH_TRANG === 1 ? "0" : "1";
      saveDB(dbNow);

      // Cập nhật hiển thị ngay
      tdTrang.textContent =
        rowNow.TINH_TRANG === "1" ? "Hoạt động" : "Đã khóa";
      btnToggle.textContent =
        rowNow.TINH_TRANG === "1" ? "Khóa" : "Mở";
      btnToggle.className =
        (rowNow.TINH_TRANG === "1" ? "khoa" : "mo") + " small";
    });

    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  wrap.appendChild(table);
  noiDung.appendChild(wrap);
}

///////////
//1.7
// ===================== Hiển thị danh sách ĐƠN HÀNG =====================
function quanLyDonHang() {
  const db = getDB();
  if (!db || db.length === 0) {
    ensureDataLoaded();
    setTimeout(quanLyDonHang, 250);
    return;
  }

  const donHangTable = getTable("don_hang");
  const chiTietTable = getTable("chi_tiet_don_hang");
  const khTable = getTable("khach_hang");

  if (!donHangTable || !chiTietTable) {
    alert("Không tìm thấy bảng đơn hàng hoặc chi tiết đơn hàng trong data.json");
    return;
  }

  const ds = donHangTable.data;
  const noiDung = document.getElementById("noi_dung");
  noiDung.innerHTML = "<h2 style='color:#333'>Quản Lí Đơn Hàng</h2>";

  const wrap = document.createElement("div");
  wrap.className = "table-wrap";

  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const trHead = document.createElement("tr");
  const headers = [
    "Mã đơn hàng",
    "Ngày đặt",
    "Giá trị",
    "Tình trạng",
    "Hình thức thanh toán",
    "Đơn vị vận chuyển",
    "Khách hàng",
    "Thao tác",
  ];
  headers.forEach((h) => {
    const th = document.createElement("th");
    th.textContent = h;
    trHead.appendChild(th);
  });
  thead.appendChild(trHead);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");

  ds.forEach((dh) => {
    const tr = document.createElement("tr");

    // Các cột dữ liệu chính
    const tdMa = document.createElement("td");
    tdMa.textContent = dh.MA_DON_HANG;
    tr.appendChild(tdMa);

    const tdNgay = document.createElement("td");
    tdNgay.textContent = dh.NGAY_DAT;
    tr.appendChild(tdNgay);

    const tdGia = document.createElement("td");
    tdGia.textContent = Number(dh.GIA_TRI).toLocaleString("vi-VN") + " ₫";
    tr.appendChild(tdGia);

    const tdTrang = document.createElement("td");
    tdTrang.textContent = dh.TINH_TRANG;
    tr.appendChild(tdTrang);

    const tdHTTT = document.createElement("td");
    tdHTTT.textContent = dh.HINH_THUC_THANH_TOAN;
    tr.appendChild(tdHTTT);

    const tdDVVC = document.createElement("td");
    tdDVVC.textContent = dh.DON_VI_VAN_CHUYEN;
    tr.appendChild(tdDVVC);

    // Tên khách hàng
    const kh = khTable?.data?.find(k => k.MA_KHACH_HANG === dh.MA_KHACH_HANG);
    const tdKH = document.createElement("td");
    tdKH.textContent = kh ? kh.TEN_KHACH_HANG : dh.MA_KHACH_HANG;
    tr.appendChild(tdKH);

    // Nút xem chi tiết
    const tdAction = document.createElement("td");
    const btnXem = document.createElement("button");
    btnXem.textContent = "Xem chi tiết";
    btnXem.className = "xem small";
    tdAction.appendChild(btnXem);
    tr.appendChild(tdAction);

    // Sự kiện khi bấm xem chi tiết
    btnXem.addEventListener("click", () => {
      hienChiTietDonHang(dh.MA_DON_HANG);
    });

    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  wrap.appendChild(table);
  noiDung.appendChild(wrap);
}

// ===================== Hiển thị CHI TIẾT ĐƠN HÀNG =====================
function hienChiTietDonHang(maDH) {
  const db = getDB();
  const chiTietTable = getTable("chi_tiet_don_hang");
  if (!chiTietTable) {
    alert("Không tìm thấy bảng chi tiết đơn hàng");
    return;
  }

  const dsChiTiet = chiTietTable.data.filter(
    (ct) => ct.MA_DON_HANG === maDH
  );

  const noiDung = document.getElementById("noi_dung");
  noiDung.innerHTML = `<h2 style='color:#333'>Chi Tiết Đơn Hàng ${maDH}</h2>`;

  const wrap = document.createElement("div");
  wrap.className = "table-wrap";

  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const trHead = document.createElement("tr");
  const headers = ["Mã CTDH", "Mã sản phẩm", "Số lượng", "Tổng tiền"];
  headers.forEach((h) => {
    const th = document.createElement("th");
    th.textContent = h;
    trHead.appendChild(th);
  });
  thead.appendChild(trHead);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  dsChiTiet.forEach((ct) => {
    const tr = document.createElement("tr");

    const td1 = document.createElement("td");
    td1.textContent = ct.MA_CTDH;
    tr.appendChild(td1);

    const td2 = document.createElement("td");
    td2.textContent = ct.MA_SAN_PHAM;
    tr.appendChild(td2);

    const td3 = document.createElement("td");
    td3.textContent = ct.SO_LUONG;
    tr.appendChild(td3);

    const td4 = document.createElement("td");
    td4.textContent =
      Number(ct.TONG_TIEN).toLocaleString("vi-VN") + " ₫";
    tr.appendChild(td4);

    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  wrap.appendChild(table);
  noiDung.appendChild(wrap);

  // Nút quay lại danh sách
  const btnBack = document.createElement("button");
  btnBack.textContent = "← Quay lại danh sách";
  btnBack.className = "small";
  btnBack.style.marginTop = "16px";
  btnBack.addEventListener("click", quanLyDonHang);
  noiDung.appendChild(btnBack);
}
