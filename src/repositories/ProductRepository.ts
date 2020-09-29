import Product from '../models/Product';

export default class ProductRepository {
  private products: Array<Product>;

  constructor() {
    this.products = [];
  }

  public findAll(): Array<Product> {
    return this.products;
  }

  public findByCode(code: number): Product | undefined {
    return this.products.find(v => v.code === code);
  }

  public findById(id: string): Product | undefined {
    return this.products.find(v => v.id === id);
  }

  public delete(code: number): Product | undefined {
    const product = this.findByCode(code)
    if (!product) {
      throw Error('Produto não encontrado')
    }
    const index = this.products.findIndex((v) => v.code == code)
    this.products.splice(index, 1)
    return product

  }

  public update({ id, buyPrice, code, description, sellPrice, tags}: Product): Product | undefined {
    const product = this.findById(id)
    if (!product) {
      throw Error('Produto não encontrado')
    }

    product.buyPrice = buyPrice;
    product.code = code;
    product.description = description;
    product.sellPrice = sellPrice;
    product.tags = tags;
    return product


  }

  public save({
    buyPrice,
    code,
    description,
    lovers,
    sellPrice,
    tags,
  }: Product): Product {
    const product = new Product({
      buyPrice,
      code,
      description,
      lovers,
      sellPrice,
      tags,
    });
    this.products.push(product);
    return product;
  }

}
