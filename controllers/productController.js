const {Product, Category} = require('../models')

class productController {
    // get all data
    static async getAllProduct (req, res, next) {
        try {
            const products = await Product.findAll({
              include: {
                model: Category,
                attributes: ['id', 'type']
              },
              attributes: ['id', 'title', 'price', 'stock']
            });
            res.json(products);
          } catch (error) {
            console.error('Error fetching products:', error);
            res.status(500).json({ message: 'Internal server error' });
          }
}

// create
    static async createProduct (req, res, next) {
    try {
      const { title, price, stock, categoryId } = req.body;
  
      // Cek apakah kategori dengan categoryId yang diberikan ada dalam database
      const category = await Category.findByPk(categoryId);
      if (!category) {
        return res.status(404).json({ message: 'Category tidak ditemukan' });
      }
      const product = await Product.create({
        title,
        price,
        stock,
        categoryId
      });
  
      res.json(product);
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  //delete
  static async deleteProduct (req, res, next) {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if (!product) {
          return res.status(404).json({ message: 'Product tidak ditemukan' });
        }
    
        await product.destroy();
    
        res.json({ message: 'Produk sukses dihapus' });
      } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    };
  
}