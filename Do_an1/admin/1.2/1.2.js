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
