
// Hàm hiển thị giao diện khi bấm menu
function quanLySoLuongTon() {
  // Lấy vùng hiển thị nội dung chính, tránh lỗi trùng id
  const noiDung = document.querySelector(".content#noi_dung");
  if (!noiDung) {
    console.error("Không tìm thấy khu vực hiển thị (id='noi_dung')");
    return;
  }
    
  // Kiểm tra và sử dụng biến từ data.js
  // Đảm bảo data.js đã load và các biến tableSp, tableMatHang đã được khởi tạo.
  const dsMatHang = typeof tableMatHang !== 'undefined' ? tableMatHang : [];
    
  noiDung.innerHTML = `
    <div class="bo-loc">
      <input type="text" id="timKiemTon" placeholder="🔍 Tìm kiếm theo tên sản phẩm...">
      <select id="locLoai">
        <option value="">-- Tất cả loại --</option>
        ${dsMatHang.map(l => `<option value="${l.maMatHang}">${l.tenMatHang}</option>`).join("")}
      </select>
      <button id="nutLocTon">Lọc</button>
    </div>

    <table border="1" width="100%" style="border-collapse:collapse; text-align:center; margin-top:10px;">
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
  `;

  // Hiển thị dữ liệu ban đầu
  hienThiSoLuongTon();

  // Thêm sự kiện tìm kiếm và lọc
  document.getElementById("timKiemTon").addEventListener("input", hienThiSoLuongTon);
  document.getElementById("locLoai").addEventListener("change", hienThiSoLuongTon);
  document.getElementById("nutLocTon").addEventListener("click", hienThiSoLuongTon);
}

// Hàm tính toán và hiển thị danh sách tồn kho
function hienThiSoLuongTon() {
  const tuKhoa = document.getElementById("timKiemTon").value.toLowerCase();
  const maLoaiLoc = document.getElementById("locLoai").value;
  const bang = document.getElementById("bangTon");
  if (!bang) return;

  // Kiểm tra và sử dụng biến từ data.js
  const dsSanPham = typeof tableSp !== 'undefined' ? tableSp : [];
  const dsMatHang = typeof tableMatHang !== 'undefined' ? tableMatHang : [];

  bang.innerHTML = "";

  dsSanPham
    .filter(sp => 
      (!maLoaiLoc || sp.maMatHang.toString() === maLoaiLoc) && // Lọc theo maMatHang
      (!tuKhoa || sp.tenSP.toLowerCase().includes(tuKhoa))
    )
    .forEach(sp => {
      // Tìm tên loại sản phẩm
      const loai = dsMatHang.find(l => l.maMatHang.toString() === sp.maMatHang);
        
      // Sử dụng trường 'soLuong' từ data.js
      const ton = sp.soLuong || 0; 
      let trangThai = "";
      let mau = "";
// Ngưỡng cảnh báo tôi lấy tạm là 5, bạn có thể thay đổi
      const nguongCanhBao = sp.nguongCanhBao || 5; 

      if (ton <= 0) {
        trangThai = "Hết hàng";
        mau = "#f8d7da"; // Đỏ nhạt
      } else if (ton < nguongCanhBao) {
        trangThai = "Còn ít";
        mau = "#fff3cd"; // Vàng nhạt
      } else {
        trangThai = "Đủ hàng";
        mau = "#d4edda"; // Xanh nhạt
      }
        
      // Lấy giá hiện tại từ trường 'giaHienTai' trong data.js
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