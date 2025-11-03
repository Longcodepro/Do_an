// mở file json để add dữ liệu vô local
if (!localStorage.getItem('du_lieu')) {
    console.log("⚠️ Không có dữ liệu — đang fetch từ file JSON...");
    fetch('./data.json')
        .then(res => res.json())
        .then(data => {
            localStorage.setItem('du_lieu', JSON.stringify(data));
            console.log("✅ Đã lưu dữ liệu vào localStorage!");
        })
        .catch(err => console.error('Lỗi khi fetch:', err));
} else {
    console.log("✅ Dữ liệu đã có sẵn, không cần fetch lại.");
}

// lấy dữ liệu từ local và đổi thành object
const db = JSON.parse(localStorage.getItem('du_lieu'));
console.log(db);

// hàm ẩn hiện mật khẩu
function togglemk() {
    let mkInput = document.getElementById("dn-mk");
    let toggle = document.getElementById("toggle-mk");
    if (mkInput.type === "password") {
        mkInput.type = "text";
        toggle.textContent = "👁"; // icon khi hiện
    } else {
        mkInput.type = "password";
        toggle.textContent = "👁"; // icon khi ẩn
    }
}

// khi load lại vẫn hiện tài khoản
window.onload = function() {
    let user = JSON.parse(localStorage.getItem("userLogin"));
    let nutTK = document.getElementById("nut-tk");
    let nutDN = document.getElementById("nut-dn");

    if (user) {
        // đã đăng nhập
        nutDN.style.display = "none";
        nutTK.style.display = "flex";
        document.getElementById("btn-tk").innerHTML =
            `<i class="fa-regular fa-user"></i> ${user.NAME}`;
    } else {
        // chưa đăng nhập
        nutDN.style.display = "flex";
        nutTK.style.display = "none";
    }
};

function hienForm(idForm) {
    document.getElementById(idForm).style.display = "flex";
    document.getElementById("overlay").style.display = "block";
}

function anForm(idForm) {
    document.getElementById(idForm).style.display = "none";
    document.getElementById("overlay").style.display = "none";
}

function moFormdnhap() {
    hienForm("formdnhap");
}

function moFormdky() {
    hienForm("formdky");
}

function dongFormdnhap() {
    anForm("formdnhap");
}

function dongFormdky() {
    anForm("formdky");
}

function kiemTraNhap(tk, mk) {
    if (!tk) { alert("Chưa nhập tài khoản"); return false; }
    if (!mk) { alert("Chưa nhập mật khẩu"); return false; }
    return true; 
}

// hàm lưu dữ liệu khi đăng ký
function dangKy() {
    let tkInput = document.getElementById("dk-tk");
    let ten = document.getElementById("dk-hoten").value;
    let mkInput = document.getElementById("dk-mk");
    let gt = document.querySelector('input[name="sex"]:checked')?.value || "1";
    let ns = document.getElementById("dk-namsinh").value;
    let sdt = document.getElementById("dk-sdt").value;
    let dc = document.getElementById("dk-diachi").value;

    const tk = tkInput.value;
    const mk = mkInput.value;
    if (!kiemTraNhap(tk, mk)) return;

    // Tìm bảng dang_nhap và khach_hang
    let bangDN = db.find(t => t.name === "dang_nhap").data;
    let bangKH = db.find(t => t.name === "khach_hang").data;

    // Kiểm tra tài khoản trùng
    if (bangDN.some(u => u.NAME === tk)) {
        alert("❌ Tài khoản đã tồn tại!");
        return;
    }

    // Tạo mã khách hàng mới 
    let newID = "KH" + String(bangKH.length + 1).padStart(3, "0");

    // Thêm vào bảng dang_nhap
    bangDN.push({
        NAME: tk,
        PASSWORD: mk,
        MA_KHACH_HANG: newID,
        TINH_TRANG: "1"
    });

    // Thêm vào bảng khach_hang
    bangKH.push({
        MA_KHACH_HANG: newID,
        TEN_KHACH_HANG: ten,
        GIOI_TINH: gt,
        NAM_SINH: ns,
        SO_DIEN_THOAI: sdt,
        DIA_CHI: dc
    });


    // Lưu lại database vào local
    localStorage.setItem("du_lieu", JSON.stringify(db));

    alert("✅ Đăng ký thành công!");
    dongFormdky();
    moFormdnhap();
}


// hàm thực hiện việc đăng nhập
function dangNhap() {
    let nutTK = document.getElementById("nut-tk");
    let tkInput = document.getElementById("dn-tk");
    let mkInput = document.getElementById("dn-mk");

    const tk = tkInput.value;
    const mk = mkInput.value;
    if (!kiemTraNhap(tk, mk)) return;

    // Lấy danh sách tài khoản
    let danhsach = db.find(t => t.name === "dang_nhap").data;   // lấy mảng user thật

    // Tìm tài khoản trùng
    let found = danhsach.find(acc => acc.NAME === tk && acc.PASSWORD === mk);

    if (found) {
        alert("Đăng nhập thành công!");
        localStorage.setItem("userLogin", JSON.stringify(found));

        document.getElementById("nut-dn").style.display="none";
        nutTK.style.display = "flex";

        // Đổi chữ Tài khoản → Thành tên người dùng
        document.getElementById("btn-tk").innerHTML = 
        `<i class="fa-regular fa-user"></i> ${found.NAME}`;

        dongFormdnhap();
    } 
    else {
        alert("Sai tài khoản hoặc mật khẩu!");
    }
}



//Hàm đăng xuất
function logout(){
    localStorage.removeItem("userLogin"); // XÓA TRẠNG THÁI ĐĂNG NHẬP
    document.getElementById("nut-dn").style.display = "flex"; 
    document.getElementById("nut-tk").style.display = "none"; 
    alert("Bạn đã đăng xuất thành công ");
}

function moThongTin(){
    let user = JSON.parse(localStorage.getItem("userLogin"));
    if(!user){ alert("Bạn chưa đăng nhập!"); return; }

    let bangKH = db.find(t => t.name === "khach_hang").data;
    let kh = bangKH.find(k => k.MA_KHACH_HANG === user.MA_KHACH_HANG);

    // Chuyển đổi giới tính
    let gtHienThi = (kh.GIOI_TINH == "1" || kh.GIOI_TINH == "Nam") ? "Nam" : "Nữ";

    document.getElementById("in-name").innerText = user.NAME;
    document.getElementById("in-ten").innerText = kh.TEN_KHACH_HANG;
    document.getElementById("in-gt").innerText = gtHienThi;
    document.getElementById("in-ns").innerText = kh.NAM_SINH;
    document.getElementById("in-sdt").innerText = kh.SO_DIEN_THOAI;
    document.getElementById("in-dc").innerText = kh.DIA_CHI;

    document.getElementById("form-info").style.display="flex";

    document.getElementById("btn-sua").style.display = "flex";
    document.getElementById("btn-luu").style.display = "none";
    document.getElementById("btn-huy").style.display = "none";
}


function dongThongTin(){
    document.getElementById("form-info").style.display="none";
}

function SuaThongTin(){
    // Lấy giới tính hiện đang hiển thị
    let gioitinh = document.getElementById("in-gt").innerText.trim();

    // biến các dòng thông tin thành input
    document.getElementById("in-ten").innerHTML = 
        `<input type="text" id="edit-ten" value="${document.getElementById("in-ten").innerText}">`;

    document.getElementById("in-gt").innerHTML = `
        <label><input type="radio" name="edit-gt" value="Nam" ${gioitinh === "Nam" ? "checked" : ""}> Nam</label>
        <label><input type="radio" name="edit-gt" value="Nữ" ${gioitinh === "Nữ" ? "checked" : ""}> Nữ</label>
    `;

    document.getElementById("in-ns").innerHTML = 
        `<input type="text" id="edit-ns" value="${document.getElementById("in-ns").innerText}">`;

    document.getElementById("in-sdt").innerHTML = 
        `<input type="text" id="edit-sdt" value="${document.getElementById("in-sdt").innerText}">`;

    document.getElementById("in-dc").innerHTML = 
        `<input type="text" id="edit-dc" value="${document.getElementById("in-dc").innerText}">`;

    // Thay nút Sửa → Lưu + Hủy
    document.getElementById("btn-sua").style.display = "none";
    document.getElementById("btn-luu").style.display = "flex";
    document.getElementById("btn-huy").style.display = "flex";
}

function HuyChinhSua(){
    let user = JSON.parse(localStorage.getItem("userLogin"));
    let bangKH = db.find(t => t.name === "khach_hang").data;
    let kh = bangKH.find(k => k.MA_KHACH_HANG === user.MA_KHACH_HANG);

    // Hiện lại dữ liệu cũ
    document.getElementById("in-ten").innerText = kh.TEN_KHACH_HANG;
    document.getElementById("in-gt").innerText = (kh.GIOI_TINH == "1" || kh.GIOI_TINH == "Nam") ? "Nam" : "Nữ";
    document.getElementById("in-ns").innerText = kh.NAM_SINH;
    document.getElementById("in-sdt").innerText = kh.SO_DIEN_THOAI;
    document.getElementById("in-dc").innerText = kh.DIA_CHI;

    // Đổi hai nút Lưu + Hủy lại thành nút Sửa
    document.getElementById("btn-sua").style.display = "flex";
    document.getElementById("btn-luu").style.display = "none";
    document.getElementById("btn-huy").style.display = "none";
}


function LuuThongTin(){
    let user = JSON.parse(localStorage.getItem("userLogin"));
    let bangKH = db.find(t => t.name === "khach_hang").data;

    let kh = bangKH.find(k => k.MA_KHACH_HANG === user.MA_KHACH_HANG);

    kh.TEN_KHACH_HANG = document.getElementById("edit-ten").value;
    kh.GIOI_TINH = document.querySelector('input[name="edit-gt"]:checked').value;
    kh.NAM_SINH = document.getElementById("edit-ns").value;
    kh.SO_DIEN_THOAI = document.getElementById("edit-sdt").value;
    kh.DIA_CHI = document.getElementById("edit-dc").value;

    localStorage.setItem("du_lieu", JSON.stringify(db));

    alert("✅ Đã lưu thông tin thành công!");
    dongThongTin();
    moThongTin(); 
}









