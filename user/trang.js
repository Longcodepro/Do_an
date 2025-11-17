// ============================================================================
// FILE: trang.js - QUẢN LÝ TRANG, GIỎ HÀNG, THANH TOÁN, LỊCH SỬ
// ============================================================================

// ============================================================================
// 1. PHẦN ĐỊNH NGHĨA HTML CÁC TRANG
// ============================================================================

const trang = {
    trangchu: `
        <div class="lon">
            <!-- SLIDE BANNER -->
            <div class="lon1">
                <div class="slide">
                    <div class="anh">
                        <img src="../img/de2.jpg" alt="Banner điện máy SGU" />
                    </div>
                </div>
            </div>
            
            <!-- PHẦN GIỚI THIỆU CÔNG TY -->
            <div class="company-intro-section">
                <div class="intro-container">
                    
                    <!-- Header -->
                    <div class="intro-header">
                        <h2>🏢 ĐIỆN MÁY SGU</h2>
                        <p class="slogan">Uy Tín - Chất Lượng - Giá Tốt Nhất</p>
                    </div>

                    <!-- Nội dung giới thiệu -->
                    <div class="intro-content">
                        
                        <!-- Về chúng tôi -->
                        <div class="intro-text">
                            <h3>📖 Về Chúng Tôi</h3>
                            <p>
                                <strong>Điện Máy SGU</strong> là đơn vị cung cấp thiết bị điện tử, điện máy uy tín hàng đầu tại Việt Nam. 
                                Với hơn <strong>10 năm kinh nghiệm</strong> trong ngành, chúng tôi cam kết mang đến cho khách hàng 
                                những sản phẩm chính hãng, chất lượng cao với giá cả cạnh tranh nhất.
                            </p>
                        </div>

                        <!-- Thống kê -->
                        <div class="intro-stats">
                            <div class="stat-item">
                                <i class="fa-solid fa-users"></i>
                                <h4>500K+</h4>
                                <p>Khách Hàng Tin Dùng</p>
                            </div>
                            <div class="stat-item">
                                <i class="fa-solid fa-store"></i>
                                <h4>50+</h4>
                                <p>Cửa Hàng Toàn Quốc</p>
                            </div>
                            <div class="stat-item">
                                <i class="fa-solid fa-box"></i>
                                <h4>10,000+</h4>
                                <p>Sản Phẩm Đa Dạng</p>
                            </div>
                            <div class="stat-item">
                                <i class="fa-solid fa-star"></i>
                                <h4>4.8/5</h4>
                                <p>Đánh Giá Từ Khách Hàng</p>
                            </div>
                        </div>

                        <!-- Giá trị cốt lõi -->
                        <div class="intro-values">
                            <h3>💎 Giá Trị Cốt Lõi</h3>
                            <div class="values-grid">
                                <div class="value-item">
                                    <i class="fa-solid fa-shield-halved"></i>
                                    <div>
                                        <h4>Bảo Hành Chính Hãng</h4>
                                        <p>Cam kết 100% sản phẩm chính hãng, bảo hành dài hạn</p>
                                    </div>
                                </div>
                                <div class="value-item">
                                    <i class="fa-solid fa-truck-fast"></i>
                                    <div>
                                        <h4>Giao Hàng Nhanh</h4>
                                        <p>Giao hàng miễn phí trong 2 giờ nội thành</p>
                                    </div>
                                </div>
                                <div class="value-item">
                                    <i class="fa-solid fa-credit-card"></i>
                                    <div>
                                        <h4>Trả Góp 0%</h4>
                                        <p>Hỗ trợ trả góp lãi suất 0% qua thẻ tín dụng</p>
                                    </div>
                                </div>
                                <div class="value-item">
                                    <i class="fa-solid fa-rotate-left"></i>
                                    <div>
                                        <h4>Đổi Trả Linh Hoạt</h4>
                                        <p>Đổi trả trong 15 ngày nếu có lỗi từ nhà sản xuất</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Thông tin liên hệ -->
                        <div class="intro-contact">
                            <h3>📞 Liên Hệ Với Chúng Tôi</h3>
                            <div class="contact-grid">
                                <div class="contact-item">
                                    <i class="fa-solid fa-phone"></i>
                                    <span><strong>Hotline:</strong> 1900 1800</span>
                                </div>
                                <div class="contact-item">
                                    <i class="fa-solid fa-envelope"></i>
                                    <span><strong>Email:</strong> support@dienmaysgu.vn</span>
                                </div>
                                <div class="contact-item">
                                    <i class="fa-solid fa-location-dot"></i>
                                    <span><strong>Địa chỉ:</strong> 273 An Dương Vương, Q.5, TP.HCM</span>
                                </div>
                                <div class="contact-item">
                                    <i class="fa-solid fa-clock"></i>
                                    <span><strong>Giờ làm việc:</strong> 8:00 - 22:00 (Cả tuần)</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    `,
    
    sanpham: `
        <div class="khonglo">
            <div class="sanpham">
                <div class="menu-top">
                    <ul class="loai">
                        <li>
                            <div class="anh">
                                <img src="../img/4.png" alt="may giac" />
                            </div>
                            <p>Máy Giặc</p>
                        </li>
                    </ul>
                    <select id="locGia" class="chon-gia"> 
                        <option value="all">Giá bán: Tất cả</option>
                        <option value="duoi5">Dưới 5.000.000 VNĐ</option>
                        <option value="5den10">Từ 5.000.000 - 10.000.000 VNĐ</option>
                        <option value="10den20">Từ 10.000.000 - 20.000.000 VNĐ</option>
                        <option value="tren20">Trên 20.000.000 VNĐ</option>
                    </select>
                    <div id="locGiaTuyChinh">
                        <label for="giaMin">Giá từ (VNĐ):</label>
                        <input type="number" id="giaMin" placeholder="0"> <br>
                        <label for="giaMax">đến (VNĐ):</label> <br>
                        <input type="number" id="giaMax" placeholder="20000000">
                        <button id="btnLocGia">Lọc</button>
                        <p id="loiLocGia" style="color: red;"></p>
                    </div>
                </div>
                <div class="menu-conten" id="products"></div>
                <ul id="phantrang" class="phantrang"></ul>
                <div id="chitiet" style="display:none;"></div>
            </div>
        </div>
    `,
    
    lichSuMuaHang: `
        <div class="purchase-history-page">
            <h2 style="text-align: center; margin-bottom: 20px;">📋 Lịch Sử Mua Hàng</h2>
            <div id="historyTableContainer" class="history-table-container"></div>
        </div>
    `
};

// ============================================================================
// 2. HÀM HỖ TRỢ CHUNG (LocalStorage, Format, Tìm kiếm sản phẩm)
// ============================================================================

function setlocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function getlocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

function formatCurrency(amount) {
    if (!amount || isNaN(amount)) return '0đ';
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
}

function findProductById(maSP) {
    const allProducts = getlocalStorage('product') || [];
    return allProducts.find(p => p.maSP == maSP);
}

// ============================================================================
// 3. PHẦN QUẢN LÝ GIỎ HÀNG
// ============================================================================

// 3.1. Thêm sản phẩm vào giỏ hàng
function addToCart(maSP) {
    let cart = getlocalStorage('cart') || [];
    const product = findProductById(maSP);
    
    if (!product) {
        alert('❌ Sản phẩm không tồn tại!');
        return;
    }
    
    const existingItemIndex = cart.findIndex(item => item.maSP == maSP);
    let currentQuantityInCart = 0;
    
    if (existingItemIndex > -1) {
        currentQuantityInCart = cart[existingItemIndex].soLuong;
    }

    // Kiểm tra tồn kho
    if (currentQuantityInCart >= product.soLuong) {
        alert(`❌ Rất tiếc! Số lượng sản phẩm "${product.tenSP}" trong kho chỉ còn ${product.soLuong} sản phẩm.`);
        return;
    }
    
    if (existingItemIndex > -1) {
        cart[existingItemIndex].soLuong += 1;
    } else {
        cart.push({ maSP: maSP, soLuong: 1 });
    }

    setlocalStorage('cart', cart);
    renderCart();
    toggleCart(true);
}

// 3.2. Thay đổi số lượng sản phẩm
function changeQuantity(maSP, delta) {
    let cart = getlocalStorage('cart') || [];
    const item = cart.find(item => item.maSP == maSP);

    if (item) {
        const product = findProductById(maSP);
        const newQuantity = item.soLuong + delta;

        if (newQuantity > 0) {
            if (delta > 0 && newQuantity > product.soLuong) {
                alert(`❌ Số lượng tối đa cho sản phẩm "${product.tenSP}" là ${product.soLuong}.`);
                return;
            }
            item.soLuong = newQuantity;
        } else if (newQuantity <= 0) {
            cart = cart.filter(i => i.maSP != maSP);
        }
    }
    
    setlocalStorage('cart', cart);
    renderCart();
}

// 3.3. Xóa sản phẩm khỏi giỏ
function removeItem(maSP) {
    if (!confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) return;
    
    let cart = getlocalStorage('cart') || [];
    cart = cart.filter(item => item.maSP != maSP);
    setlocalStorage('cart', cart);
    renderCart();
}

// 3.4. Hiển thị giỏ hàng
function renderCart() {
    const cartContentDiv = document.getElementById('cartContent');
    const cartSummaryDiv = document.getElementById('cartSummary');
    
    if (!cartContentDiv || !cartSummaryDiv) return;
    
    const cart = getlocalStorage('cart') || [];
    const allProducts = getlocalStorage('product') || [];
    let itemsHtml = '';
    let totalAmount = 0;

    if (cart.length === 0) {
        itemsHtml = '<p style="text-align: center; color: #555;">Giỏ hàng của bạn đang trống.</p>';
        cartSummaryDiv.innerHTML = '<button class="checkout-btn" disabled>Giỏ hàng trống</button>';
    } else {
        cart.forEach(item => {
            const product = allProducts.find(p => p.maSP == item.maSP);
            if (product) {
                const price = product.gsht || 0;
                const subTotal = price * item.soLuong;
                totalAmount += subTotal;

                itemsHtml += `
                    <div class="cart-item">
                        <img src="${product.hinhAnh}" alt="${product.tenSP}" class="small-item-image">
                        <div class="small-item-info">
                            <strong>${product.tenSP}</strong>
                            <p>${formatCurrency(price)} x ${item.soLuong}</p>
                            <div class="quantity-controls">
                                <button onclick="changeQuantity(${product.maSP}, -1)">-</button>
                                <span>${item.soLuong}</span>
                                <button onclick="changeQuantity(${product.maSP}, 1)">+</button>
                            </div>
                        </div>
                        <button class="remove-btn" onclick="removeItem(${product.maSP})">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                `;
            }
        });

        cartSummaryDiv.innerHTML = `
            <div style="font-size: 1.2em; font-weight: bold; margin-bottom: 10px;">
                Tổng cộng: ${formatCurrency(totalAmount)}
            </div>
            <button class="checkout-btn" onclick="openCheckoutForm()">
                Tiến hành Thanh Toán
            </button>
        `;
    }

    cartContentDiv.innerHTML = itemsHtml;
}

// 3.5. Bật/Tắt giỏ hàng overlay
function toggleCart(show = true) {
    const cartOverlay = document.getElementById('cartOverlay');
    if (cartOverlay) {
        if (show) {
            renderCart();
            cartOverlay.classList.add('active');
        } else {
            cartOverlay.classList.remove('active');
        }
    }
}

// ============================================================================
// 4. PHẦN THANH TOÁN
// ============================================================================

// 4.1. Mở form thanh toán
function openCheckoutForm() {
    const user = getlocalStorage('currentUser');
    
    if (!user) {
        alert('❌ Vui lòng đăng nhập để thanh toán!');
        return;
    }

    const cart = getlocalStorage('cart') || [];
    if (cart.length === 0) {
        alert('❌ Giỏ hàng trống!');
        return;
    }

    const allProducts = getlocalStorage('product');
    let totalAmount = 0;
    let orderSummary = '';

    cart.forEach(item => {
        const product = allProducts.find(p => p.maSP === item.maSP);
        if (product) {
            const subTotal = product.gsht * item.soLuong;
            totalAmount += subTotal;
            orderSummary += `
                <div class="summary-row">
                    <span>${product.tenSP} (x${item.soLuong})</span>
                    <span>${formatCurrency(subTotal)}</span>
                </div>
            `;
        }
    });

    const checkoutHTML = `
        <div class="checkout-overlay active" id="checkoutOverlay">
            <div class="checkout-container">
                <div class="checkout-header">
                    <h2>🛒 Thanh Toán</h2>
                    <button class="close-cart" onclick="closeCheckoutForm()">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
                
                <div class="checkout-body">
                    <div class="checkout-summary">
                        <h3>📦 Đơn hàng của bạn</h3>
                        ${orderSummary}
                        <div class="summary-row">
                            <span>TỔNG CỘNG:</span>
                            <span>${formatCurrency(totalAmount)}</span>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="checkout-address">
                            <i class="fa-solid fa-location-dot"></i> Địa chỉ giao hàng
                        </label>
                        <input 
                            type="text" 
                            id="checkout-address" 
                            value="${user.diaChi || ''}" 
                            placeholder="Nhập địa chỉ giao hàng"
                            required
                        >
                    </div>

                    <div class="form-group">
                        <label for="checkout-payment">
                            <i class="fa-solid fa-credit-card"></i> Phương thức thanh toán
                        </label>
                        <select id="checkout-payment" required>
                            <option value="Tiền mặt">💵 Tiền mặt (COD)</option>
                            <option value="Chuyển khoản">🏦 Chuyển khoản ngân hàng</option>
                        </select>
                    </div>
                </div>

                <div class="checkout-actions">
                    <button class="btn-confirm" onclick="confirmCheckout(${totalAmount})">
                        <i class="fa-solid fa-check"></i> Xác Nhận Đặt Hàng
                    </button>
                    <button class="btn-cancel" onclick="closeCheckoutForm()">
                        <i class="fa-solid fa-times"></i> Hủy
                    </button>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', checkoutHTML);
}

// 4.2. Đóng form thanh toán
function closeCheckoutForm() {
    const overlay = document.getElementById('checkoutOverlay');
    if (overlay) {
        overlay.remove();
    }
}

// 4.3. Xác nhận thanh toán
function confirmCheckout(totalAmount) {
    const address = document.getElementById('checkout-address').value.trim();
    const paymentMethod = document.getElementById('checkout-payment').value;
    const cart = getlocalStorage('cart') || [];
    const user = getlocalStorage('currentUser');

    if (!address) {
        alert('❌ Vui lòng nhập địa chỉ giao hàng!');
        document.getElementById('checkout-address').focus();
        return;
    }

    // Kiểm tra tồn kho lần cuối
    if (!checkFinalStock(cart)) {
        return; 
    }

    const orderData = {
        cart: cart,
        totalAmount: totalAmount,
        address: address,
        paymentMethod: paymentMethod,
        customerInfo: {
            maKH: user.maKH,
            tenKH: user.tenKH,
            soDienThoai: user.soDienThoai,
            email: user.email
        },
        orderDate: new Date().toISOString()
    };

    // Trừ số lượng sản phẩm
    updateProductStock(cart);

    // Lưu đơn hàng
    saveOrderToLocalStorage(orderData);
    
    // Dọn dẹp
    localStorage.removeItem('cart');
    closeCheckoutForm();
    toggleCart(false);

    alert(`✅ Đặt hàng thành công!\n\n📦 Tổng tiền: ${formatCurrency(totalAmount)}\n📍 Địa chỉ: ${address}\n💳 Thanh toán: ${paymentMethod}`);
    
    renderCart();
}

// 4.4. Lưu đơn hàng vào localStorage
function saveOrderToLocalStorage(orderData) {
    console.log('🚀 Đang lưu đơn hàng...');
    
    let bills = getlocalStorage('bill') || [];
    let billDetails = getlocalStorage('billDetail') || [];
    
    const newOrderId = generateOrderId(bills);
    console.log('🆔 Mã đơn hàng mới:', newOrderId);
    
    const newBill = {
        maDH: newOrderId,
        ngayDat: new Date().toLocaleString('vi-VN'),
        giaTri: orderData.totalAmount,
        trangThai: 'Đang xử lý',
        hinhThucThanhToan: orderData.paymentMethod,
        donViVanChuyen: 'Giao Hàng Nhanh',
        khachHang: orderData.customerInfo.tenKH,
        maKH: orderData.customerInfo.maKH,
        diaChiGiaoHang: orderData.address
    };
    
    bills.push(newBill);
    
    orderData.cart.forEach(item => {
        const product = findProductById(item.maSP);
        if (product) {
            billDetails.push({
                maCTDH: billDetails.length + 1,
                maDH: newOrderId,
                maSP: item.maSP,
                soLuong: item.soLuong,
                tongTien: product.gsht * item.soLuong
            });
        }
    });
    
    setlocalStorage('bill', bills);
    setlocalStorage('billDetail', billDetails);
    
    console.log('✅ Đã lưu đơn hàng thành công!');
}

// 4.5. Tạo mã đơn hàng mới
function generateOrderId(existingBills) {
    if (!existingBills || existingBills.length === 0) {
        return 'DH001';
    }
    
    const maxId = existingBills.reduce((max, bill) => {
        const currentId = parseInt(bill.maDH.replace('DH', ''));
        return currentId > max ? currentId : max;
    }, 0);
    
    return 'DH' + String(maxId + 1).padStart(3, '0');
}

// ============================================================================
// 5. PHẦN LỊCH SỬ MUA HÀNG
// ============================================================================

// 5.1. Hàm gọi khi click menu "Lịch Sử Đơn Hàng"
window.lichSuMuaHang = function() {
    console.log('=== CLICK VÀO LỊCH SỬ MUA HÀNG ===');
    
    const noidung = document.getElementById("noi_dung");
    
    if (!noidung) {
        console.error('❌ Không tìm thấy div noi_dung!');
        return;
    }
    
    noidung.innerHTML = `
        <div class="purchase-history-page" style="max-width: 1200px; margin: 20px auto; padding: 20px;">
            <h2 style="text-align: center; margin-bottom: 30px; color: #1e90ff;">📋 Lịch Sử Mua Hàng</h2>
            <div id="historyTableContainer" class="history-table-container"></div>
        </div>
    `;
    
    setTimeout(() => {
        renderPurchaseHistory();
    }, 100);
}

// 5.2. Render dữ liệu lịch sử mua hàng
function renderPurchaseHistory() {
    console.log('🔄 Bắt đầu render lịch sử...');
    
    const currentUser = getlocalStorage('currentUser');
    const container = document.getElementById('historyTableContainer');
    
    if (!container) {
        console.error('❌ Không tìm thấy historyTableContainer');
        return;
    }
    
    // Kiểm tra đăng nhập
    if (!currentUser) {
        console.log('❌ Chưa đăng nhập');
        container.innerHTML = `
            <div style="text-align: center; padding: 50px; background: #f8f9fa; border-radius: 10px;">
                <i class="fa-solid fa-user-lock" style="font-size: 4em; color: #ff6b6b; margin-bottom: 20px;"></i>
                <h3 style="color: #333;">Vui lòng đăng nhập</h3>
                <p style="color: #666; margin: 20px 0;">Bạn cần đăng nhập để xem lịch sử mua hàng của mình.</p>
                <button onclick="moFormdnhap()" style="padding: 12px 24px; background: #1e90ff; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 16px;">
                    <i class="fa-solid fa-right-to-bracket"></i> Đăng nhập ngay
                </button>
            </div>
        `;
        return;
    }

    const bills = getlocalStorage('bill') || [];
    const billDetails = getlocalStorage('billDetail') || [];
    const products = getlocalStorage('product') || [];
    
    console.log('📊 Dữ liệu:', {
        totalBills: bills.length,
        userMaKH: currentUser.maKH
    });
    
    // Lọc đơn hàng của user
    const userBills = bills.filter(bill => bill.maKH == currentUser.maKH);
    
    console.log(`✅ Tìm thấy ${userBills.length} đơn hàng`);
    
    if (userBills.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 50px; background: #f8f9fa; border-radius: 10px;">
                <i class="fa-solid fa-box-open" style="font-size: 4em; color: #6c757d; margin-bottom: 20px;"></i>
                <h3 style="color: #333;">Chưa có đơn hàng</h3>
                <p style="color: #666; margin: 20px 0;">Bạn chưa có đơn hàng nào. Hãy mua sắm và quay lại sau!</p>
            </div>
        `;
        return;
    }
    
    // Sắp xếp đơn hàng mới nhất lên đầu
    const sortedBills = [...userBills].sort((a, b) => {
        return new Date(b.ngayDat) - new Date(a.ngayDat);
    });
    
    let html = '';
    
    sortedBills.forEach(bill => {
        const details = billDetails.filter(d => d.maDH === bill.maDH);
        
        let detailsHtml = '';
        let totalValue = 0;
        
        details.forEach(item => {
            const product = products.find(p => p.maSP == item.maSP);
            const tenSP = product ? product.tenSP : `Sản phẩm mã ${item.maSP}`;
            const hinhAnh = product ? product.hinhAnh : '../img/placeholder.png';
            const donGia = item.tongTien / item.soLuong;
            totalValue += item.tongTien;
            
            detailsHtml += `
                <div style="display: flex; gap: 15px; padding: 10px; border-bottom: 1px solid #eee; align-items: center;">
                    <img src="${hinhAnh}" alt="${tenSP}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;">
                    <div style="flex: 1;">
                        <div style="font-weight: 600; color: #333;">${tenSP}</div>
                        <div style="color: #666; font-size: 14px;">${formatCurrency(donGia)} x ${item.soLuong}</div>
                        <div style="color: #e74c3c; font-weight: 600;">Thành tiền: ${formatCurrency(item.tongTien)}</div>
                    </div>
                </div>
            `;
        });
        
        html += `
            <div style="border: 1px solid #e0e0e0; border-radius: 12px; margin-bottom: 20px; background: white; box-shadow: 0 2px 8px rgba(0,0,0,0.08); overflow: hidden;">
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 15px 20px; color: white;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <div style="font-size: 18px; font-weight: bold;">Đơn hàng #${bill.maDH}</div>
                            <div style="font-size: 14px; opacity: 0.9; margin-top: 5px;">
                                <i class="fa-regular fa-calendar"></i> ${bill.ngayDat}
                            </div>
                        </div>
                        <div style="background: rgba(255,255,255,0.2); padding: 8px 16px; border-radius: 20px; font-weight: 600;">
                            ${bill.trangThai}
                        </div>
                    </div>
                </div>
                
                <div style="padding: 15px 20px; background: #f8f9fa; border-bottom: 1px solid #e0e0e0;">
                    <strong><i class="fa-solid fa-location-dot"></i> Địa chỉ giao hàng:</strong> 
                    <span style="color: #666;">${bill.diaChiGiaoHang || 'Chưa có thông tin'}</span>
                </div>
                
                <div style="padding: 15px 20px;">
                    <h4 style="margin: 0 0 15px 0; color: #333;">Sản phẩm:</h4>
                    ${detailsHtml}
                </div>
                
                <div style="padding: 15px 20px; background: #f8f9fa; display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <div style="font-size: 14px; color: #666; margin-bottom: 5px;">
                            <i class="fa-solid fa-truck"></i> ${bill.donViVanChuyen}
                        </div>
                        <div style="font-size: 14px; color: #666;">
                            <i class="fa-solid fa-credit-card"></i> ${bill.hinhThucThanhToan}
                        </div>
                    </div>
                    <div style="text-align: right;">
                        <div style="font-size: 14px; color: #666; margin-bottom: 5px;">Tổng tiền:</div>
                        <div style="font-size: 24px; font-weight: bold; color: #e74c3c;">${formatCurrency(totalValue)}</div>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
    console.log('✅ Render hoàn tất!');
}

// ============================================================================
// 6. HÀM XỬ LÝ SỐ LƯỢNG TỒN KHO
// ============================================================================

// 6.1. Cập nhật số lượng tồn kho sau khi thanh toán
function updateProductStock(cartItems) {
    let allProducts = getlocalStorage('product') || [];

    cartItems.forEach(item => {
        const productIndex = allProducts.findIndex(p => p.maSP == item.maSP);
        
        if (productIndex > -1) {
            // Trừ số lượng đã mua
            allProducts[productIndex].soLuong -= item.soLuong;
            // Đảm bảo số lượng không bị âm
            if (allProducts[productIndex].soLuong < 0) {
                allProducts[productIndex].soLuong = 0;
            }
        }
    });

    setlocalStorage('product', allProducts);
    console.log('✅ Đã trừ số lượng tồn kho thành công.');
}

// 6.2. Kiểm tra lại tồn kho lần cuối
function checkFinalStock(cartItems) {
    const allProducts = getlocalStorage('product') || [];
    let hasError = false;

    for (const item of cartItems) {
        const product = allProducts.find(p => p.maSP == item.maSP);

        if (product && item.soLuong > product.soLuong) {
            alert(`❌ Lỗi tồn kho: Sản phẩm "${product.tenSP}" chỉ còn ${product.soLuong} trong kho, nhưng bạn yêu cầu ${item.soLuong}. Vui lòng cập nhật giỏ hàng.`);
            hasError = true;
            break;
        }
    }
    return !hasError;
}

// ============================================================================
// 7. KHỞI TẠO KHI TRANG LOAD
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Trang đã load xong');
    renderCart();
});