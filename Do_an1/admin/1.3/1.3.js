
// ===============================
// 3️⃣ Quản lý loại sản phẩm: Thêm, Sửa, Xóa / Ẩn
// ===============================
// fetch("./data.json")
//   .then((res) => res.json())
//   .then((data) => {
//     localStorage.setItem("du_lieu", JSON.stringify(data));
//   });

function quanLyLoaiSanPham() {
  const db = JSON.parse(localStorage.getItem("du_lieu"));
  if (!db) return alert("Không tải được dữ liệu!");

  const tableLoai = db.find((t) => t.name === "mat_hang");
  const rowsLoai = tableLoai.data;

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
  ["Mã loại", "Tên loại sản phẩm", "Hành động"].forEach((title) => {
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
      tdMa.textContent = row.MA_MAT_HANG;
      tr.appendChild(tdMa);

      const tdTen = document.createElement("td");
      tdTen.textContent = row.TEN_MAT_HANG;
      tr.appendChild(tdTen);

      const tdXuLy = document.createElement("td");
      const btnXoa = document.createElement("button");
      btnXoa.textContent = "Xóa";
      btnXoa.classList.add("xoa_sua");
      btnXoa.onclick = () => {
        if (confirm("Bạn có chắc muốn xóa loại này?")) {
          rowsLoai.splice(index, 1);
          localStorage.setItem("du_lieu", JSON.stringify(db));
          renderTable();
        }
      };

      const btnSua = document.createElement("button");
      btnSua.textContent = "Sửa";
      btnSua.classList.add("xoa_sua");
      btnSua.style.marginLeft = "8px";
      btnSua.onclick = () => {
        const newName = prompt("Nhập tên loại mới:", row.TEN_MAT_HANG);
        if (newName && newName.trim() !== "") {
          row.TEN_MAT_HANG = newName.trim();
          localStorage.setItem("du_lieu", JSON.stringify(db));
          renderTable();
        }
      };

      tdXuLy.append(btnXoa, btnSua);
      tr.appendChild(tdXuLy);
      tbody.appendChild(tr);
    });
  }

  renderTable();

  btnThem.onclick = () => {
    const ma = prompt("Nhập mã loại:");
    const ten = prompt("Nhập tên loại sản phẩm:");
    if (ma && ten) {
      rowsLoai.push({ MA_MAT_HANG: ma, TEN_MAT_HANG: ten });
      localStorage.setItem("du_lieu", JSON.stringify(db));
      renderTable();
    }
  };
}