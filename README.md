# clean-architecture-scaffolding README

It generates a folder structure according to your own template.
Take a look at the settings page.

## Features
 
Right-click on any folder in your project and then click "Clean Arch Scaffolding > New Feature".<br/>
![Clean Arch Scaffolding > New Feature](images/menu.png)<br/>
Enter the name of your new feature<br/>
![Give a feature name](images/feature_name.png)<br/>
The directories will be created according to the template defined in the settings.<br/>
![The folders will be created](images/folders.png)<br/>
If you want to adapt the template, go to the extension settings and edit the json with the templates.<br/>
![Like this default settings](images/settings.png)<br/>

#### You can use some keywords to indicates special locations:<br/>
- **{{root_folder}}** to first folder of your projetc;<br/>
- **{{custom_folder}}** to clicked folder;<br/>
- **{{feature_name}}** to use the given custom name;<br/>
- **{{usecase_name}}** to use a given usecase name;<br/>

#### And you can associate this keywords with some format pattern too as given below:
- **{{usecase_name.lowerCase}}** to use a given usecase name with lowercase pattern;<br/>
- **{{usecase_name.upperCase}}** to use a given usecase name with UPPERCASE pattern;<br/>  
- **{{usecase_name.snakeCase}}** to use a given usecase name with snake_case pattern (indicate to file path names);<br/>
- **{{usecase_name.pascalCase}}** to use a given usecase name with PascalCase pattern (indicate to Class names);<br/>
- **{{usecase_name.camelCase}}**  to use a given usecase name with camelCase pattern (indicate to variables names).<br/>

**Ex:** '{{custom_folder}}/{{feature_name}}/domain/usecases/{{usecase_name.snakeCase}}.template' 

![Using this folders templates](images/json.png)

## Extension Settings

* `scaffolding.layers.templates`: Array of strings with folder template definitions.

## Release Notes

### 0.0.1
- This initial version generates only the folders.
In the next versions we will also add some file templates according to the context of the clicked folder.

### 0.0.2
- some bugs corrections
### 0.0.3
- Test flag removed
- introduce the .template files with a template of a dart class file using special keywords 

**Enjoy!**