# TextMate/Sublime Language Definition for VSCode

This package provides syntax highlighting for the SublimeText JSON/YAML tmlanguage files in VsCode. The syntax highlighting uses 
tmLanguage files sourced from https://github.com/SublimeText/PackageDev. Coffee script language information is sourced from https://github.com/aponxi/sublime-better-coffeescript/blob/master/CoffeeScript.tmLanguage

This package can now convert between JSON/YAML and standard PLIST tmLanguage files.
 
The functionality in this extension is inspired by SublimeText PackageDev, and the lack functionality around tmLanguage files, even though
it's a recommended format for VSCODE syntax highlighting.

## Currently Included

### Syntax Highlighting and Snippets for `tmLanguage.json` files
![JSON-tmLanguage](/images/json_sample.png)

### Syntax Highlighting and Snippets for `tmLanguage.yml` files
![YAML-tmLanguage](/images/yaml_sample.png)

### Conversion between tmLanguage file variants
![Available Commands](/images/commands_sample.png)

Included commands are:
- Convert to tmLanguage.json file - Converts to JSON from YAML/PLIST
- Convert to tmLanguage file - Converts to PLIST from YAML/JSON
- Convert to tmLanguage.yml file - Converts to YAML from JSON/PLIST

# Settings
tmLanguage.replaceExistingFile - Whether the conversion replaces the existing file or creates a new one. Defaults to true

Please raise any issues with this extension through [GitHub](https://github.com/Togusa09/vscode-tmlanguage/issues)
