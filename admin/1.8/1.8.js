// ============================================================================
// HÀM HỖ TRỢ ĐỌC/GHI LOCAL STORAGE
// ============================================================================

function getlocalStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (e) {
        console.error("Lỗi khi lấy localStorage:", e);
        return null;
    }
}

function setlocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
        console.error("Lỗi khi lưu localStorage:", e);
    }
}

// ============================================================================
// HÀM CHÍNH: KHỞI TẠO GIAO DIỆN QUẢN LÝ SỐ LƯỢNG TỒN
// ============================================================================

function quanLySoLuongTon() {
    const noiDung = document.querySelector(".content#noi_dung");
    if (!noiDung) {
        console.error("Không tìm thấy khu vực hiển thị (id='noi_dung')");
        return;
    }

    // Lấy danh sách mặt hàng
    const dsMatHang = typeof tableMatHang !== 'undefined' && tableMatHang ? tableMatHang : (typeof matHang !== 'undefined' ? matHang : []);

    noiDung.innerHTML = `
    <div>
        <h2 style="color:#333">Quản Lí Số Lượng Tồn Của Sản Phẩm</h2>
        
        <div style="margin-bottom: 20px; border-bottom: 1px solid #ddd; padding-bottom: 15px;">
            <div style="font-weight: bold; margin-bottom: 10px; color: #009879;">🔎 Bộ Lọc & Tìm Kiếm</div>
            <div class="bo-loc" style="display:flex; gap:10px; flex-wrap:wrap; align-items: center;">
                <input type="text" id="timKiemMaSP" placeholder="🔍 Tìm theo mã SP..." style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 140px;">
                <input type="text" id="timKiemTon" placeholder="🔍 Tìm theo tên SP..." style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 160px;">
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
                
                <div style="display: flex; align-items: center; gap: 5px;">
                    <label for="nguongCanhBaoLoc" style="font-weight: 500; white-space: nowrap;">⚠️ SL ≤</label>
                    <input 
                        type="number" 
                        id="nguongCanhBaoLoc" 
                        placeholder="Ngưỡng" 
                        min="0" 
                        style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 80px;"
                        title="Lọc sản phẩm có số lượng tồn từ giá trị này trở xuống"
                    >
                </div>
                
                <div style="display: flex; align-items: center; gap: 5px; background-color:#f9f9f9; padding: 5px 10px; border-radius: 4px; border: 1px solid #eee;">
                    <span style="font-weight: 500;">📅 Từ:</span>
                    <input type="date" id="ngayBatDau" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                    <span style="font-weight: 500;">Đến:</span>
                    <input type="date" id="ngayKetThuc" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                </div>
                
                <button id="nutLocTon" style="padding: 8px 15px; background-color:#009879; color:white; border:none; border-radius: 4px; cursor:pointer;">Lọc</button>
            </div>
        </div>
        
        <div class="bo-loc" style="background-color: #f0f0f0; padding: 15px; border-radius: 8px; border: 1px solid #ccc; margin-bottom: 20px; display:flex; gap:10px; flex-wrap:wrap; align-items: center;">
            <span style="font-weight: bold; color: #333; white-space: nowrap;">🚨 GÁN NGƯỠNG CẢNH BÁO HÀNG LOẠT:</span>
            <select id="locLoaiSetNguong" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; background-color: white;">
                <option value="">-- Chọn Loại cần GÁN Ngưỡng --</option>
                ${dsMatHang.map(l => `<option value="${l.maMatHang}">${l.tenMatHang}</option>`).join("")}
            </select>
            <input 
                type="number" 
                id="nguongSet" 
                placeholder="Gán ngưỡng cảnh báo..." 
                min="1" 
                style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 150px;"
            >
            <button 
                id="nutSetNguong" 
                style="padding: 8px 15px; background-color:#17a2b8; color:white; border:none; border-radius: 4px; cursor:pointer; font-weight: bold;"
            >
                Gán Ngưỡng
            </button>
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

    // Event listeners cho các bộ lọc
    document.getElementById("timKiemMaSP").addEventListener("input", hienThiSoLuongTon);
    document.getElementById("timKiemTon").addEventListener("input", hienThiSoLuongTon);
    document.getElementById("locLoai").addEventListener("change", hienThiSoLuongTon);
    document.getElementById("locTrangThai").addEventListener("change", hienThiSoLuongTon);
    document.getElementById("nguongCanhBaoLoc").addEventListener("input", hienThiSoLuongTon);
    
    // Event listener cho bộ lọc ngày
    document.getElementById("ngayBatDau").addEventListener("change", hienThiSoLuongTon);
    document.getElementById("ngayKetThuc").addEventListener("change", hienThiSoLuongTon);
    
    document.getElementById("nutLocTon").addEventListener("click", hienThiSoLuongTon);
    
    // Event listener cho chức năng GÁN NGƯỠNG CẢNH BÁO HÀNG LOẠT
    document.getElementById("nutSetNguong").addEventListener("click", setNguongCanhBaoTheoLoai);
}

// ============================================================================
// HÀM GÁN SỐ LƯỢNG TỒN THEO LOẠI (ĐÃ BỊ XÓA THEO YÊU CẦU CỦA BẠN)
// ============================================================================

// ============================================================================
// HÀM CẬP NHẬT NGƯỠNG CẢNH BÁO THEO LOẠI
// ============================================================================
function setNguongCanhBaoTheoLoai() {
    const maLoaiSet = document.getElementById("locLoaiSetNguong").value;
    const nguongSet = document.getElementById("nguongSet").value.trim();

    if (!maLoaiSet) {
        alert("⚠️ Vui lòng chọn một Loại mặt hàng để cập nhật ngưỡng!");
        document.getElementById("locLoaiSetNguong").focus();
        return;
    }
    const nguongMoi = parseInt(nguongSet);
    if (isNaN(nguongMoi) || nguongMoi < 1) {
        alert("⚠️ Ngưỡng cảnh báo phải là một số nguyên lớn hơn hoặc bằng 1!");
        document.getElementById("nguongSet").focus();
        return;
    }

    const dsMatHang = typeof tableMatHang !== 'undefined' && tableMatHang ? tableMatHang : (typeof matHang !== 'undefined' ? matHang : []);
    const tenLoai = (dsMatHang.find(l => l.maMatHang.toString() === maLoaiSet) || {}).tenMatHang || 'Loại không rõ';

    if (!confirm(`Bạn có chắc chắn muốn GÁN ngưỡng cảnh báo = ${nguongMoi} cho TẤT CẢ sản phẩm thuộc loại "${tenLoai}" không?`)) {
        return;
    }

    let dsSanPham = getlocalStorage('product') || [];
    let countUpdated = 0;

    dsSanPham = dsSanPham.map(sp => {
        if (sp.maMatHang.toString() === maLoaiSet.toString() && sp.hienAn === "1") {
            sp.nguongCanhBao = nguongMoi;
            countUpdated++;
        }
        return sp;
    });

    // 1. Lưu lại vào localStorage
    setlocalStorage('product', dsSanPham);
    
    // 2. Cập nhật biến toàn cục (nếu có)
    if (typeof tatCaSanPham !== 'undefined') {
        window.tatCaSanPham = dsSanPham;
    }

    alert(`✅ Đã cập nhật thành công ngưỡng cảnh báo = ${nguongMoi} cho ${countUpdated} sản phẩm thuộc loại "${tenLoai}"!`);

    // 3. Render lại bảng
    hienThiSoLuongTon();
}

// ============================================================================
// HÀM HIỂN THỊ DỮ LIỆU SỐ LƯỢNG TỒN (Đã có logic lọc ngày)
// ============================================================================

function hienThiSoLuongTon() {
    const maSPFilter = document.getElementById("timKiemMaSP").value.trim();
    const tuKhoa = document.getElementById("timKiemTon").value.toLowerCase();
    const maLoaiLoc = document.getElementById("locLoai").value;
    const trangThaiLoc = document.getElementById("locTrangThai").value;
    
    const nguongCanhBaoInput = document.getElementById("nguongCanhBaoLoc").value.trim();
    const nguongCanhBaoLoc = nguongCanhBaoInput !== "" ? parseInt(nguongCanhBaoInput) : null;
    
    // LẤY GIÁ TRỊ LỌC NGÀY
    const ngayBatDau = document.getElementById("ngayBatDau").value;
    const ngayKetThuc = document.getElementById("ngayKetThuc").value;

    const bang = document.getElementById("bangTon");
    if (!bang) return;

    const dsSanPham = typeof tatCaSanPham !== 'undefined' ? tatCaSanPham : (getlocalStorage('product') || []);
    const dsMatHang = typeof tableMatHang !== 'undefined' && tableMatHang ? tableMatHang : (typeof matHang !== 'undefined' ? matHang : []);

    bang.innerHTML = "";

    dsSanPham
        .filter(sp => {
            const ton = sp.soLuong || 0;
            const nguongCanhBao = sp.nguongCanhBao || 5;
            
            let trangThai = "";
            if (ton <= 0) {
                trangThai = "Hết hàng";
            } else if (ton < nguongCanhBao) {
                trangThai = "Còn ít";
            } else {
                trangThai = "Đủ hàng";
            }
            
            // Lọc theo tiêu chí sản phẩm
            const maSPMatch = !maSPFilter || sp.maSP.toString().includes(maSPFilter);
            const maLoaiMatch = !maLoaiLoc || sp.maMatHang.toString() === maLoaiLoc.toString();
            const tenSPMatch = !tuKhoa || (sp.tenSP && sp.tenSP.toLowerCase().includes(tuKhoa));
            const trangThaiMatch = !trangThaiLoc || trangThai === trangThaiLoc;
            const nguongMatch = nguongCanhBaoLoc === null || ton <= nguongCanhBaoLoc;
            const hienAnMatch = sp.hienAn === "1"; 

            // LOGIC LỌC NGÀY
            let ngayMatch = true;
            if (ngayBatDau || ngayKetThuc) {
                // Giả định sản phẩm có trường ngayNhapCuoi (dạng "YYYY-MM-DD")
                const ngayNhap = sp.ngayNhapCuoi ? new Date(sp.ngayNhapCuoi) : null; 
                
                if (ngayNhap) {
                    const batDau = ngayBatDau ? new Date(ngayBatDau) : new Date('1900-01-01');
                    const ketThuc = ngayKetThuc ? new Date(ngayKetThuc) : new Date('2100-12-31');
                    
                    batDau.setHours(0,0,0,0);
                    ketThuc.setHours(23,59,59,999);
                    
                    ngayMatch = (ngayNhap >= batDau && ngayNhap <= ketThuc);
                } else {
                    ngayMatch = false; 
                }
            }

            return maSPMatch && maLoaiMatch && tenSPMatch && trangThaiMatch && nguongMatch && hienAnMatch && ngayMatch;
        })
        .forEach(sp => {
            const loai = dsMatHang.find(l => l.maMatHang.toString() === sp.maMatHang.toString());
            
            const ton = sp.soLuong || 0;
            const nguongCanhBao = sp.nguongCanhBao || 5;
            
            let mau = "";
            let trangThai = "";
            
            if (ton <= 0) {
                mau = "#f8d7da"; 
                trangThai = "Hết hàng";
            } else if (ton < nguongCanhBao) {
                mau = "#fff3cd"; 
                trangThai = "Còn ít";
            } else {
                mau = "#d4edda"; 
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
                    <td style="padding:8px; border: 1px solid #ddd; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 50px;">
                        <span style="min-width: 30px; text-align: center; font-weight: bold; margin-bottom: 5px; font-size: 1.2em;">${nguongCanhBao}</span>
                        <div style="display: flex; align-items: center; justify-content: center; gap: 5px;">
                            <button 
                                onclick="thayDoiNguongCanhBao(${sp.maSP}, -1)" 
                                style="padding: 4px 8px; background-color: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; text-align: center;"
                                title="Giảm ngưỡng cảnh báo"
                            >
                                −
                            </button>
                            <button 
                                onclick="thayDoiNguongCanhBao(${sp.maSP}, 1)" 
                                style="padding: 4px 8px; background-color: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; text-align: center;"
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
// HÀM TĂNG/GIẢM NGƯỠNG CẢNH BÁO ĐƠN LẺ
// ============================================================================

function thayDoiNguongCanhBao(maSP, delta) {
    console.log(`🔄 Thay đổi ngưỡng SP ${maSP}, delta: ${delta}`);
    
    let dsSanPham = getlocalStorage('product') || [];
    
    const index = dsSanPham.findIndex(sp => sp.maSP == maSP);
    
    if (index === -1) {
        alert('❌ Không tìm thấy sản phẩm!');
        console.error('Không tìm thấy maSP:', maSP);
        return;
    }
    
    let nguongHienTai = dsSanPham[index].nguongCanhBao || 5;
    let nguongMoi = nguongHienTai + delta;
    
    if (nguongMoi < 1) {
        alert('⚠️ Ngưỡng cảnh báo không thể nhỏ hơn 1!');
        return;
    }
    
    dsSanPham[index].nguongCanhBao = nguongMoi;
    
    setlocalStorage('product', dsSanPham);
    
    if (typeof tatCaSanPham !== 'undefined') {
        const globalIndex = tatCaSanPham.findIndex(sp => sp.maSP == maSP);
        if (globalIndex !== -1) {
            tatCaSanPham[globalIndex].nguongCanhBao = nguongMoi;
        }
    }
    
    console.log(`✅ Hoàn tất: SP ${maSP} → Ngưỡng ${nguongHienTai} → ${nguongMoi}`);
    
    hienThiSoLuongTon();
}