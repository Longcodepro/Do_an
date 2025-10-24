function openLogin(){
    let overlay=document.getElementById("loginOverlay")
    overlay.style.display="flex";
    setTimeout(() => overlay.classList.add("show"), 10);
}
function closeLogin(){
    let overlay=document.getElementById("loginOverlay")
    overlay.classList.remove("show");
    setTimeout(() => overlay.style.display = "none", 300);
}
function account(){
    const menu = document.getElementById("menuAdmin");
    // Ẩn/hiện menu thả xuống
    menu.style.display = menu.style.display === "block" ? "none" : "block";
}
//Hàm đăng xuất
function logout(){
    document.getElementById("nutlogin").style.display = "block"; // Hiện lại nút đăng nhập
    document.getElementById("nutaccount").style.display = "none";// Ẩn nút admin
    document.getElementById("menuAdmin").style.display = "none"; // Ẩn menu admin
    alert("Bạn đã LogOut thành công ");
}

function loginSuccess() {
    // Ẩn nút "Đăng nhập"
    document.getElementById("nutlogin").style.display = "none";
    // Hiện nút "Tài khoản"
    document.getElementById("nutaccount").style.display = "block";
    // Ẩn form đăng nhập (với hiệu ứng)
    closeLogin();
}
// ✅ Kiểm tra đăng nhập
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Tài khoản cố định
        const tkadmin = "admin";
        const mkadmin = "123";

        // Lấy giá trị nhập
        const user = document.getElementById("username").value.trim();
        const pass = document.getElementById("password").value.trim();

        // So sánh
        if (user === tkadmin && pass === mkadmin) {
            alert("Đăng nhập thành công!");

            // Ẩn form
            loginSuccess();
        } else {
            alert("Sai tài khoản hoặc mật khẩu!");
        }
    });
});
//Ẩn menu khi click ra ngoài
window.addEventListener("click", function (e) {
    const menu = document.getElementById("menuAdmin");
    const button = document.getElementById("nutAdmin");
    if (menu && !button.contains(e.target) && !menu.contains(e.target)) {
        menu.style.display = "none";
    }
});

function danhmuc() {
  const lmenu = document.querySelector(".l-menu");
  lmenu.classList.toggle("open");
}