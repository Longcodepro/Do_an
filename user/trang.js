// ===== FILE TRANG.JS HOÀN CHỈNH =====

const trang = {
    trangchu: `
     <div class="lon">
             
            <div class="lon1">
              <div class="slide">
                <div class="anh">
                  <img src="../img/de2.jpg" alt="" />
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

                <!-- About Company -->
                <div class="intro-content">
                  <div class="intro-text">
                    <h3>📖 Về Chúng Tôi</h3>
                    <p>
                      <strong>Điện Máy SGU</strong> là đơn vị cung cấp thiết bị điện tử, điện máy uy tín hàng đầu tại Việt Nam. 
                      Với hơn <strong>10 năm kinh nghiệm</strong> trong ngành, chúng tôi cam kết mang đến cho khách hàng 
                      những sản phẩm chính hãng, chất lượng cao với giá cả cạnh tranh nhất.
                    </p>
                  </div>

                  <!-- Statistics -->
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

                  <!-- Core Values -->
                  <div class="intro-values">
                    <h3>💎 Giá Trị Cốt Lõi</h3>
                    <div class="values-grid">
                      <div class="value-item">
                        <i class="fa-solid fa-shield-halved"></i>
                        <h4>Bảo Hành Chính Hãng</h4>
                        <p>Cam kết 100% sản phẩm chính hãng, bảo hành dài hạn</p>
                      </div>
                      <div class="value-item">
                        <i class="fa-solid fa-truck-fast"></i>
                        <h4>Giao Hàng Nhanh</h4>
                        <p>Giao hàng miễn phí trong 2 giờ nội thành</p>
                      </div>
                      <div class="value-item">
                        <i class="fa-solid fa-credit-card"></i>
                        <h4>Trả Góp 0%</h4>
                        <p>Hỗ trợ trả góp lãi suất 0% qua thẻ tín dụng</p>
                      </div>
                      <div class="value-item">
                        <i class="fa-solid fa-rotate-left"></i>
                        <h4>Đổi Trả Linh Hoạt</h4>
                        <p>Đổi trả trong 15 ngày nếu có lỗi từ nhà sản xuất</p>
                      </div>
                    </div>
                  </div>

                  <!-- Contact Info -->
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

            <div class="lon4">
                <div class="anhthan">
                  <div class="anhlon">
                    <img src="../img/de.avif" alt="" />
                    <img src="../img/anh3.webp" alt="" />
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
            </div>
           
            <div class="menu-conten" id="products">
                <div class="product" id="thongtin" data-id="001">
                    <div class="anh1">
                        <img src="../img/4.png" alt="">
                    </div>
                    <h4>Máy giặt LG FV1410S3B 10 kg Inverter</h4>
                    <div>
                        <div class="price">
                            <span class="price-new">5.990.000đ</span>
                            <span class="price-old">8.990.000đ </span>
                            <small>-25%</small>
                        </div>
                        <div class="tuongtac">
                            <div class="sao"><i class="fa-solid fa-star"></i> 5.0</div> 
                            <div class="chitiet"><i class="fa-regular fa-square-plus"></i>
                                <div class="note">Chi Tiết</div>
                            </div>
                        </div>
                        <div class="hang">
                            <div class="mua">Mua</div>
                            <div><i class="nav-cart fa-solid fa-cart-shopping" style="margin-left: 7px;"></i></div>
                        </div>
                    </div>
                </div>
            </div>
            <ul id="phantrang" class="phantrang"></ul>
            <div id="chitiet" style="display:none;"></div>
        </div>
    </div>
    `
}

// =========================================================
// HÀM HỖ TRỢ (Lưu/Lấy localStorage, Định dạng tiền tệ)
// =========================================================
function setlocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function getlocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

function formatCurrency(number) {
    if (isNaN(number)) return "Giá không xác định";
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(number);
}

// =========================================================
// HÀM QUẢN LÝ GIỎ HÀNG
// =========================================================

function addToCart(maSP) {
    let cart = getlocalStorage('cart') || [];
    const existingItemIndex = cart.findIndex(item => item.maSP == maSP); 

    if (existingItemIndex > -1) {
        cart[existingItemIndex].soLuong += 1;
    } else {
        cart.push({
            maSP: maSP,
            soLuong: 1
        });
    }

    setlocalStorage('cart', cart);
    renderCart();
    toggleCart(true);
}

function changeQuantity(maSP, delta) {
    let cart = getlocalStorage('cart') || [];
    const item = cart.find(item => item.maSP == maSP);

    if (item) {
        item.soLuong += delta;
        if (item.soLuong <= 0) {
            cart = cart.filter(i => i.maSP != maSP);
        }
    }
    setlocalStorage('cart', cart);
    renderCart();
}

function removeItem(maSP) {
    if (!confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) return;
    let cart = getlocalStorage('cart') || [];
    cart = cart.filter(item => item.maSP != maSP);
    setlocalStorage('cart', cart);
    renderCart();
}

// =========================================================
// HÀM HIỂN THỊ GIỎ HÀNG
// =========================================================
function renderCart() {
    const cartContentDiv = document.getElementById('cartContent');
    const cartSummaryDiv = document.getElementById('cartSummary');
    
    if (!cartContentDiv || !cartSummaryDiv) return;
    
    const cart = getlocalStorage('cart') || [];
    const allProducts = getlocalStorage('product') || [];
    let itemsHtml = '';
    let totalAmount = 0;

    if (cart.length === 0) {
        itemsHtml = '<p style="text-align: center; color: #555; padding: 30px;">Giỏ hàng của bạn đang trống.</p>';
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

function toggleCart(show = true) {
    const cartOverlay = document.getElementById('cartOverlay');
    if (!cartOverlay) return;
    
    if (show) {
        renderCart();
        cartOverlay.classList.add('active');
    } else {
        cartOverlay.classList.remove('active');
    }
}

// =========================================================
// HÀM THANH TOÁN
// =========================================================

function openCheckoutForm() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!user) {
        alert('❌ Vui lòng đăng nhập để thanh toán!');
        if (typeof moFormdnhap === 'function') moFormdnhap();
        return;
    }

    const cart = getlocalStorage('cart') || [];
    if (cart.length === 0) {
        alert('❌ Giỏ hàng trống!');
        return;
    }

    const allProducts = getlocalStorage('product') || [];
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

function closeCheckoutForm() {
    const overlay = document.getElementById('checkoutOverlay');
    if (overlay) overlay.remove();
}

function confirmCheckout(totalAmount) {
    const address = document.getElementById('checkout-address').value.trim();
    const paymentMethod = document.getElementById('checkout-payment').value;
    const cart = getlocalStorage('cart') || [];
    const user = JSON.parse(localStorage.getItem('currentUser'));

    if (!address) {
        alert('❌ Vui lòng nhập địa chỉ giao hàng!');
        document.getElementById('checkout-address').focus();
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

    saveOrderToLocalStorage(orderData);
    localStorage.removeItem('cart');
    closeCheckoutForm();
    toggleCart(false);

    alert(`✅ Đặt hàng thành công!\n\n📦 Tổng tiền: ${formatCurrency(totalAmount)}\n📍 Địa chỉ: ${address}\n💳 Thanh toán: ${paymentMethod}`);
    
    renderCart();
}

function saveOrderToLocalStorage(orderData) {
    let bills = getlocalStorage('bill') || [];
    let billDetails = getlocalStorage('billDetail') || [];
    const allProducts = getlocalStorage('product') || [];
    
    const newOrderId = `DH${String(bills.length + 1).padStart(3, '0')}`;
    
    bills.push({
        maDH: newOrderId,
        ngayDat: new Date().toLocaleString('vi-VN'),
        giaTri: orderData.totalAmount,
        trangThai: 'Đang xử lý',
        hinhThucThanhToan: orderData.paymentMethod,
        donViVanChuyen: 'Giao Hàng Nhanh',
        khachHang: orderData.customerInfo.tenKH
    });
    
    orderData.cart.forEach(item => {
        const product = allProducts.find(p => p.maSP === item.maSP);
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
}

// =========================================================
// KHỞI TẠO
// =========================================================
document.addEventListener('DOMContentLoaded', () => {
    renderCart();
});