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

let rowBeingEdited = null;  // tham chiếu tới <tr> đang edit
let rowBeingDeleted = null; // tham chiếu tới <tr> đang xóa

/* mở modal chung (bạn đã có openModal/closeModal) */
function openModal(id) {
  const m = document.getElementById(id);
  if (!m) return;
  m.classList.add('show');
  m.setAttribute('aria-hidden', 'false');
}
function closeModal(id) {
  const m = document.getElementById(id);
  if (!m) return;
  m.classList.remove('show');
  m.setAttribute('aria-hidden', 'true');
}

/* Hàm khi bấm Sửa trong ô thao tác */
function onEdit(btn) {
  const tr = btn.closest('tr');
  if (!tr) return;
  rowBeingEdited = tr;

  // Lấy dữ liệu từ các ô (tùy cấu trúc cột bảng của bạn)
  const tds = tr.querySelectorAll('td');
  // Ví dụ thứ tự cột: Mã, Họ tên, Giới tính, Ngày sinh, Địa chỉ, SĐT, CCCD, Lớp, Chức vụ
  document.getElementById('dg_ma').value = tds[0]?.textContent.trim() || '';
  document.getElementById('dg_ten').value = tds[1]?.textContent.trim() || '';
  document.getElementById('dg_gt').value = tds[2]?.textContent.trim() || 'Nam';
  // Nếu ngày được lưu dạng yyyy-mm-dd thì gán trực tiếp, nếu khác cần parse
  document.getElementById('dg_ns').value = tds[3]?.textContent.trim() || '';
  // nếu có địa chỉ ở cột 4, sdt ở 5, cccd ở 6, lop 7, cv 8
  // điều chỉnh chỉ số nếu bảng bạn khác
  const possibleAddress = tds[4]?.textContent.trim() || '';
  const possibleSdt = tds[5]?.textContent.trim() || '';
  const possibleCccd = tds[6]?.textContent.trim() || '';
  const possibleLop = tds[7]?.textContent.trim() || '';
  const possibleCv = tds[8]?.textContent.trim() || 'Học sinh';

  const addrField = document.getElementById('dg_dc');
  if (addrField) addrField.value = possibleAddress;

  const sdtField = document.getElementById('dg_sdt');
  if (sdtField) sdtField.value = possibleSdt;

  const cccdField = document.getElementById('dg_cccd');
  if (cccdField) cccdField.value = possibleCccd;

  const lopField = document.getElementById('dg_lop');
  if (lopField) lopField.value = possibleLop;

  const cvField = document.getElementById('dg_cv');
  if (cvField) cvField.value = possibleCv;

  // Thay đổi hành vi nút Lưu: lưu để cập nhật row đang edit
  const modal = document.getElementById('modalDG');
  if (modal) {
    const saveBtn = modal.querySelector('.modal-footer .btn.btn-primary');
    if (saveBtn) {
      saveBtn.onclick = function() { saveEdit(); };
    }
  }

  openModal('modalDG');
}

/* Lưu sau sửa (cập nhật hàng hiện tại) */
function saveEdit() {
  if (!rowBeingEdited) { addDocGia(); return; } // fallback: nếu không edit => thêm mới
  const tds = rowBeingEdited.querySelectorAll('td');

  // Gán lại theo cùng thứ tự như khi hiển thị
  tds[0].textContent = document.getElementById('dg_ma').value.trim();
  tds[1].textContent = document.getElementById('dg_ten').value.trim();
  tds[2].textContent = document.getElementById('dg_gt').value;
  tds[3].textContent = document.getElementById('dg_ns').value || '';
  // địa chỉ
  const addrField = document.getElementById('dg_dc');
  if (tds[4] && addrField) tds[4].textContent = addrField.value.trim();
  const sdtField = document.getElementById('dg_sdt');
  if (tds[5] && sdtField) tds[5].textContent = sdtField.value.trim();
  const cccdField = document.getElementById('dg_cccd');
  if (tds[6] && cccdField) tds[6].textContent = cccdField.value.trim();
  const lopField = document.getElementById('dg_lop');
  if (tds[7] && lopField) tds[7].textContent = lopField.value.trim();
  const cvField = document.getElementById('dg_cv');
  if (tds[8] && cvField) tds[8].textContent = cvField.value;

  // Reset và đóng modal
  rowBeingEdited = null;
  // reset nút lưu về hành vi add (nếu bạn muốn)
  const modal = document.getElementById('modalDG');
  if (modal) {
    const saveBtn = modal.querySelector('.modal-footer .btn.btn-primary');
    if (saveBtn) saveBtn.onclick = addDocGia;
  }
  // reset form fields (tùy cần)
  closeModal('modalDG');
}

/* Khi bấm Xóa */
function onDelete(btn) {
  const tr = btn.closest('tr');
  if (!tr) return;
  rowBeingDeleted = tr;
  openModal('confirmDelete');
}

/* Đóng confirm */
function closeConfirm() {
  rowBeingDeleted = null;
  closeModal('confirmDelete');
}

/* Xác nhận xóa: thực hiện xóa rowBeingDeleted */
function confirmDelete() {
  if (rowBeingDeleted) {
    rowBeingDeleted.remove();
    rowBeingDeleted = null;
  }
  closeModal('confirmDelete');
}
