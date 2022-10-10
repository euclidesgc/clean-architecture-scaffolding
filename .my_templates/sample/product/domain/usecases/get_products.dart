import 'package:dartz/dartz.dart';
import '../entities/product.dart';
import '../repositories/product_repository.dart';

abstract class IGetProducts {
  Future<Either<Exception, List<Product>>> call();
}

class GetProducts extends IGetProducts { 
  final IProductRepository repository;

  GetProducts(this.repository);

  @override
  Future<Either<Exception, List<Product>>> call() async {
    return await repository.getProducts();
  }
}