import 'package:flutter/material.dart';
import 'package:flutter_modular/flutter_modular.dart';
import 'package:flutter_triple/flutter_triple.dart';
import 'package:mason_example/app/modules/product/domain/entities/product.dart';

import 'product_store.dart';

class ProductPage extends StatefulWidget {
  const ProductPage({Key? key}) : super(key: key);

  @override
  State<ProductPage> createState() => _ProductPageState();
}

class _ProductPageState extends State<ProductPage> {
  var store = Modular.get<ProductStore>();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: const Text('ProductPage')),
        body: Center(
          child: ScopedBuilder<ProductStore, Exception, List<Product>>(
            store: store,
            onLoading: (context) => const CircularProgressIndicator(),
            onError: (context, error) => Text(error.toString()),
            onState: (context, state) => Text(state.toString()),
          ),
        ));
  }
}
