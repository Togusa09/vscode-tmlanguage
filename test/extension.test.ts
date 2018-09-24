// 
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as myExtension from '../src/extension';
import { FileConverter } from '../src/fileConverter';
import * as path from 'path';
import { TextDocument, workspace, window} from 'vscode';

const formatFilesPath = path.join(__dirname, '..', '..', 'test', 'testfiles');

const jsonTestFile = path.join(formatFilesPath, 'jsontest.JSON-tmLanguage');
const jsonResultFile = 'jsontest.tmLanguage';

const yamlTestFile = path.join(formatFilesPath, 'yamltest.YAML-tmLanguage');
const yamlResultFile = 'yamltest.tmLanguage';

// Defines a Mocha test suite to group tests of similar kind together
suite("File conversion tests Tests", () => {
	test('Convert from json to tmLanguage', async function() {
		const textDocument = await workspace.openTextDocument(jsonTestFile);
		const textEditor = await window.showTextDocument(textDocument);

		const fileConverter: FileConverter = new FileConverter();
		var success : boolean = await fileConverter.convertFileToTml();
		assert.equal(true, success);

		let result = path.join(path.dirname(textDocument.fileName), jsonResultFile);
		let resultDoc = workspace.textDocuments.find((doc : TextDocument) => 
			{ return doc.fileName == result;});
		var text = !!resultDoc ? resultDoc.getText() : "";
		assert.notEqual(text, "");
	});

	test('Convert from yaml to tmLanguage', async function() {
		const textDocument = await workspace.openTextDocument(yamlTestFile);
		const textEditor = await window.showTextDocument(textDocument);

		const fileConverter: FileConverter = new FileConverter();
		var success : boolean = await fileConverter.convertFileToTml();
		assert.equal(true, success);

		let result = path.join(path.dirname(textDocument.fileName), yamlResultFile);
		let resultDoc = workspace.textDocuments.find((doc : TextDocument) => 
			{ return doc.fileName == result;});
		var text = !!resultDoc ? resultDoc.getText() : "";
		assert.notEqual(text, "");
	});
});