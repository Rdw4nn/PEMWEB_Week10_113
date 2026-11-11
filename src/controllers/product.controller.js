import prisma from '../lib/prisma.js';

// GET: Ambil seluruh data dari PostgreSQL
export const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { id: 'asc' }
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data", error: error.message });
  }
};

// POST: Tambah data baru ke PostgreSQL
export const createProduct = async (req, res) => {
  try {
    const { name, price } = req.body;
    if (!name || !price) {
      return res.status(400).json({ message: "Nama dan harga wajib diisi!" });
    }

    const newProduct = await prisma.product.create({
      data: {
        name,
        price: Number(price)
      }
    });

    res.status(201).json({ message: "Produk berhasil ditambahkan", data: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Gagal menambah data", error: error.message });
  }
};

// PUT: Update data berdasarkan ID
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;

    const updatedProduct = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        ...(name && { name }),
        ...(price && { price: Number(price) })
      }
    });

    res.status(200).json({ message: "Produk berhasil diperbarui", data: updatedProduct });
  } catch (error) {
    res.status(404).json({ message: "Produk tidak ditemukan atau gagal diperbarui", error: error.message });
  }
};

// DELETE: Hapus data berdasarkan ID
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.product.delete({
      where: { id: Number(id) }
    });

    res.status(200).json({ message: "Produk berhasil dihapus" });
  } catch (error) {
    res.status(404).json({ message: "Produk tidak ditemukan atau gagal dihapus", error: error.message });
  }
};