// =========================================================
// KIỂM TRA VÀ ĐỒNG BỘ DỮ LIỆU TỪ LOCALSTORAGE
// =========================================================

// Hàm hỗ trợ lấy dữ liệu từ localStorage
function getlocalStore(key) {
  try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
  } catch (e) {
      console.error(`Lỗi khi đọc hoặc phân tích key localStorage: ${key}`, e);
      return null;
  }
}

// Hàm kiểm tra trạng thái hiển thị của Mã Mặt Hàng
function layTrangThaiMatHang(maMH) {
  // Luôn lấy dữ liệu mới nhất từ localStorage
  const dsMatHang = getlocalStore("matHang") || []; 
  // Tìm mã mặt hàng tương ứng
  const matHangItem = dsMatHang.find(mh => String(mh.maMatHang) === String(maMH));

  // Nếu không tìm thấy mã mặt hàng (dữ liệu lỗi), mặc định cho phép hiển thị (true)
  if (!matHangItem) return true; 

  // Trả về giá trị của trường hienThi.
  // Xử lý cả boolean và string
  if (typeof matHangItem.hienThi === 'boolean') {
      return matHangItem.hienThi;
  } else if (typeof matHangItem.hienThi === 'string') {
      return matHangItem.hienThi === "true" || matHangItem.hienThi === "1";
  }
  
  return true; // Mặc định hiển thị nếu không xác định
}

// =========================================================
// HÀM CẬP NHẬT NHẬP HÀNG LÊN LOCALSTORAGE
// =========================================================

function capNhatNhapHangLenLocalStorage(maSP, soLuongNhap, giaNhap, ngayNhap, maPhieu) {
  try {
      // Lấy dữ liệu nhập hàng hiện tại từ localStorage
      let nhapHangHienTai = JSON.parse(localStorage.getItem("nhapHang")) || [];
      
      // Tạo đối tượng nhập hàng mới
      const nhapHangMoi = {
          maPhieu: maPhieu || `PN${Date.now()}`, // Tự động tạo mã phiếu nếu không có
          maSP: maSP,
          soLuong: soLuongNhap,
          giaNhap: giaNhap,
          ngayNhap: ngayNhap || new Date().toISOString().split('T')[0], // Ngày hiện tại nếu không có
          trangThai: true
      };
      
      // Thêm vào mảng nhập hàng
      nhapHangHienTai.push(nhapHangMoi);
      
      // Lưu lại vào localStorage
      localStorage.setItem("nhapHang", JSON.stringify(nhapHangHienTai));
      
      console.log(`✅ Đã thêm phiếu nhập hàng: ${maPhieu} - Mã SP: ${maSP}`);
      return true;
  } catch (error) {
      console.error("❌ Lỗi khi cập nhật nhập hàng:", error);
      return false;
  }
}

// Hàm cập nhật số lượng tồn kho sau khi nhập hàng
function capNhatSoLuongTon(maSP, soLuongNhap) {
  try {
      // Lấy dữ liệu sản phẩm hiện tại từ localStorage
      let sanPhamHienTai = JSON.parse(localStorage.getItem("product")) || [];
      
      // Tìm sản phẩm theo mã
      const spIndex = sanPhamHienTai.findIndex(sp => sp.maSP === maSP);
      
      if (spIndex !== -1) {
          // Cập nhật số lượng tồn
          sanPhamHienTai[spIndex].soLuong += soLuongNhap;
          
          // Lưu lại vào localStorage
          localStorage.setItem("product", JSON.stringify(sanPhamHienTai));
          
          console.log(`✅ Đã cập nhật tồn kho: Mã SP ${maSP} - Số lượng: +${soLuongNhap}`);
          return true;
      } else {
          console.error(`❌ Không tìm thấy sản phẩm mã ${maSP}`);
          return false;
      }
  } catch (error) {
      console.error("❌ Lỗi khi cập nhật số lượng tồn:", error);
      return false;
  }
}

// Hàm nhập hàng hoàn chỉnh (cập nhật cả nhập hàng và tồn kho)
function nhapHangHoanChinh(maSP, soLuongNhap, giaNhap, ngayNhap, maPhieu) {
  // Cập nhật bảng nhập hàng
  const success1 = capNhatNhapHangLenLocalStorage(maSP, soLuongNhap, giaNhap, ngayNhap, maPhieu);
  
  // Cập nhật số lượng tồn kho
  const success2 = capNhatSoLuongTon(maSP, soLuongNhap);
  
  return success1 && success2;
}

// Hàm lấy thông tin nhập hàng theo mã SP
function layThongTinNhapHangTheoSP(maSP) {
  try {
      const nhapHangHienTai = JSON.parse(localStorage.getItem("nhapHang")) || [];
      return nhapHangHienTai.filter(item => item.maSP === maSP);
  } catch (error) {
      console.error("❌ Lỗi khi lấy thông tin nhập hàng:", error);
      return [];
  }
}

// Hàm tính giá vốn trung bình theo mã SP
function tinhGiaVonTrungBinh(maSP) {
  try {
      const nhapHangTheoSP = layThongTinNhapHangTheoSP(maSP);
      
      if (nhapHangTheoSP.length === 0) {
          return 0;
      }
      
      let tongTien = 0;
      let tongSoLuong = 0;
      
      nhapHangTheoSP.forEach(item => {
          tongTien += item.giaNhap * item.soLuong;
          tongSoLuong += item.soLuong;
      });
      
      return tongSoLuong > 0 ? Math.round(tongTien / tongSoLuong) : 0;
  } catch (error) {
      console.error("❌ Lỗi khi tính giá vốn trung bình:", error);
      return 0;
  }
}

// Hàm để đồng bộ dữ liệu từ localStorage vào biến toàn cục
function dongBoDuLieu() {
  const storedProduct = getlocalStore("product");
  const storedMatHang = getlocalStore("matHang");
  const storedNhapHang = getlocalStore("nhapHang");
  
  // Nếu có dữ liệu trong localStorage, sử dụng nó thay cho dữ liệu gốc
  if (storedProduct && storedProduct.length > 0) {
    console.log("Sử dụng dữ liệu sản phẩm từ localStorage");
    return {
      product: storedProduct,
      matHang: storedMatHang || matHang,
      nhapHang: storedNhapHang || nhapHang
    };
  } else {
    console.log("Sử dụng dữ liệu gốc từ data.js");
    return {
      product: tatCaSanPham,
      matHang: matHang,
      nhapHang: nhapHang
    };
  }
}

// Đồng bộ dữ liệu
const duLieuDongBo = dongBoDuLieu();

// Gán lại biến toàn cục với dữ liệu đã đồng bộ VÀ LỌC THEO DANH MỤC HIỂN THỊ
tatCaSanPham = duLieuDongBo.product.filter(sp => {
  const isCategoryVisible = layTrangThaiMatHang(sp.maMatHang);
  return isCategoryVisible; 
});
matHang = duLieuDongBo.matHang;
nhapHang = duLieuDongBo.nhapHang;

// Ghi đè hàm getTable để luôn trả về dữ liệu từ localStorage
function getTable(name) {
  const storedProduct = getlocalStore("product");
  const storedMatHang = getlocalStore("matHang");
  const storedNhapHang = getlocalStore("nhapHang");
  
  if (name === "san_pham") return { data: storedProduct || tatCaSanPham };
  if (name === "mat_hang") return { data: storedMatHang || matHang };
  if (name === "nhap_hang") return { data: storedNhapHang || nhapHang };
  return null;
}

function quanLyGiaBan() {
  console.log("Bắt đầu hàm quanLyGiaBan");
  
  // LUÔN lấy dữ liệu từ localStorage
  let sanPhamTable = getlocalStore("product") || [];
  const loaiTable = getlocalStore("matHang") || [];
  const nhapHangTable = getlocalStore("nhapHang") || [];

  console.log("Dữ liệu sản phẩm từ localStorage:", sanPhamTable.length, "sản phẩm");

  if (sanPhamTable.length === 0 || loaiTable.length === 0 || nhapHangTable.length === 0) {
    alert("Thiếu dữ liệu! Vui lòng kiểm tra localStorage.");
    console.error("Thiếu dữ liệu:", {
      sanPham: sanPhamTable.length,
      loai: loaiTable.length,
      nhapHang: nhapHangTable.length
    });
    return;
  }

  // LỌC SẢN PHẨM THEO DANH MỤC HIỂN THỊ
  sanPhamTable = sanPhamTable.filter(sp => layTrangThaiMatHang(sp.maMatHang));
  console.log("Số sản phẩm sau khi lọc theo danh mục:", sanPhamTable.length);

  // Tính Giá vốn
  const giaVonMap = {};
  nhapHangTable.forEach(item => {
    const maSP = item.maSP;
    const giaNhap = item.giaNhap;
    const soLuong = item.soLuong;

    if (!giaVonMap[maSP]) {
      giaVonMap[maSP] = { totalCost: 0, totalQuantity: 0 };
    }
    
    giaVonMap[maSP].totalCost += giaNhap * soLuong;
    giaVonMap[maSP].totalQuantity += soLuong;
  });

  const averageGiaVon = {};
  for (const maSP in giaVonMap) {
    if (giaVonMap[maSP].totalQuantity > 0) {
      averageGiaVon[parseInt(maSP)] = Math.round(giaVonMap[maSP].totalCost / giaVonMap[maSP].totalQuantity);
    }
  }

  // Xử lý sản phẩm không có trong bảng nhập hàng
  sanPhamTable.forEach(sp => {
    if (!averageGiaVon[sp.maSP]) {
      averageGiaVon[sp.maSP] = Math.round(sp.gsgg * 0.8);
    }
  });

  // Ánh xạ dữ liệu sản phẩm
  const dsSP = sanPhamTable.map((sp) => {
    const giaVon = averageGiaVon[sp.maSP] || sp.gsgg * 0.8;

    return {
      MA_SAN_PHAM: sp.maSP,
      TEN_SP: sp.tenSP,
      MA_MAT_HANG: sp.maMatHang,
      GIA_BAN: sp.gsgg,
      GIA_VON: giaVon,
    };
  });

  // CHỈ GIỮ LẠI CÁC MÃ MẶT HÀNG CÓ hienThi: true
  const dsLoai = loaiTable
    .filter(l => {
      const hienThi = l.hienThi;
      if (typeof hienThi === 'boolean') return hienThi;
      if (typeof hienThi === 'string') return hienThi === "true" || hienThi === "1";
      return true; // Mặc định hiển thị nếu không xác định
    })
    .map((l) => ({
      MA_MAT_HANG: l.maMatHang,
      TEN_MAT_HANG: l.tenMatHang,
    }));

  console.log("Số lượng sản phẩm:", dsSP.length);
  console.log("Số lượng loại được hiển thị:", dsLoai.length);

  const noiDung = document.getElementById("noi_dung");
  if (!noiDung) {
    alert("Không tìm thấy element #noi_dung");
    return;
  }

  noiDung.innerHTML = `
    <h2>Quản lý giá bán</h2>
    <div class="thanh-timkiem">
      <select id="locLoai" class="chon-loai">
        <option value="">Tất cả</option>
        ${dsLoai
          .map(
            (l) => `<option value="${l.MA_MAT_HANG}">${l.TEN_MAT_HANG}</option>`
          )
          .join("")}
      </select>
      <input type="text" id="timTen" class="o-tim" placeholder="Nhập tên SP hoặc Mã SP...">
      <button id="btnTim" class="nut-tim"><i class="fa-solid fa-magnifying-glass"></i> Tìm</button>
    </div>
    <div style="margin-top: 20px;">
      <table id="tblGiaBan" border="1" style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="background-color: #f0f0f0;">
            <th style="padding: 10px;">Mã SP</th>
            <th style="padding: 10px;">Tên sản phẩm</th>
            <th style="padding: 10px;">Loại</th>
            <th style="padding: 10px;">Giá vốn (VNĐ)</th>
            <th style="padding: 10px;">% Lợi nhuận</th>
            <th style="padding: 10px;">Giá bán (VNĐ)</th>
            <th style="padding: 10px;">Cập nhật</th>
          </tr>
        </thead>
        <tbody id="tbodyGiaBan">
          <!-- Dữ liệu sẽ được thêm ở đây -->
        </tbody>
      </table>
    </div>
  `;

  const tbody = document.getElementById("tbodyGiaBan");
  const inputTim = document.getElementById("timTen");
  const selectLoai = document.getElementById("locLoai");

  if (!tbody) {
    console.error("Không tìm thấy tbody");
    return;
  }

  // HÀM LỌC SẢN PHẨM
  function locSanPham() {
    const timKiem = inputTim.value.toLowerCase().trim();
    const maLoai = selectLoai.value;

    const isNumeric = /^\d+$/.test(timKiem);

    const dsLoc = dsSP.filter((sp) => {
      const matchLoai = maLoai === "" || sp.MA_MAT_HANG.toString() === maLoai;

      const maSP_str = sp.MA_SAN_PHAM.toString();
      const tenSP_lower = sp.TEN_SP.toLowerCase();

      let matchTim = false;

      if (timKiem === "") {
        matchTim = true;
      } else if (isNumeric) {
        matchTim = maSP_str.includes(timKiem);
      } else {
        matchTim = tenSP_lower.includes(timKiem);
      }

      return matchTim && matchLoai;
    });
    
    console.log("Số sản phẩm sau khi lọc:", dsLoc.length);
    hienThi(dsLoc);
  }

  // Hàm hiển thị
  function hienThi(ds) {
    console.log("Hiển thị", ds.length, "sản phẩm");
    
    tbody.innerHTML = "";
    
    if (ds.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 20px;">Không tìm thấy sản phẩm nào</td></tr>`;
      return;
    }

    ds.forEach((sp) => {
      const loai = dsLoai.find((l) => l.MA_MAT_HANG == sp.MA_MAT_HANG);
      const tenLoai = loai ? loai.TEN_MAT_HANG : "Không xác định";

      const giaVon = sp.GIA_VON;
      const giaBan = sp.GIA_BAN;

      let loiNhuan = 0;
      if (giaVon > 0) {
        loiNhuan = ((giaBan - giaVon) / giaVon) * 100;
      }

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td style="padding: 8px; text-align: center;">${sp.MA_SAN_PHAM}</td>
        <td style="padding: 8px;">${sp.TEN_SP}</td>
        <td style="padding: 8px;">${tenLoai}</td>
        <td style="padding: 8px; text-align: right;">${giaVon.toLocaleString("vi-VN")}</td>
        <td style="padding: 8px; text-align: center;">
          <input type="number" value="${loiNhuan.toFixed(1)}" min="0" step="0.1" style="width:80px; padding: 4px;">
        </td>
        <td style="padding: 8px; text-align: right;">${giaBan.toLocaleString("vi-VN")}</td>
        <td style="padding: 8px; text-align: center;">
          <button class="updateGia" data-ma-sp="${sp.MA_SAN_PHAM}" style="padding: 6px 12px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">
            💾 Lưu
          </button>
        </td>
      `;
      tbody.appendChild(tr);

      // Sự kiện click nút Lưu
      tr.querySelector(".updateGia").onclick = function(e) {
        const maSP = parseInt(e.target.dataset.maSp);
        const input = tr.querySelector("input");
        const newLN = parseFloat(input.value);

        if (isNaN(newLN) || newLN < 0) {
          alert("Giá trị lợi nhuận không hợp lệ!");
          return;
        }

        const newGiaBan = Math.round(giaVon * (1 + newLN / 100));

        // Cập nhật hiển thị
        tr.children[5].textContent = newGiaBan.toLocaleString("vi-VN");

        // Cập nhật dữ liệu trong localStorage
        const spIndex = sanPhamTable.findIndex(p => p.maSP === maSP);
        if (spIndex !== -1) {
          sanPhamTable[spIndex].gsgg = newGiaBan;
          sanPhamTable[spIndex].gsht = newGiaBan;
          sanPhamTable[spIndex].giaHienTai = newGiaBan.toLocaleString("vi-VN") + "đ";
          
          // Lưu vào localStorage
          localStorage.setItem("product", JSON.stringify(sanPhamTable));
          console.log(`✅ Đã cập nhật và lưu sản phẩm mã ${maSP}, gsgg = ${newGiaBan}`);
        }

        // Cập nhật dữ liệu hiện tại
        sp.GIA_BAN = newGiaBan;

        alert(`✅ Cập nhật ${sp.TEN_SP} → ${newGiaBan.toLocaleString("vi-VN")} VNĐ (Lợi nhuận: ${newLN}%)`);
      };
    });
  }

  // Gắn sự kiện
  document.getElementById("btnTim").onclick = locSanPham;
  inputTim.onkeyup = locSanPham;
  selectLoai.onchange = locSanPham;

  // Hiển thị ban đầu
  hienThi(dsSP);
}