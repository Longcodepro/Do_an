
// Quản lý số lượng tồn sản phẩm
// ===============================

function quanLySoLuongTon() {
  const noiDung = document.querySelector(".content#noi_dung");
  if (!noiDung) {
    console.error("Không tìm thấy khu vực hiển thị (id='noi_dung')");
    return;
  }

  const dsMatHang = typeof tableMatHang !== 'undefined' && tableMatHang ? tableMatHang : (typeof matHang !== 'undefined' ? matHang : []);

  noiDung.innerHTML = `
  <div>
    <h2 style="color:#333">Quản Lí Số Lượng Tồn Của Sản Phẩm</h2>
    <div class="bo-loc" style="display:flex; gap:10px; margin-bottom:15px; flex-wrap:wrap; align-items: center;">
      <input type="text" id="timKiemMaSP" placeholder="🔍 Tìm theo mã sản phẩm..." style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
      <input type="text" id="timKiemTon" placeholder="🔍 Tìm kiếm theo tên sản phẩm..." style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
      <select id="locLoai" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
        <option value="">-- Tất cả loại --</option>
        ${dsMatHang.map(l => `<option value="${l.maMatHang}">${l.tenMatHang}</option>`).join("")}
      </select>
      <select id="locTrangThai" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
        <option value="">-- Tất cả trạng thái --</option>
        <option value="Hết hàng">Hết hàng</option>
        <option value="Còn ít">Còn ít</option>
        <option value="Đủ hàng">Đủ hàng</option>
      </select>
      <button id="nutLocTon" style="padding: 8px 15px; background-color:#009879; color:white; border:none; border-radius: 4px; cursor:pointer;">Lọc</button>
    
    </div>
    <div>
    <table width="100%" style="border-collapse:collapse; text-align:center; margin-top:10px; font-family: Arial, sans-serif; border: 1px solid #ddd; margin-bottom: 10%">
      <thead>
        <tr style="background-color:#009879; color:white;">
          <th style="padding:12px; border: 1px solid #ddd;">Mã sản phẩm</th>
          <th style="padding:12px; border: 1px solid #ddd;">Tên sản phẩm</th>
          <th style="padding:12px; border: 1px solid #ddd;">Loại</th>
          <th style="padding:12px; border: 1px solid #ddd;">Giá hiện tại</th>
          <th style="padding:12px; border: 1px solid #ddd;">Số lượng tồn</th>
          <th style="padding:12px; border: 1px solid #ddd;">Trạng thái</th>
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

  const dsSanPham = typeof tatCaSanPham !== 'undefined' ? tatCaSanPham : [];
 
  const dsMatHang = typeof tableMatHang !== 'undefined' && tableMatHang ? tableMatHang : (typeof matHang !== 'undefined' ? matHang : []);

  bang.innerHTML = "";

  dsSanPham
    .filter(sp => {
      // Logic xác định trạng thái tồn kho
      const ton = sp.soLuong || 0;
      const nguongCanhBao = sp.nguongCanhBao || 5;
      let trangThai = ton <= 0 ? "Hết hàng" : ton < nguongCanhBao ? "Còn ít" : "Đủ hàng";
      
      // Lọc theo mã SP
      const maSPMatch = !maSPFilter || sp.maSP.toString().includes(maSPFilter);
      
      // Lọc theo mã loại: So sánh maMatHang của SP (chuỗi) với maLoaiLoc (chuỗi)
      const maLoaiMatch = !maLoaiLoc || sp.maMatHang.toString() === maLoaiLoc.toString();
      
      // Lọc theo tên sản phẩm
      const tenSPMatch = !tuKhoa || (sp.tenSP && sp.tenSP.toLowerCase().includes(tuKhoa));
      
      // Lọc theo trạng thái
      const trangThaiMatch = !trangThaiLoc || trangThai === trangThaiLoc;
      
      
      const hienAnMatch = sp.hienAn === "1";

      return maSPMatch && maLoaiMatch && tenSPMatch && trangThaiMatch && hienAnMatch;
    })
    .forEach(sp => {
      
      const loai = dsMatHang.find(l => l.maMatHang.toString() === sp.maMatHang.toString());
      
      const ton = sp.soLuong || 0;
      const nguongCanhBao = sp.nguongCanhBao || 5;
      let trangThai = "";
      let mau = "";

      // Xác định màu nền và trạng thái
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
          <td style="padding:8px; border: 1px solid #ddd;">${sp.maSP}</td>
          <td style="padding:8px; text-align:left; border: 1px solid #ddd;">${sp.tenSP}</td>
          <td style="padding:8px; border: 1px solid #ddd;">${loai ? loai.tenMatHang : "Không rõ"}</td>
          <td style="padding:8px; border: 1px solid #ddd;">${giaHienThi}</td>
          <td style="padding:8px; border: 1px solid #ddd;">${ton}</td>
          <td style="padding:8px; border: 1px solid #ddd;">${trangThai}</td>
        </tr>
      `;
    });
}
