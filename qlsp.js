// Biến toàn cục để lưu trữ danh sách tài khoản Admin từ JSON
let adminAccounts = [];
let currentActiveContentId = 'welcomeContent'; // Mặc định là mục chào mừng
const LOW_STOCK_THRESHOLD = 10; // Ngưỡng cảnh báo tồn kho

// --- DỮ LIỆU MẪU (MOCK DATA) CHO SẢN PHẨM VÀ TỒN KHO ---
// Dữ liệu mẫu đã được ánh xạ với MA_MAT_HANG từ file data.json
let productTypes = [
    { id: "MH001", name: "Máy giặt", status: "active" },
    { id: "MH002", name: "Bàn ủi", status: "active" },
    { id: "MH003", name: "Quạt", status: "hidden" },
    { id: "MH004", name: "Máy hút bụi", status: "active" },
    { id: "MH005", name: "Nồi cơm điện", status: "active" },
    { id: "MH006", name: "Lò vi sóng", status: "active" },
    { id: "MH007", name: "Máy sấy tóc", status: "active" },
    { id: "MH008", name: "Máy xay sinh tố", status: "active" },
    { id: "MH009", name: "Nồi chiên không dầu", status: "active" },
    { id: "MH010", name: "Máy lọc không khí", status: "active" },
];

const products = [
    { id: "MSP001", name: "Máy giặt Casper Inverter 9.5kg", typeId: "MH001" }, 
    { id: "MSP002", name: "Bàn ủi khô Philips HD1172 1100W", typeId: "MH002" },
    { id: "MSP003", name: "Quạt hộp Senko 5 cánh BD230 28W", typeId: "MH003" }, 
    { id: "MSP004", name: "Máy hút bụi cầm tay Midea MVC-SC861B", typeId: "MH004" },
    { id: "MSP005", name: "Nồi cơm nắp gài Sunhouse 1.8 lít SHD8611N", typeId: "MH005" }, 
    { id: "MSP006", name: "Lò vi sóng Toshiba MW3-MM25PE(BK)", typeId: "MH006" },
    { id: "MSP007", name: "Máy sấy tóc 1000W Panasonic EH-ND12-P645", typeId: "MH007" },
    { id: "MSP008", name: "Máy xay sinh tố đa năng AVA BL828", typeId: "MH008" },
    { id: "MSP009", name: "Nồi chiên không dầu Mishio MK-01 3.8 lít", typeId: "MH009" },
    { id: "MSP010", name: "Máy lọc không khí Philips AC0950/10 23W", typeId: "MH010" },
];

let inventoryData = [
    { productId: "MSP001", nhap: 50, xuat: 20, ton: 30 },
    { productId: "MSP002", nhap: 40, xuat: 33, ton: 7 }, 
    { productId: "MSP003", nhap: 30, xuat: 27, ton: 3 }, 
    { productId: "MSP004", nhap: 60, xuat: 49, ton: 11 },
    { productId: "MSP005", nhap: 45, xuat: 30, ton: 15 },
    { productId: "MSP006", nhap: 35, xuat: 32, ton: 3 }, 
    { productId: "MSP007", nhap: 25, xuat: 4, ton: 21 },
    { productId: "MSP008", nhap: 40, xuat: 26, ton: 14 },
    { productId: "MSP009", nhap: 20, xuat: 9, ton: 11 },
    { productId: "MSP010", nhap: 30, xuat: 25, ton: 5 }, 
];

// --- HÀM TẢI DỮ LIỆU JSON (CHO ĐĂNG NHẬP) ---
function fetchAdminData() {
    fetch('data.json') 
        .then(response => {
            if (!response.ok) {
                throw new Error('Lỗi khi tải tệp data.json: ' + response.statusText);
            }
            return response.json(); 
        })
        .then(data => {
            const loginTable = data.find(item => item.type === "table" && item.name === "dang_nhap1");
            if (loginTable && loginTable.data) {
                adminAccounts = loginTable.data;
            } else {
                console.warn("Không tìm thấy dữ liệu bảng 'dang_nhap1' trong tệp JSON.");
            }
        })
        .catch(error => {
            console.error('Đã xảy ra lỗi:', error);
            alert('Không thể tải dữ liệu Admin. Vui lòng kiểm tra đường dẫn tệp JSON và chạy trên máy chủ cục bộ (Live Server).');
        });
}

// --- CÁC HÀM QUẢN LÝ GIAO DIỆN CHUNG ---
function openLogin(){
    let overlay = document.getElementById("loginOverlay");
    overlay.style.display = "flex";
    setTimeout(() => overlay.classList.add("show"), 10);
}
function closeLogin(){
    let overlay = document.getElementById("loginOverlay");
    overlay.classList.remove("show");
    setTimeout(() => overlay.style.display = "none", 300);
}
function account(){
    const menu = document.getElementById("menuAdmin");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
}
function logout(){
    document.getElementById("nutlogin").style.display = "block"; 
    document.getElementById("nutaccount").style.display = "none";
    document.getElementById("menuAdmin").style.display = "none"; 
    alert("Bạn đã LogOut thành công ");
    showContent('welcomeContent'); 
}
function loginSuccess() {
    document.getElementById("nutlogin").style.display = "none";
    document.getElementById("nutaccount").style.display = "block";
    closeLogin();
    showContent('welcomeContent'); 
}

// Hàm bật/tắt menu mobile
function toggleMenu() {
    const lmenu = document.querySelector(".l-menu");
    lmenu.classList.toggle("open");
}

function showContent(contentId) {
    // Ẩn mục cũ
    const currentContent = document.getElementById(currentActiveContentId);
    if (currentContent) {
        currentContent.classList.remove('active');
    }

    // Hiện mục mới
    const newContent = document.getElementById(contentId);
    if (newContent) {
        newContent.classList.add('active');
        currentActiveContentId = contentId; 
    }

    // Tự động đóng menu mobile khi chọn 1 mục
    const lmenu = document.querySelector(".l-menu");
    if (lmenu.classList.contains('open')) {
        lmenu.classList.remove('open');
    }

    // Tự động gọi hàm render khi chuyển mục
    if (contentId === 'productTypeContent') {
        renderProductTypeTable(); 
    } 
    else if (contentId === 'inventoryContent') {
        loadInventoryFilters(); 
        renderInventoryTable(inventoryData); 
        updateLowStockCount(); 
    }
}


/* ================================================================== */
/* CÁC HÀM CRUD CHO LOẠI SẢN PHẨM (productTypeContent)                */
/* ================================================================== */
function renderProductTypeTable() {
    const tbody = document.getElementById("productTypeTableBody");
    if (!tbody) return;
    tbody.innerHTML = ""; 

    productTypes.forEach(type => {
        const tr = document.createElement("tr");

        const statusText = type.status === 'active' ? 'Hoạt động' : 'Đã ẩn';
        const toggleButtonText = type.status === 'active' ? 'Ẩn' : 'Hiện';
        const toggleButtonClass = type.status === 'active' ? 'btn-toggle-hide' : 'btn-toggle-show';

        tr.innerHTML = `
            <td>${type.id}</td>
            <td>${type.name}</td>
            <td>${statusText}</td>
            <td>
                <button class="btn btn-edit" onclick="editProductType('${type.id}')">
                    <i class="fa-solid fa-pen-to-square"></i> Sửa
                </button>
                <button class="btn ${toggleButtonClass}" onclick="toggleProductTypeStatus('${type.id}')">
                    <i class="fa-solid ${type.status === 'active' ? 'fa-eye-slash' : 'fa-eye'}"></i> ${toggleButtonText}
                </button>
                <button class="btn btn-delete" onclick="deleteProductType('${type.id}')">
                    <i class="fa-solid fa-trash"></i> Xóa
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}
function openProductTypeModal(typeId = null) {
    const modal = document.getElementById("productTypeModal");
    const modalTitle = document.getElementById("modalTitle");
    document.getElementById("productTypeForm").reset(); 

    modal.style.display = "flex"; 
}

function closeProductTypeModal() {
    document.getElementById("productTypeModal").style.display = "none";
}

function editProductType(typeId) {
    openProductTypeModal(typeId);
}

function toggleProductTypeStatus(typeId) {
    const type = productTypes.find(t => t.id === typeId);
    if (type) {
        if (confirm(`Bạn có chắc chắn muốn ${type.status === 'active' ? 'ẨN' : 'HIỆN'} loại sản phẩm "${type.name}" này không?`)) {
            type.status = (type.status === 'active') ? 'hidden' : 'active';
            renderProductTypeTable(); 
        }
    }
}

function deleteProductType(typeId) {
    const type = productTypes.find(t => t.id === typeId);
    if (type) {
        const relatedProducts = products.filter(p => p.typeId === typeId);
        if (relatedProducts.length > 0) {
            alert(`Không thể xóa loại sản phẩm "${type.name}" vì có ${relatedProducts.length} Sản Phẩm đang liên kết!`);
            return;
        }

        if (confirm(`CẢNH BÁO: Bạn có chắc chắn muốn XÓA VĨNH VIỄN loại sản phẩm "${type.name}" này không?`)) {
            productTypes = productTypes.filter(t => t.id !== typeId);
            renderProductTypeTable();
            alert(`Đã xóa loại sản phẩm "${type.name}" thành công!`);
        }
    }
}

/* ================================================================== */
/* CÁC HÀM CHO QUẢN LÝ TỒN KHO (inventoryContent)                     */
/* ================================================================== */
function getFullInventoryDetails(inventoryItem) {
    const product = products.find(p => p.id === inventoryItem.productId);
    if (!product) return null;

    const type = productTypes.find(t => t.id === product.typeId);
    const typeName = type ? type.name : "Không xác định";
    const typeStatus = type ? type.status : "active";

    return {
        ...inventoryItem,
        productName: product.name,
        typeId: product.typeId, 
        typeName: typeName,
        typeStatus: typeStatus
    };
}

function renderInventoryTable(dataToRender) {
    const tbody = document.getElementById("inventoryTableBody");
    if (!tbody) return;
    tbody.innerHTML = "";

    const allItemsFull = inventoryData.map(getFullInventoryDetails).filter(Boolean);
    const fullDetails = dataToRender.map(item => allItemsFull.find(a => a.productId === item.productId)).filter(Boolean);

    if (fullDetails.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align: center;">Không tìm thấy sản phẩm nào.</td></tr>`;
        return;
    }

    fullDetails.forEach(item => {
        const tr = document.createElement("tr");
        
        if (item.ton < LOW_STOCK_THRESHOLD) {
            tr.classList.add("low-stock-alert");
        }
        
        tr.innerHTML = `
            <td>${item.productId}</td>
            <td>${item.productName}</td>
            <td>${item.typeName} ${item.typeStatus === 'hidden' ? '(Đã ẩn)' : ''}</td>
            <td>${item.nhap}</td>
            <td>${item.xuat}</td>
            <td>${item.ton}</td>
            <td>
                <button class="btn btn-inventory btn-inventory-plus" onclick="openInventoryUpdateModal('${item.productId}', 'nhap')">
                    <i class="fa-solid fa-plus"></i>
                </button>
                <button class="btn btn-inventory btn-inventory-minus" onclick="openInventoryUpdateModal('${item.productId}', 'xuat')">
                    <i class="fa-solid fa-minus"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function openInventoryUpdateModal(productId, action = 'nhap') {
    const item = getFullInventoryDetails(inventoryData.find(i => i.productId === productId));
    if (!item) return;

    document.getElementById("invUpdateProductId").value = productId;
    document.getElementById("invProductNameDisplay").innerText = item.productName;
    document.getElementById("invUpdateAction").value = action;
    document.getElementById("invUpdateQuantity").value = 1;
    document.getElementById("inventoryModalTitle").innerText = action === 'nhap' ? 'Nhập Hàng' : 'Xuất Hàng';

    document.getElementById("inventoryUpdateModal").style.display = 'flex';
}

function closeInventoryUpdateModal() {
    document.getElementById("inventoryUpdateModal").style.display = 'none';
}

function updateInventory(productId, action, quantity) {
    const inventoryItem = inventoryData.find(i => i.productId === productId);
    if (!inventoryItem) return false;

    if (action === 'nhap') {
        inventoryItem.nhap += quantity;
        inventoryItem.ton += quantity;
        return true;
    } else if (action === 'xuat') {
        if (inventoryItem.ton < quantity) {
            alert(`Lỗi: Không đủ hàng tồn kho (${inventoryItem.ton}) để xuất ${quantity} sản phẩm.`);
            return false;
        }
        inventoryItem.xuat += quantity;
        inventoryItem.ton -= quantity;
        return true;
    }
    return false;
}

function loadInventoryFilters() {
    const select = document.getElementById("invSelectCategory");
    if (!select) return;

    if (select.options.length <= 1) { 
        select.innerHTML = `<option value="">Tất cả các loại</option>`; 
    
        productTypes.forEach(type => {
            const option = document.createElement("option");
            option.value = type.id;
            option.innerText = `${type.name} ${type.status === 'hidden' ? '(Ẩn)' : ''}`;
            select.appendChild(option);
        });
    }
}

function updateLowStockCount() {
    const lowStockItems = inventoryData.filter(item => item.ton < LOW_STOCK_THRESHOLD);
    const countSpan = document.getElementById("lowStockCount");
    if (countSpan) {
         countSpan.innerText = `(Có ${lowStockItems.length} sản phẩm)`;
         countSpan.style.color = lowStockItems.length > 0 ? '#dc3545' : 'green'; 
         countSpan.style.fontWeight = 'bold';
    }
}

function searchInventory(fullSearch = false) {
    const searchTerm = document.getElementById("invSearchProduct")?.value.toLowerCase() || '';
    const typeIdFilter = document.getElementById("invSelectCategory")?.value || '';
    
    const allItemsFull = inventoryData.map(getFullInventoryDetails).filter(Boolean);

    let filteredData = allItemsFull.filter(item => {
        const nameMatch = item.productName.toLowerCase().includes(searchTerm) || 
                          item.productId.toLowerCase().includes(searchTerm);
        
        const typeMatch = !typeIdFilter || (item.typeId == typeIdFilter);
        
        return nameMatch && typeMatch;
    });

    const finalFilteredData = filteredData.map(item => {
        const { productName, typeId, typeName, typeStatus, ...originalItem } = item;
        return originalItem;
    });

    renderInventoryTable(finalFilteredData);
}

function showLowStock() {
    const lowStockItems = inventoryData.filter(item => item.ton < LOW_STOCK_THRESHOLD);
    renderInventoryTable(lowStockItems);
}


/* ================================================================== */
/* LOGIC KHỞI TẠO VÀ SỰ KIỆN CHÍNH (DOMContentLoaded)                */
/* ================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    
    fetchAdminData();
    showContent(currentActiveContentId); 

    // Gán sự kiện cho nút 3 gạch
    const nutDanhmuc = document.getElementById("nutDanhmuc");
    if (nutDanhmuc) {
        nutDanhmuc.addEventListener("click", toggleMenu);
    }
    
    // 3. XỬ LÝ ĐĂNG NHẬP
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const user = document.getElementById("username").value.trim();
            const pass = document.getElementById("password").value.trim();

            const accountFound = adminAccounts.find(account => 
                account.NAME === user && account.PASSWORD === pass && account.TINH_TRANG === "1"
            );

            if (accountFound) {
                alert(`Đăng nhập thành công! Chào mừng ${accountFound.NAME}.`);
                loginSuccess();
            } else {
                alert("Sai tài khoản, mật khẩu hoặc tài khoản chưa được kích hoạt!");
            }
        });
    }

    // 4. SỰ KIỆN CHO CẬP NHẬT TỒN KHO
    const inventoryUpdateForm = document.getElementById("inventoryUpdateForm");
    if (inventoryUpdateForm) {
        inventoryUpdateForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const productId = document.getElementById("invUpdateProductId").value;
            const action = document.getElementById("invUpdateAction").value;
            const quantity = parseInt(document.getElementById("invUpdateQuantity").value);

            if (quantity <= 0 || isNaN(quantity)) {
                alert("Số lượng phải là một số dương.");
                return;
            }

            const success = updateInventory(productId, action, quantity);

            if (success) {
                alert(`Cập nhật tồn kho thành công! (${action === 'nhap' ? '+' : '-'} ${quantity} sản phẩm)`);
                closeInventoryUpdateModal();
                searchInventory(false); 
                updateLowStockCount(); 
            }
        });
    }

    window.addEventListener("click", function (e) {
        const menu = document.getElementById("menuAdmin");
        const button = document.getElementById("nutAdmin");
        if (menu && button && !button.contains(e.target) && !menu.contains(e.target)) {
            menu.style.display = "none";
        }
    });
});