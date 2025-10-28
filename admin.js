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
document.addEventListener("DOMContentLoaded", () => { //cho file html chạy hết trước r mới chạy js sau
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

// // mở file json để add dữ liệu vô local
fetch('./data.json')
  .then(res => res.json())
  .then(data =>{
    localStorage.setItem('du_lieu', JSON.stringify(data));
  });

// lấy dữ liệu từ local và đổi thành object
const db = JSON.parse(localStorage.getItem('du_lieu'));
console.log(db);
// kiểm tra xem lấy được chưa
if(db){
  console.log('Đã lấy được dữ liệu');
}
else console.log('Không lấy được dữ liệu');

// hàm
function ham(){
  // alert('Bạn muốn dùng các chức năng chỉnh sửa sản phẩm');
  const tableSp = db.find( table => table.name == 'san_pham');
  const rowsSp = tableSp.data;

  // tạo link css
  const link = document.createElement('link');
  link.href = './1.4.css';
  link.rel = 'stylesheet';
  // tạo div nối với nội thẻ div có id = noi_dung trong html
  const div = document.getElementById('noi_dung');
  div.innerHTML = '';
  div.id = 'tieu_de';

  // làm phần nút thêm sản phẩm
  const div1 = document.createElement('div');
  div1.id = 'them_sp';
  div1.textContent = 'Thêm sản phẩm';
  div.appendChild(div1);

  // tạo table
  const table = document.createElement('table');
  div.appendChild(table); // chồng thẻ table vô trong div trong html
  table.id = 'table';
  // tạo thẻ <thead> trong table
  const thead = document.createElement('thead');
  // tạo thẻ <tr> trong table
  const tr = document.createElement('tr');

  // tạo một array chứa các tiêu đề của bảng
  const tieu_de = ["Tên sản phẩm", "Hiện", "Xóa/Sửa"];
  // tạo mảng  độ rộng của các cột head trong table
  const do_rong_head = ['70%', '15%', '15%'];

  // duyệt qua các phần tử trong mảng tieu_de và dùng i là chỉ số để có thể gán độ rộng
  tieu_de.forEach( (title, i, ) => {  // i là chỉ số bắt đầu từ 0
    const th = document.createElement('th');  // tạo thẻ th
    th.classList = 'headTable';
    th.textContent = title;
    th.style.width = do_rong_head[i];
    tr.appendChild(th);
  })
  thead.appendChild(tr); // chồng thể tr trong thead
  table.appendChild(thead); // chồng thẻ thead bên trong table

  // lấy dữ liệu từng dòng để đưa vô table
  rowsSp.forEach( row => {
    const tr1 = document.createElement('tr');
    const nameSp = document.createElement('td');   // ô name sp
    nameSp.textContent = row.TEN_SP;
    nameSp.classList.add('du_lieu');  //add class
    const hien_an = document.createElement('td'); // ô hiện/ẩn
    hien_an.classList.add('du_lieu');

    const xoa_sua = document.createElement('td')  // ô sửa/xóa
    xoa_sua.classList.add('du_lieu');
    const xoa = document.createElement('button'); //nút xóa
    xoa.classList.add('xoa_sua');
    xoa.textContent = 'Xóa';
    const sua = document.createElement('button'); //nút sửa
    sua.classList.add('xoa_sua');
    sua.textContent = 'Sửa';
    sua.style.marginLeft = '5%';
// tạo hộp checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    if(row.TINH_TRANG == "1"){  // nếu nó bằng 1 thì tức là hiện nên đánh dấu tích
      checkbox.checked = true;
    }
    tr1.appendChild(nameSp);
    tr1.appendChild(hien_an);
    hien_an.appendChild(checkbox);
    tr1.appendChild(xoa_sua);
    xoa_sua.appendChild(xoa);
    xoa_sua.appendChild(sua);
    table.appendChild(tr1);
  });
}