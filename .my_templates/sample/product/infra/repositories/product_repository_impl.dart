import 'package:dartz/dartz.dart';
import '../../domain/entities/product.dart';
import '../../domain/repositories/product_repository.dart';
import '../../infra/datasources/product_datasource.dart';

class ProductRepositoryImpl implements IProductRepository{
  final IProductDataSource dataSource;

  ProductRepositoryImpl(this.dataSource);

  @override
  Future<Either<Exception, List<Product>>> getProducts() async {
    try {
    final result = await dataSource.getProducts();

    return Right(result);
      
    }  on Exception catch(e) {
      return Left(e);
    }
  }
}