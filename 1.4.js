// // mở file json để add dữ liệu vô local
// fetch('./data.json')
//   .then(res => res.json())
//   .then(data =>{
//     localStorage.setItem('du_lieu', JSON.stringify(data));
//   });
// localStorage.removeItem('du_lieu'); 


// lấy dữ liệu từ  local và đổi thành object
function lay_du_lieu() {
  const db = JSON.parse(localStorage.getItem('du_lieu'));
  // kiểm tra xem lấy được chưa
  if (db) {
    console.log('Đã lấy được dữ liệu');
    return db;
  }
  else console.log('Không lấy được dữ liệu');
}
function lay_bang_san_pham(db){
  const tableSp = db.find(table => table.name == 'san_pham');
  return tableSp;
}
function cap_nhap_localStorage(db) {
  localStorage.setItem('du_lieu', JSON.stringify(db));
  console.log('Đã cập nhập dữ liệu vào localStorage');
}

// tạo link css
const link = document.createElement('link');
link.href = './1.4.css';
link.rel = 'stylesheet';
// hàm
function hamChinh() {
  const db = lay_du_lieu();
  const rowsSp = lay_bang_san_pham(db).data;
  // tạo div nối với nội thẻ div có id = noi_dung trong html
  const div = document.querySelector('#noi_dung');
  div.innerHTML = '';
  div.id = 'div';
  menu(div, rowsSp);
  content(div, rowsSp);
}
// hàm in ra các menu
function menu(div, rowsSp) {
  // làm phần nút thêm sản phẩm, logo, tìm kiếm,
  const div1 = document.createElement('div');
  div1.id = 'div1';
  div.appendChild(div1);
  // logo
  const logo = document.createElement('img');
  logo.src = "./img/sgu.png";
  logo.alt = "Logo";
  logo.id = 'logo';
  div1.appendChild(logo);
  // tạo hộp tìm kiếm theo loại
  const theo_loai = document.createElement('select');
  theo_loai.id = 'tim_theo_loai';
  div1.appendChild(theo_loai);
  const db = lay_du_lieu();
  const tableMh = db.find(db => db.name === "mat_hang");
  const rowsMh = tableMh.data;
  const tat_ca = document.createElement('option');
  tat_ca.textContent = 'Tất cả';
  tat_ca.value = '';
  theo_loai.appendChild(tat_ca);
  rowsMh.forEach(row => {
    const option =  document.createElement('option');
    option.textContent = row.TEN_MAT_HANG;
    option.value = row.MA_MAT_HANG;
    theo_loai.appendChild(option);
  });
  // xử lí tim_theo_loai
  theo_loai.addEventListener('change', () => {
    const div2 = document.querySelector('#div2');
    div2.remove();
    if(theo_loai.value === ''){
      const db1 = lay_du_lieu();
      const rowsSp1 = lay_bang_san_pham(db1).data;
      console.log(rowsSp1);
      const divTong = document.querySelector('#div');
      content(divTong, rowsSp1);
      rowsSp = rowsSp1; // gán lại cho rowsSp để kh dùng sort cho đúng
    }
    else{
      let db1 = lay_du_lieu();  // đổi thành let để có thể gán lại bằng filter ở dưới
      let rowsSp1 = lay_bang_san_pham(db1).data;
      rowsSp1 = rowsSp1.filter(row => row.MA_MAT_HANG === theo_loai.value);
      const divTong = document.querySelector('#div');
      content(divTong, rowsSp1);
      rowsSp = rowsSp1;
    }
  });
  // box tìm kiếm
  const searchBox = document.createElement('input');
  searchBox.type = 'text';
  searchBox.id = 'searchBox';
  div1.appendChild(searchBox);
  searchBox.placeholder = "Tìm kiếm sản phẩm ...";
  const kinh_lup = document.createElement('button');
  kinh_lup.id = 'kinh_lup';
  kinh_lup.textContent = '🔍';
  div1.appendChild(kinh_lup);
  kinh_lup.addEventListener('click', () => {
    // gọi hàm tìm kiếm sản phẩm
    let db1 = lay_du_lieu();
    let rowsSp1 = lay_bang_san_pham(db1).data;
    const tu_khoa = document.querySelector('#searchBox').value.trim().toLowerCase();  // xóa khoảng trắng bằng trim và chuyển thành chữ thường
    rowsSp1 = rowsSp1.filter(row => row.TEN_SP.toLowerCase().includes(tu_khoa) || row.MA_SAN_PHAM.toLowerCase().includes(tu_khoa)); // Có thể tìm theo mã hoặc tên sản phẩm
    const div2 = document.querySelector('#div2');
    div2.remove();
    const divTong = document.querySelector('#div');  
    content(divTong, rowsSp1);
    rowsSp = rowsSp1; // gán lại cho rowsSp để kh dùng sort cho đúng
  });
  // thêm sản phẩm
  const themSp = document.createElement('button');
  // themSp.type = 'button';
  themSp.id = 'them_sp';
  div1.appendChild(themSp);
  themSp.textContent = 'Thêm';
  themSp.onclick = function () {
    console.log('Nhấn nút thêm sản phẩm');
    if(confirm('Bạn muốn thêm sản phẩm')){
      themSanPham();
    }
  }
  // sắp xếp tăng dần hoặc giảm dần
  const tang_giam = document.createElement('button');
  // tang_giam.type = 'button';
  tang_giam.id = 'tang_giam';
  div1.appendChild(tang_giam);
  tang_giam.textContent = 'Giảm';
  tang_giam.onclick = function () {
    console.log('Nhấn nút sắp xếp tăng/giảm');
    const db1 = lay_du_lieu();
    let rowsSp1 = lay_bang_san_pham(db1).data;
    rowsSp1 = sort(rowsSp1, tang_giam.textContent);
    tang_giam.textContent = doi_chieu(tang_giam.textContent);
    const div2 = document.querySelector('#div2');
    div2.remove();  /// xóa table cũ 
    // bắt div tổng
    const divTong = document.querySelector('#div');
    content(divTong, rowsSp1); // truyền vô divTong để tạo bảng mới
  };
}
// hàm đổi chữ tăng/giảm
function doi_chieu(chieu) {
  if (chieu === "Giảm") {
    chieu = "Tăng";
  }
  else {
    chieu = "Giảm";
  }
  return chieu;
}
// sort bảng theo mã sản phẩm
function sort(rowsSp, chieu) {
  console.log('sort theo mã sản phẩm');
  if (chieu === "Tăng") {
    rowsSp.sort((a, b) => {
      return parseInt(a.MA_SAN_PHAM) - parseInt(b.MA_SAN_PHAM);
    });
  }
  else {
    rowsSp.sort((a, b) => {
      return parseInt(b.MA_SAN_PHAM) - parseInt(a.MA_SAN_PHAM);
    });
  }
  return rowsSp;
}
// hàm thêm sản phẩm
function themSanPham() {
  const d = document.querySelector('#div2');
  d.innerHTML = '';
  d.classList = 'khungThemSp';
  // tạo khung thoát
  const thoat = document.createElement('button');
  thoat.textContent = 'X';
  thoat.classList.add('nut_thoat');
  d.appendChild(thoat);
  thoat.addEventListener('click', () => {
    if(confirm('Bạn muốn thoát khoải form thêm sản phẩm')){
      d.remove();
      const db = lay_du_lieu();
      const rowsSp = lay_bang_san_pham(db).data;
      const divTong = document.querySelector('#div');
      content(divTong, rowsSp);
    }
  });
  //tạo tiêu đề
  const tieu_de = document.createElement('div');
  tieu_de.textContent = "Hãy nhập đầy đủ các thông tin sau";
  tieu_de.classList.add('tieu_de_nhapSp');
  d.appendChild(tieu_de);
  // tạo các khung nhập
  // mã sản phẩm
  const maSp = document.createElement('input');
  maSp.placeholder = 'Mã sản phẩm...';
  maSp.type = 'text';
  maSp.id = 'maSp';
  d.appendChild(maSp);
  // tên sản phẩm
  const tenSp = document.createElement('input');
  tenSp.type = 'text';
  tenSp.placeholder = 'Tên sản phẩm...';
  tenSp.style.marginLeft = '5%';
  tenSp.id = 'tenSp';
  d.appendChild(tenSp);
  // số lượng
  const soLuong = document.createElement('input');
  soLuong.type = 'number';
  soLuong.min = '1'; // tối thiểu là 1
  soLuong.placeholder = 'Số lượng sản phẩm...';
  soLuong.id = 'soLuong';
  d.appendChild(soLuong);
  // giá bán
  const giaBan = document.createElement('input');
  giaBan.type = 'number';
  giaBan.placeholder = 'Giá bạn của sản phẩm...';
  giaBan.style.marginLeft = '5%';
  giaBan.id = 'giaBan';
  d.appendChild(giaBan);
  // thuộc mã mặt hàng
  const matHang = document.createElement('select');
  matHang.classList = 'selectMatHang';
  matHang.id = 'matHang';
  matHang.size = '5'; // giúp tạo cuộn và hiện ra option thôi
  d.appendChild(matHang);
  const data = lay_du_lieu();
  const tableMh = data.find(data => data.name === "mat_hang");
  const rowsMh = tableMh.data;
  for (let i = 0; i < rowsMh.length; i++) {
    const op = document.createElement('option');
    op.textContent = rowsMh[i].TEN_MAT_HANG;
    op.value = rowsMh[i].MA_MAT_HANG;
    matHang.appendChild(op);
  }
  // tạo text nhập thông tin sản phẩm
  const thongTinSanPham = document.createElement('textarea'); // dùng thẻ này có thể nhập nhiều hơn thay vì dùng input
  thongTinSanPham.classList.add('special');
  thongTinSanPham.style.marginLeft = '5%';
  thongTinSanPham.placeholder = 'Thông tin sản phẩm';
  thongTinSanPham.id = 'thongTinSanPham';
  d.appendChild(thongTinSanPham);
  // tạo ô thêm ảnh
  const anh = document.createElement('input');
  anh.type = 'file';
  anh.accept = 'image/*'; // chỉ chấp nhận file ảnh
  anh.type.marginLeft = '5%';
  let truyenAnh = ''; //chuyển sang check để nhập thông tin
  // tạo ô xem ảnh mới up lên
  const xem_anh = document.createElement('img');
  xem_anh.classList.add('xem_anh');
  xem_anh.style.maxWidth = '100px'; 
  xem_anh.style.maxHeight = '100px'; 
  xem_anh.style.border = '1px solid #ccc';
  xem_anh.style.marginLeft = '5%';
  xem_anh.alt = 'Chưa có ảnh được tải lên';
  const divBaoAnh = document.createElement('div');
  divBaoAnh.id = 'divBaoAnh';
  divBaoAnh.appendChild(anh);
  divBaoAnh.appendChild(xem_anh);
  d.appendChild(divBaoAnh);
  anh.addEventListener( 'change', () => {
    const file = anh.files[0];
    if (file) {
    // Kiểm tra kích thước file 
    if (file.size > 5 * 1024 * 1024) { // Lớn hơn 5MB
      alert("File quá lớn! Vui lòng chọn ảnh nhỏ hơn.");
      anh.value = ''; 
      truyenAnh = ''; // Reset Base64
      xem_anh.src = ''; // Xóa ảnh xem trước
      return;
    }
    const reader = new FileReader();
    reader.onload = function (e) {
      const truyen_anh = e.target.result;
      // gán cho biến truyenAnh để thêm vô thong_tin lúc check
      truyenAnh = truyen_anh;
      xem_anh.src = truyenAnh; // GÁN SRC ĐỂ XEM TRƯỚC
      alert("Hình ảnh đã được tải lên thành công!");
  };
  reader.readAsDataURL(file);
  } else {
    // Nếu người dùng hủy chọn file
    xem_anh.src = ''; 
    truyenAnh = '';
    alert("Vui lòng chọn một file hình ảnh.");
  } 
  });
  // div bao reset và xác nhận
  const bao = document.createElement('div');
  d.appendChild(bao);
  bao.classList.add('divBao');
  // nút button xác nhận
  const xac_nhan = document.createElement('button');
  xac_nhan.textContent = "Xác nhận";
  xac_nhan.classList.add('xac_nhan');
  bao.appendChild(xac_nhan);
  // xử lí nút
  xac_nhan.addEventListener('click', () => {
    if ( check(truyenAnh) === 0) return;
    d.innerHTML = '';
    const rowsSp = lay_bang_san_pham(lay_du_lieu()).data;
    const div2 = document.querySelector('#div2');
    div2.remove();
    const divTong = document.querySelector('#div');
    content(divTong, rowsSp);
  })
  // nút button reset
  const reset = document.createElement('button');
  reset.textContent = "Reset";
  reset.classList.add('reset');
  bao.appendChild(reset);
  reset.addEventListener('click', () => {
    themSanPham();
  })
}
// hàm kiểm tra nội dung nhập vào
function check(truyenAnh) {
  // lấy dữ liệu
  const db = lay_du_lieu();
  const rowsSp = lay_bang_san_pham(db).data;
  // kiểm tra xem đã có nội dùng chưa
  const ma = document.querySelector('#maSp');
  if (ma.value.trim() === '') {  // trim là xóa khoảng trắng thừa
    alert('Bạn chưa nhập mã sản phẩm');
    ma.focus();
    return 0;
  }
  // kiểm tra xem mã sản phẩm có bị trùng không
  for (let i = 0; i < rowsSp.length; i++) {
    if (ma.value.trim() === rowsSp[i].MA_SAN_PHAM) {
      alert('Mã sản phẩm này đã tồn tại, hãy nhập mã khác cho sản phẩm mới');
      ma.focus();
      return 0;
    }
  }
  // kiểm tra tên sản phẩm
  const ten = document.querySelector('#tenSp');
  if (ten.value.trim() === '') {
    alert('Bạn chưa nhập tên sản phẩm');
    ten.focus();
    return 0;
  }
  // số lượng sản phẩm
  const so_luong = document.querySelector('#soLuong');
  if (so_luong.value.trim() === '') {
    alert('Bạn chưa nhập số lượng sản phẩm'); 
    so_luong.focus();
    return 0;
  }
  // kiểm tra giá bán
  const gia = document.querySelector('#giaBan');
  if (gia.value.trim() === '') {
    alert('Bạn chưa nhập giá bán sản phẩm');
    gia.focus();
    return 0;
  }
  // kiểm tra mặt hàng
  const mathang = document.querySelector('#matHang');
  if (mathang.value.trim() === '') {
    alert('Bạn chưa chọn mặt hàng sản phẩm');
    mathang.focus();
    return 0;
  }
  // kiểm tra thông tin sản phẩm
  const thongtin = document.querySelector('#thongTinSanPham');
  if (thongtin.value.trim() === '') {
    alert('Bạn chưa nhập thông tin sản phẩm');
    thongtin.focus();
    return 0;
  }
  // hàm kiểm tra ảnh
  if( truyenAnh === '' || truyenAnh == null){
    alert('Bạn chưa tải ảnh sản phẩm lên');
    return 0;
  }

  const thong_tin = {
    MA_SAN_PHAM: ma.value.trim(),
    SO_LUONG: so_luong.value.trim(),
    TEN_SP: ten.value.trim(),
    HINH_ANH: truyenAnh,
    THONG_TIN_SP: thongtin.value.trim(),
    GIA_BAN: gia.value.trim(),
    TINH_TRANG: "1",
    MA_MAT_HANG: mathang.value.trim(),
  }
  themSpVoDanhSach(thong_tin, rowsSp, db);
}
// hàm thêm sản phẩm vô list sản phẩm
function themSpVoDanhSach(thong_tin, rowsSp, db) {
  rowsSp.push(thong_tin);  // đẩy thêm một phần tử vô cuối mảng
  cap_nhap_localStorage(db);
  console.log('Đã thêm sản phẩm này vô danh sach: ' + JSON.stringify(thong_tin));  // in ra thông tin trong console để kiểm tra 
}

// hàm in ra content
function content(div, rowsSp){
  // tạo div2 để bao
  const div2 = document.createElement('div');
  div2.id = 'div2';
  div.appendChild(div2);
  // tạo table
  const table = document.createElement('table');
  div2.appendChild(table); // chồng thẻ table vô trong div trong html
  table.id = 'table';
  // tạo thẻ <thead> trong table
  const thead = document.createElement('thead');
  // tạo thẻ <tr> trong table
  const tr = document.createElement('tr');

  // tạo một array chứa các tiêu đề của bảng
  const tieu_de = ["Mã sản phẩm", "Tên sản phẩm", "Số lượng", "Giá", "Hiện", "Xóa/Sửa", "Thông tin"];
  // tạo mảng  độ rộng của các cột head trong table
  const do_rong_head = ['5%', '35%', '10%', '20%', '15%', '15%'];

  // duyệt qua các phần tử trong mảng tieu_de và dùng i là chỉ số để có thể gán độ rộng
  tieu_de.forEach((title, i,) => {  // i là chỉ số bắt đầu từ 0
    const th = document.createElement('th');  // tạo thẻ th
    th.classList = 'headTable';
    th.textContent = title;
    th.style.width = do_rong_head[i];
    tr.appendChild(th);
  })
  thead.appendChild(tr); // chồng thể tr trong thead
  table.appendChild(thead); // chồng thẻ thead bên trong table

  // lấy dữ liệu từng dòng để đưa vô table
  rowsSp.forEach(row => {
    const tr1 = document.createElement('tr');
    const stt = document.createElement('td'); // ô mã sản phẩm
    stt.classList.add('du_lieu');
    stt.textContent = row.MA_SAN_PHAM;
    const nameSp = document.createElement('td');   // ô name sp
    nameSp.textContent = row.TEN_SP;
    nameSp.classList.add('du_lieu');  //add class
    const soLuong = document.createElement('td'); // ô số lượng
    soLuong.classList.add('du_lieu');
    soLuong.textContent = row.SO_LUONG;
    const gia = document.createElement('td'); // ô giá bán
    gia.classList.add('du_lieu');
    gia.textContent = row.GIA_BAN + ' VND';
    const hien_an = document.createElement('td'); // ô hiện/ẩn
    hien_an.classList.add('du_lieu');
    // tạo hộp checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    if (row.TINH_TRANG == "1") {  // nếu nó bằng 1 thì tức là hiện nên đánh dấu tích
      checkbox.checked = true;
    }
    checkbox.addEventListener('change', () => {
      nut_hien_an(row.MA_SAN_PHAM);
    });


    const xoa_sua = document.createElement('td')  // ô sửa/xóa
    xoa_sua.classList.add('du_lieu');
    const xoa = document.createElement('button'); //nút xóa
    xoa.classList.add('xoa_sua');
    xoa.textContent = 'Xóa';
    const sua = document.createElement('button'); //nút sửa
    sua.classList.add('xoa_sua');
    sua.textContent = 'Sửa';
    sua.style.marginLeft = '5%';
    const thong_tin = document.createElement('td'); // ô thông tin sản phẩm
    thong_tin.classList.add('du_lieu');
    const nut_thong_tin = document.createElement('button');
    nut_thong_tin.textContent = 'ℹ️';
    thong_tin.appendChild(nut_thong_tin);
    tr1.appendChild(stt);
    tr1.appendChild(nameSp);
    tr1.appendChild(soLuong);
    tr1.appendChild(gia);
    tr1.appendChild(hien_an);
    hien_an.appendChild(checkbox);
    tr1.appendChild(xoa_sua);
    xoa_sua.appendChild(xoa);
    xoa_sua.appendChild(sua);
    tr1.appendChild(thong_tin);
    table.appendChild(tr1);
  });
}

// xử lí các nút bấm của table
function nut_hien_an(idSp){
  const db = lay_du_lieu();
  const rowsSp = lay_bang_san_pham(db).data;
  const row = rowsSp.find( row => row.MA_SAN_PHAM === idSp);
  if( row.TINH_TRANG === '1'){
    row.TINH_TRANG = '0';
  }
  else row.TINH_TRANG = '1';
  console.log('Nhấn nút hiện/ẩn sản phẩm có mã: ' + idSp);
  console.log('Hien/an: '+ row.TINH_TRANG);
  cap_nhap_localStorage(db);
  const div2 = document.querySelector('#div2');
  div2.remove();
  const divTong = document.querySelector('#div');
  content(divTong, rowsSp);
}

