import '../../domain/entities/product.dart';

class ProductMapper {
  ProductMapper();

  Product fromMap(Map<String, dynamic> map) {
    return Product(
      id: map['id'],
      name: map['name'],
    );
  }

  Map<String, dynamic> toMap(Product product) {
    return {
      'id': product.id,
      'name': product.name,
    };
  }
}