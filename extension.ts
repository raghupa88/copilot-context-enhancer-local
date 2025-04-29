import * as vscode from "vscode";
import { enrichPrompt } from "./langchainAgent";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand("copilot-context-enhancer.enhancePrompt", async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showErrorMessage("No active editor");
      return;
    }

    const selectedText = editor.document.getText(editor.selection) || await vscode.window.showInputBox({ prompt: "Enter your prompt" });
    if (!selectedText) return;

    vscode.window.withProgress({ location: vscode.ProgressLocation.Notification, title: "Enhancing prompt..." }, async () => {
      try {
        const enriched = await enrichPrompt(selectedText);
        editor.edit(editBuilder => {
          editBuilder.replace(editor.selection, enriched);
        });
      } catch (err) {
        vscode.window.showErrorMessage("Error enriching prompt: " + err);
      }
    });
  });

  context.subscriptions.push(disposable);
}
