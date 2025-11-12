// CÁC HÀM LẤY VÀ CẬP NHẬT DỮ LIỆU TỪ LOCALSTORAGE
function setlocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getlocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

// Kiểm tra input (tài khoản/mật khẩu)
function kiemTraNhap(tk, mk) {
    if (tk.trim() === "") {
        alert("Bạn chưa nhập tài khoản!");
        document.getElementById("dk-tk").focus();
        return false;
    }
    if (mk.trim() === "") {
        alert("Bạn chưa nhập mật khẩu!");
        document.getElementById("dk-mk").focus();
        return false;
    }
    return true;
}

// Kiểm tra input khi sửa thông tin
function kiemTraNhapSua(mk) {
    if (mk.trim() === "") {
        alert("Mật khẩu không được để trống!");
        document.getElementById("edit-mk").focus();
        return false;
    }
    return true;
}

// XỬ LÝ FORM VÀ UI (ĐĂNG KÝ/ĐĂNG NHẬP)
function moFormdnhap() {
    document.getElementById("formdnhap").style.display = "flex";
    document.getElementById("overlay").style.display = "block";
}

function dongFormdnhap() {
    document.getElementById("formdnhap").style.display = "none";
    document.getElementById("overlay").style.display = "none";
}

function moFormdky() {
    dongFormdnhap();
    document.getElementById("formdky").style.display = "flex";
    document.getElementById("overlay").style.display = "block";
}

function dongFormdky() {
    document.getElementById("formdky").style.display = "none";
    document.getElementById("overlay").style.display = "none";
}

// hàm lưu dữ liệu khi đăng ký
function dangKy() {
    let tkInput = document.getElementById("dk-tk");
    let ten = document.getElementById("dk-hoten").value;
    let mkInput = document.getElementById("dk-mk");
    let gt = document.querySelector('input[name="sex"]:checked')?.value || "Nam"; 
    let email = document.getElementById("dk-email").value;
    let sdt = document.getElementById("dk-sdt").value;
    let dc = document.getElementById("dk-diachi").value;

    const tk = tkInput.value;
    const mk = mkInput.value;
    if (!kiemTraNhap(tk, mk)) return;

    // LẤY BẢNG KHÁCH HÀNG TRỰC TIẾP TỪ LOCALSTORAGE
    let bangKH = getlocalStorage("khachHang");
    if (!bangKH) {
        bangKH = [];
    }

    // Kiểm tra tài khoản trùng (dựa vào trường tenTaiKhoan)
    if (bangKH.some(u => u.tenTaiKhoan === tk)) {
        alert("❌ Tài khoản đã tồn tại!");
        return;
    }

    // Tạo mã khách hàng mới (dựa trên maKH lớn nhất hiện có)
    let newID = bangKH.length > 0 ? Math.max(...bangKH.map(k => k.maKH)) + 1 : 1;
    
    // Chuyển đổi giới tính từ radio button (1/0) sang chuỗi (Nam/Nữ) cho tương thích với data.js mẫu
    let gioiTinhMoi = (gt === "1") ? "Nam" : "Nữ";

    // Thêm vào bảng khachHang với CẤU TRÚC MỚI từ data.js
    bangKH.push({
        maKH: newID,                // Mã khách hàng (số)
        tenTaiKhoan: tk,            // Tên đăng nhập
        matKhau: mk,                // MẬT KHẨU
        tenKH: ten,                 // Tên khách hàng
        gioiTinh: gioiTinhMoi,      // Giới tính (chuỗi: "Nam"/"Nữ")
        namSinh: document.getElementById("dk-namsinh")?.value || "",
        email: email,               // EMAIL
        soDienThoai: sdt,           // SĐT
        diaChi: dc,
        trangThai: 1                // Tình trạng (số 1)
    });

    // Lưu lại bảng khachHang vào local
    setlocalStorage("khachHang", bangKH);

    alert("✅ Đăng ký thành công!");
    dongFormdky();
    moFormdnhap();
}

// hàm đăng nhập
function dangNhap() {
    let tk = document.getElementById("dn-tk").value;
    let mk = document.getElementById("dn-mk").value;

    if (!kiemTraNhap(tk, mk)) return;

    // LẤY BẢNG KHÁCH HÀNG TRỰC TIẾP TỪ LOCALSTORAGE
    let bangKH = getlocalStorage("khachHang");
    if (!bangKH) {
        alert("Dữ liệu khách hàng chưa được khởi tạo. Vui lòng đăng ký.");
        return;
    }

    // Tìm kiếm khách hàng (user) bằng tenTaiKhoan
    let user = bangKH.find(u => u.tenTaiKhoan === tk);

    if (user) {
        // --- BẮT ĐẦU PHẦN SỬA ĐỂ ĐỒNG BỘ HÓA TRẠNG THÁI VÀ MẬT KHẨU ---

        // 1. Kiểm tra trạng thái tài khoản (Đồng bộ với Khoá/Mở trong 1.2.js)
        if (user.trangThai == 0) {
            alert("❌ Tài khoản của bạn đã bị khóa! Vui lòng liên hệ quản trị viên.");
            return;
        }

        // 2. Kiểm tra Mật khẩu (Đồng bộ với Reset trong 1.2.js)
        if (user.matKhau === mk) {
            // Lưu toàn bộ thông tin user vào currentUser (đảm bảo luôn là bản mới nhất)
            localStorage.setItem("currentUser", JSON.stringify(user));
            alert("✅ Đăng nhập thành công!");
            window.location.reload();
        } else {
            alert("❌ Sai tài khoản hoặc mật khẩu!");
        }
        
        // --- KẾT THÚC PHẦN SỬA ---
    } else {
        alert("❌ Sai tài khoản hoặc mật khẩu!");
    }
}

// hàm đăng xuất
function logout() {
    localStorage.removeItem("currentUser");
    alert("✅ Đăng xuất thành công!");
    window.location.reload();
}

// khi load lại vẫn hiện tài khoản
window.onload = function() {
    let user = JSON.parse(localStorage.getItem("currentUser"));
    let nutTK = document.getElementById("nut-tk");
    let nutDN = document.getElementById("nut-dn");
    let btnTK = document.getElementById("btn-tk");

    if (user) {
        // Đã đăng nhập, hiển thị tenTaiKhoan
        nutDN.style.display = "none";
        nutTK.style.display = "flex";
        btnTK.textContent = user.tenTaiKhoan;
    } else {
        // Chưa đăng nhập
        nutDN.style.display = "flex";
        nutTK.style.display = "none";
    }
}

// Hàm mở form hiển thị thông tin
function moThongTin() {
    let user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
        alert("Bạn chưa đăng nhập!");
        return;
    }

    // Hiển thị dữ liệu dựa trên tên trường mới trong data.js
    let gtHienThi = (user.gioiTinh == "Nam" || user.gioiTinh == "1") ? "Nam" : "Nữ";

    document.getElementById("in-name").innerText = user.tenTaiKhoan; // tenTaiKhoan
    document.getElementById("in-mk").innerText = user.matKhau;      // matKhau
    document.getElementById("in-ten").innerText = user.tenKH;       // tenKH
    document.getElementById("in-gt").innerText = gtHienThi;
    document.getElementById("in-email").innerText = user.email;     // email
    document.getElementById("in-sdt").innerText = user.soDienThoai; // soDienThoai
    document.getElementById("in-dc").innerText = user.diaChi;       // diaChi

    document.getElementById("form-info").style.display = "flex";

    // Đổi nút Sửa/Lưu/Hủy
    document.getElementById("btn-sua").style.display = "flex";
    document.getElementById("btn-luu").style.display = "none";
    document.getElementById("btn-huy").style.display = "none";
}

function dongThongTin() {
    document.getElementById("form-info").style.display = "none";
}
// Hàm mở form chỉnh sửa
function SuaThongTin() {
    let user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
        return;
    }

    // Đổi hai nút Sửa thành Lưu + Hủy
    document.getElementById("btn-sua").style.display = "none";
    document.getElementById("btn-luu").style.display = "flex";
    document.getElementById("btn-huy").style.display = "flex";

    // Chuyển các trường nội dung thành input để chỉnh sửa
    document.getElementById("in-ten").innerHTML = `<input type="text" id="edit-ten" value="${user.tenKH}">`;
    document.getElementById("in-mk").innerHTML = `<input type="password" id="edit-mk" value="${user.matKhau}">`; 
    
    // Giới tính (Chuyển đổi lại thành 1/0 để dễ dàng xử lý form)
    let checkedNam = (user.gioiTinh == "Nam" || user.gioiTinh == "1") ? "checked" : "";
    let checkedNu = (user.gioiTinh == "Nữ" || user.gioiTinh == "0") ? "checked" : "";
    document.getElementById("in-gt").innerHTML = `
        <input type="radio" name="edit-sex" value="Nam" ${checkedNam}> Nam
        <input type="radio" name="edit-sex" value="Nữ" ${checkedNu}> Nữ
    `;

    document.getElementById("in-email").innerHTML = `<input type="email" id="edit-email" value="${user.email}">`;
    document.getElementById("in-sdt").innerHTML = `<input type="tel" id="edit-sdt" value="${user.soDienThoai}">`;
    document.getElementById("in-dc").innerHTML = `<input type="text" id="edit-dc" value="${user.diaChi}">`;
}

// Hàm hủy chỉnh sửa
function HuyChinhSua() {
    let user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
        return;
    }

    // --- BẮT ĐẦU SỬA: PHỤC HỒI LẠI NỘI DUNG CHỈ XEM ---
    let gtHienThi = (user.gioiTinh == "Nam" || user.gioiTinh == "1") ? "Nam" : "Nữ";

    // Phục hồi lại các trường thành dạng text (<div>...</div>) thay vì <input>
    document.getElementById("in-name").innerText = user.tenTaiKhoan;
    document.getElementById("in-mk").innerText = user.matKhau;
    document.getElementById("in-ten").innerText = user.tenKH;
    document.getElementById("in-gt").innerText = gtHienThi; // Phục hồi Giới tính
    // document.getElementById("in-ns").innerText = user.namSinh || "N/A"; // Dòng này không có trong HTML
    document.getElementById("in-email").innerText = user.email;
    document.getElementById("in-sdt").innerText = user.soDienThoai;
    document.getElementById("in-dc").innerText = user.diaChi;
    // --- KẾT THÚC SỬA ---

    // Đổi hai nút Lưu + Hủy lại thành nút Sửa (Đoạn này đã đúng)
    document.getElementById("btn-sua").style.display = "flex";
    document.getElementById("btn-luu").style.display = "none";
    document.getElementById("btn-huy").style.display = "none";
}


// Hàm lưu thông tin sau khi chỉnh sửa
function LuuThongTin() {
    let user = JSON.parse(localStorage.getItem("currentUser"));
    
    let newMK = document.getElementById("edit-mk").value;
    if (!kiemTraNhapSua(newMK)) return;
    
    // LẤY BẢNG KHÁCH HÀNG TRỰC TIẾP
    let bangKH = getlocalStorage("khachHang");
    if (!bangKH) {
        alert("Lỗi dữ liệu khách hàng.");
        return;
    }

    // Tìm vị trí khách hàng trong bảng (dùng maKH để tìm)
    let khIndex = bangKH.findIndex(k => k.maKH === user.maKH);
    if (khIndex === -1) {
        alert("Không tìm thấy thông tin khách hàng.");
        return;
    }

    // Cập nhật dữ liệu mới vào mảng tổng (Sử dụng tên trường mới)
    bangKH[khIndex].tenKH = document.getElementById("edit-ten").value;
    bangKH[khIndex].gioiTinh = document.querySelector('input[name="edit-sex"]:checked')?.value || "Nam";
    bangKH[khIndex].soDienThoai = document.getElementById("edit-sdt").value;
    bangKH[khIndex].diaChi = document.getElementById("edit-dc").value;
    bangKH[khIndex].email = document.getElementById("edit-email").value;
    bangKH[khIndex].matKhau = newMK;
    
    // Cập nhật lại localStorage
    setlocalStorage("khachHang", bangKH);
    localStorage.setItem("currentUser", JSON.stringify(bangKH[khIndex])); // Cập nhật currentUser

    alert("✅ Đã lưu thông tin!");
    HuyChinhSua();
}