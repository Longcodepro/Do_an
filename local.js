const khachHang = [
  {
    maKH: 'KH001',
    ten: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    sdt: '0901234567',
    diaChi: '123 Lê Lợi, Quận 1, TP.HCM'
  },
  {
    maKH: 'KH002',
    ten: 'Trần Thị B',
    email: 'tranthib@example.com',
    sdt: '0902345678',
    diaChi: '45 Nguyễn Huệ, Quận 1, TP.HCM'
  },
  {
    maKH: 'KH003',
    ten: 'Lê Văn C',
    email: 'levanc@example.com',
    sdt: '0903456789',
    diaChi: '78 Lý Thường Kiệt, Quận 10, TP.HCM'
  },
  {
    maKH: 'KH004',
    ten: 'Phạm Thị D',
    email: 'phamthid@example.com',
    sdt: '0904567890',
    diaChi: '12 Hai Bà Trưng, Quận 3, TP.HCM'
  },
  {
    maKH: 'KH005',
    ten: 'Hoàng Văn E',
    email: 'hoangvane@example.com',
    sdt: '0905678901',
    diaChi: '56 Điện Biên Phủ, Quận Bình Thạnh, TP.HCM'
  }
];
localStorage.setItem('khachHang', khachHang);

const taiKhoan = [
  {
    maTK: 'TK001',
    tenDangNhap: 'nguyenvana',
    matKhau: '123456',
    email: 'nguyenvana@example.com',
    vaiTro: 'Khách hàng'
  },
  {
    maTK: 'TK002',
    tenDangNhap: 'tranthib',
    matKhau: 'abc123',
    email: 'tranthib@example.com',
    vaiTro: 'Khách hàng'
  },
  {
    maTK: 'TK003',
    tenDangNhap: 'levanc',
    matKhau: 'pass789',
    email: 'levanc@example.com',
    vaiTro: 'Nhân viên'
  },
  {
    maTK: 'TK004',
    tenDangNhap: 'phamthid',
    matKhau: 'qwerty',
    email: 'phamthid@example.com',
    vaiTro: 'Quản trị viên'
  },
  {
    maTK: 'TK005',
    tenDangNhap: 'hoangvane',
    matKhau: 'zxcvbn',
    email: 'hoangvane@example.com',
    vaiTro: 'Khách hàng'
  }
];
localStorage.setItem('taiKhoan', taiKhoan);
