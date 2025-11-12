// CÁC HÀM LẤY VÀ CẬP NHẬP DỮ LIỆU TỪ LOCAL STORAGE
function setlocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getlocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

// TẠO BIẾN BẢNG KHÁCH HÀNG CỤC BỘ
let rowsKhachHang = getlocalStorage('khachHang'); 

function quanLyKhachHang() {
    const rows = getlocalStorage("khachHang"); 

    if (!rows) {
        alert("Không tìm thấy dữ liệu khách hàng trong Local Storage (Key: khachHang).");
        return;
    }

    const noiDung = document.getElementById("noi_dung");
    noiDung.innerHTML = "<h2 style='color:#333'>Quản Lí Khách Hàng</h2>";

    const wrap = document.createElement("div");
    wrap.className = "table-wrap";

    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const trHead = document.createElement("tr");

    // Thứ tự tiêu đề bảng: Mã KH, Tên KH, Giới tính, Địa chỉ, SĐT, Password, Trạng thái, Thao tác
    // const headers = [
    //     "Mã KH",
    //     "Tên KH",
    //     "Giới tính",
    //     "Địa chỉ",
    //     "SĐT",
    //     "Password", 
    //     "Trạng thái",
    //     "Thao tác",
    // ];
    const headers = [
        "Mã KH",
        "Tên KH",
        "Giới tính",
        "Địa chỉ",
        "SĐT",
        "Trạng thái",
        "Thao tác",
    ];
    headers.forEach((h) => {
        const th = document.createElement("th");
        th.textContent = h;
        trHead.appendChild(th);
    });
    thead.appendChild(trHead);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");

    rows.forEach((kh) => {
        const tr = document.createElement("tr");

        // 1. Mã KH
        const tdMa = document.createElement("td");
        tdMa.textContent = kh.maKH;
        tr.appendChild(tdMa);

        // 2. Tên KH
        const tdTen = document.createElement("td");
        tdTen.textContent = kh.tenKH;
        tr.appendChild(tdTen);

        // 3. Giới tính
        const tdGioi = document.createElement("td");
        tdGioi.textContent = kh.gioiTinh || "N/A";
        tr.appendChild(tdGioi);

        // 4. Địa chỉ
        const tdDiaChi = document.createElement("td");
        tdDiaChi.textContent = kh.diaChi || "Chưa có";
        tr.appendChild(tdDiaChi);

        // 5. SĐT (ĐÃ SỬA VỊ TRÍ VÀ DỮ LIỆU KHỚP VỚI HEADERS)
        const tdSdt = document.createElement("td");
        tdSdt.textContent = kh.soDienThoai; // Lấy dữ liệu SĐT
        tr.appendChild(tdSdt);
        
        // // 6. Password
        // const tdPass = document.createElement("td");
        // tdPass.textContent = kh.matKhau || "N/A"; // Lấy dữ liệu mật khẩu
        // tr.appendChild(tdPass);

        // 7. Trạng thái 
        const tdStatus = document.createElement("td");
        const currentTrangThai = kh.trangThai === 0 ? 0 : 1; 
        const trangThaiText = currentTrangThai == 1 ? "Đang hoạt động" : "Bị khóa";
        tdStatus.textContent = trangThaiText;
        tdStatus.style.color = currentTrangThai == 1 ? "green" : "red";
        tr.appendChild(tdStatus);

        // 8. Thao tác 
        const tdActions = document.createElement("td");
        const divActions = document.createElement("div");
        divActions.style.display = 'flex';
        divActions.style.gap = '5px';
        divActions.style.justifyContent = 'center';

        const btnReset = document.createElement("button");
        btnReset.textContent = "Reset";
        btnReset.className = "reset";

        const btnToggle = document.createElement("button");
        const buttonText = currentTrangThai == 1 ? "Khóa" : "Mở";
        btnToggle.textContent = buttonText;
        btnToggle.className = currentTrangThai == 1 ? "khoa" : "mo";

        btnReset.addEventListener("click", () => {
            if (!confirm(`Bạn có chắc muốn RESET mật khẩu của ${kh.tenKH}?`)) return;
            
            const khachHangNow = getlocalStorage("khachHang");
            if (!khachHangNow) return;

            const khachHangIndex = khachHangNow.findIndex((x) => x.maKH === kh.maKH);
            if (khachHangIndex === -1) return;

            khachHangNow[khachHangIndex].matKhau = "123456";
            setlocalStorage("khachHang", khachHangNow);

            // tdPass.textContent = "123456";
            alert(`Đã reset mật khẩu của ${kh.tenKH} và đã gửi qua email`);
        });

        btnToggle.addEventListener("click", () => {
            const action = btnToggle.textContent.toLowerCase();
            if (!confirm(`Bạn có chắc muốn ${action} tài khoản của ${kh.tenKH}?`)) return;
            
            const khachHangNow = getlocalStorage("khachHang");
            if (!khachHangNow) return;

            const khachHangIndex = khachHangNow.findIndex((x) => x.maKH === kh.maKH);
            if (khachHangIndex === -1) return;

            const newTrangThai = khachHangNow[khachHangIndex].trangThai == 1 ? 0 : 1;
            khachHangNow[khachHangIndex].trangThai = newTrangThai;
            
            setlocalStorage("khachHang", khachHangNow);

            const newStatusText = newTrangThai == 1 ? "Đang hoạt động" : "Bị khóa";
            tdStatus.textContent = newStatusText;
            tdStatus.style.color = newTrangThai == 1 ? "green" : "red";

            const newButtonText = newTrangThai == 1 ? "Khóa" : "Mở";
            btnToggle.textContent = newButtonText;
            btnToggle.className = newTrangThai == 1 ? "khoa" : "mo";

            const actionText = newTrangThai == 1 ? "mở" : "khóa"; // Nếu newTrangThai là 1 (Đã mở), thì thông báo là "Đã mở"
            alert(`Đã ${actionText} tài khoản của ${kh.tenKH}`);

            kh.trangThai = newTrangThai;
        });

        divActions.appendChild(btnReset);
        divActions.appendChild(btnToggle);
        tdActions.appendChild(divActions);
        tr.appendChild(tdActions);
        
        tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    wrap.appendChild(table);
    noiDung.appendChild(wrap);
}