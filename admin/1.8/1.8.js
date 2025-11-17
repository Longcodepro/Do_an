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
      
      <!-- ⭐ Ô NHẬP NGƯỠNG CẢNH BÁO -->
      <div style="display: flex; align-items: center; gap: 5px;">
        <label for="nguongCanhBaoLoc" style="font-weight: 500; white-space: nowrap;">
          ⚠️ Số lượng ≤
        </label>
        <input 
          type="number" 
          id="nguongCanhBaoLoc" 
          placeholder="VD: 3" 
          min="0" 
          style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 80px;"
          title="Nhập số để lọc sản phẩm có số lượng tồn từ giá trị này trở xuống"
        >
      </div>
      
      <button id="nutLocTon" style="padding: 8px 15px; background-color:#009879; color:white; border:none; border-radius: 4px; cursor:pointer;">Lọc</button>
    </div>
    <div style="overflow-x: auto;">
    <table width="100%" style="border-collapse:collapse; text-align:center; margin-top:10px; font-family: Arial, sans-serif; border: 1px solid #ddd; margin-bottom: 10%">
      <thead>
        <tr style="background-color:#009879; color:white;">
          <th style="padding:12px; border: 1px solid #ddd;">Mã SP</th>
          <th style="padding:12px; border: 1px solid #ddd;">Tên sản phẩm</th>
          <th style="padding:12px; border: 1px solid #ddd;">Loại</th>
          <th style="padding:12px; border: 1px solid #ddd;">Giá hiện tại</th>
          <th style="padding:12px; border: 1px solid #ddd;">Số lượng tồn</th>
          <th style="padding:12px; border: 1px solid #ddd;">Trạng thái</th>
          <th style="padding:12px; border: 1px solid #ddd;">Ngưỡng cảnh báo</th>
        </tr>
      </thead>
      <tbody id="bangTon"></tbody>
    </table>
    </div>
  </div>
  `;

  hienThiSoLuongTon();

  // Event listeners
  document.getElementById("timKiemMaSP").addEventListener("input", () => hienThiSoLuongTon());
  document.getElementById("timKiemTon").addEventListener("input", () => hienThiSoLuongTon());
  document.getElementById("locLoai").addEventListener("change", () => hienThiSoLuongTon());
  document.getElementById("locTrangThai").addEventListener("change", () => hienThiSoLuongTon());
  document.getElementById("nguongCanhBaoLoc").addEventListener("input", () => hienThiSoLuongTon());
  document.getElementById("nutLocTon").addEventListener("click", () => hienThiSoLuongTon());
}

function hienThiSoLuongTon() {
  const maSPFilter = document.getElementById("timKiemMaSP").value.trim();
  const tuKhoa = document.getElementById("timKiemTon").value.toLowerCase();
  const maLoaiLoc = document.getElementById("locLoai").value;
  const trangThaiLoc = document.getElementById("locTrangThai").value;
  
  // Lấy giá trị ngưỡng cảnh báo lọc
  const nguongCanhBaoInput = document.getElementById("nguongCanhBaoLoc").value.trim();
  const nguongCanhBaoLoc = nguongCanhBaoInput !== "" ? parseInt(nguongCanhBaoInput) : null;
  
  const bang = document.getElementById("bangTon");
  if (!bang) return;

  const dsSanPham = typeof tatCaSanPham !== 'undefined' ? tatCaSanPham : [];
  const dsMatHang = typeof tableMatHang !== 'undefined' && tableMatHang ? tableMatHang : (typeof matHang !== 'undefined' ? matHang : []);

  bang.innerHTML = "";

  dsSanPham
    .filter(sp => {
      const ton = sp.soLuong || 0;
      const nguongCanhBao = sp.nguongCanhBao || 5;
      
      // Xác định trạng thái
      let trangThai = "";
      if (ton <= 0) {
        trangThai = "Hết hàng";
      } else if (ton < nguongCanhBao) {
        trangThai = "Còn ít";
      } else {
        trangThai = "Đủ hàng";
      }
      
      // Lọc theo mã SP
      const maSPMatch = !maSPFilter || sp.maSP.toString().includes(maSPFilter);
      
      // Lọc theo mã loại
      const maLoaiMatch = !maLoaiLoc || sp.maMatHang.toString() === maLoaiLoc.toString();
      
      // Lọc theo tên sản phẩm
      const tenSPMatch = !tuKhoa || (sp.tenSP && sp.tenSP.toLowerCase().includes(tuKhoa));
      
      // Lọc theo trạng thái
      const trangThaiMatch = !trangThaiLoc || trangThai === trangThaiLoc;
      
      // Lọc theo ngưỡng cảnh báo tùy chỉnh
      const nguongMatch = nguongCanhBaoLoc === null || ton <= nguongCanhBaoLoc;
      
      // Chỉ hiện sản phẩm đang hiển thị
      const hienAnMatch = sp.hienAn === "1";

      return maSPMatch && maLoaiMatch && tenSPMatch && trangThaiMatch && nguongMatch && hienAnMatch;
    })
    .forEach(sp => {
      const loai = dsMatHang.find(l => l.maMatHang.toString() === sp.maMatHang.toString());
      
      const ton = sp.soLuong || 0;
      const nguongCanhBao = sp.nguongCanhBao || 5;
      
      // Xác định màu nền và trạng thái
      let mau = "";
      let trangThai = "";
      
      if (ton <= 0) {
        mau = "#f8d7da"; // Đỏ nhạt
        trangThai = "Hết hàng";
      } else if (ton < nguongCanhBao) {
        mau = "#fff3cd"; // Vàng nhạt
        trangThai = "Còn ít";
      } else {
        mau = "#d4edda"; // Xanh nhạt
        trangThai = "Đủ hàng";
      }

      const giaHienThi = sp.giaHienTai || "—";

      bang.innerHTML += `
        <tr style="background-color:${mau};">
          <td style="padding:8px; border: 1px solid #ddd;">${sp.maSP}</td>
          <td style="padding:8px; text-align:left; border: 1px solid #ddd;">${sp.tenSP}</td>
          <td style="padding:8px; border: 1px solid #ddd;">${loai ? loai.tenMatHang : "Không rõ"}</td>
          <td style="padding:8px; border: 1px solid #ddd;">${giaHienThi}</td>
          <td style="padding:8px; border: 1px solid #ddd; font-weight: bold;">${ton}</td>
          <td style="padding:8px; border: 1px solid #ddd;">${trangThai}</td>
          <td style="padding:8px; border: 1px solid #ddd;">
            <div style="display: flex; align-items: center; justify-content: center; gap: 5px;">
              <button 
                onclick="thayDoiNguongCanhBao(${sp.maSP}, -1)" 
                style="padding: 4px 8px; background-color: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;"
                title="Giảm ngưỡng cảnh báo"
              >
                −
              </button>
              <span style="min-width: 30px; text-align: center; font-weight: bold;">${nguongCanhBao}</span>
              <button 
                onclick="thayDoiNguongCanhBao(${sp.maSP}, 1)" 
                style="padding: 4px 8px; background-color: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;"
                title="Tăng ngưỡng cảnh báo"
              >
                +
              </button>
            </div>
          </td>
        </tr>
      `;
    });
}

// ============================================================================
// HÀM TĂNG/GIẢM NGƯỠNG CẢNH BÁO (ĐÃ SỬA)
// ============================================================================

function thayDoiNguongCanhBao(maSP, delta) {
  console.log(`🔄 Thay đổi ngưỡng SP ${maSP}, delta: ${delta}`);
  
  // Lấy danh sách sản phẩm từ localStorage
  let dsSanPham = getlocalStorage('product') || [];
  console.log('📦 Số sản phẩm trong localStorage:', dsSanPham.length);
  
  // Tìm index của sản phẩm
  const index = dsSanPham.findIndex(sp => sp.maSP == maSP);
  
  if (index === -1) {
    alert('❌ Không tìm thấy sản phẩm!');
    console.error('Không tìm thấy maSP:', maSP);
    return;
  }
  
  console.log('✅ Tìm thấy sản phẩm tại index:', index);
  
  // Lấy ngưỡng hiện tại
  let nguongHienTai = dsSanPham[index].nguongCanhBao || 5;
  console.log('📊 Ngưỡng hiện tại:', nguongHienTai);
  
  // Tính ngưỡng mới
  let nguongMoi = nguongHienTai + delta;
  console.log('📊 Ngưỡng mới:', nguongMoi);
  
  // Kiểm tra ngưỡng >= 1
  if (nguongMoi < 1) {
    alert('⚠️ Ngưỡng cảnh báo không thể nhỏ hơn 1!');
    return;
  }
  
  // CẬP NHẬT NGƯỠNG
  dsSanPham[index].nguongCanhBao = nguongMoi;
  
  // LƯU VÀO LOCALSTORAGE
  setlocalStorage('product', dsSanPham);
  console.log('💾 Đã lưu vào localStorage');
  
  // CẬP NHẬT BIẾN TOÀN CỤC (nếu có)
  if (typeof tatCaSanPham !== 'undefined') {
    const globalIndex = tatCaSanPham.findIndex(sp => sp.maSP == maSP);
    if (globalIndex !== -1) {
      tatCaSanPham[globalIndex].nguongCanhBao = nguongMoi;
      console.log('🌐 Đã cập nhật biến toàn cục tatCaSanPham');
    }
  }
  
  console.log(`✅ Hoàn tất: SP ${maSP} → Ngưỡng ${nguongHienTai} → ${nguongMoi}`);
  
  // RENDER LẠI BẢNG
  hienThiSoLuongTon();
}