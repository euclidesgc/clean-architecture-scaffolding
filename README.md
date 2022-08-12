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

You can use some keywords to indicates special locations:<br/>
- **{root_folder}** to '/lib';<br/>
- **{custom_folder}** to clicked folder;<br/>
- **{feature_name}** to use the given custom name.<br/>
**Ex:** '{root_folder}/{feature_name}/domain/usecases/'

![Using this folders templates](images/json.png)

## Extension Settings

* `scaffolding.layers.templates`: Array of strings with folder template definitions.
* `scaffolding.layers.test`: Check to create the same structure in test folder too.

## Release Notes

This initial version generates only the folders.
In the next versions we will also add some file templates according to the context of the clicked folder.


**Enjoy!**
