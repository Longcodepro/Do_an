// CÁC HÀM LẤY VÀ CẬP NHẬP DỮ LIỆU TỪ LOCAL STORAGE
function setlocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getlocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

// FORMAT TIỀN TỆ VỚI DẤU CHẤM VÀ ĐƠN VỊ ĐỒNG
function formatCurrency(number) {
    if (typeof number !== 'number') {
        // Chuyển chuỗi định dạng (ví dụ: "1.250.000đ") thành số nguyên
        let str = number.toString().replace(/[\.đ]/g, '');
        number = parseInt(str);
        if (isNaN(number)) return number.toLocaleString('vi-VN') + 'đ'; // Trả về nếu vẫn là NaN
    }
    return number.toLocaleString('vi-VN') + 'đ';
}

// Hàm hỗ trợ tô màu trạng thái
function getStatusColor(status) {
    switch (status) {
        case "Hoàn thành":
            return "green";
        case "Đã giao":
            return "#007bff"; // Màu xanh dương
        case "Đang vận chuyển":
            return "#ffc107"; // Màu vàng
        case "Đang xử lý":
            return "orange";
        case "Đã hủy":
            return "red";
        default:
            return "gray";
    }
}

// ===================== 1. HIỂN THỊ DANH SÁCH ĐƠN HÀNG =====================
function quanLyDonHang() {
    // Lấy dữ liệu Đơn hàng (key: bill)
    const rows = getlocalStorage("bill"); 

    if (!rows) {
        alert("Không tìm thấy dữ liệu đơn hàng trong Local Storage (Key: bill).");
        return;
    }

    // Hiển thị nội dung vào div chính
    const noiDung = document.getElementById("noi_dung");
    noiDung.innerHTML = "<h2 style='color:#333'>Quản Lí Đơn Hàng</h2>";

    const wrap = document.createElement("div");
    wrap.className = "table-wrap";

    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const trHead = document.createElement("tr");

    // Thứ tự tiêu đề bảng
    const headers = [
        "Mã ĐH",
        "Khách hàng",
        "Ngày đặt",
        "Giá trị",
        "HT Thanh toán",
        "ĐV Vận chuyển",
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

    rows.forEach((dh) => {
        const tr = document.createElement("tr");

        // Các cột dữ liệu
        const rowData = [
            dh.maDH,
            dh.khachHang,
            dh.ngayDat,
            formatCurrency(dh.giaTri),
            dh.hinhThucThanhToan,
            dh.donViVanChuyen,
            dh.trangThai
        ];

        rowData.forEach((data, index) => {
            const td = document.createElement("td");
            td.textContent = data;
            // Áp dụng màu cho cột Trạng thái (index thứ 6)
            if (index === 6) { 
                td.style.color = getStatusColor(data);
            }
            tr.appendChild(td);
        });

        // 8. Cột Thao tác 
        const tdActions = document.createElement("td");
        const divActions = document.createElement("div");
        divActions.style.display = 'flex';
        divActions.style.gap = '5px';
        divActions.style.justifyContent = 'center';

        const btnDetail = document.createElement("button");
        btnDetail.textContent = "Chi Tiết";
        btnDetail.className = "detail"; // Cần thêm style cho class .detail trong 1.7.css

        btnDetail.addEventListener("click", () => {
            showChiTietDonHang(dh.maDH, dh.khachHang);
        });

        divActions.appendChild(btnDetail);
        tdActions.appendChild(divActions);
        tr.appendChild(tdActions);
        
        tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    wrap.appendChild(table);
    noiDung.appendChild(wrap);
}

// ===================== 2. HIỂN THỊ CHI TIẾT ĐƠN HÀNG =====================
function showChiTietDonHang(maDH, tenKH) {
    // Lấy dữ liệu Chi tiết đơn hàng (key: billDetail)
    const chiTietRows = getlocalStorage("billDetail");
    // Giả sử bảng sản phẩm là 'tatCaSanPham' trong data.js, được lưu dưới key 'product'
    const matHangRows = getlocalStorage("product"); 

    if (!chiTietRows) {
        alert("Không tìm thấy dữ liệu chi tiết đơn hàng (Key: billDetail).");
        return;
    }

    // Lọc chi tiết theo Mã đơn hàng
    const filteredDetails = chiTietRows.filter(ct => ct.maDH === maDH);

    if (filteredDetails.length === 0) {
        alert(`Không có chi tiết sản phẩm cho đơn hàng ${maDH}.`);
        return;
    }

    const noiDung = document.getElementById("noi_dung");
    noiDung.innerHTML = ''; // Xóa nội dung cũ

    // Nút quay lại
    const btnBack = document.createElement("button");
    btnBack.textContent = "← Quay lại danh sách đơn hàng";
    btnBack.style.marginBottom = '20px';
    btnBack.style.padding = '10px';
    btnBack.style.backgroundColor = '#6c757d';
    btnBack.style.color = 'white';
    btnBack.style.border = 'none';
    btnBack.style.borderRadius = '5px';
    btnBack.style.cursor = 'pointer';
    btnBack.addEventListener("click", quanLyDonHang);
    noiDung.appendChild(btnBack);

    // Tiêu đề
    const title = document.createElement("h2");
    title.style.color = '#333';
    title.innerHTML = `Chi Tiết Đơn Hàng: ${maDH} <span style="font-size: 16px; color: #555;">(Khách hàng: ${tenKH})</span>`;
    noiDung.appendChild(title);


    const wrap = document.createElement("div");
    wrap.className = "table-wrap";
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const trHead = document.createElement("tr");

    const headers = [
        "Mã CTDH",
        "Mã SP",
        "Tên Sản Phẩm",
        "Số lượng",
        "Tổng tiền (Tạm)",
    ];
    headers.forEach((h) => {
        const th = document.createElement("th");
        th.textContent = h;
        trHead.appendChild(th);
    });
    thead.appendChild(trHead);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");

    filteredDetails.forEach((ct) => {
        const tr = document.createElement("tr");

        // Tìm tên sản phẩm (Giả sử bạn dùng key 'product' cho bảng sản phẩm)
        const product = matHangRows ? matHangRows.find(sp => sp.maSP === ct.maSP) : null;
        const tenSP = product ? product.tenSP : "Không tìm thấy";

        // Dữ liệu chi tiết
        const tdFields = [
            ct.maCTDH,
            ct.maSP,
            tenSP,
            ct.soLuong,
            formatCurrency(ct.tongTien),
        ];

        tdFields.forEach((data) => {
            const td = document.createElement("td");
            td.textContent = data;
            tr.appendChild(td);
        });
        
        tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    wrap.appendChild(table);
    noiDung.appendChild(wrap);
}