const vscode = require("vscode");
const lessons = {
  "def": {
    "title": "Function",
    "body": "Opens a function — a named machine you can call later. Point at the name after it. That’s what you call.",
    "python": "def"
  },
  "if": {
    "title": "If",
    "body": "A fork in the road. If the test is true, we take the next block. If not, we skip it.",
    "python": "if"
  },
  "elif": {
    "title": "Else if",
    "body": "Another fork, only reached when the if above was false. Optional. Java uses else if as two words — we skip this then.",
    "python": "elif"
  },
  "else": {
    "title": "Else",
    "body": "The other road. Everything that failed the tests above lands here.",
    "python": "else"
  },
  "while": {
    "title": "While",
    "body": "Loop. Keep running the block as long as the test stays true. Watch that the test eventually fails, or it never stops.",
    "python": "while"
  },
  "for": {
    "title": "For",
    "body": "Walk every item in a list. The name after it is each item, one at a time.",
    "python": "for"
  },
  "in": {
    "title": "In",
    "body": "Ties the for-loop name to the list. for n in list — n is each element.",
    "python": "in"
  },
  "return": {
    "title": "Return",
    "body": "Hand an answer back and leave the function. Nothing after this line in the function runs.",
    "python": "return"
  },
  "print": {
    "title": "Print",
    "body": "Write to the console. That’s how you see the work. Run, then look down.",
    "python": "print"
  },
  "True": {
    "title": "True",
    "body": "The boolean yes. A test that is this value takes the if-block.",
    "python": "True"
  },
  "False": {
    "title": "False",
    "body": "The boolean no. A test that is this value skips the if-block.",
    "python": "False"
  },
  "None": {
    "title": "Null",
    "body": "Empty on purpose. Not zero. Not a blank string. Nothing.",
    "python": "None"
  },
  "and": {
    "title": "And",
    "body": "Both sides must be true. If the left is already false, the right is not even asked.",
    "python": "and"
  },
  "or": {
    "title": "Or",
    "body": "Either side may be true. If the left is already true, the right is skipped.",
    "python": "or"
  },
  "not": {
    "title": "Not",
    "body": "Flip a test. True becomes false. False becomes true.",
    "python": "not"
  },
  "end": {
    "title": "End",
    "body": "Closes a block when this language uses end-style, like Ruby. Indent and brace languages do not need it.",
    "python": "(Python uses indent instead)"
  }
};
const langId = "robopy";

function activate(context) {
  context.subscriptions.push(
    vscode.languages.registerHoverProvider(langId, {
      provideHover(doc, pos) {
        const range = doc.getWordRangeAtPosition(pos);
        if (!range) return;
        const word = doc.getText(range);
        const lesson = lessons[word];
        if (!lesson) return;
        const md = new vscode.MarkdownString();
        md.appendMarkdown("**" + lesson.title + "** `" + word + "`\n\n");
        md.appendMarkdown(lesson.body + "\n\n");
        md.appendMarkdown("_Python: `" + lesson.python + "`_");
        return new vscode.Hover(md, range);
      },
    }),
    vscode.languages.registerCompletionItemProvider(langId, {
      provideCompletionItems() {
        return Object.keys(lessons).map((word) => {
          const item = new vscode.CompletionItem(word, vscode.CompletionItemKind.Keyword);
          item.detail = lessons[word].title;
          item.documentation = lessons[word].body;
          return item;
        });
      },
    }),
  );
}

function deactivate() {}

module.exports = { activate, deactivate };
