// mở / đóng modal
function openModal(id){ document.getElementById(id).classList.add('show'); }
function closeModal(id){ document.getElementById(id).classList.remove('show'); }

// xoá dòng
function deleteRow(btn){
  if(confirm("Bạn có chắc muốn xóa bản ghi này?")) btn.closest('tr').remove();
}

// demo sửa
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

function filterDG(){
  const lop = document.getElementById('filterLop')?.value?.toLowerCase() || "";
  const cv = document.getElementById('filterCV')?.value?.toLowerCase() || "";
  document.querySelectorAll('#tableDG tbody tr').forEach(r=>{
    const lopVal = r.children[7].innerText.toLowerCase();
    const cvVal = r.children[8].innerText.toLowerCase();
    const okLop = !lop || lopVal === lop;
    const okCV = !cv || cvVal === cv;
    r.style.display = okLop && okCV ? '' : 'none';
  });
}

function addDocGia(){
  const ma = dg_ma.value || 'DGNEW';
  const ten = dg_ten.value || 'Chưa có tên';
  const gt = dg_gt.value;
  const ns = dg_ns.value;
  const dc = dg_dc.value;
  const sdt = dg_sdt.value;
  const cccd = dg_cccd.value;
  const lop = dg_lop.value || '—';
  const cv = dg_cv.value;

  const tbody = document.querySelector('#tableDG tbody');
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${ma}</td>
    <td>${ten}</td>
    <td>${gt}</td>
    <td>${ns}</td>
    <td>${dc}</td>
    <td>${sdt}</td>
    <td>${cccd}</td>
    <td>${lop}</td>
    <td>${cv}</td>
    <td class="actions">
      <button class="btn-icon btn-edit" onclick="editRow(this,'dg')"><i class="fa-solid fa-pen"></i></button>
      <button class="btn-icon btn-delete" onclick="deleteRow(this)"><i class="fa-solid fa-trash"></i></button>
    </td>
  `;
  tbody.appendChild(tr);
  closeModal('modalDG');
}

/* ====== SÁCH ====== */
function searchSach(){
  const key = document.getElementById('searchSach').value.toLowerCase();
  document.querySelectorAll('#tableSach tbody tr').forEach(r=>{
    r.style.display = r.innerText.toLowerCase().includes(key) ? '' : 'none';
  });
}

function filterSach(){
  const tl = document.getElementById('filterTL').value.toLowerCase();
  document.querySelectorAll('#tableSach tbody tr').forEach(r=>{
    const val = r.children[2].innerText.toLowerCase();
    r.style.display = !tl || val === tl ? '' : 'none';
  });
}

function addSach(){
  const ma = s_ma.value || 'SNEW';
  const ten = s_ten.value || 'Chưa đặt tên';
  const tl = s_tl.value || 'Khác';
  const nam = s_nam.value || '';
  const nxb = s_nxb.value || '';
  const tg = s_tg.value || '';
  const sl = s_sl.value || '0';

  const tbody = document.querySelector('#tableSach tbody');
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${ma}</td>
    <td>${ten}</td>
    <td>${tl}</td>
    <td>${nam}</td>
    <td>${nxb}</td>
    <td>${tg}</td>
    <td>${sl}</td>
    <td class="actions">
      <button class="btn-icon btn-edit" onclick="editRow(this,'sach')"><i class="fa-solid fa-pen"></i></button>
      <button class="btn-icon btn-delete" onclick="deleteRow(this)"><i class="fa-solid fa-trash"></i></button>
    </td>
  `;
  tbody.appendChild(tr);
  closeModal('modalSach');
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

function addPM(){
  const ma = pm_ma.value || 'PMNEW';
  const dg = pm_dg.value || 'Không rõ';
  const nm = pm_nm.value || '';
  const ht = pm_ht.value || '';
  const tt = pm_tt.value;
  const gc = pm_gc.value || '';

  const tbody = document.querySelector('#tablePM tbody');
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${ma}</td>
    <td>${dg}</td>
    <td>${nm}</td>
    <td>${ht}</td>
    <td><span class="badge">${tt}</span></td>
    <td>${gc}</td>
    <td class="actions">
      <button class="btn-icon btn-edit" onclick="editRow(this,'pm')"><i class="fa-solid fa-pen"></i></button>
      <button class="btn-icon btn-delete" onclick="deleteRow(this)"><i class="fa-solid fa-trash"></i></button>
    </td>
  `;
  tbody.appendChild(tr);
  closeModal('modalPM');
}

/* ====== BÁO CÁO ====== */
function filterBC(){
  const type = document.getElementById('bc_loai').value;
  document.querySelectorAll('#tableBC tbody tr').forEach(r=>{
    const status = r.dataset.status;
    r.style.display = (type === 'all' || status === type) ? '' : 'none';
  });
}

/* ======== SỬA ĐỘC GIẢ ======== */
function editDocGia(btn) {
  const tr = btn.closest('tr');
  const cells = tr.querySelectorAll('td');

  // Gán dữ liệu vào form
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

  tr.children[0].innerText = dg_ma.value;
  tr.children[1].innerText = dg_ten.value;
  tr.children[2].innerText = dg_gt.value;
  tr.children[3].innerText = dg_ns.value;
  tr.children[4].innerText = dg_dc.value;
  tr.children[5].innerText = dg_sdt.value;
  tr.children[6].innerText = dg_cccd.value;
  tr.children[7].innerText = dg_lop.value || "—";
  tr.children[8].innerText = dg_cv.value;

  closeModal('modalDG');
  showToast("✅ Cập nhật thông tin thành công!");
}

/* ======== XÁC NHẬN XÓA ======== */
function confirmDelete(btn) {
  const modal = document.createElement('div');
  modal.classList.add('confirm-modal');
  modal.innerHTML = `
    <div class="confirm-box">
      <p>Bạn có chắc chắn muốn xóa độc giả này?</p>
      <div class="confirm-buttons">
        <button class="btn-cancel" onclick="closeConfirmModal(this)">Hủy</button>
        <button class="btn-delete" onclick="deleteConfirmed(this)">Xóa</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  modal.classList.add('show');
  window.deletingRow = btn.closest('tr');
}

function closeConfirmModal(btn) {
  btn.closest('.confirm-modal').remove();
}

function deleteConfirmed(btn) {
  if (window.deletingRow) {
    window.deletingRow.remove();
    showToast("🗑️ Đã xóa độc giả!");
  }
  btn.closest('.confirm-modal').remove();
}

/* ======= Thông báo nhỏ góc phải ======= */
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

/* ======== SỬA SÁCH ======== */
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

  tr.children[0].innerText = s_ma.value;
  tr.children[1].innerText = s_ten.value;
  tr.children[2].innerText = s_tl.value;
  tr.children[3].innerText = s_nam.value;
  tr.children[4].innerText = s_nxb.value;
  tr.children[5].innerText = s_tg.value;
  tr.children[6].innerText = s_sl.value;

  closeModal('modalSach');
  showToast("✅ Cập nhật thông tin sách thành công!");
}

/* ======== XÁC NHẬN XÓA SÁCH ======== */
function confirmDeleteSach(btn) {
  const modal = document.createElement('div');
  modal.classList.add('confirm-modal');
  modal.innerHTML = `
    <div class="confirm-box">
      <p>Bạn có chắc chắn muốn xóa sách này?</p>
      <div class="confirm-buttons">
        <button class="btn-cancel" onclick="closeConfirmModal(this)">Hủy</button>
        <button class="btn-delete" onclick="deleteSachConfirmed(this)">Xóa</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  modal.classList.add('show');
  window.deletingSach = btn.closest('tr');
}

function deleteSachConfirmed(btn) {
  if (window.deletingSach) {
    window.deletingSach.remove();
    showToast("🗑️ Đã xóa sách!");
  }
  btn.closest('.confirm-modal').remove();
}

/* ======== SỬA PHIẾU MƯỢN ======== */
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
  document.getElementById('pm_gc').value = cells[5].innerText;

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

  // Cập nhật dữ liệu mới vào hàng
  tr.children[0].innerText = pm_ma.value;
  tr.children[1].innerText = pm_dg.value;
  tr.children[2].innerText = pm_nm.value;
  tr.children[3].innerText = pm_ht.value;
  tr.children[4].innerHTML = `<span class="badge">${pm_tt.value}</span>`;
  tr.children[5].innerText = pm_gc.value;

  closeModal('modalPM');
  showToast("✅ Cập nhật phiếu mượn thành công!");
}

/* ======== XÁC NHẬN XÓA PHIẾU MƯỢN ======== */
function confirmDeletePM(btn) {
  const modal = document.createElement('div');
  modal.classList.add('confirm-modal');
  modal.innerHTML = `
    <div class="confirm-box">
      <p>Bạn có chắc chắn muốn xóa phiếu mượn này?</p>
      <div class="confirm-buttons">
        <button class="btn-cancel" onclick="closeConfirmModal(this)">Hủy</button>
        <button class="btn-delete" onclick="deletePMConfirmed(this)">Xóa</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  modal.classList.add('show');
  window.deletingPM = btn.closest('tr');
}

function deletePMConfirmed(btn) {
  if (window.deletingPM) {
    window.deletingPM.remove();
    showToast("🗑️ Đã xóa phiếu mượn!");
  }
  btn.closest('.confirm-modal').remove();
}


