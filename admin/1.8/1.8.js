// ===============================
// 8️⃣ Quản lý số lượng tồn của sản phẩm
// ===============================
// window.addEventListener("DOMContentLoaded", () => {
//   fetch("data.json") // nếu file ở thư mục khác thì đổi lại đường dẫn cho đúng
//     .then(res => res.json())
//     .then(data => {
//       localStorage.setItem("du_lieu", JSON.stringify(data));
//       console.log("✅ Dữ liệu đã tải xong!");
//     })
//     .catch(err => console.error("❌ Lỗi tải dữ liệu:", err));
// });
function quanLySoLuongTon() {
  const db = JSON.parse(localStorage.getItem("du_lieu"));
  if (!db) return alert("Không tải được dữ liệu!");

  const dsSP = db.find(t => t.name === "san_pham").data;
  const dsLoai = db.find(t => t.name === "mat_hang").data;
  const dsNhap = db.find(t => t.name === "chi_tiet_nhap_hang").data
const dsXuat = db.find(t => t.name === "chi_tiet_don_hang").data;

  const div = document.getElementById("noi_dung");
  div.innerHTML = `
    <h2>Quản lý số lượng tồn của sản phẩm</h2>
    <div class="bo-loc">
      <input type="text" id="timSP" placeholder="Nhập tên sản phẩm..." />
      <select id="chonLoai">
        <option value="">-- Tất cả loại hàng --</option>
      </select>
      <button class="nutlogin" id="btnLoc">Lọc</button>
    </div>
    <table id="bangTon">
      <thead>
        <tr>
          <th>Mã SP</th>
          <th>Tên sản phẩm</th>
          <th>Loại hàng</th>
          <th>Số lượng tồn</th>
          <th>Trạng thái</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  `;

  const tbody = div.querySelector("#bangTon tbody");
  const selLoai = div.querySelector("#chonLoai");
  const txtTim = div.querySelector("#timSP");

  dsLoai.forEach(loai => {
    const op = document.createElement("option");
    op.value = loai.MA_MAT_HANG;
    op.textContent = loai.TEN_MAT_HANG;
    selLoai.appendChild(op);
  });

  function tinhSoLuongTon(sp) {
    const maSP = sp.MA_SAN_PHAM;
    const nhap = dsNhap
      .filter(ct => ct.MA_SAN_PHAM === maSP)
      .reduce((sum, ct) => sum + Number(ct.SO_LUONG), 0);
    const xuat = dsXuat
      .filter(ct => ct.MA_SAN_PHAM === maSP)
      .reduce((sum, ct) => sum + Number(ct.SO_LUONG), 0);
    return nhap - xuat;
  }

  function renderBang() {
    tbody.innerHTML = "";
    const key = txtTim.value.trim().toLowerCase();
    const maLoai = selLoai.value;

    dsSP.forEach(sp => {
      const loai = dsLoai.find(l => l.MA_MAT_HANG === sp.MA_MAT_HANG);
      const soLuongTon = tinhSoLuongTon(sp);
      const trangThai = soLuongTon < 5 ? "Sắp hết hàng" : "Còn hàng";

      if (
        (key === "" || sp.TEN_SP.toLowerCase().includes(key)) &&
        (maLoai === "" || sp.MA_MAT_HANG === maLoai)
      ) {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${sp.MA_SAN_PHAM}</td>
          <td>${sp.TEN_SP}</td>
          <td>${loai ? loai.TEN_MAT_HANG : ""}</td>
          <td>${soLuongTon}</td>
          <td style="color:${soLuongTon < 5 ? "red" : "green"};font-weight:bold">
            ${trangThai}
          </td>
        `;
        tbody.appendChild(tr);
      }
    });
  }

  renderBang();
  div.querySelector("#btnLoc").onclick = renderBang;
}