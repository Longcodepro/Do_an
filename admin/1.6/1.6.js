// Lưu ý: Tôi vẫn giữ nguyên phần xử lý dữ liệu giả định (GIA_VON) như câu trả lời trước
// vì dữ liệu gốc của bạn không có giá vốn thực tế.

function getTable(name) {
  if (name === "san_pham") return { data: tatCaSanPham };
  if (name === "mat_hang") return { data: matHang };
  // Bỏ qua "chi_tiet_nhap_hang" vì dữ liệu không hợp lệ cho giá vốn
  return null;
}

function quanLyGiaBan() {
  const sanPhamTable = getTable("san_pham");
  const loaiTable = getTable("mat_hang");

  if (!sanPhamTable || !loaiTable) {
    alert("Thiếu dữ liệu sản phẩm hoặc mặt hàng!");
    return;
  }

  // Ánh xạ lại tên thuộc tính từ dữ liệu gốc
  const dsSP = sanPhamTable.data.map((sp) => ({
    MA_SAN_PHAM: sp.maSP,
    TEN_SP: sp.tenSP,
    MA_MAT_HANG: sp.maMatHang,
    GIA_BAN: sp.gsht,
    // **Giả định Giá vốn là 80% Giá bán hiện tại**
    GIA_VON: Math.round(sp.gsht * 0.8),
  }));

  const dsLoai = loaiTable.data.map((l) => ({
    MA_MAT_HANG: l.maMatHang,
    TEN_MAT_HANG: l.tenMatHang,
  }));

  const noiDung = document.getElementById("noi_dung");
  noiDung.innerHTML = `
    <h2>Quản lý giá bán</h2>
    <div class="thanh-timkiem">
      <img src="/Do_an/img/anh2.png" alt="Logo" class="logo"> 
      <select id="locLoai" class="chon-loai">
        <option value="">Tất cả</option>
        ${dsLoai
          .map(
            (l) => `<option value="${l.MA_MAT_HANG}">${l.TEN_MAT_HANG}</option>`
          )
          .join("")}
      </select>
      <input type="text" id="timTen" class="o-tim" placeholder="Nhập tên SP hoặc Mã SP...">
      <button id="btnTim" class="nut-tim"><i class="fa-solid fa-magnifying-glass"></i></button>
    </div>
    <table id="tblGiaBan">
      <thead>
        <tr>
          <th>Mã SP</th>
          <th>Tên sản phẩm</th>
          <th>Loại</th>
          <th>Giá vốn (VNĐ)</th>
          <th>% Lợi nhuận</th>
          <th>Giá bán (VNĐ)</th>
          <th>Cập nhật</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  `;

  const tbody = noiDung.querySelector("tbody");
  const inputTim = noiDung.querySelector("#timTen");
  const selectLoai = noiDung.querySelector("#locLoai");

  // ======== HÀM LỌC SẢN PHẨM (ĐÃ ĐIỀU CHỈNH) ========
  function locSanPham() {
    const timKiem = inputTim.value.toLowerCase().trim();
    const maLoai = selectLoai.value;

    // Kiểm tra xem chuỗi tìm kiếm chỉ chứa số hay không
    const isNumeric = /^\d+$/.test(timKiem);

    const dsLoc = dsSP.filter((sp) => {
      const matchLoai = maLoai === "" || sp.MA_MAT_HANG.toString() === maLoai;

      const maSP_str = sp.MA_SAN_PHAM.toString();
      const tenSP_lower = sp.TEN_SP.toLowerCase();

      let matchTim = false;

      if (timKiem === "") {
        // Nếu rỗng, hiển thị tất cả
        matchTim = true;
      } else if (isNumeric) {
        // TRƯỜNG HỢP 1: Nếu chỉ nhập số (VD: '1', '10')
        // -> Lọc theo Mã SP (chứa chuỗi số)
        matchTim = maSP_str.includes(timKiem);
      } else {
        // TRƯỜNG HỢP 2: Nếu nhập chữ hoặc hỗn hợp (VD: 'máy', 'máy 1')
        // -> Lọc theo Tên SP
        matchTim = tenSP_lower.includes(timKiem);
      }

      return matchTim && matchLoai;
    });
    hienThi(dsLoc);
  }
  // Gắn sự kiện tìm kiếm và lọc
  noiDung.querySelector("#btnTim").onclick = locSanPham;
  inputTim.onkeyup = locSanPham;
  selectLoai.onchange = locSanPham;

  // ======== HÀM HIỂN THỊ BẢNG (Giữ nguyên) ========
  function hienThi(ds) {
    tbody.innerHTML = "";
    ds.forEach((sp) => {
      const loai = dsLoai.find((l) => l.MA_MAT_HANG === sp.MA_MAT_HANG);
      const tenLoai = loai ? loai.TEN_MAT_HANG : "";

      const giaVon = sp.GIA_VON;
      const giaBan = sp.GIA_BAN;

      const loiNhuan = giaVon
        ? (((giaBan - giaVon) / giaVon) * 100).toFixed(1)
        : 0;

      const tr = document.createElement("tr");
      tr.innerHTML = `
              <td>${sp.MA_SAN_PHAM}</td>
              <td>${sp.TEN_SP}</td>
              <td>${tenLoai}</td>
              <td>${giaVon.toLocaleString("vi-VN")}</td>
              <td><input type="number" value="${loiNhuan}" min="0" step="0.1" style="width:60px"></td>
              <td>${giaBan.toLocaleString("vi-VN")}</td>
              <td><button class="updateGia" data-ma-sp="${
                sp.MA_SAN_PHAM
              }">💾 Lưu</button></td>
          `;
      tbody.appendChild(tr);

      // Cập nhật giá bán khi nhấn "Lưu"
      tr.querySelector(".updateGia").onclick = (e) => {
        const maSP = parseInt(e.target.dataset.maSp);
        const input = tr.querySelector("input");
        const newLN = parseFloat(input.value);

        if (isNaN(newLN) || newLN < 0) {
          alert("Giá trị lợi nhuận không hợp lệ!");
          return;
        }

        const newGiaBan = Math.round(giaVon * (1 + newLN / 100));

        tr.children[5].textContent = newGiaBan.toLocaleString("vi-VN");

        const spGoc = tatCaSanPham.find((p) => p.maSP === maSP);
        if (spGoc) {
          spGoc.gsht = newGiaBan;
          spGoc.giaHienTai = newGiaBan.toLocaleString("vi-VN") + "đ";
          localStorage.setItem("product", JSON.stringify(tatCaSanPham));
        }

        sp.GIA_BAN = newGiaBan;

        alert(
          `✅ Cập nhật ${sp.TEN_SP} → ${newGiaBan.toLocaleString(
            "vi-VN"
          )} VNĐ (Lợi nhuận: ${newLN}%)`
        );
      };
    });
  }

  // Hiển thị ban đầu
  hienThi(dsSP);
}
