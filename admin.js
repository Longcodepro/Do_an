function openLogin(){
    let overlay=document.getElementById("loginOverlay")
    overlay.style.display="flex";
    setTimeout(() => overlay.classList.add("show"), 10);
}
function closeLogin(){
    let overlay=document.getElementById("loginOverlay")
    overlay.style.display="none";
    setTimeout(() => overlay.style.display = "none", 300);
}