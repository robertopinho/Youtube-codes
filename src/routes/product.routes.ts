import { request, Router } from 'express';
import ProductRepository from '../repositories/ProductRepository';
import CreateProductService from '../services/CreateProductService';

const productRouter = Router();
const productRepository = new ProductRepository();

productRouter.get('/', (request, response) => {
  response.status(200).json(productRepository.findAll());
});

productRouter.delete('/:code', (request, response) => {
  try {
    const { code } = request.params;
    return response.status(204).json(productRepository.delete(+code))
  } catch (err) {
    return response.status(400).json({ Erro: err.message })
  }
})

productRouter.put('/:id', (request, response) => {
  try {
    const { id } = request.params;
    const { buyPrice, code, description, sellPrice, tags, lovers } = request.body;
    const updatedProduct = productRepository.update({
      id,
      buyPrice,
      code,
      description,
      sellPrice,
      tags,
      lovers
    });
  
    return response.status(200).json(updatedProduct)
  } catch (err) {
    return response.status(400).json({ Erro: err.message })
  }
})

productRouter.post('/', (request, response) => {
  try {
    const service = new CreateProductService(productRepository);
    const {
      buyPrice,
      code,
      description,
      lovers,
      sellPrice,
      tags,
      id,
    } = request.body;
    const produto = service.execute({
      buyPrice,
      code,
      description,
      lovers,
      sellPrice,
      tags,
      id,
    });
    response.status(201).json(produto);
  } catch (err) {
    return response.status(400).json({ Erro: err.message });
  }
});

export default productRouter;
