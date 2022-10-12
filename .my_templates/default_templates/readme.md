## Use this files with the folow "layer templates" in config params:

```
"scaffolding.layers.templates": [
    "{{root_folder}}/lib/src/{{feature_name}}/domain/usecases/{{usecase_name.snakeCase}}_usecase.template",
    "{{root_folder}}/lib/src/{{feature_name}}/domain/repositories/{{usecase_name.snakeCase}}_repository.template",
    "{{root_folder}}/lib/src/{{feature_name}}/domain/errors/",
    "{{root_folder}}/lib/src/{{feature_name}}/domain/entities/",
    "{{root_folder}}/lib/src/{{feature_name}}/infrastructure/repositories/{{usecase_name.snakeCase}}_repository_impl.template",
    "{{root_folder}}/lib/src/{{feature_name}}/infrastructure/datasources/{{usecase_name.snakeCase}}_datasource.template",
    "{{root_folder}}/lib/src/{{feature_name}}/data/models/",
    "{{root_folder}}/lib/src/{{feature_name}}/data/datasources/{{usecase_name.snakeCase}}_datasource_impl.template",
    "{{root_folder}}/lib/src/{{feature_name}}/presentation/pages/",
    "{{root_folder}}/lib/src/{{feature_name}}/presentation/widgets/"
  ]
```