// Quản lý số lượng tồn sản phẩm
// ===============================

function quanLySoLuongTon() {
    const noiDung = document.querySelector(".content#noi_dung");
    if (!noiDung) {
        console.error("Không tìm thấy khu vực hiển thị (id='noi_dung')");
        return;
    }

    // Giả định tableMatHang là biến global chứa danh sách mặt hàng
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
                <table border="1" width="100%" style="border-collapse:collapse; text-align:center; margin-top:10px; margin-bottom:10%">
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

    // Gọi hàm hiển thị dữ liệu lần đầu
    hienThiSoLuongTon();

    // Gắn sự kiện lắng nghe (EventListeners)
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

    // Giả định tableSp và tableMatHang là biến global chứa dữ liệu
    const dsSanPham = typeof tableSp !== 'undefined' ? tableSp : [];
    const dsMatHang = typeof tableMatHang !== 'undefined' ? tableMatHang : [];

    bang.innerHTML = "";

    dsSanPham
        .filter(sp => {
            // Tính toán trạng thái tồn kho cho mục đích lọc
            const ton = sp.soLuong || 0;
            // Giả định ngưỡng cảnh báo được định nghĩa trong dữ liệu hoặc mặc định là 5
            const nguongCanhBao = sp.nguongCanhBao || 5; 
            let trangThai = "";

            if (ton <= 0) {
                trangThai = "Hết hàng";
            } else if (ton < nguongCanhBao) {
                trangThai = "Còn ít";
            } else {
                trangThai = "Đủ hàng";
            }
            
            // Logic lọc
            return (!maSPFilter || sp.maSP.toString().includes(maSPFilter)) &&
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

            // Xác định trạng thái và màu sắc
            if (ton <= 0) {
                trangThai = "Hết hàng";
                mau = "#f8d7da"; // Màu đỏ nhạt
            } else if (ton < nguongCanhBao) {
                trangThai = "Còn ít";
                mau = "#fff3cd"; // Màu vàng nhạt
            } else {
                trangThai = "Đủ hàng";
                mau = "#d4edda"; // Màu xanh lá nhạt
            }

            // Giả định giá được lưu ở thuộc tính giaHienTai hoặc sử dụng hàm formatCurrency nếu có
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