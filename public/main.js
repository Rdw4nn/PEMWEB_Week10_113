    const API_URL = '/api/products';

const productForm = document.getElementById('product-form');
const productIdInput = document.getElementById('product-id');
const productNameInput = document.getElementById('product-name');
const productPriceInput = document.getElementById('product-price');
const formTitle = document.getElementById('form-title');
const btnCancel = document.getElementById('btn-cancel');
const productList = document.getElementById('product-list');

// GET: Ambil & Tampilkan Data
async function loadProducts() {
  const res = await fetch(API_URL);
  const data = await res.json();
  
  productList.innerHTML = '';
  data.forEach(p => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${p.id}</td>
      <td>${p.name}</td>
      <td>Rp${p.price.toLocaleString('id-ID')}</td>
      <td>
        <button class="btn-edit" onclick="setupEdit(${p.id}, '${p.name}', ${p.price})">Edit</button>
        <button class="btn-delete" onclick="deleteProduct(${p.id})">Hapus</button>
      </td>
    `;
    productList.appendChild(tr);
  });
}

// POST & PUT: Handle Submit Form
productForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = productIdInput.value;
  const name = productNameInput.value;
  const price = productPriceInput.value;

  if (id) {
    // PUT (Update)
    await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price })
    });
  } else {
    // POST (Create)
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price })
    });
  }

  resetForm();
  loadProducts();
});

// Setup Form ke Mode Edit
function setupEdit(id, name, price) {
  formTitle.textContent = 'Edit Produk';
  productIdInput.value = id;
  productNameInput.value = name;
  productPriceInput.value = price;
  btnCancel.style.display = 'inline-block';
}

// DELETE: Hapus Produk
async function deleteProduct(id) {
  if (confirm('Yakin ingin menghapus produk ini?')) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    loadProducts();
  }
}

// Reset Form
function resetForm() {
  formTitle.textContent = 'Tambah Produk';
  productIdInput.value = '';
  productNameInput.value = '';
  productPriceInput.value = '';
  btnCancel.style.display = 'none';
}

btnCancel.addEventListener('click', resetForm);

// Inisialisasi awal
loadProducts();