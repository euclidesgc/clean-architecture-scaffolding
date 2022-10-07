import '../../domain/entities/product.dart';

abstract class IProductDataSource {  
  
  Future<List<Product>> getProducts();
}