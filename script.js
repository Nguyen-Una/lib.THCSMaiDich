// script.js (HOÀN CHỈNH - THAY THẾ TOÀN BỘ FILE HIỆN TẠI)

// mở / đóng modal
function openModal(id){ document.getElementById(id).classList.add('show'); }
function closeModal(id){ document.getElementById(id).classList.remove('show'); }

// ---- Generic delete confirm (dùng cho tất cả) ----
function confirmDeleteGeneric(btn, message, onConfirm) {
  const modal = document.createElement('div');
  modal.classList.add('confirm-modal');
  modal.innerHTML = `
    <div class="confirm-box">
      <p>${message}</p>
      <div class="confirm-buttons">
        <button class="btn-cancel" onclick="closeConfirmModal(this)">Hủy</button>
        <button class="btn-delete" id="__confirmBtn">Xóa</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  modal.classList.add('show');
  const confirmBtn = document.getElementById('__confirmBtn');
  confirmBtn.addEventListener('click', () => {
    if (onConfirm) onConfirm();
    modal.remove();
  });
  window.currentDeleting = btn.closest('tr');
}

function closeConfirmModal(btn) {
  btn.closest('.confirm-modal').remove();
}

// wrapper cụ thể để giữ tương thích với tên cũ
function confirmDeleteDocGia(btn) {
  confirmDeleteGeneric(btn, "Bạn có chắc chắn muốn xóa độc giả này?", () => {
    if (window.currentDeleting) window.currentDeleting.remove();
    showToast("🗑️ Đã xóa độc giả!");
  });
}
function confirmDeletePM(btn) {
  confirmDeleteGeneric(btn, "Bạn có chắc chắn muốn xóa phiếu mượn này?", () => {
    if (window.currentDeleting) window.currentDeleting.remove();
    showToast("🗑️ Đã xóa phiếu mượn!");
  });
}
function confirmDeleteSach(btn) {
  confirmDeleteGeneric(btn, "Bạn có chắc chắn muốn xóa sách này?", () => {
    if (window.currentDeleting) window.currentDeleting.remove();
    showToast("🗑️ Đã xóa sách!");
  });
}

// demo sửa generic (nếu cần)
function editRow(btn, type){
  alert("Demo cập nhật " + (type || "bản ghi") + ". Khi nộp bài bạn mô tả: nhấn Sửa sẽ mở form cập nhật.");
}

/* ====== ĐỘC GIẢ ====== */
function searchDG(){
  const key = document.getElementById('searchDG')?.value?.toLowerCase() || "";
  document.querySelectorAll('#tableDG tbody tr').forEach(r=>{
    r.style.display = r.innerText.toLowerCase().includes(key) ? '' : 'none';
  });
}

function addDocGia() {
  const table = document.getElementById("tableDG").getElementsByTagName("tbody")[0];

  // Lấy mã độc giả cuối cùng
  const rows = table.getElementsByTagName("tr");
  let lastCode = "DG000";
  if (rows.length > 0) {
    lastCode = rows[rows.length - 1].cells[0].innerText.trim();
  }

  // Sinh mã mới
  const newNumber = parseInt(lastCode.replace(/[^0-9]/g, "")) + 1;
  const newCode = "DG" + newNumber.toString().padStart(3, "0");

  // Lấy dữ liệu từ form
  const ten = document.getElementById("dg_ten").value.trim();
  const gt = document.getElementById("dg_gt").value;
  const ns = document.getElementById("dg_ns").value;
  const diachi = document.getElementById("dg_dc").value.trim();
  const sdt = document.getElementById("dg_sdt").value.trim();
  const cccd = document.getElementById("dg_cccd").value.trim();
  const lop = document.getElementById("dg_lop").value.trim();
  const cv = document.getElementById("dg_cv").value;

  // Kiểm tra nhập thiếu (chỉ bắt những trường bắt buộc)
  if (!ten || !ns || !sdt) {
    Swal.fire({
      icon: "warning",
      title: "Thiếu thông tin",
      text: "Vui lòng nhập Họ tên, Ngày sinh và SĐT!",
      confirmButtonColor: "#3085d6"
    });
    return;
  }

  // Thêm hàng mới vào bảng
  const row = table.insertRow();
  row.innerHTML = `
    <td>${newCode}</td>
    <td>${ten}</td>
    <td>${gt}</td>
    <td>${ns}</td>
    <td>${diachi}</td>
    <td>${sdt}</td>
    <td>${cccd}</td>
    <td>${lop || "—"}</td>
    <td>${cv}</td>
    <td class="actions">
      <button class="btn btn-edit" onclick="editDocGia(this)">Sửa</button>
      <button class="btn btn-delete" onclick="confirmDeleteDocGia(this)">Xóa</button>
    </td>
  `;

  // reset form + đóng modal
  document.getElementById("dg_ten").value = "";
  document.getElementById("dg_gt").value = "Nam";
  document.getElementById("dg_ns").value = "";
  document.getElementById("dg_dc").value = "";
  document.getElementById("dg_sdt").value = "";
  document.getElementById("dg_cccd").value = "";
  document.getElementById("dg_lop").value = "";
  document.getElementById("dg_cv").value = "Học sinh";

// Cập nhật localStorage sau khi thêm độc giả mới
const ds = JSON.parse(localStorage.getItem("dsDocGia") || "[]");
ds.push({ ma: newCode, ten: ten });
localStorage.setItem("dsDocGia", JSON.stringify(ds));

  closeModal('modalDG');
  Swal.fire({
    icon: "success",
    title: "Đã thêm thành công!",
    text: `${ten} đã được thêm vào danh sách.`,
    timer: 1500,
    showConfirmButton: false
  });
}

/* ====== PHIẾU MƯỢN ====== */
function searchPM(){
  const key = document.getElementById('searchPM').value.toLowerCase();
  document.querySelectorAll('#tablePM tbody tr').forEach(r=>{
    r.style.display = r.innerText.toLowerCase().includes(key) ? '' : 'none';
  });
}

function filterPM(){
  const tt = document.getElementById('filterTT').value.toLowerCase();
  document.querySelectorAll('#tablePM tbody tr').forEach(r=>{
    const val = r.children[4].innerText.toLowerCase();
    r.style.display = !tt || val.includes(tt) ? '' : 'none';
  });
}

function addPM() {
  // CHÚ Ý: table id phải là "tablePM"
  const table = document.getElementById("tablePM").getElementsByTagName("tbody")[0];

  // Lấy mã phiếu mượn cuối
  const rows = table.getElementsByTagName("tr");
  let lastCode = "PM000";
  if (rows.length > 0) {
    lastCode = rows[rows.length - 1].cells[0].innerText.trim();
  }

  // Sinh mã mới
  const newNumber = parseInt(lastCode.replace(/[^0-9]/g, "")) + 1;
  const newCode = "PM" + newNumber.toString().padStart(3, "0");

  // Lấy dữ liệu từ form (IDs phải khớp)
  const madg = document.getElementById("pm_dg").value.trim();
  const ngaymuon = document.getElementById("pm_nm").value;
  const hantra = document.getElementById("pm_ht").value;
  const tinhtrang = document.getElementById("pm_tt").value;

  if (!madg || !ngaymuon || !hantra) {
    Swal.fire({
      icon: "warning",
      title: "Thiếu thông tin",
      text: "Vui lòng nhập đầy đủ Mã độc giả, Ngày mượn và Hạn trả!",
      confirmButtonColor: "#3085d6"
    });
    return;
  }

  // Thêm hàng mới vào bảng (tạo badge màu)
  let badgeStyle = "";
  if (tinhtrang === "Đang mượn") badgeStyle = "background:rgba(37,99,235,.15);color:#1d4ed8;";
  else if (tinhtrang === "Đã trả") badgeStyle = "background:rgba(22,163,74,.14);color:#166534;";
  else if (tinhtrang === "Quá hạn") badgeStyle = "background:rgba(248,113,113,.1);color:#b91c1c;";

  const row = table.insertRow();
  row.innerHTML = `
    <td>${newCode}</td>
    <td>${layTenTheoMa(madg)}</td>
    <td>${ngaymuon}</td>
    <td>${hantra}</td>
    <td><span class="badge" style="${badgeStyle}">${tinhtrang}</span></td>
    <td class="actions">
      <button class="btn btn-edit" onclick="editPhieuMuon(this)">Sửa</button>
      <button class="btn btn-delete" onclick="confirmDeletePM(this)">Xóa</button>
    </td>
  `;

  // ======= Lấy tên độc giả từ mã (chỉ hiển thị tên) =======
function layTenTheoMa(maDG) {
  const data = localStorage.getItem("dsDocGia");
  if (!data) return maDG; // nếu chưa lưu thì trả lại mã
  const dsDocGia = JSON.parse(data);
  const item = dsDocGia.find(d => d.ma === maDG);
  return item ? item.ten : maDG;
}

  // Reset form + đóng modal
  document.getElementById("pm_dg").value = "";
  document.getElementById("pm_nm").value = "";
  document.getElementById("pm_ht").value = "";
  document.getElementById("pm_tt").value = "Đang mượn";

  closeModal('modalPM');

  // reset footer modal (đưa nút Lưu về trạng thái ban đầu)
  const pmFooter = document.querySelector('#modalPM .modal-footer');
  if (pmFooter) {
    pmFooter.innerHTML = `
      <button class="btn btn-light" onclick="closeModal('modalPM')">Hủy</button>
      <button class="btn btn-primary" onclick="addPM()">Lưu</button>
    `;
  }

  Swal.fire({
    icon: "success",
    title: "Thành công!",
    text: "Đã thêm phiếu mượn mới!",
    timer: 1400,
    showConfirmButton: false
  });
}

/* ====== SÁCH ====== */
function addSach() {
  const table = document.getElementById("tableSach").getElementsByTagName("tbody")[0];

  // Lấy hàng cuối cùng để biết mã sách lớn nhất hiện có
  const rows = table.getElementsByTagName("tr");
  let lastCode = "S000";
  if (rows.length > 0) {
    lastCode = rows[rows.length - 1].cells[0].innerText.trim();
  }

  // Tách phần số và tăng lên 1
  const newNumber = parseInt(lastCode.replace(/[^0-9]/g, "")) + 1;
  const newCode = "S" + newNumber.toString().padStart(3, "0");

  // Lấy dữ liệu từ form
  const ten = document.getElementById("s_ten").value.trim();
  const tl = document.getElementById("s_tl").value.trim();
  const nam = document.getElementById("s_nam").value.trim();
  const nxb = document.getElementById("s_nxb").value.trim();
  const tg = document.getElementById("s_tg").value.trim();
  const sl = document.getElementById("s_sl").value.trim();

  if (!ten || !tl || !nam || !nxb || !tg || !sl) {
    Swal.fire({
      icon: "warning",
      title: "Thiếu thông tin",
      text: "Vui lòng nhập đầy đủ thông tin!",
      confirmButtonColor: "#3085d6"
    });
    return;
  }

  // Thêm hàng mới vào bảng
  const row = table.insertRow();
  row.innerHTML = `
    <td>${newCode}</td>
    <td>${ten}</td>
    <td>${tl}</td>
    <td>${nam}</td>
    <td>${nxb}</td>
    <td>${tg}</td>
    <td>${sl}</td>
    <td class="actions">
      <button class="btn btn-edit" onclick="editSach(this)">Sửa</button>
      <button class="btn btn-delete" onclick="confirmDeleteSach(this)">Xóa</button>
    </td>
  `;

  // reset form
  document.getElementById("s_ten").value = "";
  document.getElementById("s_tl").value = "";
  document.getElementById("s_nam").value = "";
  document.getElementById("s_nxb").value = "";
  document.getElementById("s_tg").value = "";
  document.getElementById("s_sl").value = "";

  closeModal('modalSach');

  // reset footer
  const sachFooter = document.querySelector('#modalSach .modal-footer');
  if (sachFooter) {
    sachFooter.innerHTML = `
      <button class="btn btn-light" onclick="closeModal('modalSach')">Hủy</button>
      <button class="btn btn-primary" onclick="addSach()">Lưu</button>
    `;
  }

  Swal.fire({
    icon: "success",
    title: "Đã thêm sách mới!",
    timer: 1300,
    showConfirmButton: false
  });
}

/* ======== SỬA ĐỘC GIẢ ======== */
function editDocGia(btn) {
  const tr = btn.closest('tr');
  const cells = tr.querySelectorAll('td');

  // Gán dữ liệu vào form (đảm bảo input dg_ma tồn tại)
  document.getElementById('dg_ma').value = cells[0].innerText;
  document.getElementById('dg_ten').value = cells[1].innerText;
  document.getElementById('dg_gt').value = cells[2].innerText;
  document.getElementById('dg_ns').value = cells[3].innerText;
  document.getElementById('dg_dc').value = cells[4].innerText;
  document.getElementById('dg_sdt').value = cells[5].innerText;
  document.getElementById('dg_cccd').value = cells[6].innerText;
  document.getElementById('dg_lop').value = cells[7].innerText === "—" ? "" : cells[7].innerText;
  document.getElementById('dg_cv').value = cells[8].innerText;

  // Mở form
  openModal('modalDG');

  // Đổi nút Lưu thành Cập nhật
  const footer = document.querySelector('#modalDG .modal-footer');
  footer.innerHTML = `
    <button class="btn btn-light" onclick="closeModal('modalDG')">Hủy</button>
    <button class="btn btn-primary" onclick="updateDocGia()">Cập nhật</button>
  `;

  // Ghi nhớ hàng đang chỉnh sửa
  window.editingRow = tr;
}

function updateDocGia() {
  const tr = window.editingRow;
  if (!tr) return;

  tr.children[0].innerText = document.getElementById('dg_ma').value;
  tr.children[1].innerText = document.getElementById('dg_ten').value;
  tr.children[2].innerText = document.getElementById('dg_gt').value;
  tr.children[3].innerText = document.getElementById('dg_ns').value;
  tr.children[4].innerText = document.getElementById('dg_dc').value;
  tr.children[5].innerText = document.getElementById('dg_sdt').value;
  tr.children[6].innerText = document.getElementById('dg_cccd').value;
  tr.children[7].innerText = document.getElementById('dg_lop').value || "—";
  tr.children[8].innerText = document.getElementById('dg_cv').value;

  closeModal('modalDG');
  showToast("✅ Cập nhật thông tin thành công!");

  // reset footer về nút Lưu
  const dgFooter = document.querySelector('#modalDG .modal-footer');
  if (dgFooter) {
    dgFooter.innerHTML = `
      <button class="btn btn-light" onclick="closeModal('modalDG')">Hủy</button>
      <button class="btn btn-primary" onclick="addDocGia()">Lưu</button>
    `;
  }
}

/* ======== Sửa sách ======== */
function editSach(btn) {
  const tr = btn.closest('tr');
  const cells = tr.querySelectorAll('td');

  // Gán dữ liệu vào form thêm sách
  document.getElementById('s_ma').value = cells[0].innerText;
  document.getElementById('s_ten').value = cells[1].innerText;
  document.getElementById('s_tl').value = cells[2].innerText;
  document.getElementById('s_nam').value = cells[3].innerText;
  document.getElementById('s_nxb').value = cells[4].innerText;
  document.getElementById('s_tg').value = cells[5].innerText;
  document.getElementById('s_sl').value = cells[6].innerText;

  // Mở modal
  openModal('modalSach');

  // Đổi nút Lưu → Cập nhật
  const footer = document.querySelector('#modalSach .modal-footer');
  footer.innerHTML = `
    <button class="btn btn-light" onclick="closeModal('modalSach')">Hủy</button>
    <button class="btn btn-primary" onclick="updateSach()">Cập nhật</button>
  `;

  window.editingSach = tr;
}

function updateSach() {
  const tr = window.editingSach;
  if (!tr) return;

  tr.children[0].innerText = document.getElementById('s_ma').value;
  tr.children[1].innerText = document.getElementById('s_ten').value;
  tr.children[2].innerText = document.getElementById('s_tl').value;
  tr.children[3].innerText = document.getElementById('s_nam').value;
  tr.children[4].innerText = document.getElementById('s_nxb').value;
  tr.children[5].innerText = document.getElementById('s_tg').value;
  tr.children[6].innerText = document.getElementById('s_sl').value;

  closeModal('modalSach');
  showToast("✅ Cập nhật thông tin sách thành công!");

  // reset footer
  const sachFooter = document.querySelector('#modalSach .modal-footer');
  if (sachFooter) {
    sachFooter.innerHTML = `
      <button class="btn btn-light" onclick="closeModal('modalSach')">Hủy</button>
      <button class="btn btn-primary" onclick="addSach()">Lưu</button>
    `;
  }
}

/* ======== Sửa phiếu mượn ======== */
function editPhieuMuon(btn) {
  const tr = btn.closest('tr');
  const cells = tr.querySelectorAll('td');

  // Lấy dữ liệu hiện tại từ hàng
  document.getElementById('pm_ma').value = cells[0].innerText;
  document.getElementById('pm_dg').value = cells[1].innerText;
  document.getElementById('pm_nm').value = cells[2].innerText;
  document.getElementById('pm_ht').value = cells[3].innerText;

  // Trạng thái là phần tử <span> trong ô
  const status = cells[4].innerText.trim();
  document.getElementById('pm_tt').value = status;

  // Mở form (modal)
  openModal('modalPM');

  // Đổi nút Lưu → Cập nhật
  const footer = document.querySelector('#modalPM .modal-footer');
  footer.innerHTML = `
    <button class="btn btn-light" onclick="closeModal('modalPM')">Hủy</button>
    <button class="btn btn-primary" onclick="updatePhieuMuon()">Cập nhật</button>
  `;

  // Lưu hàng hiện tại đang sửa
  window.editingPM = tr;
}

function updatePhieuMuon() {
  const tr = window.editingPM;
  if (!tr) return;

  tr.children[0].innerText = document.getElementById('pm_ma').value;
  tr.children[1].innerText = document.getElementById('pm_dg').value;
  tr.children[2].innerText = document.getElementById('pm_nm').value;
  tr.children[3].innerText = document.getElementById('pm_ht').value;
  tr.children[4].innerHTML = `<span class="badge">${document.getElementById('pm_tt').value}</span>`;

  closeModal('modalPM');
  showToast("✅ Cập nhật phiếu mượn thành công!");

  // reset footer
  const pmFooter2 = document.querySelector('#modalPM .modal-footer');
  if (pmFooter2) {
    pmFooter2.innerHTML = `
      <button class="btn btn-light" onclick="closeModal('modalPM')">Hủy</button>
      <button class="btn btn-primary" onclick="addPM()">Lưu</button>
    `;
  }
}

/* ======== Thông báo nhỏ góc phải ======== */
function showToast(msg) {
  const toast = document.createElement('div');
  toast.textContent = msg;
  toast.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #2563eb;
    color: white;
    padding: 10px 16px;
    border-radius: 8px;
    font-size: 14px;
    z-index: 3000;
    animation: fadeInOut 2.8s forwards;
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2800);
}

const style = document.createElement('style');
style.textContent = `
@keyframes fadeInOut {
  0% { opacity: 0; transform: translateY(20px); }
  10% { opacity: 1; transform: translateY(0); }
  90% { opacity: 1; }
  100% { opacity: 0; transform: translateY(20px); }
}`;
document.head.appendChild(style);

