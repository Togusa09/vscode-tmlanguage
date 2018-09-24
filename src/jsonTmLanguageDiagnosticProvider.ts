import * as vscode from 'vscode';
import jsonTmLanguageAnalyser from './jsonTmLanguageAnalyser';

export default class jsonTmLanguageDiagnosticProvider{

    private uuidErrors: vscode.DiagnosticCollection;

    public jsonTmLanguageDiagnosticProvider() {
        this.uuidErrors = vscode.languages.createDiagnosticCollection("languageErrors");
    }

    public CreateDiagnostics(document : vscode.TextDocument){
        let diagnostics: vscode.Diagnostic[] = [];
        let analyser = new jsonTmLanguageAnalyser();
        var guidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

        try{
            let docContent = analyser.getAnalysis(document);
            // Need to determine a mapping back to the source text for each element        
            //var guids = this.searchElements(docContent, "uuid");
            var guids = analyser.getElements("uuid");
            for(let id of guids)            {
                if (typeof(id.value) === "string" ){
                    if (!guidRegex.test(id.value)){
                        let lineRange = new vscode.Range(id.pos.first_line - 1, id.pos.first_column, id.pos.last_line - 1, id.pos.last_column);
                        diagnostics.push(new vscode.Diagnostic(lineRange, 'Invalid UUID/GUID', vscode.DiagnosticSeverity.Error));
                    }
                }
            }
            
            var sectionNames = analyser.getSectionNames();            
            let includes = analyser.getElements("include");
            
            for(let thing of includes){
                if (typeof(thing.value) !== 'string') continue;
               
                var t : string = thing.value;
                if (t.substr(0, 1) != '#') continue;
                
                var name = t.substring(1);
                if (sectionNames.indexOf(name) === -1){
                    let lineRange = new vscode.Range(thing.pos.first_line - 1, 
                        thing.pos.first_column, 
                        thing.pos.last_line - 1, 
                        thing.pos.last_column);
                    diagnostics.push(new vscode.Diagnostic(lineRange, 'Reference name was not found', vscode.DiagnosticSeverity.Error));
                }
            }
        }
        catch(err){
            if (err.hash != undefined && err.hash.loc != undefined){
                var lineRange = new vscode.Range(err.hash.loc.first_line - 1, err.hash.loc.first_column, err.hash.loc.last_line - 1, err.hash.loc.last_column);
                diagnostics.push(new vscode.Diagnostic(lineRange, err.message, vscode.DiagnosticSeverity.Error));
            }
        }
        
        this.uuidErrors.set(document.uri, diagnostics);
    }
    
    private searchElements(element: any, matchingTitle: string){
        var matchingElements: any[] = [];
        
        for(var property in element.value){
            if (property == matchingTitle){
                matchingElements.push(element.value[property])
            }
            
            var result = this.searchElements(element.value[property], matchingTitle);
            if (result.length > 0){
                matchingElements = matchingElements.concat(result);
            }
        }
        
        return matchingElements;
    }
}