import 'package:dio/dio.dart';  
import '../../infra/datasources/product_datasource.dart';
import '../../domain/entities/product.dart';

class ProductDataSourceImpl implements IProductDataSource {
  final Dio dio;

  ProductDataSourceImpl(this.dio);

  @override
  Future<List<Product>> getProducts() async {
    var response = await dio.get('url');
    return response.data;
  }
}