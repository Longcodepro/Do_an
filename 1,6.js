function quanLyGiaBan() {
    const db = getDB();
    const sanPhamTable = getTable("san_pham");
    const nhapTable = getTable("chi_tiet_nhap_hang");
    const loaiTable = getTable("mat_hang");
    if (!sanPhamTable || !nhapTable || !loaiTable) {
      alert("Thiếu dữ liệu!");
      return;
    }
  
    const dsSP = sanPhamTable.data;
    const dsNhap = nhapTable.data;
    const dsLoai = loaiTable.data;
  
    const noiDung = document.getElementById("noi_dung");
    noiDung.innerHTML = `
      <h2>Quản lý giá bán</h2>
      <div class="thanh-timkiem">
  <img src="/Do_an/img/anh2.png" alt="Logo" class="logo">  <!-- bạn thay logo tùy -->
  <select id="locLoai" class="chon-loai">
    <option value="">Tất cả</option>
    ${dsLoai.map(l => `<option value="${l.MA_MAT_HANG}">${l.TEN_MAT_HANG}</option>`).join("")}
  </select>
  <input type="text" id="timTen" class="o-tim" placeholder="Nhập tên sản phẩm...">
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
  
    // ======== HÀM HIỂN THỊ BẢNG ========
    function hienThi(ds) {
      tbody.innerHTML = "";
      ds.forEach(sp => {
        const loai = dsLoai.find(l => l.MA_MAT_HANG === sp.MA_MAT_HANG);
        const tenLoai = loai ? loai.TEN_MAT_HANG : "";
  
        const nhapSP = dsNhap.filter(n => n.MA_SAN_PHAM === sp.MA_SAN_PHAM);
        let giaVon = 0;
        if (nhapSP.length > 0) {
          const tong = nhapSP.reduce((acc, n) => acc + parseFloat(n.GIA_NHAP), 0);
          giaVon = tong / nhapSP.length;
        }
  
        const giaBan = parseFloat(sp.GIA_BAN);
        const loiNhuan = giaVon ? (((giaBan - giaVon) / giaVon) * 100).toFixed(1) : 0;
  
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${sp.MA_SAN_PHAM}</td>
          <td>${sp.TEN_SP}</td>
          <td>${tenLoai}</td>
          <td>${giaVon.toLocaleString("vi-VN")}</td>
          <td><input type="number" value="${loiNhuan}" min="0" step="0.1" style="width:60px"></td>
          <td>${giaBan.toLocaleString("vi-VN")}</td>
          <td><button class="updateGia">💾 Lưu</button></td>
        `;
        tbody.appendChild(tr);
  
        // Cập nhật giá bán khi nhấn "Lưu"
        tr.querySelector(".updateGia").onclick = () => {
          const newLN = parseFloat(tr.querySelector("input").value);
          const newGiaBan = Math.round(giaVon * (1 + newLN / 100));
          tr.children[5].textContent = newGiaBan.toLocaleString("vi-VN");
          sp.GIA_BAN = newGiaBan;
          setDB(db);
          alert(`✅ Cập nhật ${sp.TEN_SP} → ${newGiaBan.toLocaleString("vi-VN")} VNĐ`);
        };
      });
    }
  
    // Hiển thị ban đầu
    hienThi(dsSP);
  
    // ======== TRA CỨU / LỌC ========
    function locVaTim() {
      const tuKhoa = inputTim.value.trim().toLowerCase();
      const maLoai = selectLoai.value;
      const kq = dsSP.filter(sp => {
        const dkTen = sp.TEN_SP.toLowerCase().includes(tuKhoa);
        const dkLoai = maLoai === "" || sp.MA_MAT_HANG === maLoai;
        return dkTen && dkLoai;
      });
      hienThi(kq);
    }
  
    inputTim.addEventListener("input", locVaTim);
    selectLoai.addEventListener("change", locVaTim);
  }
  