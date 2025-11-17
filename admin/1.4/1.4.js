// HÀM FORMAT TIỀN TỆ: Tạo hàm riêng để định dạng số sang chuỗi tiền tệ
function formatCurrency(number) {
    if (isNaN(number)) return "0 VND"; // Trả về giá trị mặc định nếu không phải số
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0, // Không lấy số thập phân
    });
    // Trả về chuỗi có định dạng (ví dụ: "7.650.000 ₫")
    return formatter.format(number); 
}

// các hàm lấy  và và cập nhập table 
// đẩy lên local
// truyền vô tên key và object chứa data
// setlocalStorage("product", tatCaSanPham);
function setlocalStorage(key, value){
    localStorage.setItem(key, JSON.stringify(value));
}

// truyền vô key để lấy data
function getlocalStorage(key){
    const data = localStorage.getItem(key);
    
    // Nếu data không tồn tại (null) hoặc là chuỗi rỗng (""), trả về mảng rỗng
    if (!data || data === 'null' || data === '') {
        return [];
    }
    
    try {
        // Cố gắng parse JSON
        return JSON.parse(data);
    } catch (e) {
        // Nếu parse thất bại (JSON không hợp lệ), in lỗi ra console và trả về mảng rỗng
        console.error("Lỗi parse JSON cho key:", key, e);
        return [];
    }
}

let rowsSp = getlocalStorage('product');  // tạo biến bảng sản phẩm cục bộ

// quản lí sản phẩm
function quanLiSanPham() {
  // tạo div nối với nội thẻ div có id = noi_dung trong html admin
  const div = document.querySelector('#noi_dung');
  div.innerHTML = '';
  menu(div);
  content(div);
}

// hàm in ra các menu chứa các chức năng
function menu(div) {
  // làm phần nút thêm sản phẩm, logo, tìm kiếm,
  const div1 = document.createElement('div');
  div1.id = 'div1';
  div.appendChild(div1);
  // logo
  const logo = document.createElement('img');
  logo.src = "../img/sgu.jpg";
  logo.alt = "Logo";
  logo.id = 'logo';
  div1.appendChild(logo);
  // tạo hộp tìm kiếm theo loại
  const theo_loai = document.createElement('select');
  theo_loai.id = 'tim_theo_loai';
  div1.appendChild(theo_loai);
  const rowsMh = getlocalStorage('matHang');
  const tat_ca = document.createElement('option');
  tat_ca.textContent = 'Tất cả';
  tat_ca.value = '';
  theo_loai.appendChild(tat_ca);
  rowsMh.forEach(row => {
    if(row.hienThi){
      const option =  document.createElement('option');
      option.textContent = row.tenMatHang
      option.value = row.maMatHang;
      theo_loai.appendChild(option);
    }
  });
  // xử lí tim_theo_loai
  theo_loai.addEventListener('change', () => {
    const div2 = document.querySelector('#div2');
    div2.remove();
    if(theo_loai.value === ''){
      const divTong = document.querySelector('#noi_dung');
      rowsSp = getlocalStorage("product");  // gán lại toàn bộ sản phẩm vô bảng sản phẩm
      content(divTong);
    }
    else{
      let rowsSp1 = getlocalStorage("product");
      rowsSp1 = rowsSp1.filter(row => row.maMatHang === theo_loai.value);
      const divTong = document.querySelector('#noi_dung'); 
      rowsSp = rowsSp1; // cập lại danh sách sản phẩm hiện tại
      content(divTong);
    }
  });
  // box tìm kiếm theo mã sản phẩm
  const searchBox = document.createElement('input');
  searchBox.type = 'text';
  searchBox.id = 'searchBox';
  searchBox.classList.add('searchBox');
  div1.appendChild(searchBox);
  searchBox.placeholder = "Tìm kiếm sản phẩm theo mã ...";
  const kinh_lup = document.createElement('button');
  kinh_lup.id = 'kinh_lup';
  kinh_lup.textContent = '🔍';
  div1.appendChild(kinh_lup);
  kinh_lup.addEventListener('click', () => {
    // gọi hàm tìm kiếm sản phẩm theo mã sản phẩm
    let rowsSp1 = getlocalStorage("product");
    const tu_khoa = document.querySelector('#searchBox').value.trim().toLowerCase();  // xóa khoảng trắng bằng trim và chuyển thành chữ thường
    
    rowsSp1 = rowsSp1.filter(row => String(row.maSP).includes(tu_khoa)); // Sử dụng String(row.maSP)
    
    const div2 = document.querySelector('#div2');
    div2.remove();
    const divTong = document.querySelector('#noi_dung');  
    rowsSp = rowsSp1;   // cập lại danh sách sản phẩm hiện tại
    content(divTong);
  });

  // box tìm kiếm theo tên sản phẩm
  const searchBoxName = document.createElement('input');
  searchBox.type = 'text';
  searchBoxName.id = 'searchBoxName';
  searchBoxName.classList.add('searchBox');
  div1.appendChild(searchBoxName);
  searchBoxName.placeholder = "Tìm kiếm sản phẩm theo tên ...";
  const kinh_lup1 = document.createElement('button');
  kinh_lup1.id = 'kinh_lup';
  kinh_lup1.textContent = '🔍';
  div1.appendChild(kinh_lup1);
  kinh_lup1.addEventListener('click', () => {
    // gọi hàm tìm kiếm sản phẩm theo tên sản phẩm
    let rowsSp1 = getlocalStorage("product");
    const tu_khoa1 = document.querySelector('#searchBoxName').value.trim().toLowerCase();  // xóa khoảng trắng bằng trim và chuyển thành chữ thường
    rowsSp1 = rowsSp1.filter(row => row.tenSP.toLowerCase().includes(tu_khoa1)); // Có thể tìm theo mã hoặc tên sản phẩm
    const div2 = document.querySelector('#div2');
    div2.remove();
    const divTong = document.querySelector('#noi_dung');  
    rowsSp = rowsSp1;
    content(divTong);
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
  tang_giam.id = 'tang_giam';
  div1.appendChild(tang_giam);
  tang_giam.textContent = 'Giảm';
  tang_giam.onclick = function () {
    console.log('Nhấn nút sắp xếp tăng/giảm');
    sort(tang_giam.textContent);
    tang_giam.textContent = doi_chieu(tang_giam.textContent);
    const div2 = document.querySelector('#div2');
    div2.remove();  /// xóa table cũ 
    // bắt div tổng
    const divTong = document.querySelector('#noi_dung');
    content(divTong); // truyền vô divTong để tạo bảng mới
  };
}

// hàm đổi chữ tăng/giảm
function doi_chieu(chieu) {
    return chieu == "Tăng" ? "Giảm" : "Tăng";
}
// sort bảng theo mã sản phẩm
function sort(chieu) {
  console.log('sort theo mã sản phẩm');
  if (chieu === "Tăng") {
    rowsSp.sort((a, b) => {
      return parseInt(a.maSP) - parseInt(b.maSP);
    });
  }
  else {
    rowsSp.sort((a, b) => {
      return parseInt(b.maSP) - parseInt(a.maSP);
    });
  }
}

// hàm thêm sản phẩm
function themSanPham() {
  const d = document.querySelector('#div2');
  d.innerHTML = '';
  d.classList = 'khungThemSp';
  // tạo ô thoát
  const thoat = document.createElement('button');
  thoat.textContent = 'X';
  thoat.classList.add('nut_thoat');
  d.appendChild(thoat);
  thoat.addEventListener('click', () => {
    if(confirm('Bạn muốn thoát khoải form thêm sản phẩm')){
      d.remove();
      const divTong = document.querySelector('#noi_dung');
      content(divTong);
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
  maSp.type = 'number';
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
  matHang.size = 2;// giúp tạo cuộn và hiện ra option thôi
  d.appendChild(matHang);
  const rowsMh = getlocalStorage("matHang");
  for (let i = 0; i < rowsMh.length; i++) {
    const op = document.createElement('option');
    op.textContent = rowsMh[i].tenMatHang;
    op.value = rowsMh[i].maMatHang;
    matHang.appendChild(op);
  }

  // text nhập phần trăm giảm
  const giamGia = document.createElement('input');
  d.appendChild(giamGia);
  giamGia.classList.add('phanTramGiam');
  giamGia.type = 'number';
  giamGia.min = '0';
  giamGia.max = '100';
  giamGia.placeholder = 'Nhập phần trăm giảm giá (%)...';
  giamGia.id = 'giamGia';

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
    // 1. Kiểm tra và lấy dữ liệu hợp lệ
    const thong_tin_moi = check(truyenAnh, "Thêm", null);
    
    // 2. Nếu kiểm tra thất bại (check trả về 0), thì thoát
    if (thong_tin_moi === 0) return; 
    
    // 3. Nếu dữ liệu hợp lệ, gọi hàm thêm sản phẩm
    themSpVoDanhSach(thong_tin_moi, getlocalStorage("product")); // Thêm vào LocalStorage
    
    // 4. Xóa form và cập nhật bảng
    d.innerHTML = '';
    rowsSp = getlocalStorage("product"); // Cập nhật lại biến rowsSp cục bộ
    const div2 = document.querySelector('#div2');   //bắt div2 và xóa
    div2.remove();
    const divTong = document.querySelector('#noi_dung');
    content(divTong);   //tạo một table mới
  })

  // nút button reset
  const reset = document.createElement('button');
  reset.textContent = "Reset";
  reset.classList.add('reset');
  bao.appendChild(reset);
  reset.addEventListener('click', () => {
    themSanPham();  // gọi lại
  })
}

// hàm kiểm tra nội dung nhập vào của hai chức năng thêm và sửa
function check(truyenAnh, text, ma_cu) {  
  // lấy dữ liệu
  const rowsSp1 = getlocalStorage('product');
  // lấy giá trị chuỗi từ input
  const ma = document.querySelector('#maSp');
  const ten = document.querySelector('#tenSp');
  const so_luong = document.querySelector('#soLuong');
  const gia = document.querySelector('#giaBan');
  const mathang = document.querySelector('#matHang');
  const giamGia = document.querySelector('#giamGia');

  // kiểm tra xem đã có nội dùng chưa
  if (ma.value.trim() === '') {  // trim là xóa khoảng trắng thừa
    alert('Bạn chưa nhập mã sản phẩm');
    ma.focus();
    return 0;
  }
  // kiểm tra xem mã sản phẩm có bị trùng không
  for (let i = 0; i < rowsSp1.length; i++) {
    if (ma.value.trim() === String(rowsSp1[i].maSP)) {
      if( ma.value.trim() === String(rowsSp1[i].maSP)){
        if( text === "Thêm"){
          alert('Mã sản phẩm này đã tồn tại, hãy nhập mã khác cho sản phẩm mới');
          ma.focus();
          return 0;
        }
        if( text === "Sửa" && String(ma_cu) !== ma.value.trim()){
          alert('Mã sản phẩm này đã tồn tại, hãy nhập mã khác cho sản phẩm mới');
          ma.focus();
          return 0;
        }
      }
    }
  }

  // kiểm tra tên sản phẩm
  if (ten.value.trim() === '') {
    alert('Bạn chưa nhập tên sản phẩm');
    ten.focus();
    return 0;
  }

  // số lượng sản phẩm
  if (so_luong.value.trim() === '') {
    alert('Bạn chưa nhập số lượng sản phẩm'); 
    so_luong.focus();
    return 0;
  }

  // kiểm tra giá bán
  if (gia.value.trim() === '') {
    alert('Bạn chưa nhập giá bán sản phẩm');
    gia.focus();
    return 0;
  }

  // kiểm tra mặt hàng
  if (mathang.value.trim() === '') {
    alert('Bạn chưa chọn mặt hàng sản phẩm');
    mathang.focus();
    return 0;
  }

  // kiểm tra thông tin sản phẩm
  if (giamGia.value.trim() === '') {
    alert('Bạn chưa nhập phan tram giam gia');
    giamGia.focus();
    return 0;
  }

  // hàm kiểm tra ảnh
  if( truyenAnh === '' || truyenAnh == null){
    alert('Bạn chưa tải ảnh sản phẩm lên');
    return 0;
  }

  // === CHUYỂN ĐỔI VÀ ĐỊNH DẠNG DỮ LIỆU ĐỂ ĐẢM BẢO KIỂU DỮ LIỆU ===
  // Giá trị số nguyên (Number)
  const giaBanNumber = Number(gia.value); 
  const giamGiaNumber = Number(giamGia.value); 
  const soLuongNumber = Number(so_luong.value);
  const maSpNumber = Number(ma.value);
  
  // Tính giá hiện tại (số)
  const giaHienTaiNumber = giaBanNumber * (100 - giamGiaNumber) / 100;

  // Tạo đối tượng thông tin sản phẩm
  const thong_tin = {
    maSP: maSpNumber, 
    soLuong: soLuongNumber,
    gsgg: giaBanNumber, // Giá gốc (số)
    gsht: giaHienTaiNumber, // Giá hiện tại (số)

    nguongCanhBao: 4, // Mặc định

    tenSP: ten.value.trim(),
    hinhAnh: truyenAnh,
    maMatHang: mathang.value, // Giữ là chuỗi theo mẫu data
    hienAn: "1",

    giaGoc: formatCurrency(giaBanNumber), // "8.500.000 ₫"
    giaHienTai: formatCurrency(giaHienTaiNumber), // "7.650.000 ₫"
    
    giamGiaFormatted: giamGiaNumber // Sửa lỗi: dùng giamGiaNumber
  }
  
  thong_tin.giamGia = thong_tin.giamGiaFormatted; 
  delete thong_tin.giamGiaFormatted;
  
  return thong_tin; 
}

// hàm thêm sản phẩm vô list sản phẩm
function themSpVoDanhSach(thong_tin, rowsSp1) {
  rowsSp1.push(thong_tin);  // đẩy thêm một phần tử vô cuối mảng 
  setlocalStorage("product", rowsSp1);
  console.log('Đã thêm sản phẩm này vô danh sach: ' + JSON.stringify(thong_tin));  // in ra thông tin trong console để kiểm tra 
}

// hàm in ra content
function content(div){
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
  const tieu_de = ["Mã sản phẩm", "Tên sản phẩm", "Số lượng", "Giá", "Hiện", "Xóa/Sửa"];
  // tạo mảng  độ rộng của các cột head trong table
  const do_rong_head = ['5%', '15%', '15%', '20%', '15%'];

  // duyệt qua các phần tử trong mảng tieu_de và dùng i là chỉ số để có thể gán độ rộng
  tieu_de.forEach((title, i,) => {  // i là chỉ số bắt đầu từ 0
    const th = document.createElement('th');  // tạo thẻ th
    th.classList = 'headTable';
    th.textContent = title;
    th.style.width = do_rong_head[i];
    tr.appendChild(th);
  })
  thead.appendChild(tr); // chồng thể tr trong thead
  table.appendChild(thead); // chồng thẻ thead bên trong table

  // lay table mat hang
  const tableMh = getlocalStorage("matHang");
  // lấy dữ liệu từng dòng để đưa vô table
  rowsSp.forEach(row => {
    const rowMh = tableMh.find( row1 => row1.maMatHang == row.maMatHang);
    if(rowMh && rowMh.hienThi){ // Thêm kiểm tra rowMh tồn tại
      const tr1 = document.createElement('tr');
      const stt = document.createElement('td'); // ô mã sản phẩm
      stt.classList.add('du_lieu');
      stt.textContent = row.maSP;
      const nameSp = document.createElement('td');   // ô name sp
      nameSp.textContent = row.tenSP;
      nameSp.classList.add('du_lieu');  //add class
      const soLuong = document.createElement('td'); // ô số lượng
      soLuong.classList.add('du_lieu');
      soLuong.textContent = row.soLuong;
      const gia = document.createElement('td'); // ô giá bán
      gia.classList.add('du_lieu');
      gia.textContent = row.giaHienTai.includes('₫') ? row.giaHienTai : row.giaHienTai + ' VND'; 
      const hien_an = document.createElement('td'); // ô hiện/ẩn
      hien_an.classList.add('du_lieu');
      // tạo hộp checkbox
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      if (row.hienAn == "1") {  // nếu nó bằng 1 thì tức là hiện nên đánh dấu tích
        checkbox.checked = true;
      }
      checkbox.addEventListener('change', () => {
        nut_hien_an(row.maSP);
      });


      const xoa_sua = document.createElement('td')  // ô sửa/xóa
      xoa_sua.classList.add('du_lieu');
      const xoa = document.createElement('button'); //nút xóa
      xoa.classList.add('xoa_sua');
      xoa.textContent = 'Xóa';
      xoa.addEventListener('click', () =>{
      if( confirm("Bạn muốn xóa sản phẩm")){
        xoaSp(row.maSP);
      }
      });
      const sua = document.createElement('button'); //nút sửa
      sua.classList.add('xoa_sua');
      sua.textContent = 'Sửa';
      sua.style.marginLeft = '5%';
      sua.addEventListener('click', () => {
        suaSp(row.maSP);
      });
      tr1.appendChild(stt);
      tr1.appendChild(nameSp);
      tr1.appendChild(soLuong);
      tr1.appendChild(gia);
      tr1.appendChild(hien_an);
      hien_an.appendChild(checkbox);
      tr1.appendChild(xoa_sua);
      xoa_sua.appendChild(xoa);
      xoa_sua.appendChild(sua);
      table.appendChild(tr1);
    }
    });
}

// xử lí các nút bấm của table
// hiện thị
function nut_hien_an(idSp){
  const row = rowsSp.find( row => row.maSP === idSp);
  row.hienAn = row.hienAn == 1 ? 0 : 1;
  console.log('Nhấn nút hiện/ẩn sản phẩm có mã: ' + idSp);
  console.log('Hien/an: '+ row.hienAn);

  const rowsSp1 = getlocalStorage("product");   // cập nhập
  const row1 = rowsSp1.find(row => row.maSP === idSp);
  row1.hienAn = row.hienAn;
  setlocalStorage("product", rowsSp1);
  const div2 = document.querySelector('#div2');
  div2.remove();
  const divTong = document.querySelector('#noi_dung');
  content(divTong);
}
// xóa
function xoaSp(idSp){
  const row = rowsSp.find( row => row.maSP === idSp);
  const indexRow = rowsSp.indexOf(row); 
  console.log(indexRow);
  // xóa theo vị trí
  rowsSp.splice(indexRow, 1);  // tham số thứ nhất là vị trí bắt đầu, tham số thứ hai là xóa n phần tử từ vị trí bắt đầu
  console.log("Đã xóa một sản phẩm");
  // cập nhập vô local
  const rowsSp1 = getlocalStorage("product");
  const row1 = rowsSp1.find( row => row.maSP === idSp);
  const indexRow1 = rowsSp1.indexOf(row1);
  rowsSp1.splice(indexRow1, 1);
  setlocalStorage("product", rowsSp1);

  // cập nhập lại bảng
  const div2 = document.querySelector('#div2');
  div2.remove();
  const divTong = document.querySelector('#noi_dung');
  content(divTong);
}

// sửa
// lấy hàm thêm sản phẩm và chỉnh sửa lại một chút
function suaSp(idSp){
  //lấy hàng cần sửa
  const row = rowsSp.find( row => row.maSP === idSp);
  const ma_sp_cu = row.maSP; // Lưu lại mã sản phẩm cũ để dùng cho hàm check/suaSpVoDanhSach

  const d = document.querySelector('#div2');
  d.innerHTML = '';
  d.classList = 'khungThemSp';
  // tạo khung thoát
  const thoat = document.createElement('button');
  thoat.textContent = 'X';
  thoat.classList.add('nut_thoat');
  d.appendChild(thoat);
  thoat.addEventListener('click', () => {
    if(confirm('Bạn muốn thoát khoải form chỉnh sửa sản phẩm')){
      d.remove();
      const divTong = document.querySelector('#noi_dung');
      content(divTong);
    }
  });
  //tạo tiêu đề
  const tieu_de = document.createElement('div');
  tieu_de.textContent = "Nội dung của sản phẩm";
  tieu_de.classList.add('tieu_de_nhapSp');
  d.appendChild(tieu_de);
  // tạo các khung nhập
  // mã sản phẩm
  const maSp = document.createElement('input');
  maSp.placeholder = "Mã sản phẩm";
  maSp.value = row.maSP;  // đặt sẵn giá trị
  maSp.type = 'text'; 
  maSp.id = 'maSp';
  d.appendChild(maSp);
  // tên sản phẩm
  const tenSp = document.createElement('input');
  tenSp.type = 'text';
  tenSp.value = row.tenSP;  // đặt sẵn giá trị
  tenSp.placeholder = "Tên sản phẩm";
  tenSp.style.marginLeft = '5%';
  tenSp.id = 'tenSp';
  d.appendChild(tenSp);
  // số lượng
  const soLuong = document.createElement('input');
  soLuong.type = 'number';
  soLuong.min = '1'; // tối thiểu là 1
  soLuong.value = row.soLuong;  // đặt sẵn giá trị
  soLuong.placeholder = "Số lượng";
  soLuong.id = 'soLuong';
  d.appendChild(soLuong);
  // giá bán
  const giaBan = document.createElement('input');
  giaBan.type = 'number';
  giaBan.value = row.gsgg; // đặt sẵn giá trị
  giaBan.placeholder = "Giá bán";
  giaBan.style.marginLeft = '5%';
  giaBan.id = 'giaBan';
  d.appendChild(giaBan);
  // thuộc mã mặt hàng
  const matHang = document.createElement('select');
  matHang.classList = 'selectMatHang';
  matHang.id = 'matHang';
  matHang.size = '5'; // giúp tạo cuộn và hiện ra option thôi
  d.appendChild(matHang);
  const rowsMh = getlocalStorage("matHang");
  for (let i = 0; i < rowsMh.length; i++) {
    const op = document.createElement('option');
    op.textContent = rowsMh[i].tenMatHang;
    op.value = rowsMh[i].maMatHang;
    matHang.appendChild(op);
  }
  matHang.value = row.maMatHang;// thay đổi thành giá trị mặc định

  // text nhập phần trăm giảm
  const giamGia = document.createElement('input');
  d.appendChild(giamGia);
  giamGia.classList.add('phanTramGiam');
  giamGia.type = 'number';
  giamGia.min = '0';
  giamGia.max = '100';
 
  giamGia.value = row.giamGia; 
  
  giamGia.placeholder = 'Nhập phần trăm giảm giá (%)...';
  giamGia.id = 'giamGia';


  // tạo ô thêm ảnh
  const anh = document.createElement('input');
  anh.type = 'file';
  anh.accept = 'image/*'; // chỉ chấp nhận file ảnh
  anh.type.marginLeft = '5%';
  // let truyenAnh = ''; //chuyển sang check để nhập thông tin
  // tạo ô xem ảnh mới up lên
  const xem_anh = document.createElement('img');
  xem_anh.classList.add('xem_anh');
  xem_anh.style.maxWidth = '100px'; 
  xem_anh.style.maxHeight = '100px'; 
  xem_anh.style.border = '1px solid #ccc';
  xem_anh.style.marginLeft = '5%';
  xem_anh.alt = 'Chưa có ảnh được tải lên';
  xem_anh.src = row.hinhAnh; //gắn sẵn giá trị
  let truyenAnh = row.hinhAnh; // gắn để vượt khỏi hàm check 
  const divBaoAnh = document.createElement('div');
  divBaoAnh.id = 'divBaoAnh';
  divBaoAnh.appendChild(anh);
  divBaoAnh.appendChild(xem_anh);
  d.appendChild(divBaoAnh);
  anh.addEventListener( 'change', () => {
    const file = anh.files[0];  // kiểm tra xem file có bị để trống không
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
    } 
    else {
      // Nếu người dùng hủy chọn file
      // xem_anh.src = ''; 
      // truyenAnh = '';
      alert("Bạn đã hủy chọn file ảnh mới");
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

    // 1. Kiểm tra và lấy dữ liệu hợp lệ (Sửa: dùng tham số "Sửa" và mã cũ)
    const thong_tin_moi = check(truyenAnh, "Sửa", ma_sp_cu);
    
    // 2. Nếu kiểm tra thất bại (check trả về 0), thì thoát
    if (thong_tin_moi === 0) return; 
    
    // 3. Nếu dữ liệu hợp lệ, gọi hàm sửa sản phẩm
    suaSpVoDanhSach(ma_sp_cu, thong_tin_moi); // Truyền mã sản phẩm cũ và thông tin mới
    
    // 4. Xóa form và cập nhật bảng
    alert("Đã sửa sản phẩm");
    const div2 = document.querySelector('#div2');
    div2.remove();
    const divTong = document.querySelector('#noi_dung');
    content(divTong);
  })
  // nút button reset
  const reset = document.createElement('button');
  reset.textContent = "Reset";
  reset.classList.add('reset');
  bao.appendChild(reset);
  reset.addEventListener('click', () => {
    // Sửa: Dùng mã sản phẩm cũ (ma_sp_cu) để gọi lại hàm sửa
    suaSp(ma_sp_cu); 
  })
}

function suaSpVoDanhSach(idSp, thong_tin){
  // cập nhập vô mảnh hiện tại
  const rowIndex = rowsSp.findIndex( row => row.maSP === idSp);
  // Chỉnh sửa: Loại bỏ tham số rowsSp không cần thiết
  rowsSp.splice(rowIndex, 1, thong_tin); // Dùng splice(index, 1, new_item) để thay thế
  // cập nhập vô local
  const rowsSp1 = getlocalStorage("product");
  const rowIndex1 = rowsSp1.findIndex( row => row.maSP === idSp);
  // Chỉnh sửa: Loại bỏ tham số rowsSp không cần thiết
  rowsSp1.splice( rowIndex1, 1, thong_tin); // Dùng splice(index, 1, new_item) để thay thế
  setlocalStorage("product", rowsSp1);
}