///////////
//1.7
// ===================== Quản lý ĐƠN HÀNG =====================
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
  noiDung.innerHTML = "<h2>Quản Lí Đơn Hàng</h2>";

  // ===================== Thanh tra cứu =====================
  const filterBox = document.createElement("div");
  filterBox.className = "filter-box";
  filterBox.innerHTML = `
    <label>Từ ngày:</label>
    <input type="date" id="fromDate">
    <label>Đến ngày:</label>
    <input type="date" id="toDate">
    <label>Tình trạng:</label>
    <select id="statusFilter">
      <option value="">Tất cả</option>
      <option value="Đang xử lý">Đang xử lý</option>
      <option value="Hoàn tất">Hoàn tất</option>
      <option value="Đã hủy">Đã hủy</option>
    </select>
    <button id="btnFilter">Tra cứu</button>
    <button id="btnReset">Làm mới</button>
  `;
  noiDung.appendChild(filterBox);

  // ===================== Vùng hiển thị bảng =====================
  const wrap = document.createElement("div");
  wrap.className = "table-wrap";
  noiDung.appendChild(wrap);

  // Hàm render bảng
  function renderTable(list) {
    wrap.innerHTML = "";
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
    list.forEach((dh) => {
      const tr = document.createElement("tr");

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

      const kh = khTable?.data?.find(k => k.MA_KHACH_HANG === dh.MA_KHACH_HANG);
      const tdKH = document.createElement("td");
      tdKH.textContent = kh ? kh.TEN_KHACH_HANG : dh.MA_KHACH_HANG;
      tr.appendChild(tdKH);

      const tdAction = document.createElement("td");
      const btnXem = document.createElement("button");
      btnXem.textContent = "Xem chi tiết";
      btnXem.className = "xem small";
      btnXem.addEventListener("click", () => hienChiTietDonHang(dh.MA_DON_HANG));
      tdAction.appendChild(btnXem);
      tr.appendChild(tdAction);

      tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    wrap.appendChild(table);
  }

  renderTable(ds);

  // ===================== Xử lý nút lọc =====================
  document.getElementById("btnFilter").addEventListener("click", () => {
    const from = document.getElementById("fromDate").value;
    const to = document.getElementById("toDate").value;
    const status = document.getElementById("statusFilter").value;

    let filtered = ds;

    // Lọc theo ngày
    if (from) {
      filtered = filtered.filter(dh => new Date(dh.NGAY_DAT) >= new Date(from));
    }
    if (to) {
      filtered = filtered.filter(dh => new Date(dh.NGAY_DAT) <= new Date(to));
    }

    // Lọc theo tình trạng
    if (status) {
      filtered = filtered.filter(dh => dh.TINH_TRANG === status);
    }

    renderTable(filtered);
  });

  // Nút làm mới
  document.getElementById("btnReset").addEventListener("click", () => {
    document.getElementById("fromDate").value = "";
    document.getElementById("toDate").value = "";
    document.getElementById("statusFilter").value = "";
    renderTable(ds);
  });
}

// ===================== Hiển thị CHI TIẾT ĐƠN HÀNG =====================
function hienChiTietDonHang(maDH) {
  const chiTietTable = getTable("chi_tiet_don_hang");
  if (!chiTietTable) {
    alert("Không tìm thấy bảng chi tiết đơn hàng");
    return;
  }

  const dsChiTiet = chiTietTable.data.filter(ct => ct.MA_DON_HANG === maDH);
  const noiDung = document.getElementById("noi_dung");
  noiDung.innerHTML = `<h2>Chi Tiết Đơn Hàng ${maDH}</h2>`;

  const wrap = document.createElement("div");
  wrap.className = "table-wrap";
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const trHead = document.createElement("tr");
  ["Mã CTDH", "Mã sản phẩm", "Số lượng", "Tổng tiền"].forEach(h => {
    const th = document.createElement("th");
    th.textContent = h;
    trHead.appendChild(th);
  });
  thead.appendChild(trHead);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  dsChiTiet.forEach(ct => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${ct.MA_CTDH}</td>
      <td>${ct.MA_SAN_PHAM}</td>
      <td>${ct.SO_LUONG}</td>
      <td>${Number(ct.TONG_TIEN).toLocaleString("vi-VN")} ₫</td>
    `;
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  wrap.appendChild(table);
  noiDung.appendChild(wrap);

  const btnBack = document.createElement("button");
  btnBack.textContent = "← Quay lại danh sách";
  btnBack.className = "small";
  btnBack.style.marginTop = "16px";
  btnBack.addEventListener("click", quanLyDonHang);
  noiDung.appendChild(btnBack);
}
