import prisma from "../prisma.js";

// GET: Ambil semua data
export const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({ orderBy: { id: "asc" } });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil data produk", error: err.message });
  }
};

// POST: Tambah data baru
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
  } catch (err) {
    res.status(500).json({ message: "Gagal menambahkan produk", error: err.message });
  }
};

// PUT: Update data berdasarkan ID
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;

    const existing = await prisma.product.findUnique({ where: { id: Number(id) } });
    if (!existing) {
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }

    const updated = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        name: name || existing.name,
        price: price ? Number(price) : existing.price
      }
    });

    res.status(200).json({ message: "Produk berhasil diperbarui", data: updated });
  } catch (err) {
    res.status(500).json({ message: "Gagal memperbarui produk", error: err.message });
  }
};

// DELETE: Hapus data berdasarkan ID
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await prisma.product.findUnique({ where: { id: Number(id) } });
    if (!existing) {
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }

    await prisma.product.delete({ where: { id: Number(id) } });

    res.status(200).json({ message: "Produk berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ message: "Gagal menghapus produk", error: err.message });
  }
};
