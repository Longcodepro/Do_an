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
        let str = number.toString().replace(/[\.đ]/g, '');
        number = parseInt(str);
        if (isNaN(number)) return number.toLocaleString('vi-VN') + 'đ';
    }
    return number.toLocaleString('vi-VN') + 'đ';
}

// Hàm hỗ trợ tô màu trạng thái
function getStatusColor(status) {
    switch (status) {
        case "Hoàn thành":
            return "green";
        case "Đã giao":
            return "#007bff";
        case "Đang vận chuyển":
            return "#ffc107";
        case "Đang xử lý":
            return "orange";
        case "Đã hủy":
            return "red";
        default:
            return "gray";
    }
}

// ===================== 1. HÀM CHÍNH: HIỂN THỊ GIAO DIỆN LỌC VÀ GỌI HIỂN THỊ BẢNG =====================
function quanLyDonHang() {
    const rows = getlocalStorage("bill"); 

    if (!rows) {
        alert("Không tìm thấy dữ liệu đơn hàng trong Local Storage (Key: bill).");
        return;
    }

    const noiDung = document.getElementById("noi_dung");
    noiDung.innerHTML = "<h2 style='color:#333'>Quản Lí Đơn Hàng</h2>";

    // ===================== Thêm Thanh tra cứu/lọc =====================
    const filterBox = document.createElement("div");
    filterBox.className = "filter-box";
    filterBox.innerHTML = `
    <label for="fromDate">Từ ngày:</label>
    <input type="date" id="fromDate">
    <label for="toDate">Đến ngày:</label>
    <input type="date" id="toDate">
    <label for="statusFilter">Trạng thái:</label>
    <select id="statusFilter">
        <option value="">Tất cả trạng thái</option>
        <option value="Hoàn thành">Hoàn thành</option>
        <option value="Đã giao">Đã giao</option>
        <option value="Đang vận chuyển">Đang vận chuyển</option>
        <option value="Đang xử lý">Đang xử lý</option>
        <option value="Đã hủy">Đã hủy</option>
    </select>
    <button id="applyFilter" class="detail">Áp dụng Lọc</button>
    <button id="showAll" class="show-all-button">Hiển thị tất cả</button>
`; // <-- THAY ĐỔI TẠI ĐÂY
    noiDung.appendChild(filterBox);
    
    // Thêm div chứa bảng để có thể cập nhật
    const tableContainer = document.createElement("div");
    tableContainer.id = "tableContainer";
    tableContainer.className = "table-wrap"; // Dùng class để style
    noiDung.appendChild(tableContainer);

    // Gán sự kiện Lọc
document.getElementById("applyFilter").addEventListener('click', () => {
    const fromDateStr = document.getElementById('fromDate').value;
    const toDateStr = document.getElementById('toDate').value;
    const status = document.getElementById('statusFilter').value;
    displayDonHang(rows, fromDateStr, toDateStr, status);
});

// Gán sự kiện Hiển thị tất cả
document.getElementById("showAll").addEventListener('click', () => {
    // Xóa giá trị trong các ô lọc
    document.getElementById('fromDate').value = '';
    document.getElementById('toDate').value = '';
    document.getElementById('statusFilter').value = '';
    
    // Hiển thị lại toàn bộ đơn hàng
    displayDonHang(rows);
});

// Hiển thị lần đầu với toàn bộ dữ liệu
displayDonHang(rows);
}


// ===================== 2. HÀM THỰC HIỆN LỌC VÀ HIỂN THỊ BẢNG =====================
function displayDonHang(allRows, fromDateStr = null, toDateStr = null, statusFilter = "") {
    let filteredRows = allRows;

    // Lọc theo Trạng thái
    if (statusFilter) {
        filteredRows = filteredRows.filter(dh => dh.trangThai === statusFilter);
    }
    
    // Lọc theo Khoảng thời gian
    if (fromDateStr || toDateStr) {
        // Chuyển chuỗi YYYY-MM-DD từ input date thành đối tượng Date
        const fromDate = fromDateStr ? new Date(fromDateStr) : null;
        const toDate = toDateStr ? new Date(toDateStr) : null;
        
        filteredRows = filteredRows.filter(dh => {
            // Chuẩn hóa ngày đặt sang đối tượng Date chỉ lấy phần YYYY-MM-DD
            const orderDateStr = dh.ngayDat.split(' ')[0]; // Lấy "YYYY-MM-DD"
            const orderDate = new Date(orderDateStr);
            
            let isAfterFrom = true;
            let isBeforeTo = true;

            // Kiểm tra Từ ngày (phải >=)
            if (fromDate) {
                // Thêm 1 ngày cho fromDate để đảm bảo nó bao gồm ngày đó
                isAfterFrom = orderDate >= fromDate; 
            }

            // Kiểm tra Đến ngày (phải <=)
            if (toDate) {
                // Thêm 1 ngày cho toDate để đảm bảo nó bao gồm ngày đó
                const endOfDayToDate = new Date(toDate);
                endOfDayToDate.setDate(endOfDayToDate.getDate() + 1); // Đặt thành ngày tiếp theo
                isBeforeTo = orderDate < endOfDayToDate;
            }

            return isAfterFrom && isBeforeTo;
        });
    }

    const tableContainer = document.getElementById("tableContainer");
    tableContainer.innerHTML = ''; // Xóa bảng cũ

    if (filteredRows.length === 0) {
        tableContainer.innerHTML = "<p style='text-align:center; color:red; margin-top: 20px;'>Không tìm thấy đơn hàng nào phù hợp với điều kiện lọc.</p>";
        return;
    }
    
    // Tạo bảng mới
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

    filteredRows.forEach((dh) => {
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

     // Cột Thao tác 
    const tdActions = document.createElement("td");
    const divActions = document.createElement("div");
    divActions.style.display = 'flex';
    divActions.style.gap = '5px';
    divActions.style.justifyContent = 'center';

    const btnDetail = document.createElement("button");
    btnDetail.textContent = "Chi Tiết";
    btnDetail.className = "detail";

    btnDetail.addEventListener("click", () => {
        showChiTietDonHang(dh.maDH, dh.khachHang);
    });

    // Nút Cập nhật
    const btnUpdate = document.createElement("button");
    btnUpdate.textContent = "Cập Nhật";
    btnUpdate.className = "update-button";
    btnUpdate.addEventListener("click", () => {
        showUpdatePopup(dh.maDH, dh.trangThai);
    });

    divActions.appendChild(btnDetail);
    divActions.appendChild(btnUpdate);
    tdActions.appendChild(divActions);
    tr.appendChild(tdActions);
    tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    tableContainer.appendChild(table);
}

// ===================== 3. HIỂN THỊ CHI TIẾT ĐƠN HÀNG =====================
function showChiTietDonHang(maDH, tenKH) {
    const chiTietRows = getlocalStorage("billDetail");
    const matHangRows = getlocalStorage("product"); 

    if (!chiTietRows) {
        alert("Không tìm thấy dữ liệu chi tiết đơn hàng (Key: billDetail).");
        return;
    }

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
    btnBack.className = "back-button"; // Thêm class để style trong CSS
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

        const product = matHangRows ? matHangRows.find(sp => sp.maSP === ct.maSP) : null;
        const tenSP = product ? product.tenSP : "Không tìm thấy";

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
// Hiển thị popup cập nhật trạng thái
function showUpdatePopup(maDH, currentStatus) {
    const popup = document.createElement("div");
    popup.className = "status-popup";

    popup.innerHTML = `
        <div class="popup-box">
            <h3>Cập nhật trạng thái đơn hàng: ${maDH}</h3>
            <label>Trạng thái mới:</label>
            <select id="newStatus">
                <option value="Hoàn thành">Hoàn thành</option>
                <option value="Đã giao">Đã giao</option>
                <option value="Đang vận chuyển">Đang vận chuyển</option>
                <option value="Đang xử lý">Đang xử lý</option>
                <option value="Đã hủy">Đã hủy</option>
            </select>
            <div class="popup-actions">
                <button id="confirmUpdate" class="detail">Xác nhận</button>
                <button id="cancelUpdate" class="back-button">Hủy</button>
            </div>
        </div>
    `;

    document.body.appendChild(popup);

    document.getElementById("newStatus").value = currentStatus;

    // Xử lý nút xác nhận
    document.getElementById("confirmUpdate").addEventListener("click", () => {
        const newStatus = document.getElementById("newStatus").value;
        updateOrderStatus(maDH, newStatus);
        popup.remove();
        quanLyDonHang(); // refresh danh sách
    });

    // Hủy popup
    document.getElementById("cancelUpdate").addEventListener("click", () => {
        popup.remove();
    });
}

// Cập nhật trạng thái đơn hàng trong LocalStorage
function updateOrderStatus(maDH, newStatus) {
    const rows = getlocalStorage("bill");
    const orderIndex = rows.findIndex(dh => dh.maDH === maDH);

    if (orderIndex !== -1) {
        rows[orderIndex].trangThai = newStatus;
        setlocalStorage("bill", rows);
        alert(`Cập nhật trạng thái đơn hàng ${maDH} thành công!`);
    }
}
// Trong file 1.7.js, đảm bảo hàm updateOrderStatus hoạt động tốt
function updateOrderStatus(maDH, newStatus) {
    const rows = getlocalStorage("bill");
    const orderIndex = rows.findIndex(dh => dh.maDH === maDH);

    if (orderIndex !== -1) {
        rows[orderIndex].trangThai = newStatus;
        setlocalStorage("bill", rows);
        alert(`Cập nhật trạng thái đơn hàng ${maDH} thành công!`);
        
        // Cập nhật real-time cho user nếu đang xem lịch sử
        if (document.getElementById('historyTableContainer')) {
            renderPurchaseHistory();
        }
    }
}
