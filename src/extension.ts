import * as vscode from 'vscode';

function openWorkspaceNewWindow(uri: vscode.Uri): void {
	vscode.commands.executeCommand("vscode.openFolder", uri, { forceNewWindow: true });
}
function replaceWorkspaceWithFolder(uri: vscode.Uri): void {
	vscode.commands.executeCommand("vscode.openFolder", uri, { forceReuseWindow: true });
}

async function openFolderFiles(uri: vscode.Uri) {
}

function openFolderFilesRecursive(uri: vscode.Uri): void {
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
