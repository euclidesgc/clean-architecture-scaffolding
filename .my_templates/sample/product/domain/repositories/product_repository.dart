// ignore: unused_import
import '../entities/product.dart';
import 'package:dartz/dartz.dart';


abstract class IProductRepository {
  Future<Either<Exception, List<Product>>> getProducts();
}
