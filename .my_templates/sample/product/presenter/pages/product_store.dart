import 'package:flutter_triple/flutter_triple.dart';

import '../../domain/entities/product.dart';
import '../../domain/usecases/get_products.dart';

class ProductStore extends StreamStore<Exception, List<Product>> {
  final GetProducts getProducts;
  ProductStore(this.getProducts) : super([]);

  Future<void> getData() async {
    setLoading(true);

    final result = await getProducts();

    await result.fold(
      (l) async => setError(l),
      (r) async => update(r),
    );

    setLoading(false);
  }
}
