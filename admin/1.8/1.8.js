// Quản lý số lượng tồn sản phẩm
// ===============================

function quanLySoLuongTon() {
  const noiDung = document.querySelector(".content#noi_dung");
  if (!noiDung) {
    console.error("Không tìm thấy khu vực hiển thị (id='noi_dung')");
    return;
  }

  const dsMatHang = typeof tableMatHang !== 'undefined' ? tableMatHang : [];

  noiDung.innerHTML = `
  <div>
    <h2 style="color:#333">Quản Lí Số Lượng Tồn Của Sản Phẩm</h2>
    <div class="bo-loc">
      <input type="text" id="timKiemMaSP" placeholder="🔍 Tìm theo mã sản phẩm...">
      <input type="text" id="timKiemTon" placeholder="🔍 Tìm kiếm theo tên sản phẩm...">
      <select id="locLoai">
        <option value="">-- Tất cả loại --</option>
        ${dsMatHang.map(l => `<option value="${l.maMatHang}">${l.tenMatHang}</option>`).join("")}
      </select>
      <select id="locTrangThai">
        <option value="">-- Tất cả trạng thái --</option>
        <option value="Hết hàng">Hết hàng</option>
        <option value="Còn ít">Còn ít</option>
        <option value="Đủ hàng">Đủ hàng</option>
      </select>
      <button id="nutLocTon">Lọc</button>
    
    </div>
    <div>
    <table border="1" width="100%" style="border-collapse:auto; text-align:center; margin-top:10px;; margin-bottom:10%">
      <thead>
        <tr style="background-color:#009879; color:white;">
          <th>Mã sản phẩm</th>
          <th>Tên sản phẩm</th>
          <th>Loại</th>
          <th>Giá hiện tại</th>
          <th>Số lượng tồn</th>
          <th>Trạng thái</th>
        </tr>
      </thead>
      <tbody id="bangTon"></tbody>
    </table>
    </div>
    </div>
  `;

  hienThiSoLuongTon();

  document.getElementById("timKiemMaSP").addEventListener("input", () => hienThiSoLuongTon());
  document.getElementById("timKiemTon").addEventListener("input", () => hienThiSoLuongTon());
  document.getElementById("locLoai").addEventListener("change", () => hienThiSoLuongTon());
  document.getElementById("locTrangThai").addEventListener("change", () => hienThiSoLuongTon());
  document.getElementById("nutLocTon").addEventListener("click", () => hienThiSoLuongTon());
}

function hienThiSoLuongTon() {
  const maSPFilter = document.getElementById("timKiemMaSP").value.trim();
  const tuKhoa = document.getElementById("timKiemTon").value.toLowerCase();
  const maLoaiLoc = document.getElementById("locLoai").value;
  const trangThaiLoc = document.getElementById("locTrangThai").value;
  const bang = document.getElementById("bangTon");
  if (!bang) return;

  const dsSanPham = typeof tableSp !== 'undefined' ? tableSp : [];
  const dsMatHang = typeof tableMatHang !== 'undefined' ? tableMatHang : [];

  bang.innerHTML = "";

  dsSanPham
    .filter(sp => {
      const ton = sp.soLuong || 0;
      const nguongCanhBao = sp.nguongCanhBao || 5;
      let trangThai = ton <= 0 ? "Hết hàng" : ton < nguongCanhBao ? "Còn ít" : "Đủ hàng";

      return (!maSPFilter || sp.maSP.toString() === maSPFilter) &&
             (!maLoaiLoc || sp.maMatHang.toString() === maLoaiLoc) &&
             (!tuKhoa || sp.tenSP.toLowerCase().includes(tuKhoa)) &&
             (!trangThaiLoc || trangThai === trangThaiLoc);
    })
    .forEach(sp => {
      const loai = dsMatHang.find(l => l.maMatHang.toString() === sp.maMatHang);
      const ton = sp.soLuong || 0;
      const nguongCanhBao = sp.nguongCanhBao || 5;
      let trangThai = "";
      let mau = "";

      if (ton <= 0) {
        trangThai = "Hết hàng";
        mau = "#f8d7da";
      } else if (ton < nguongCanhBao) {
        trangThai = "Còn ít";
        mau = "#fff3cd";
      } else {
        trangThai = "Đủ hàng";
        mau = "#d4edda";
      }

      const giaHienThi = sp.giaHienTai || "—";

      bang.innerHTML += `
        <tr style="background-color:${mau};">
          <td>${sp.maSP}</td>
          <td>${sp.tenSP}</td>
          <td>${loai ? loai.tenMatHang : "Không rõ"}</td>
          <td>${giaHienThi}</td>
          <td>${ton}</td>
          <td>${trangThai}</td>
        </tr>
      `;
    });
}
