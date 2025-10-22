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
    let overlay=document.getElementById("loginOverlay")
    overlay.classList.remove("show");
    setTimeout(() => overlay.style.display = "none", 300);
}

function loginSuccess() {
    // Ẩn nút "Đăng nhập"
    document.getElementById("loginButton").style.display = "none";
    // Hiện nút "Tài khoản"
    document.getElementById("accountButton").style.display = "block";
    // Ẩn form đăng nhập (với hiệu ứng)
    closeLogin();
}
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".login form");
    form.addEventListener("submit", (e) => {
        e.preventDefault(); // chặn reload trang
        // giả sử đăng nhập thành công
        loginSuccess();
    });
});
