let user = [];
let tranghientai = 1;
let sosp = 5;
let peruser = [];
let sanpham = "";
let tukhoaHienTai = "";
async function getuser(tukhoa=tukhoaHienTai) {
  try {
    const response = await fetch("data.json");
    const allData = await response.json();
    const sanphamdata = allData.find(item => item.name === 'san_pham');
    let danhsach = sanphamdata.data;
   
    if (sanpham !== "") {
      danhsach = danhsach.filter(sp => sp.MA_MAT_HANG === sanpham);
    }
    if (tukhoa && tukhoa.trim() !== "") {
      danhsach = danhsach.filter(sp => 
        sp.TEN_SP.toLowerCase().includes(tukhoa.toLowerCase())
      );
    }
    user = danhsach;
    tukhoaHienTai = tukhoa;
    const tongSoTrangMoi = Math.ceil(user.length / sosp);
    if (tranghientai > tongSoTrangMoi && tongSoTrangMoi > 0) {
        tranghientai = tongSoTrangMoi;
    } else if (tongSoTrangMoi === 0) {
        tranghientai = 1; // Nếu không có sản phẩm nào, vẫn giữ trang 1
    }
    peruser = user.slice((tranghientai - 1) * sosp, tranghientai * sosp);
    
    renderpaga();
    renderuser();
  } catch (error) {
    console.log("Lỗi khi lấy dữ liệu:", error);
  }
}
function timkiem(key) {
  tranghientai = 1;
  sanpham = ""; // <--- QUAN TRỌNG: Reset danh mục khi tìm kiếm
    
    // Xóa trạng thái active của menu (nếu có)
    const thanhphans = document.querySelectorAll(".sanpham");
    thanhphans.forEach(t => t.classList.remove("active"));
    getuser(key);
}

function renderuser() {
  const productsDiv = document.getElementById("products");
    if (peruser.length === 0) {
        productsDiv.innerHTML = '<h4>Không tìm thấy sản phẩm nào.</h4>';
        return;
    }
  const html = peruser.map(sp => `
    <div class="product-item">
      <div class="anh1">
        <img src="${sp.HINH_ANH}" alt="">
      </div>
      <h4>${sp.TEN_SP}</h4>
      <div class="price">
        <span class="price-new">${sp.GIA_BAN}</span>
        <span class="price-old">8.990.000đ</span>
        <small>-25%</small>
      </div>
      <div class="tuongtac">
        <div class="sao"><i class="fa-solid fa-star"></i> 5.0</div>
        <div class="chitiet"><i class="fa-regular fa-square-plus"></i><div class="note">Chi Tiết</div></div>
      </div>
      <div class="hang">
        <div class="mua">Mua</div>
        <div><i class="nav-cart fa-solid fa-cart-shopping" style="margin-left:7px;"></i></div>
      </div>
    </div>
  `).join('');
  productsDiv.innerHTML = html;
}

function renderpaga() {
  const tongSoTrang = Math.ceil(user.length / sosp);
  let html = '';
  if (tongSoTrang <= 1) {
    document.getElementById("phantrang").innerHTML = '';
    return;
  }
  for (let i = 1; i <= tongSoTrang; i++) {
    html += `<li class="${i === tranghientai ? 'active' : ''}" onclick="handle(${i})">${i}</li>`;
  }
  document.getElementById("phantrang").innerHTML = html;
}

// function handle(page) {
  
//     if (page >= 1) {
//   tranghientai = page;
//  getuser();}
// }

function handle(page) {
    // TÍNH LẠI tổng số trang dựa trên mảng user đã lọc
    const tongSoTrang = Math.ceil(user.length / sosp); 
    
    // KIỂM TRA nghiêm ngặt: chỉ cho phép chuyển trang trong phạm vi hợp lệ
    if (page >= 1 && page <= tongSoTrang) { 
      tranghientai = page;
      getuser();
    } else if (page > tongSoTrang && tongSoTrang > 0) {
      // Nếu cố tình chuyển sang trang > max page, reset về trang cuối
      tranghientai = tongSoTrang;
      getuser();
    }
  }


// async function getData() {
//   try {
    

//     const sp=document.querySelector('.menu-conten');
//     const response = await fetch("data.json");
//     const allData = await response.json();
//     const spdata= allData.find(item => item.name === "san_pham");
//     const mangsp=spdata.data;
//     // const loc=mangsp.filter((pro)=>pro.MA_MAT_HANG===sanpham);
//     // console.log("loc",loc);
//     let hienthi=mangsp
//     if(sanpham !==""){
//       hienthi=mangsp.filter(pro=>pro.MA_MAT_HANG===sanpham);
//     }
    
//       sp.innerHTML=hienthi.map(the=>{
//         return `
//          <div class="product" >
//                     <div class="anh1">
//                         <img src="${the.HINH_ANH}" alt="">
//                     </div>
//                     <h4>${the.TEN_SP}</h4>
//                     <div class="price">
//                         <span class="price-new">${the.GIA_BAN}</span>
//                         <span class="price-old">8.990.000đ </span>
//                         <small>-25%</small>
//                        </div>
//                        <div class="tuongtac">
//                         <div class="sao"><i class="fa-solid fa-star"></i> 5.0</div> 
//                         <div class="chitiet"> <i class="fa-regular fa-square-plus"  ></i>
//                             <div class="note">Chi Tiết</div>
//                         </div>
//                        </div>
//                        <div class="hang">
//                         <div class="mua"> Mua </div>
//                         <div><i class="nav-cart fa-solid fa-cart-shopping" style="margin-left: 7px;"></i></div>
//                        </div>
//                 </div>`
//       }).join('');
//     nutpt(hienthi.length);
//   } catch (error) {
//     console.error("Lỗi khi đọc dữ liệu:", error);
//   }
// }
// getData();

let $$=document.querySelectorAll.bind(document);

async function rendermenu(){
  const menut = document.querySelector('.loai');
  try{
  const response = await fetch("data.json");
  const allData= await response.json();
  const danhmucs = allData.find(item => item.name==="mat_hang");
  const danhmuc=danhmucs.data;
  if(danhmuc){
    menut.innerHTML=danhmuc.map(the=>{
      return `<li data=${the.MA_MAT_HANG} class="sanpham">${the.TEN_MAT_HANG}</li>`
      
    }).join('');
    let thanhphans = $$(".sanpham");
    thanhphans.forEach(the => {
     the.addEventListener("click", (e)=>{
      sanpham=e.target.getAttribute("data");
      tranghientai=1;
      thanhphans.forEach(t => t.classList.remove("active"));
    e.target.classList.add("active");
    getuser(tukhoaHienTai);
     })
    });
    return;
  }
 
}
 
  catch(error){
    console.log("loi khong doc du lieu", error);
  }
}
rendermenu();
getuser();

// async function timkiem(key){
//   const productdiv=document.getElementById('products')
//   try{
//     const response = await fetch("data.json");
//     const allData = await response.json();
//     const danhmuc= allData.find(item => item.name==='san_pham');
//     const danhmucs=danhmuc.data;
//     if(danhmuc){
//       const ketquatim=danhmucs.filter(sanpham =>{
//         return sanpham.TEN_SP.toLowerCase().includes(key.toLowerCase());
//       });
//       if(ketquatim.length>0){
//         let html=' ';
//         ketquatim.forEach(sanpham=>{
//           html+=cautrucsp(sanpham);
//         });
//         productdiv.innerHTML = html;
//       }
//       else {
//         productdiv.innerHTML="<h4>khong tim thay tu khoa cua ban</h4>";
//       }
//     }
//     else{
//       productdiv.innerHTML="<h4>loi du lieu khong tim thay san pham</h4>";
//     }
//   }
//   catch(error){
//     console.log("loi roi",error);
//   }
// }
// function cautrucsp(sanpham){
//   return `<div class="product-item" >
//                     <div class="anh1">
//                         <img src="${sanpham.HINH_ANH}" alt="">
//                     </div>
//                     <h4>${sanpham.TEN_SP}</h4>
//                     <div class="price">
//                         <span class="price-new">${sanpham.GIA_BAN}</span>
//                         <span class="price-old">8.990.000đ </span>
//                         <small>-25%</small>
//                        </div>
//                        <div class="tuongtac">
                        
//                         <div class="sao"><i class="fa-solid fa-star"></i> 5.0</div> 
//                         <div class="chitiet"> <i class="fa-regular fa-square-plus"  ></i>
//                             <div class="note">Chi Tiết</div>
//                         </div>
//                        </div>
//                        <div class="hang">
//                         <div class="mua"> Mua </div>
//                         <div><i class="nav-cart fa-solid fa-cart-shopping" style="margin-left: 7px;"></i></div>
//                        </div>
                
//             </div>`
// }
// function renderuser(){
//   let html=
//   peruser.map(sp => {
//    return`
//    <div class="product-item" >
//                     <div class="anh1">
//                         <img src="${sp.HINH_ANH}" alt="">
//                     </div>
//                     <h4>${sp.TEN_SP}</h4>
//                     <div class="price">
//                         <span class="price-new">${sp.GIA_BAN}</span>
//                         <span class="price-old">8.990.000đ </span>
//                         <small>-25%</small>
//                        </div>
//                        <div class="tuongtac">
                        
//                         <div class="sao"><i class="fa-solid fa-star"></i> 5.0</div> 
//                         <div class="chitiet"> <i class="fa-regular fa-square-plus"  ></i>
//                             <div class="note">Chi Tiết</div>
//                         </div>
//                        </div>
//                        <div class="hang">
//                         <div class="mua"> Mua </div>
//                         <div><i class="nav-cart fa-solid fa-cart-shopping" style="margin-left: 7px;"></i></div>
//                        </div>
                
//             </div>`
//   }).join('');
//   document.getElementById("products").innerHTML=html;
// }
// let user=[];
// let tranghientai=1;
// let sosp=5;
// let tonsotrang=0
// let peruser=[];
// async function getuser(){
//   const productdiv=document.getElementById('products')
//   try{
//     const response = await fetch("data.json");
//     const allData = await response.json();
//     const sanphamdata= allData.find(item => item.name==='san_pham');
//     user=sanphamdata.data;
//     if(user){
//       peruser=user.slice(
//         (tranghientai-1)*sosp, (tranghientai-1)*sosp+sosp
//       )
      
     
//     }

//     renderpaga();
//     renderuser();
//   }
//   catch(error){
//     console.log("loi roi",error);
//   }
// }
// function renderpaga(){
//   tonsotrang=Math.ceil(user.length/sosp);
//   let html='';
//   for(let i=1;i<=tonsotrang;i++){
//     html+=`<li onclick="handle(${i})">${i}</li>`;
//   }
//   document.getElementById("phantrang").innerHTML = html;
// }

// function handle(num){
// tranghientai=num;
// peruser=user.slice(
//   (tranghientai-1)*sosp, (tranghientai-1)*sosp+sosp
// );
// renderuser();
// }



