const tatCaSanPham = [
  // === MÁY GIẶT ===
  { maSP: 1, tenSP: "Máy giặt LG Inverter 9kg", maMatHang: "1", hinhAnh: "./img/1.Máy giặt LG Inverter 9kg.jpg", giamGia: "-10%", giaHienTai: "7.650.000đ", gsht: 7650000, gsgg: 8500000, giaGoc: "8.500.000đ", soLuong: 30, nguongCanhBao: 5, hienAn: "1" },
  { maSP: 2, tenSP: "Máy giặt Samsung AddWash 10kg", maMatHang: "1", hinhAnh: "./img/2. Máy giặt Samsung AddWash 10kg.webp", giamGia: "-12%", giaHienTai: "8.976.000đ", gsht: 8976000, gsgg: 10200000, giaGoc: "10.200.000đ", soLuong: 20, nguongCanhBao: 5, hienAn: "1" },
  { maSP: 3, tenSP: "Máy giặt Toshiba Inverter 8.5kg", maMatHang: "1", hinhAnh: "./img/3.Máy giặt Toshiba Inverter 8.5kg.webp", giamGia: "-7%", giaHienTai: "7.347.000đ", gsht: 7347000, gsgg: 7900000, giaGoc: "7.900.000đ", soLuong: 25, nguongCanhBao: 5, hienAn: "1" },
  { maSP: 4, tenSP: "Máy giặt Aqua 9kg cửa trên", maMatHang: "1", hinhAnh: "./img/4.Máy giặt Aqua 9kg cửa trên.jpg", giamGia: "-5%", giaHienTai: "6.460.000đ", gsht: 6460000, gsgg: 6800000, giaGoc: "6.800.000đ", soLuong: 40, nguongCanhBao: 5, hienAn: "1" },
  { maSP: 5, tenSP: "Máy giặt Electrolux 9kg Inverter", maMatHang: "1", hinhAnh: "./img/5.Máy giặt Electrolux 9kg Inverter.webp", giamGia: "-10%", giaHienTai: "8.640.000đ", gsht: 8640000, gsgg: 9600000, giaGoc: "9.600.000đ", soLuong: 18, nguongCanhBao: 5, hienAn: "1" },
  { maSP: 6, tenSP: "Máy giặt Panasonic 10kg", maMatHang: "1", hinhAnh: "./img/6.Máy giặt Panasonic 10kg.jpg", giamGia: "-8%", giaHienTai: "7.360.000đ", gsht: 7360000, gsgg: 8000000, giaGoc: "8.000.000đ", soLuong: 22, nguongCanhBao: 5, hienAn: "1" },
  { maSP: 7, tenSP: "Máy giặt Casper Inverter 8.5kg", maMatHang: "1", hinhAnh: "./img/7.Máy giặt Casper Inverter 8.5kg.jpg", giamGia: "-9%", giaHienTai: "5.915.000đ", gsht: 5915000, gsgg: 6500000, giaGoc: "6.500.000đ", soLuong: 27, nguongCanhBao: 5, hienAn: "1" },
  { maSP: 8, tenSP: "Máy giặt Sharp 9kg cửa trên", maMatHang: "1", hinhAnh: "./img/8.Máy giặt Sharp 9kg cửa trên.jpg", giamGia: "-7%", giaHienTai: "5.580.000đ", gsht: 5580000, gsgg: 6000000, giaGoc: "6.000.000đ", soLuong: 35, nguongCanhBao: 5, hienAn: "1" },
  { maSP: 9, tenSP: "Máy giặt Midea 7.5kg", maMatHang: "1", hinhAnh: "./img/9.Máy giặt Midea 7.5kg.jpg", giamGia: "-6%", giaHienTai: "4.888.000đ", gsht: 4888000, gsgg: 5200000, giaGoc: "5.200.000đ", soLuong: 30, nguongCanhBao: 5, hienAn: "1" },
  { maSP: 10, tenSP: "Máy giặt Beko 8kg Inverter", maMatHang: "1", hinhAnh: "./img/10.Máy giặt Beko 8kg Inverter.jpg", giamGia: "-10%", giaHienTai: "6.570.000đ", gsht: 6570000, gsgg: 7300000, giaGoc: "7.300.000đ", soLuong: 20, nguongCanhBao: 5, hienAn: "1" },

  // === TV ===
  { maSP: 11, tenSP: "TV Samsung 43 inch 4K UHD", maMatHang: "3", hinhAnh: "./img/11.TV Samsung 43 inch 4K UHD.jpg", giamGia: "-10%", giaHienTai: "9.000.000đ", gsht: 9000000, gsgg: 10000000, giaGoc: "10.000.000đ", soLuong: 15, nguongCanhBao: 3, hienAn: "1" },
  { maSP: 12, tenSP: "TV LG 55 inch OLED", maMatHang: "3", hinhAnh: "./img/12.TV LG 55 inch OLED.jpg", giamGia: "-15%", giaHienTai: "18.700.000đ", gsht: 18700000, gsgg: 22000000, giaGoc: "22.000.000đ", soLuong: 10, nguongCanhBao: 3, hienAn: "1" },
  { maSP: 13, tenSP: "TV Sony 50 inch 4K HDR", maMatHang: "3", hinhAnh: "./img/13.TV Sony 50 inch 4K HDR.jpg", giamGia: "-12%", giaHienTai: "14.960.000đ", gsht: 14960000, gsgg: 17000000, giaGoc: "17.000.000đ", soLuong: 12, nguongCanhBao: 3, hienAn: "1" },
  { maSP: 14, tenSP: "TV TCL 43 inch Smart TV", maMatHang: "3", hinhAnh: "./img/14.TV TCL 43 inch Smart TV.jpg", giamGia: "-10%", giaHienTai: "7.650.000đ", gsht: 7650000, gsgg: 8500000, giaGoc: "8.500.000đ", soLuong: 18, nguongCanhBao: 3, hienAn: "1" },
  { maSP: 15, tenSP: "TV Casper 43 inch Full HD", maMatHang: "3", hinhAnh: "./img/15.TV Casper 43 inch Full HD.jpg", giamGia: "-9%", giaHienTai: "6.552.000đ", gsht: 6552000, gsgg: 7200000, giaGoc: "7.200.000đ", soLuong: 16, nguongCanhBao: 3, hienAn: "1" },
  { maSP: 16, tenSP: "TV Xiaomi 50 inch 4K", maMatHang: "3", hinhAnh: "./img/16.TV Xiaomi 50 inch 4K.jpg", giamGia: "-10%", giaHienTai: "9.450.000đ", gsht: 9450000, gsgg: 10500000, giaGoc: "10.500.000đ", soLuong: 14, nguongCanhBao: 3, hienAn: "1" },
  { maSP: 17, tenSP: "TV Panasonic 55 inch 4K", maMatHang: "3", hinhAnh: "./img/17.TV Panasonic 55 inch 4K.jpg", giamGia: "-13%", giaHienTai: "16.530.000đ", gsht: 16530000, gsgg: 19000000, giaGoc: "19.000.000đ", soLuong: 8, nguongCanhBao: 3, hienAn: "1" },
  { maSP: 18, tenSP: "TV Sharp 40 inch HD", maMatHang: "3", hinhAnh: "./img/18.TV Sharp 40 inch HD.jpg", giamGia: "-8%", giaHienTai: "5.980.000đ", gsht: 5980000, gsgg: 6500000, giaGoc: "6.500.000đ", soLuong: 25, nguongCanhBao: 3, hienAn: "1" },
  { maSP: 19, tenSP: "TV Toshiba 43 inch Smart", maMatHang: "3", hinhAnh: "./img/19.TV Toshiba 43 inch Smart.jpg", giamGia: "-11%", giaHienTai: "8.010.000đ", gsht: 8010000, gsgg: 9000000, giaGoc: "9.000.000đ", soLuong: 20, nguongCanhBao: 3, hienAn: "1" },
  { maSP: 20, tenSP: "TV Beko 43 inch Android", maMatHang: "3", hinhAnh: "./img/20.TV Beko 43 inch Android.jpg", giamGia: "-10%", giaHienTai: "7.200.000đ", gsht: 7200000, gsgg: 8000000, giaGoc: "8.000.000đ", soLuong: 22, nguongCanhBao: 3, hienAn: "1" },

  // === TỦ LẠNH ===
  { maSP: 21, tenSP: "Tủ lạnh LG Inverter 315 lít", maMatHang: "2", hinhAnh: "./img/21.Tủ lạnh LG Inverter 315 lít.jpg", giamGia: "-10%", giaHienTai: "10.800.000đ", gsht: 10800000, gsgg: 12000000, giaGoc: "12.000.000đ", soLuong: 15, nguongCanhBao: 3, hienAn: "1" },
  { maSP: 22, tenSP: "Tủ lạnh Samsung 2 cửa 340 lít", maMatHang: "2", hinhAnh: "./img/22.Tủ lạnh Samsung 2 cửa 340 lít.jpg", giamGia: "-12%", giaHienTai: "11.440.000đ", gsht: 11440000, gsgg: 13000000, giaGoc: "13.000.000đ", soLuong: 12, nguongCanhBao: 3, hienAn: "1" },
  { maSP: 23, tenSP: "Tủ lạnh Toshiba Inverter 280 lít", maMatHang: "2", hinhAnh: "./img/23.Tủ lạnh Toshiba Inverter 280 lít.jpg", giamGia: "-9%", giaHienTai: "9.555.000đ", gsht: 9555000, gsgg: 10500000, giaGoc: "10.500.000đ", soLuong: 18, nguongCanhBao: 3, hienAn: "1" },
  { maSP: 24, tenSP: "Tủ lạnh Panasonic 300 lít", maMatHang: "2", hinhAnh: "./img/24.Tủ lạnh Panasonic 300 lít.jpg", giamGia: "-10%", giaHienTai: "9.900.000đ", gsht: 9900000, gsgg: 11000000, giaGoc: "11.000.000đ", soLuong: 10, nguongCanhBao: 3, hienAn: "1" },
  { maSP: 25, tenSP: "Tủ lạnh Aqua 260 lít ngăn đá trên", maMatHang: "2", hinhAnh: "./img/25.Tủ lạnh Aqua 260 lít ngăn đá trên.jpg", giamGia: "-8%", giaHienTai: "7.820.000đ", gsht: 7820000, gsgg: 8500000, giaGoc: "8.500.000đ", soLuong: 22, nguongCanhBao: 3, hienAn: "1" },
  { maSP: 26, tenSP: "Tủ lạnh Sharp 196 lít", maMatHang: "2", hinhAnh: "./img/26.Tủ lạnh Sharp 196 lít.webp", giamGia: "-7%", giaHienTai: "6.417.000đ", gsht: 6417000, gsgg: 6900000, giaGoc: "6.900.000đ", soLuong: 28, nguongCanhBao: 3, hienAn: "1" },
  { maSP: 27, tenSP: "Tủ lạnh Casper Inverter 250 lít", maMatHang: "2", hinhAnh: "./img/27.Tủ lạnh Casper Inverter 250 lít.webp", giamGia: "-10%", giaHienTai: "7.200.000đ", gsht: 7200000, gsgg: 8000000, giaGoc: "8.000.000đ", soLuong: 16, nguongCanhBao: 3, hienAn: "1" },
  { maSP: 28, tenSP: "Tủ lạnh Beko 200 lít", maMatHang: "2", hinhAnh: "./img/28.Tủ lạnh Beko 200 lít.webp", giamGia: "-10%", giaHienTai: "5.850.000đ", gsht: 5850000, gsgg: 6500000, giaGoc: "6.500.000đ", soLuong: 30, nguongCanhBao: 3, hienAn: "1" },
  { maSP: 29, tenSP: "Tủ lạnh Midea 220 lít ngăn đá dưới", maMatHang: "2", hinhAnh: "./img/29.Tủ lạnh Midea 220 lít ngăn đá dưới.jpg", giamGia: "-8%", giaHienTai: "6.900.000đ", gsht: 6900000, gsgg: 7500000, giaGoc: "7.500.000đ", soLuong: 25, nguongCanhBao: 3, hienAn: "1" },
  { maSP: 30, tenSP: "Tủ lạnh Xiaomi 2 cửa 260 lít", maMatHang: "2", hinhAnh: "./img/30.Tủ lạnh Xiaomi 2 cửa 260 lít.jpg", giamGia: "-10%", giaHienTai: "8.550.000đ", gsht: 8550000, gsgg: 9500000, giaGoc: "9.500.000đ", soLuong: 15, nguongCanhBao: 3, hienAn: "1" },

  // === MÁY LẠNH ===
  { maSP: 31, tenSP: "Máy lạnh LG Inverter 1.5HP", maMatHang: "4", hinhAnh: "./img/31.Máy lạnh LG Inverter 1.5HP.jpg", giamGia: "-12%", giaHienTai: "9.680.000đ", gsht: 9680000, gsgg: 11000000, giaGoc: "11.000.000đ", soLuong: 20, nguongCanhBao: 4, hienAn: "1" },
  { maSP: 32, tenSP: "Máy lạnh Daikin Inverter 1HP", maMatHang: "4", hinhAnh: "./img/32.Máy lạnh Daikin Inverter 1HP.jpg", giamGia: "-10%", giaHienTai: "9.450.000đ", gsht: 9450000, gsgg: 10500000, giaGoc: "10.500.000đ", soLuong: 22, nguongCanhBao: 4, hienAn: "1" },
  { maSP: 33, tenSP: "Máy lạnh Panasonic Inverter 1.5HP", maMatHang: "4", hinhAnh: "./img/33.Máy lạnh Panasonic Inverter 1.5HP.webp", giamGia: "-10%", giaHienTai: "10.800.000đ", gsht: 10800000, gsgg: 12000000, giaGoc: "12.000.000đ", soLuong: 18, nguongCanhBao: 4, hienAn: "1" },
  { maSP: 34, tenSP: "Máy lạnh Samsung 2 chiều 1.5HP", maMatHang: "4", hinhAnh: "./img/34.Máy lạnh Samsung 2 chiều 1.5HP.jpg", giamGia: "-12%", giaHienTai: "11.440.000đ", gsht: 11440000, gsgg: 13000000, giaGoc: "13.000.000đ", soLuong: 15, nguongCanhBao: 4, hienAn: "1" },
  { maSP: 35, tenSP: "Máy lạnh Casper Inverter 1HP", maMatHang: "4", hinhAnh: "./img/35.Máy lạnh Casper Inverter 1HP.jpg", giamGia: "-8%", giaHienTai: "7.360.000đ", gsht: 7360000, gsgg: 8000000, giaGoc: "8.000.000đ", soLuong: 28, nguongCanhBao: 4, hienAn: "1" },
  { maSP: 36, tenSP: "Máy lạnh Sharp Inverter 1.5HP", maMatHang: "4", hinhAnh: "./img/36.Máy lạnh Sharp Inverter 1.5HP.webp", giamGia: "-10%", giaHienTai: "9.000.000đ", gsht: 9000000, gsgg: 10000000, giaGoc: "10.000.000đ", soLuong: 20, nguongCanhBao: 4, hienAn: "1" },
  { maSP: 37, tenSP: "Máy lạnh Midea 1HP", maMatHang: "4", hinhAnh: "./img/37.Máy lạnh Midea 1HP.jpg", giamGia: "-9%", giaHienTai: "6.480.000đ", gsht: 6480000, gsgg: 7200000, giaGoc: "7.200.000đ", soLuong: 25, nguongCanhBao: 4, hienAn: "1" },
  { maSP: 38, tenSP: "Máy lạnh Panasonic 1HP", maMatHang: "4", hinhAnh: "./img/38.Máy lạnh Panasonic 1HP.jpg", giamGia: "-10%", giaHienTai: "7.200.000đ", gsht: 7200000, gsgg: 8000000, giaGoc: "8.000.000đ", soLuong: 30, nguongCanhBao: 4, hienAn: "1" },
  { maSP: 39, tenSP: "Máy lạnh Beko 1HP", maMatHang: "4", hinhAnh: "./img/39.Máy lạnh Beko 1HP.jpg", giamGia: "-8%", giaHienTai: "6.900.000đ", gsht: 6900000, gsgg: 7500000, giaGoc: "7.500.000đ", soLuong: 28, nguongCanhBao: 4, hienAn: "1" },
  { maSP: 40, tenSP: "Máy lạnh LG 2HP", maMatHang: "4", hinhAnh: "./img/40.Máy lạnh LG 2HP.jpg", giamGia: "-10%", giaHienTai: "12.600.000đ", gsht: 12600000, gsgg: 14000000, giaGoc: "14.000.000đ", soLuong: 12, nguongCanhBao: 4, hienAn: "1" },

  // === MÁY LỌC KHÔNG KHÍ ===
{ maSP: 41, tenSP: "Máy lọc không khí Sharp FP-J40E-W", maMatHang: "5", hinhAnh: "./img/41.Máy lọc không khí Sharp FP-J40E-W.jpg", giaGoc: "4.000.000đ", gsgg: 4000000, giaHienTai: "3.400.000đ", gsht: 3400000, giamGia: "-15%", soLuong: 100, nguongCanhBao: 10, hienAn: "1" },
{ maSP: 42, tenSP: "Máy lọc không khí Daikin MC30VVM-A", maMatHang: "5", hinhAnh: "./img/42.Máy lọc không khí Daikin MC30VVM-A.jpg", giaGoc: "3.200.000đ", gsgg: 3200000, giaHienTai: "2.880.000đ", gsht: 2880000, giamGia: "-10%", soLuong: 80, nguongCanhBao: 10, hienAn: "1" },
{ maSP: 43, tenSP: "Máy lọc không khí Xiaomi Air Purifier 4 Pro", maMatHang: "5", hinhAnh: "./img/43.Máy lọc không khí Xiaomi Air Purifier 4 Pro.jpg", giaGoc: "5.000.000đ", gsgg: 5000000, giaHienTai: "4.400.000đ", gsht: 4400000, giamGia: "-12%", soLuong: 60, nguongCanhBao: 5, hienAn: "1" },
{ maSP: 44, tenSP: "Máy lọc không khí Philips AC1215/10", maMatHang: "5", hinhAnh: "./img/44.Máy lọc không khí Philips AC1215 10.jpg", giaGoc: "4.200.000đ", gsgg: 4200000, giaHienTai: "3.780.000đ", gsht: 3780000, giamGia: "-10%", soLuong: 90, nguongCanhBao: 10, hienAn: "1" },
{ maSP: 45, tenSP: "Máy lọc không khí Coway AP-1009CH", maMatHang: "5", hinhAnh: "./img/45.Máy lọc không khí Coway AP-1009CH.jpg", giaGoc: "6.500.000đ", gsgg: 6500000, giaHienTai: "5.980.000đ", gsht: 5980000, giamGia: "-8%", soLuong: 50, nguongCanhBao: 5, hienAn: "1" },
{ maSP: 46, tenSP: "Máy lọc không khí LG PuriCare AS65GDW0", maMatHang: "5", hinhAnh: "./img/46.Máy lọc không khí LG PuriCare AS65GDW0.jpg", giaGoc: "8.900.000đ", gsgg: 8900000, giaHienTai: "8.010.000đ", gsht: 8010000, giamGia: "-10%", soLuong: 40, nguongCanhBao: 5, hienAn: "1" },
{ maSP: 47, tenSP: "Máy lọc không khí Panasonic F-PXJ30A", maMatHang: "5", hinhAnh: "./img/47.Máy lọc không khí Panasonic F-PXJ30A.jpg", giaGoc: "4.500.000đ", gsgg: 4500000, giaHienTai: "4.095.000đ", gsht: 4095000, giamGia: "-9%", soLuong: 70, nguongCanhBao: 10, hienAn: "1" },
{ maSP: 48, tenSP: "Máy lọc không khí Hitachi EP-A3000", maMatHang: "5", hinhAnh: "./img/48.Máy lọc không khí Hitachi EP-A3000.jpg", giaGoc: "6.200.000đ", gsgg: 6200000, giaHienTai: "5.456.000đ", gsht: 5456000, giamGia: "-12%", soLuong: 55, nguongCanhBao: 5, hienAn: "1" },
{ maSP: 49, tenSP: "Máy lọc không khí Blueair Blue Pure 411", maMatHang: "5", hinhAnh: "./img/49.Máy lọc không khí Blueair Blue Pure 411.jpg", giaGoc: "3.800.000đ", gsgg: 3800000, giaHienTai: "3.420.000đ", gsht: 3420000, giamGia: "-10%", soLuong: 65, nguongCanhBao: 10, hienAn: "1" },
{ maSP: 50, tenSP: "Máy lọc không khí Levoit Core 300S", maMatHang: "5", hinhAnh: "./img/50.Máy lọc không khí Levoit Core 300S.jpg", giaGoc: "5.000.000đ", gsgg: 5000000, giaHienTai: "4.500.000đ", gsht: 4500000, giamGia: "-10%", soLuong: 60, nguongCanhBao: 10, hienAn: "1" },

];

// kiểm tra xem trên local hiện tại đã có table chưa nếu chưa có thì đẩy lên
const tableSp = JSON.parse(localStorage.getItem('product'));
if(tableSp){
  console.log("Đã có dữ liệu bảng sản phẩm")
}
else{
  localStorage.setItem('product', JSON.stringify(tatCaSanPham));  // nếu chưa có thì đẩy lên local
  console.log("test");
}

// Bảng đơn hàng đầy đủ
const donHang = [
  {
    maDH: "DH001",
    ngayDat: "2025-01-10 14:32:00",
    giaTri: 1250000,
    trangThai: "Hoàn thành",
    hinhThucThanhToan: "Chuyển khoản",
    donViVanChuyen: "Giao Hàng Nhanh",
    khachHang: "Nguyễn Văn A",
  },
  {
    maDH: "DH002",
    ngayDat: "2025-01-12 15:00:00",
    giaTri: 2350000,
    trangThai: "Hoàn thành",
    hinhThucThanhToan: "Tiền mặt",
    donViVanChuyen: "Giao Hàng Tiết Kiệm",
    khachHang: "Trần Thị B",
  },
  {
    maDH: "DH003",
    ngayDat: "2025-01-14 21:25:00",
    giaTri: 780000,
    trangThai: "Đang xử lý",
    hinhThucThanhToan: "Ví Momo",
    donViVanChuyen: "J&T Express",
    khachHang: "Lê Văn C",
  },
  {
    maDH: "DH004",
    ngayDat: "2025-01-15 10:41:00",
    giaTri: 1640000,
    trangThai: "Đã giao",
    hinhThucThanhToan: "Chuyển khoản",
    donViVanChuyen: "VNPost",
    khachHang: "Phạm Thị D",
  },
  {
    maDH: "DH005",
    ngayDat: "2025-01-16 08:33:00",
    giaTri: 580000,
    trangThai: "Đang vận chuyển",
    hinhThucThanhToan: "Tiền mặt",
    donViVanChuyen: "Giao Hàng Nhanh",
    khachHang: "Hoàng Văn E",
  },
  {
    maDH: "DH006",
    ngayDat: "2025-01-20 09:15:00",
    giaTri: 3200000,
    trangThai: "Hoàn thành",
    hinhThucThanhToan: "Chuyển khoản",
    donViVanChuyen: "Shopee Express",
    khachHang: "Vũ Thị F",
  },
  {
    maDH: "DH007",
    ngayDat: "2025-03-08 08:15:00",
    giaTri: 450000,
    trangThai: "Đang xử lý",
    hinhThucThanhToan: "Ví Momo",
    donViVanChuyen: "Giao Hàng Tiết Kiệm",
    khachHang: "Nguyễn Văn A",
  },
  {
    maDH: "DH008",
    ngayDat: "2025-03-10 21:18:00",
    giaTri: 875000,
    trangThai: "Đã hủy",
    hinhThucThanhToan: "Tiền mặt",
    donViVanChuyen: "VNPost",
    khachHang: "Trần Thị B",
  },
  {
    maDH: "DH009",
    ngayDat: "2025-03-12 17:45:00",
    giaTri: 1590000,
    trangThai: "Đang vận chuyển",
    hinhThucThanhToan: "Chuyển khoản",
    donViVanChuyen: "J&T Express",
    khachHang: "Phạm Văn G",
  },
  {
    maDH: "DH010",
    ngayDat: "2025-03-14 10:00:00",
    giaTri: 2640000,
    trangThai: "Đã giao",
    hinhThucThanhToan: "Ví Momo",
    donViVanChuyen: "Giao Hàng Nhanh",
    khachHang: "Lê Thị H",
  },
  {
    maDH: "DH011",
    ngayDat: "2025-03-16 14:20:00",
    giaTri: 960000,
    trangThai: "Hoàn thành",
    hinhThucThanhToan: "Tiền mặt",
    donViVanChuyen: "Giao Hàng Tiết Kiệm",
    khachHang: "Nguyễn Thị I",
  },
  {
    maDH: "DH012",
    ngayDat: "2025-03-17 18:10:00",
    giaTri: 1980000,
    trangThai: "Đang xử lý",
    hinhThucThanhToan: "Ví Momo",
    donViVanChuyen: "VNPost",
    khachHang: "Võ Văn K",
  },
  {
    maDH: "DH013",
    ngayDat: "2025-03-18 08:30:00",
    giaTri: 4250000,
    trangThai: "Đã giao",
    hinhThucThanhToan: "Chuyển khoản",
    donViVanChuyen: "J&T Express",
    khachHang: "Trần Thị L",
  },
  {
    maDH: "DH014",
    ngayDat: "2025-03-19 13:15:00",
    giaTri: 1890000,
    trangThai: "Đang vận chuyển",
    hinhThucThanhToan: "Ví Momo",
    donViVanChuyen: "Shopee Express",
    khachHang: "Nguyễn Văn M",
  },
  {
    maDH: "DH015",
    ngayDat: "2025-03-20 09:55:00",
    giaTri: 540000,
    trangThai: "Đã hủy",
    hinhThucThanhToan: "Tiền mặt",
    donViVanChuyen: "Giao Hàng Nhanh",
    khachHang: "Lê Thị N",
  },
  {
    maDH: "DH016",
    ngayDat: "2025-03-22 11:42:00",
    giaTri: 3780000,
    trangThai: "Hoàn thành",
    hinhThucThanhToan: "Chuyển khoản",
    donViVanChuyen: "VNPost",
    khachHang: "Phạm Văn O",
  },
  {
    maDH: "DH017",
    ngayDat: "2025-03-25 15:30:00",
    giaTri: 2950000,
    trangThai: "Đang xử lý",
    hinhThucThanhToan: "Ví Momo",
    donViVanChuyen: "Giao Hàng Tiết Kiệm",
    khachHang: "Hoàng Thị P",
  },
  {
    maDH: "DH018",
    ngayDat: "2025-03-28 12:00:00",
    giaTri: 1560000,
    trangThai: "Đã giao",
    hinhThucThanhToan: "Tiền mặt",
    donViVanChuyen: "Shopee Express",
    khachHang: "Nguyễn Văn Q",
  },
  {
    maDH: "DH019",
    ngayDat: "2025-04-01 19:00:00",
    giaTri: 890000,
    trangThai: "Đang vận chuyển",
    hinhThucThanhToan: "Ví Momo",
    donViVanChuyen: "VNPost",
    khachHang: "Trần Thị R",
  },
  {
    maDH: "DH020",
    ngayDat: "2025-04-05 08:45:00",
    giaTri: 2100000,
    trangThai: "Hoàn thành",
    hinhThucThanhToan: "Chuyển khoản",
    donViVanChuyen: "Giao Hàng Nhanh",
    khachHang: "Phạm Văn S",
  },
];


const tableBill = JSON.parse(localStorage.getItem('bill'));
if(tableBill){
  console.log("Đã có dữ liệu bảng bill")
}
else{
  localStorage.setItem('bill', JSON.stringify(donHang));
}


const chiTietDonHang = [
  { maCTDH: 1,  maDH: "DH001", maSP: 1,  soLuong: 1, tongTien: 7650000 },
  { maCTDH: 2,  maDH: "DH001", maSP: 2,  soLuong: 2, tongTien: 15800000 },
  { maCTDH: 3,  maDH: "DH002", maSP: 3,  soLuong: 1, tongTien: 3250000 },
  { maCTDH: 4,  maDH: "DH002", maSP: 4,  soLuong: 3, tongTien: 9780000 },
  { maCTDH: 5,  maDH: "DH003", maSP: 5,  soLuong: 1, tongTien: 2890000 },
  { maCTDH: 6,  maDH: "DH003", maSP: 6,  soLuong: 2, tongTien: 5760000 },
  { maCTDH: 7,  maDH: "DH004", maSP: 7,  soLuong: 1, tongTien: 1990000 },
  { maCTDH: 8,  maDH: "DH004", maSP: 8,  soLuong: 2, tongTien: 4980000 },
  { maCTDH: 9,  maDH: "DH005", maSP: 9,  soLuong: 3, tongTien: 8370000 },
  { maCTDH: 10, maDH: "DH005", maSP: 10, soLuong: 1, tongTien: 1200000 },
  { maCTDH: 11, maDH: "DH006", maSP: 11, soLuong: 1, tongTien: 4560000 },
  { maCTDH: 12, maDH: "DH006", maSP: 12, soLuong: 4, tongTien: 18400000 },
  { maCTDH: 13, maDH: "DH007", maSP: 13, soLuong: 1, tongTien: 3500000 },
  { maCTDH: 14, maDH: "DH007", maSP: 14, soLuong: 2, tongTien: 7400000 },
  { maCTDH: 15, maDH: "DH008", maSP: 15, soLuong: 1, tongTien: 2390000 },
  { maCTDH: 16, maDH: "DH008", maSP: 16, soLuong: 2, tongTien: 4780000 },
  { maCTDH: 17, maDH: "DH009", maSP: 17, soLuong: 2, tongTien: 6200000 },
  { maCTDH: 18, maDH: "DH009", maSP: 18, soLuong: 1, tongTien: 3190000 },
  { maCTDH: 19, maDH: "DH010", maSP: 19, soLuong: 3, tongTien: 9570000 },
  { maCTDH: 20, maDH: "DH010", maSP: 20, soLuong: 1, tongTien: 2690000 },
  { maCTDH: 21, maDH: "DH011", maSP: 21, soLuong: 1, tongTien: 3890000 },
  { maCTDH: 22, maDH: "DH011", maSP: 22, soLuong: 2, tongTien: 7780000 },
  { maCTDH: 23, maDH: "DH012", maSP: 23, soLuong: 1, tongTien: 2450000 },
  { maCTDH: 24, maDH: "DH012", maSP: 24, soLuong: 3, tongTien: 7350000 },
  { maCTDH: 25, maDH: "DH013", maSP: 25, soLuong: 1, tongTien: 1950000 },
  { maCTDH: 26, maDH: "DH013", maSP: 26, soLuong: 2, tongTien: 3900000 },
  { maCTDH: 27, maDH: "DH014", maSP: 27, soLuong: 1, tongTien: 5490000 },
  { maCTDH: 28, maDH: "DH014", maSP: 28, soLuong: 2, tongTien: 10980000 },
  { maCTDH: 29, maDH: "DH015", maSP: 29, soLuong: 3, tongTien: 12600000 },
  { maCTDH: 30, maDH: "DH015", maSP: 30, soLuong: 1, tongTien: 3850000 },
  { maCTDH: 31, maDH: "DH016", maSP: 31, soLuong: 2, tongTien: 7200000 },
  { maCTDH: 32, maDH: "DH016", maSP: 32, soLuong: 1, tongTien: 3550000 },
  { maCTDH: 33, maDH: "DH017", maSP: 33, soLuong: 2, tongTien: 6480000 },
  { maCTDH: 34, maDH: "DH017", maSP: 34, soLuong: 1, tongTien: 3290000 },
  { maCTDH: 35, maDH: "DH018", maSP: 35, soLuong: 3, tongTien: 9750000 },
  { maCTDH: 36, maDH: "DH018", maSP: 36, soLuong: 1, tongTien: 3190000 },
  { maCTDH: 37, maDH: "DH019", maSP: 37, soLuong: 1, tongTien: 2690000 },
  { maCTDH: 38, maDH: "DH019", maSP: 38, soLuong: 2, tongTien: 5380000 },
  { maCTDH: 39, maDH: "DH020", maSP: 39, soLuong: 1, tongTien: 4850000 },
  { maCTDH: 40, maDH: "DH020", maSP: 40, soLuong: 2, tongTien: 9700000 },
];

const tableBillDetail = JSON.parse(localStorage.getItem('billDetail'));
if (tableBillDetail) {
  console.log("Đã có dữ liệu bảng bill detail");
} else {
  localStorage.setItem('billDetail', JSON.stringify(chiTietDonHang));
}


// bảng khách hàng
const khachHang = [
  {
    maKH: 1,
    tenKH: "Nguyễn Văn An",
    tenTaiKhoan: "an.nguyen",
    gioiTinh: "Nam",
    email: "an.nguyen@example.com",
    soDienThoai: "0901234567",
    diaChi: "12 Nguyễn Trãi, Quận 1, TP.HCM",
    matKhau: "an123456",
    trangThai: 1
  },
  {
    maKH: 2,
    tenKH: "Trần Thị Bích",
    tenTaiKhoan: "bich.tran",
    gioiTinh: "Nữ",
    email: "bich.tran@example.com",
    soDienThoai: "0902345678",
    diaChi: "45 Lê Lợi, Quận 3, TP.HCM",
    matKhau: "bich234567",
    trangThai: 1
  },
  {
    maKH: 3,
    tenKH: "Lê Hoàng Long",
    tenTaiKhoan: "long.le",
    gioiTinh: "Nam",
    email: "long.le@example.com",
    soDienThoai: "0913456789",
    diaChi: "78 Hai Bà Trưng, TP. Hà Nội",
    matKhau: "long345678",
    trangThai: 0
  },
  {
    maKH: 4,
    tenKH: "Phạm Thu Hà",
    tenTaiKhoan: "ha.pham",
    gioiTinh: "Nữ",
    email: "ha.pham@example.com",
    soDienThoai: "0934567890",
    diaChi: "10 Tô Hiến Thành, TP. Đà Nẵng",
    matKhau: "ha456789",
    trangThai: 1
  },
  {
    maKH: 5,
    tenKH: "Võ Minh Đức",
    tenTaiKhoan: "duc.vo",
    gioiTinh: "Nam",
    email: "duc.vo@example.com",
    soDienThoai: "0945678901",
    diaChi: "22 Trần Hưng Đạo, TP. Cần Thơ",
    matKhau: "duc567890",
    trangThai: 1
  },
  {
    maKH: 6,
    tenKH: "Đỗ Mai Chi",
    tenTaiKhoan: "chi.do",
    gioiTinh: "Nữ",
    email: "chi.do@example.com",
    soDienThoai: "0956789012",
    diaChi: "88 Lý Thường Kiệt, TP. Hải Phòng",
    matKhau: "chi678901",
    trangThai: 1
  },
  {
    maKH: 7,
    tenKH: "Bùi Thanh Hải",
    tenTaiKhoan: "hai.bui",
    gioiTinh: "Nam",
    email: "hai.bui@example.com",
    soDienThoai: "0967890123",
    diaChi: "35 Phan Chu Trinh, TP. Huế",
    matKhau: "hai789012",
    trangThai: 0
  },
  {
    maKH: 8,
    tenKH: "Nguyễn Kim Ngân",
    tenTaiKhoan: "ngan.nguyen",
    gioiTinh: "Nữ",
    email: "ngan.nguyen@example.com",
    soDienThoai: "0978901234",
    diaChi: "50 Hoàng Diệu, TP. Nha Trang",
    matKhau: "ngan890123",
    trangThai: 1
  },
  {
    maKH: 9,
    tenKH: "Huỳnh Quốc Đạt",
    tenTaiKhoan: "dat.huynh",
    gioiTinh: "Nam",
    email: "dat.huynh@example.com",
    soDienThoai: "0989012345",
    diaChi: "99 Nguyễn Huệ, Quận 7, TP.HCM",
    matKhau: "dat901234",
    trangThai: 1
  },
  {
    maKH: 10,
    tenKH: "Trịnh Thúy Loan",
    tenTaiKhoan: "loan.trinh",
    gioiTinh: "Nữ",
    email: "loan.trinh@example.com",
    soDienThoai: "0910123456",
    diaChi: "15 Hùng Vương, TP. Đà Lạt",
    matKhau: "loan12345",
    trangThai: 0
  },
  {
    maKH: 11,
    tenKH: "Phan Văn Cường",
    tenTaiKhoan: "cuong.phan",
    gioiTinh: "Nam",
    email: "cuong.phan@example.com",
    soDienThoai: "0921234567",
    diaChi: "67 Điện Biên Phủ, TP. Biên Hòa",
    matKhau: "cuong23456",
    trangThai: 1
  },
  {
    maKH: 12,
    tenKH: "Lâm Thị Yến",
    tenTaiKhoan: "yen.lam",
    gioiTinh: "Nữ",
    email: "yen.lam@example.com",
    soDienThoai: "0932345678",
    diaChi: "8 Lạc Long Quân, TP. Quy Nhơn",
    matKhau: "yen34567",
    trangThai: 1
  },
  {
    maKH: 13,
    tenKH: "Hoàng Gia Bảo",
    tenTaiKhoan: "bao.hoang",
    gioiTinh: "Nam",
    email: "bao.hoang@example.com",
    soDienThoai: "0943456789",
    diaChi: "5 Chu Văn An, TP. Vũng Tàu",
    matKhau: "bao45678",
    trangThai: 1
  },
  {
    maKH: 14,
    tenKH: "Ngô Thanh Tâm",
    tenTaiKhoan: "tam.ngo",
    gioiTinh: "Nữ",
    email: "tam.ngo@example.com",
    soDienThoai: "0954567890",
    diaChi: "100 Lê Duẩn, TP. Vinh",
    matKhau: "tam56789",
    trangThai: 0
  },
  {
    maKH: 15,
    tenKH: "Đào Văn Khoa",
    tenTaiKhoan: "khoa.dao",
    gioiTinh: "Nam",
    email: "khoa.dao@example.com",
    soDienThoai: "0965678901",
    diaChi: "25 Phan Bội Châu, TP. Buôn Ma Thuột",
    matKhau: "khoa67890",
    trangThai: 1
  },
  {
    maKH: 16,
    tenKH: "Kiều Thị Loan",
    tenTaiKhoan: "loan.kieu",
    gioiTinh: "Nữ",
    email: "loan.kieu@example.com",
    soDienThoai: "0976789012",
    diaChi: "40 Trần Phú, TP. Đà Lạt",
    matKhau: "loan78901",
    trangThai: 1
  },
  {
    maKH: 17,
    tenKH: "Mai Công Vinh",
    tenTaiKhoan: "vinh.mai",
    gioiTinh: "Nam",
    email: "vinh.mai@example.com",
    soDienThoai: "0987890123",
    diaChi: "111 Trường Chinh, Quận Tân Bình, TP.HCM",
    matKhau: "vinh89012",
    trangThai: 1
  },
  {
    maKH: 18,
    tenKH: "Trần Bảo Ngọc",
    tenTaiKhoan: "ngoc.tran",
    gioiTinh: "Nữ",
    email: "ngoc.tran@example.com",
    soDienThoai: "0998901234",
    diaChi: "7 Bùi Thị Xuân, Quận Hai Bà Trưng, TP. Hà Nội",
    matKhau: "ngoc90123",
    trangThai: 0
  },
  {
    maKH: 19,
    tenKH: "Lý Thành Nam",
    tenTaiKhoan: "nam.ly",
    gioiTinh: "Nam",
    email: "nam.ly@example.com",
    soDienThoai: "0900011223",
    diaChi: "333 Cao Thắng, Quận 10, TP.HCM",
    matKhau: "nam011223",
    trangThai: 1
  },
  {
    maKH: 20,
    tenKH: "Châu Tuyết Vân",
    tenTaiKhoan: "van.chau",
    gioiTinh: "Nữ",
    email: "van.chau@example.com",
    soDienThoai: "0900022334",
    diaChi: "6 Phan Xích Long, Quận Phú Nhuận, TP.HCM",
    matKhau: "van022334",
    trangThai: 1
  }
];

const tableKhachHang = JSON.parse(localStorage.getItem('khachHang'));
if(tableKhachHang){
  console.log("Đã có dữ liệu bảng khach hang")
}
else{
  localStorage.setItem('khachHang', JSON.stringify(khachHang));
}

// bảng nhập hàng
const nhapHang = [
  {
    maNhap: 1,
    maSP: 101,
    soLuong: 50,
    ngayNhap: "2025-11-01",
    trangThai: "Hoàn tất"
  },
  {
    maNhap: 2,
    maSP: 102,
    soLuong: 30,
    ngayNhap: "2025-11-02",
    trangThai: "Hoàn tất"
  },
  {
    maNhap: 3,
    maSP: 103,
    soLuong: 20,
    ngayNhap: "2025-11-03",
    trangThai: "Đang xử lý"
  },
  {
    maNhap: 4,
    maSP: 104,
    soLuong: 15,
    ngayNhap: "2025-11-04",
    trangThai: "Hoàn tất"
  },
  {
    maNhap: 5,
    maSP: 105,
    soLuong: 40,
    ngayNhap: "2025-11-05",
    trangThai: "Đang xử lý"
  }
];
const tableNhapHang = JSON.parse(localStorage.getItem('nhapHang'));
if(tableNhapHang){
  console.log("Đã có dữ liệu bảng nhap hang")
}
else{
  localStorage.setItem('nhapHang', JSON.stringify(nhapHang));
}

// table mặt hàng
const matHang = [
  {
    maMatHang: 1,
    tenMatHang: "Máy giặt"
  },
  {
    maMatHang: 2,
    tenMatHang: "Tủ lạnh",
  },
  {
    maMatHang: 3,
    tenMatHang: "TV",
  },
  {
    maMatHang: 4,
    tenMatHang: "Máy lạnh",
  },
  {
    maMatHang: 5,
    tenMatHang: "Máy lọc không khí"
  }
]
const tableMatHang = JSON.parse(localStorage.getItem('matHang'));
if(tableMatHang){
  console.log("Đã có dữ liệu bảng mat hang")
}
else{
  localStorage.setItem('matHang', JSON.stringify(matHang));
}



// // các hàm lấy  và và cập nhập table 
// // đẩy lên local
// // truyền vô tên key và object chứa data
// setlocalStorage("product", tatCaSanPham);
// function setlocalStorage(key, value){
//     localStorage.setItem(key, JSON.stringify(value));
// }
// // lấy file từ local
// // truyền vô key để lấy data
// function getlocalStorage(key){
//     return JSON.parse(localStorage.getItem(key));
// }



