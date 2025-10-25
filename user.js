

function togglemk() {
    let mkInput = document.getElementById("dn-mk");
    let toggle = document.getElementById("toggle-mk");
    if (mkInput.type === "password") {
        mkInput.type = "text";
        toggle.textContent = "👁️‍🗨️"; // icon khi hiện
    } else {
        mkInput.type = "password";
        toggle.textContent = "👁"; // icon khi ẩn
    }
}


function moFormdnhap(){
    let dnhap=document.getElementById("formdnhap");
    let blur=document.getElementById("overlay");
    dnhap.style.display="flex";
    dnhap.classList.add("form-show");
    blur.style.display="block";
}

function dongFormdnhap(){
    let dnhap=document.getElementById("formdnhap");
    let blur=document.getElementById("overlay");
    dnhap.classList.remove("form-show");
    dnhap.style.display="none";
    blur.style.display="none";
}

function moFormdky(){
    let dnhap=document.getElementById("formdnhap");
    let dky=document.getElementById("formdky");
    let blur=document.getElementById("overlay");
    dky.style.display="flex";
    dky.classList.add("form-show");
    dnhap.style.display="none";
    blur.style.display="block";
}

function dongFormdky(){
    let dky=document.getElementById("formdky");
    let dnhap=document.getElementById("formdnhap");
    let blur=document.getElementById("overlay");
    dky.style.display="none";
    dnhap.style.display="flex";
    blur.style.display="block";
    dky.classList.remove("form-show");
}

function dangKy() {
    let tk = document.getElementById("dk-tk").value;
    let mk = document.getElementById("dk-mk").value;
    let gt = document.querySelector('input[name="sex"]:checked')?.value || "";
    let ns = document.getElementById("dk-namsinh").value;
    let sdt = document.getElementById("dk-sdt").value;
    let dc = document.getElementById("dk-diachi").value;

    let accounts = JSON.parse(localStorage.getItem("accounts")) || [];

    // Kiểm tra tài khoản tồn tại
    let tonTai = accounts.some(acc => 
        acc.username === tk &&
        acc.password === mk &&
        acc.phone=== sdt
    );

    if (tonTai) {
        alert("❌ Tài khoản này đã tồn tại!");
        return;
    }

    // Thêm tài khoản mới
    accounts.push({
        username: tk,
        password: mk,
        gender: gt,
        birthday: ns,
        phone: sdt,
        address: dc
    });

    localStorage.setItem("accounts", JSON.stringify(accounts));

    alert("Đăng ký thành công!");
    dongFormdky();
    moFormdnhap();
}


function dangNhap() {
    let login = document.getElementById("btn-login");
    let taikhoan = document.getElementById("btn-tk");
    let tkInput = document.getElementById("dn-tk");
    let mkInput = document.getElementById("dn-mk");

    let tk = tkInput.value;
    let mk = mkInput.value;
    if (tk=="") {
        alert("Chua nhap tk");
        tkInput.focus();
        return ;
    }
    if (mk=="") {
        alert("Chua nhap mk");
        mkInput.focus();
    }
    // Lấy danh sách tài khoản
    let accounts = JSON.parse(localStorage.getItem("accounts")) || [];

    // Tìm tài khoản trùng
    let found = accounts.find(acc => acc.username === tk && acc.password === mk);

    if (found) {
        alert("Đăng nhập thành công!");
        // ✅ Lưu trạng thái đăng nhập
        localStorage.setItem("userLogin", JSON.stringify(found));
        login.style.display="none";
        taikhoan.style.display="flex";
        dongFormdnhap();
    } else {
        alert("Sai tài khoản hoặc mật khẩu!");
    }
}


