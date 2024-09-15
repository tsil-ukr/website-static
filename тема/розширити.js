const tsilTmLanguage = {
    "$schema": "https://raw.githubusercontent.com/martinring/tmlanguage/master/tmlanguage.json",
    "name": "ціль",
    "patterns": [
        {
            "include": "#keywords"
        },
        {
            "include": "#strings"
        },
        {
            "include": "#constants"
        },
        {
            "include": "#comments"
        },
        {
            "include": "#functions"
        },
        {
            "include": "#types"
        },
        {
            "include": "#construct"
        },
        {
            "include": "#variables"
        }
    ],
    "repository": {
        "keywords": {
            "patterns": [
                {
                    "name": "keyword.control.tsil",
                    "match": "\\b(дія|як|ціль|мета|синонім|видалити|змінна|композиція|секція|властивість|спец|я|розширити|зовнішня|внутрішня|місцева|покласти|відкласти|варіація|структура|перебрати|якщо|чекати|взяти|вернути|інакше|біб|поки)\\b"
                }
            ]
        },
        "strings": {
            "name": "string.quoted.double.tsil",
            "begin": "\"",
            "end": "\"",
            "patterns": [
                {
                    "name": "constant.character.escape.tsil",
                    "match": "\\\\."
                }
            ]
        },
        "constants": {
            "patterns": [
                {
                    "name": "constant.numeric.tsil",
                    "match": "\\b\\d+(\\.\\d+)?\\b"
                }
            ]
        },
        "comments": {
            "patterns": [
                {
                    "name": "comment.line.tsil",
                    "match": "//.*$"
                },
                {
                    "name": "comment.block.tsil",
                    "begin": "/\\*.*",
                    "end": "\\*/"
                }
            ]
        },
        "types": {
            "patterns": [
                {
                    "name": "support.type.primitive.tsil",
                    "match": "\\b(текст|памʼять|комірка|логічне|ц8|ц16|ц32|ц64|ціле|д32|дійсне|п8|п16|ю8|п32|п64|позитивне|список|щось|ніщо|так|ні|пусто)\\b"
                }
            ]
        },
        "variables": {
            "patterns": [
                {
                    "name": "variable.other.tsil",
                    "match": "\\b(\\w+'?\\w+)\\b"
                }
            ]
        },
        "functions": {
            "patterns": [
                {
                    "begin": "([::|\\w]+)(<[::|\\w]+>)?\\(",
                    "beginCaptures": {
                        "1": {
                            "name": "entity.name.function.tsil"
                        }
                    },
                    "patterns": [
                        {
                            "include": "#keywords"
                        },
                        {
                            "include": "#strings"
                        },
                        {
                            "include": "#constants"
                        },
                        {
                            "include": "#comments"
                        },
                        {
                            "include": "#types"
                        },
                        {
                            "include": "#functions"
                        },
                        {
                            "include": "#variables"
                        }
                    ],
                    "end": "\\)"
                }
            ]
        },
        "construct": {
            "patterns": [
                {
                    "begin": "([::|\\w]+)(<[::|\\w]+>)? \\{",
                    "beginCaptures": {
                        "1": {
                            "name": "entity.name.function.tsil"
                        }
                    },
                    "patterns": [
                        {
                            "include": "#keywords"
                        },
                        {
                            "include": "#strings"
                        },
                        {
                            "include": "#constants"
                        },
                        {
                            "include": "#comments"
                        },
                        {
                            "include": "#types"
                        },
                        {
                            "include": "#functions"
                        },
                        {
                            "include": "#variables"
                        }
                    ],
                    "end": "[ |\\n|\\}]"
                }
            ]
        }
    },
    "scopeName": "source.ціль"
};

global.extendAsync = async () => {
    let highlighter = await global.shikiCreateHighlighter({
        themes: ['github-dark'],
        langs: ['cpp', 'shell', tsilTmLanguage],
    });
    md.options.highlight = (str, lang) => {
        const wrap = (content) => {
            return `<pre><div class="XDocsCodeWrapper">${content}</div></pre>`;
        };
        const code = highlighter.codeToHtml(str, {
            theme: 'github-dark',
            lang: lang,
            transformers: [
                {
                    code(node) {
                        this.addClassToHast(node, 'shikicode')
                    },
                }
            ]
        })
        return wrap(code);
    };
}