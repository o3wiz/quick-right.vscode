import * as vscode from 'vscode';

function openWorkspaceNewWindow(uri: vscode.Uri): void {
	vscode.commands.executeCommand("vscode.openFolder", uri, { forceNewWindow: true });
}

function replaceWorkspaceWithFolder(uri: vscode.Uri): void {
	vscode.commands.executeCommand("vscode.openFolder", uri, { forceReuseWindow: true });
}

async function openFileInEditor(file: vscode.Uri) {
	const document = await vscode.workspace.openTextDocument(file);
	await vscode.window.showTextDocument(document, { preview: false });
}

async function openFiles(filesPattern: vscode.RelativePattern) {
	const files = await vscode.workspace.findFiles(filesPattern);
	await Promise.all(files.map(file => openFileInEditor(file)));
}

async function openFolderFiles(uri: vscode.Uri) {
	await openFiles(new vscode.RelativePattern(uri.fsPath, "*"));
}

async function openFolderFilesRecursive(uri: vscode.Uri) {
	await openFiles(new vscode.RelativePattern(uri.fsPath, "**/*"));
}

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand("quickright.openWorkspaceNewWindow", openWorkspaceNewWindow),
		vscode.commands.registerCommand("quickright.replaceWorkspaceWithFolder", replaceWorkspaceWithFolder),
		vscode.commands.registerCommand("quickright.openFolderFiles", openFolderFiles),
		vscode.commands.registerCommand("quickright.openFolderFilesRecursive", openFolderFilesRecursive),
	);
}

export function deactivate() { }
