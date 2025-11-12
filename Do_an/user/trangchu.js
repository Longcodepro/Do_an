
// // File: trangchu.js (Hoặc file chứa logic giao diện trang chủ)
// // File: trangchu.js

// document.addEventListener("DOMContentLoaded", () => {
//     const searchInput = document.getElementById("timkiem"); 
//     const searchButton = searchInput ? searchInput.closest('.search').querySelector('.btn-search') : null;

//     // Hàm xử lý việc lưu từ khóa và chuyển trang
//     const handleSearchAndNavigate = (e) => {
//         if (e.type === 'keypress' && e.key !== 'Enter') return;
//         if (e.type === 'keypress') e.preventDefault(); // Ngăn chặn Enter mặc định

//         if (!searchInput) return;

//         const keyword = searchInput.value.trim();
        
//         // 1. Lưu từ khóa
//         if (keyword) {
//             localStorage.setItem("searchKeyword", keyword);
//         } else {
//             localStorage.removeItem("searchKeyword"); 
//         }

//         // 2. GỌI HÀM CHUYỂN TRANG
//         if (typeof loadpage === 'function') {
//             loadpage('sanpham'); // <<-- Dòng này phải hoạt động
//         } else {
//             // Hiển thị lỗi để debug nếu không tìm thấy hàm loadpage
//             console.error("Lỗi: Hàm loadpage không thể truy cập được!");
//         }
//     };

//     if (searchInput) {
//         // Gắn sự kiện nhấn Enter
//         searchInput.addEventListener("keypress", handleSearchAndNavigate);
//     }

//     if (searchButton) {
//         // Gắn sự kiện nhấn nút
//         searchButton.addEventListener("click", handleSearchAndNavigate);
//     }
// });
// // Đặt hàm này ở đầu tệp JavaScript chính hoặc trong một tệp được tải trước
// function loadpage(pageName) {
//     console.log(`Đang cố gắng chuyển đến trang: ${pageName}`);
//     // Thực hiện logic chuyển trang của bạn ở đây, ví dụ:
//     // window.location.href = `${pageName}.html`;
//     // hoặc tải nội dung AJAX/SPA
// }
// Đảm bảo bạn có một container để tải nội dung
// const mainContent = document.getElementById('main-conten'); 

// function loadpage(pageName) {
//     console.log(`Đang tải nội dung AJAX cho trang: ${pageName}`);
    
//     // SỬA ĐỔI TẠI ĐÂY: Thêm logic Fetch/AJAX
//     if (pageName === 'sanpham' && mainContent) {
//         // Giả định nội dung trang sản phẩm nằm trong file 'sanpham_content.html'
//         fetch('sanpham.html')
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Lỗi tải nội dung trang sản phẩm');
//                 }
//                 return response.text();
//             })
//             .then(html => {
//                 mainContent.innerHTML = html; // Cập nhật nội dung
//                 console.log('Đã tải nội dung trang sản phẩm thành công.');
//             })
//             .catch(error => {
//                 console.error("Lỗi AJAX:", error);
//                 mainContent.innerHTML = `<h1>Không thể tải trang ${pageName}</h1>`;
//             });
//     } else {
//         // Logic cho các trang khác hoặc nếu không tìm thấy container
//         console.warn(`Trang ${pageName} không được xử lý hoặc không tìm thấy container.`);
//     }
// }
