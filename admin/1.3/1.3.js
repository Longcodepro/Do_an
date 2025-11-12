function quanLyLoaiSanPham() {
  
  let rowsLoai = JSON.parse(localStorage.getItem("matHang")) || [];

  const div = document.getElementById("noi_dung");
  div.innerHTML = "";

  const h2 = document.createElement("h2");
  h2.textContent = "Quản lý loại sản phẩm";
  div.appendChild(h2);

  const btnThem = document.createElement("button");
  btnThem.textContent = "+ Thêm loại sản phẩm";
  btnThem.classList.add("nutlogin");
  btnThem.style.margin = "10px 0";
  div.appendChild(btnThem);

  const table = document.createElement("table");
  table.id = "tableLoai";
  table.style.width = "100%";
  div.appendChild(table);

  const thead = document.createElement("thead");
  const trHead = document.createElement("tr");
  ["Mã loại", "Tên loại sản phẩm", "Trạng thái", "Hành động"].forEach(title => {
    const th = document.createElement("th");
    th.textContent = title;
    trHead.appendChild(th);
  });
  thead.appendChild(trHead);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  table.appendChild(tbody);

  function renderTable() {
    tbody.innerHTML = "";
    rowsLoai.forEach((row, index) => {
      const tr = document.createElement("tr");

      const tdMa = document.createElement("td");
      tdMa.textContent = row.maMatHang;
      tr.appendChild(tdMa);

      const tdTen = document.createElement("td");
      tdTen.textContent = row.tenMatHang;
      tr.appendChild(tdTen);

      //  Thêm cột trạng thái
      const tdTrangThai = document.createElement("td");
      const hien = row.hienThi ?? true; // mặc định hiển thị nếu chưa có
      tdTrangThai.textContent = hien ? "Đang hiển thị" : "Đang ẩn";
      tdTrangThai.style.color = hien ? "green" : "red";
      tdTrangThai.style.fontWeight = "bold";
      tr.appendChild(tdTrangThai);

      const tdXuLy = document.createElement("td");

      //  Nút Xóa
      const btnXoa = document.createElement("button");
      btnXoa.textContent = "Xóa";
      btnXoa.classList.add("xoa_sua");
      btnXoa.onclick = () => {
        if (confirm("Bạn có chắc muốn xóa loại này?")) {
          rowsLoai.splice(index, 1);
          localStorage.setItem("matHang", JSON.stringify(rowsLoai));
          renderTable();
        }
      };

      //  Nút Sửa
      const btnSua = document.createElement("button");
      btnSua.textContent = "Sửa";
      btnSua.classList.add("xoa_sua");
      btnSua.style.marginLeft = "8px";
      btnSua.onclick = () => {
        const newName = prompt("Nhập tên loại mới:", row.tenMatHang);
        if (newName && newName.trim() !== "") {
          row.tenMatHang = newName.trim();
          localStorage.setItem("matHang", JSON.stringify(rowsLoai));
          renderTable();
        }
      };

      //  Nút Ẩn / Hiện
      const btnAnHien = document.createElement("button");
      btnAnHien.textContent = hien ? "Ẩn" : "Hiện";
      btnAnHien.classList.add("xoa_sua");
<<<<<<< HEAD
      btnAnHien.style.marginLeft = "8px";
=======
btnAnHien.style.marginLeft = "8px";
>>>>>>> f7aacfa24f915e925d6ef0e31858c09c0f2c4ced
      btnAnHien.onclick = () => {
        row.hienThi = !hien;
        localStorage.setItem("matHang", JSON.stringify(rowsLoai));
        renderTable();
      };

      tdXuLy.append(btnXoa, btnSua, btnAnHien);
      tr.appendChild(tdXuLy);
      tbody.appendChild(tr);
    });
  }

  renderTable();

  
  btnThem.onclick = () => {
    let ma = prompt("Nhập mã loại:")?.trim();
    let ten = prompt("Nhập tên loại sản phẩm:")?.trim();

    if (!ma || !ten) {
      return alert("Vui lòng nhập đầy đủ mã và tên loại!");
    }

    
    const maTrung = rowsLoai.some(row => row.maMatHang.toString().trim() === ma);
    if (maTrung) {
      return alert("Mã loại đã tồn tại. Vui lòng nhập mã khác!");
    }

    rowsLoai.push({
      maMatHang: ma,
      tenMatHang: ten,
      hienThi: true 
    });
    localStorage.setItem("matHang", JSON.stringify(rowsLoai));
    renderTable();
  };
}
