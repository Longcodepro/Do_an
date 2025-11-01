
async function getData() {
  try {
    
 
    const sp=document.querySelector('.menu-conten');
    const response = await fetch("data.json");
    const allData = await response.json();
    const sanPham= allData.find(item => item.name === "san_pham");
    const mangsp=sanPham.data;
    // const loc=mangsp.filter((pro)=>pro.MA_MAT_HANG===sanpham);
    // console.log("loc",loc);
    let hienthi=mangsp
    if(sanpham !==""){
      hienthi=mangsp.filter(pro=>pro.MA_MAT_HANG===sanpham);
    }
    
      sp.innerHTML=hienthi.map(the=>{
        return `
         <div class="product" id="products">
                    <div class="anh1">
                        <img src="${the.HINH_ANH}" alt="">
                    </div>
                    <h4>${the.TEN_SP}</h4>
                    <div class="price">
                        <span class="price-new">${the.GIA_BAN}</span>
                        <span class="price-old">8.990.000đ </span>
                        <small>-25%</small>
                       </div>
                       <div class="tuongtac">
                        <div class="sao"><i class="fa-solid fa-star"></i> 5.0</div> 
                        <div class="chitiet"> <i class="fa-regular fa-square-plus"  ></i>
                            <div class="note">Chi Tiết</div>
                        </div>
                       </div>
                       <div class="hang">
                        <div class="mua"> Mua </div>
                        <div><i class="nav-cart fa-solid fa-cart-shopping" style="margin-left: 7px;"></i></div>
                       </div>
                </div>`
      }).join('')
      return;
    
    
    
  } catch (error) {
    console.error("Lỗi khi đọc dữ liệu:", error);
  }
}
getData();
let $$=document.querySelectorAll.bind(document);
let sanpham="";
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
      getData();
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

function timkiem(){
  try{
    const response = await fetch("data.json");
  }
  catch(error){
    console.log("loi roi",error);
  }
}