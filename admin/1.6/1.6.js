// Lưu ý: Các hàm getDB, getTable, setDB phải được định nghĩa 
// để lấy và lưu dữ liệu từ localStorage (như cách bạn đã làm ở đầu file)

function getTable(name) {
  if (name === "san_pham") return { data: tatCaSanPham };
  if (name === "mat_hang") return { data: matHang };
  // Bỏ qua "chi_tiet_nhap_hang" vì dữ liệu không hợp lệ cho giá vốn
  return null;
}

function quanLyGiaBan() {
  // const db = getDB(); // Không cần dùng nếu lấy trực tiếp mảng
  const sanPhamTable = getTable("san_pham");
  const loaiTable = getTable("mat_hang");
  
  if (!sanPhamTable || !loaiTable) {
      alert("Thiếu dữ liệu sản phẩm hoặc mặt hàng!");
      return;
  }

  // Ánh xạ lại tên thuộc tính từ dữ liệu gốc
  const dsSP = sanPhamTable.data.map(sp => ({
      MA_SAN_PHAM: sp.maSP,
      TEN_SP: sp.tenSP,
      MA_MAT_HANG: sp.maMatHang,
      GIA_BAN: sp.gsht, // gsht là giá bán (giá hiện tại) dạng số
      // **Giả định Giá vốn là 80% Giá bán hiện tại để có thể tính %Lợi nhuận**
      GIA_VON: Math.round(sp.gsht * 0.8) 
  }));
  
  const dsLoai = loaiTable.data.map(l => ({
      MA_MAT_HANG: l.maMatHang,
      TEN_MAT_HANG: l.tenMatHang
  }));

  const noiDung = document.getElementById("noi_dung");
  noiDung.innerHTML = `
    <h2>Quản lý giá bán</h2>
    <div class="thanh-timkiem">
      <img src="/Do_an/img/anh2.png" alt="Logo" class="logo"> 
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

  // Hàm tìm kiếm và lọc
  function locSanPham() {
      const tenTim = inputTim.value.toLowerCase().trim();
      const maLoai = selectLoai.value;

      const dsLoc = dsSP.filter(sp => {
          const matchTen = sp.TEN_SP.toLowerCase().includes(tenTim);
          const matchLoai = maLoai === "" || sp.MA_MAT_HANG.toString() === maLoai;
          return matchTen && matchLoai;
      });
      hienThi(dsLoc);
  }
  
  // Gắn sự kiện tìm kiếm và lọc
  noiDung.querySelector("#btnTim").onclick = locSanPham;
  inputTim.onkeyup = locSanPham;
  selectLoai.onchange = locSanPham;

  // ======== HÀM HIỂN THỊ BẢNG ========
  function hienThi(ds) {
      tbody.innerHTML = "";
      ds.forEach(sp => {
          const loai = dsLoai.find(l => l.MA_MAT_HANG === sp.MA_MAT_HANG);
          const tenLoai = loai ? loai.TEN_MAT_HANG : "";

          const giaVon = sp.GIA_VON; // Lấy giá vốn giả định
          const giaBan = sp.GIA_BAN;

          // Tính % Lợi nhuận
          const loiNhuan = giaVon ? (((giaBan - giaVon) / giaVon) * 100).toFixed(1) : 0;
          
          const tr = document.createElement("tr");
          tr.innerHTML = `
              <td>${sp.MA_SAN_PHAM}</td>
              <td>${sp.TEN_SP}</td>
              <td>${tenLoai}</td>
              <td>${giaVon.toLocaleString("vi-VN")}</td>
              <td><input type="number" value="${loiNhuan}" min="0" step="0.1" style="width:60px"></td>
              <td>${giaBan.toLocaleString("vi-VN")}</td>
              <td><button class="updateGia" data-ma-sp="${sp.MA_SAN_PHAM}">💾 Lưu</button></td>
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
              
              // Cập nhật DOM
              tr.children[5].textContent = newGiaBan.toLocaleString("vi-VN");
              
              // Cập nhật trong mảng dữ liệu gốc tatCaSanPham
              const spGoc = tatCaSanPham.find(p => p.maSP === maSP);
              if (spGoc) {
                  spGoc.gsht = newGiaBan; // Cập nhật giá hiện tại (gsht)
                  // Cập nhật lại chuỗi hiển thị giá (giaHienTai)
                  spGoc.giaHienTai = newGiaBan.toLocaleString("vi-VN") + "đ";
                  localStorage.setItem('product', JSON.stringify(tatCaSanPham));
              }
              
              // Cập nhật lại giá bán trong dsSP (mảng đang hiển thị)
              sp.GIA_BAN = newGiaBan;
              
              alert(`✅ Cập nhật ${sp.TEN_SP} → ${newGiaBan.toLocaleString("vi-VN")} VNĐ (Lợi nhuận: ${newLN}%)`);
          };
      });
  }

  // Hiển thị ban đầu
  hienThi(dsSP);
}