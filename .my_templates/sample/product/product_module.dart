import 'package:flutter_modular/flutter_modular.dart';

import 'presenter/pages/product_page.dart';
import 'presenter/pages/product_store.dart';

class ProductModule extends Module {
  @override
  List<Bind> get binds => [
        Bind.lazySingleton((i) => ProductStore(i())),
      ];

  @override
  List<ModularRoute> get routes => [
        ChildRoute('/', child: (context, args) => const ProductPage()),
      ];
}
