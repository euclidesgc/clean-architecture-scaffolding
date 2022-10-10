# Clean Architecture Scaffolding README
## This extension is working in progress, the version 1.0.0 will be the stable version. 

It generates a folder structure according to your own template.
Take a look at the settings page.

#### If this extension was useful to you, please, give it five stars. <br/>By doing this you help other devs to standardize their code making the work much better for the whole community.<br/>Think about it.

## Features
### STEP 01: <br/> 
Right-click on any folder in your project and then click "Clean Arch Scaffolding.: Create folders".<br/><br/>
![Clean Arch Scaffolding > New Feature](images/menu_folder.png)<br/>

Enter the name of your New feature:<br/><br/>
![Give a feature name](images/feature_name.png)<br/>

The directories will be created according to the template defined in the settings.<br/>
![The folders will be created](images/folders.png)<br/>
### STEP 02: <br/> 
Right-click in folder called 'usecase' (Don't worry, we use regex to identify any folder with usecase in the name to show this menu option!) then click "Clean Arch Scaffolding.: New usecase".<br/> 
![Clean Arch Scaffolding > New Feature](images/menu_usecase.png)<br/>

If the my templates folder does not exist, a dialog will open asking you to download some examples from the web.<br />
Click Yes and the folder will be created with the templates inside.

![Create templates](images/create_templates.png)<br/>

Try again and repeat this last step.
A dialog will appear asking for your use case name.

![usecase name](images/usecase_name.png)<br/>

The source files will be created in accord with templates in folder ".my_templates" of your project: <br/>
![Folder template](images/templates_folder.png)<br/>

You can write the template file using special keywords.<br/>
Look this sample:<br/>
![Template file](images/template_file.png)<br/>
#### Write your own templates and share with us:
Search this repository for more templates.:<br/>
https://github.com/euclidesgc/clean-architecture-scaffolding/tree/main/.my_templates

### Settings:
If you want to adapt the template, go to the extension settings and edit the json with the templates.<br/>
![Like this default settings](images/settings.png)<br/>

#### You can use this special keywords to indicates some locations:<br/>
- **{{package_name}}** to get name of your package in pubspec.yaml file;<br/>
- **{{root_folder}}** to first folder of your projetc;<br/>
- **{{custom_folder}}** to clicked folder;<br/>
- **{{feature_name}}** to use the given custom name;<br/>
- **{{usecase_name}}** to use a given usecase name;<br/>

#### And you can associate this keywords with this format pattern too as given below:
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
- Test flag removed;
- introduce the .template files with a template of a dart class file using special keywords;
  
### 0.0.5
- New special keyword "{{package_name}} added to help you with imports lines in templates file;
- New templates files in repository.

### 0.0.6
- bugfix related to pubspec.yaml, mandatory to get the package name.

### 0.0.7
- remove warnig messages.

### 0.0.8
- removing problematic access to pubspec.yaml

### 0.0.9
- Dowload default templates from repository


**Enjoy!**