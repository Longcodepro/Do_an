// const tableSp=localStorage.getItem("product");
// if(tableSp){
//     console.log("da co du lieu");
// }
// else
// localStorage.setItem("product",JSON.stringify(tatCaSanPham));

// setlocalStore("product",tatCaSanPham);

// function setlocalStore(key,value){
//     localStorage.setItem(key,JSON.stringify(value));
// }
// function getlocalStore(key){
//     return JSON.parse(localStorage.getItem(key));
// }

// window.loadpage = function(page) {
//     const noiDung = document.getElementById("noi_dung");
//     noiDung.innerHTML = trang[page];
//   };

function loadpage(page){
    const noidung=document.getElementById("noi_dung");
    const java=document.createElement("script");
    const css=document.createElement("link");
    document.querySelectorAll("script[data-page], link[data-page]").forEach(el => el.remove());
    if(trang[page]){
      noidung.innerHTML=trang[page];
      java.src=`${page}.js`;
      java.dataset.page = page;
      document.body.appendChild(java);
      css.rel="stylesheet";
    css.href=`${page}.css`
      css.dataset.page=page;
      document.head.appendChild(css);
    }
    else{
    noidung.innerHTML="<h3>khong ton tai trang nay</h3>";}
    console.log("da tai tran len",page);
  }
  window.addEventListener("DOMContentLoaded",()=>{
    loadpage("trangchu");
  })
  // File: trangchu.js

document.addEventListener("DOMContentLoaded", () => {
  // Lưu ý: Đảm bảo ID này tồn tại trên trang chủ
  const searchInput = document.getElementById("timkiem"); 
  const searchButton = searchInput ? searchInput.closest('.search').querySelector('.btn-search') : null;

  const handleSearchAndNavigate = (e) => {
      // Chỉ chạy khi Enter được nhấn hoặc nút được click
      if (e.type === 'keypress' && e.key !== 'Enter') return;
      if (e.type === 'keypress') e.preventDefault(); 
      if (!searchInput) return;

      const keyword = searchInput.value.trim();
      
      if (keyword) {
          // 1. LƯU TỪ KHÓA vào localStorage
          localStorage.setItem("searchKeyword", keyword.toLowerCase());
      } else {
          localStorage.removeItem("searchKeyword"); 
      }

      // 2. CHUYỂN HƯỚNG SANG TRANG SẢN PHẨM (gọi hàm loadpage)
      if (typeof loadpage === 'function') {
          loadpage('sanpham');
      } else {
          console.error("Lỗi: Hàm loadpage không thể truy cập được!");
      }
  };

  if (searchInput) {
      // Gắn sự kiện nhấn Enter
      searchInput.addEventListener("keypress", handleSearchAndNavigate);
  }
  if (searchButton) {
      // Gắn sự kiện nhấn nút
      searchButton.addEventListener("click", handleSearchAndNavigate);
  }
});