import { acorn } from '../../acorn/index.js';
import {
    describe,
    it
} from 'mocha';
import {
    expect,
    use,
} from 'chai';

import chaiProperties from 'chai-properties';
use(chaiProperties);

let index = 0;

describe('acorn-x code 基础测试', () => {
    const test = (code, correctAst, options) => {
        it(`成功测试${index++}`, () => {
            const ast = acorn.parse(code, { ...options, locations: true });
            expect(ast).to.deep.have.properties(correctAst);
        }).timeout(5000);
    }

    const testFail = (code, errorMsg) => {
        it(`失败测试${index++}`, () => {
            let err = null;
            try {
                acorn.parse(code)
            } catch (e) {
                err = e;
            }
            console.log(code);
            expect(err.message).to.equal(errorMsg);
        }).timeout(5000);
    }


    test("this\n", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "ThisExpression",
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 4
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 4
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 2,
                column: 0
            }
        }
    });

    test("null\n", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "Literal",
                value: null,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 4
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 4
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 2,
                column: 0
            }
        }
    });

    test("\n    42\n\n", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "Literal",
                value: 42,
                loc: {
                    start: {
                        line: 2,
                        column: 4
                    },
                    end: {
                        line: 2,
                        column: 6
                    }
                }
            },
            loc: {
                start: {
                    line: 2,
                    column: 4
                },
                end: {
                    line: 2,
                    column: 6
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 4,
                column: 0
            }
        }
    });

    test("/foobar/", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "Literal",
                value: /foobar/,
                regex: {
                    pattern: "foobar",
                    flags: ""
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 8
                    }
                }
            }
        }]
    });

    test("/[a-z]/g", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "Literal",
                value: /[a-z]/g,
                regex: {
                    pattern: "[a-z]",
                    flags: "g"
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 8
                    }
                }
            }
        }]
    });

    test("(1 + 2 ) * 3", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "BinaryExpression",
                left: {
                    type: "BinaryExpression",
                    left: {
                        type: "Literal",
                        value: 1,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 2
                            }
                        }
                    },
                    operator: "+",
                    right: {
                        type: "Literal",
                        value: 2,
                        loc: {
                            start: {
                                line: 1,
                                column: 5
                            },
                            end: {
                                line: 1,
                                column: 6
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 1,
                            column: 1
                        },
                        end: {
                            line: 1,
                            column: 6
                        }
                    }
                },
                operator: "*",
                right: {
                    type: "Literal",
                    value: 3,
                    loc: {
                        start: {
                            line: 1,
                            column: 11
                        },
                        end: {
                            line: 1,
                            column: 12
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 12
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 12
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 12
            }
        }
    });

    test("(1 + 2 ) * 3", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "BinaryExpression",
                left: {
                    type: "ParenthesizedExpression",
                    expression: {
                        type: "BinaryExpression",
                        left: {
                            type: "Literal",
                            value: 1,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 2
                                }
                            }
                        },
                        operator: "+",
                        right: {
                            type: "Literal",
                            value: 2,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 5
                                },
                                end: {
                                    line: 1,
                                    column: 6
                                }
                            }
                        },
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 6
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 8
                        }
                    }
                },
                operator: "*",
                right: {
                    type: "Literal",
                    value: 3,
                    loc: {
                        start: {
                            line: 1,
                            column: 11
                        },
                        end: {
                            line: 1,
                            column: 12
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 12
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 12
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 12
            }
        }
    }, {
        locations: true,
        preserveParens: true
    });

    test("(x) = 123", {
        "type": "Program",
        "start": 0,
        "end": 9,
        "loc": {
            "start": {
                "line": 1,
                "column": 0
            },
            "end": {
                "line": 1,
                "column": 9
            }
        },
        "body": [
            {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 9,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 9
                    }
                },
                "expression": {
                    "type": "AssignmentExpression",
                    "start": 0,
                    "end": 9,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 9
                        }
                    },
                    "operator": "=",
                    "left": {
                        "type": "Identifier",
                        "start": 1,
                        "end": 2,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 1
                            },
                            "end": {
                                "line": 1,
                                "column": 2
                            }
                        },
                        "name": "x"
                    },
                    "right": {
                        "type": "Literal",
                        "start": 6,
                        "end": 9,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 6
                            },
                            "end": {
                                "line": 1,
                                "column": 9
                            }
                        },
                        "value": 123,
                        "raw": "123"
                    }
                }
            }
        ]
    });

    test("x = []", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "AssignmentExpression",
                operator: "=",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                right: {
                    type: "ArrayExpression",
                    elements: [],
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 6
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 6
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 6
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 6
            }
        }
    });

    test("x = [ ]", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "AssignmentExpression",
                operator: "=",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                right: {
                    type: "ArrayExpression",
                    elements: [],
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 7
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 7
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 7
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 7
            }
        }
    });

    test("x = [ 42 ]", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "AssignmentExpression",
                operator: "=",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                right: {
                    type: "ArrayExpression",
                    elements: [{
                        type: "Literal",
                        value: 42,
                        loc: {
                            start: {
                                line: 1,
                                column: 6
                            },
                            end: {
                                line: 1,
                                column: 8
                            }
                        }
                    }],
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 10
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 10
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 10
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 10
            }
        }
    });

    test("x = [ 42, ]", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "AssignmentExpression",
                operator: "=",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                right: {
                    type: "ArrayExpression",
                    elements: [{
                        type: "Literal",
                        value: 42,
                        loc: {
                            start: {
                                line: 1,
                                column: 6
                            },
                            end: {
                                line: 1,
                                column: 8
                            }
                        }
                    }],
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 11
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 11
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 11
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 11
            }
        }
    });

    test("x = [ ,, 42 ]", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "AssignmentExpression",
                operator: "=",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                right: {
                    type: "ArrayExpression",
                    elements: [
                        null,
                        null,
                        {
                            type: "Literal",
                            value: 42,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 9
                                },
                                end: {
                                    line: 1,
                                    column: 11
                                }
                            }
                        }
                    ],
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 13
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 13
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 13
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 13
            }
        }
    });

    test("x = [ 1, 2, 3, ]", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "AssignmentExpression",
                operator: "=",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                right: {
                    type: "ArrayExpression",
                    elements: [{
                            type: "Literal",
                            value: 1,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 6
                                },
                                end: {
                                    line: 1,
                                    column: 7
                                }
                            }
                        },
                        {
                            type: "Literal",
                            value: 2,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 9
                                },
                                end: {
                                    line: 1,
                                    column: 10
                                }
                            }
                        },
                        {
                            type: "Literal",
                            value: 3,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 12
                                },
                                end: {
                                    line: 1,
                                    column: 13
                                }
                            }
                        }
                    ],
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 16
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 16
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 16
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 16
            }
        }
    });

    test("x = [ 1, 2,, 3, ]", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "AssignmentExpression",
                operator: "=",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                right: {
                    type: "ArrayExpression",
                    elements: [{
                            type: "Literal",
                            value: 1,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 6
                                },
                                end: {
                                    line: 1,
                                    column: 7
                                }
                            }
                        },
                        {
                            type: "Literal",
                            value: 2,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 9
                                },
                                end: {
                                    line: 1,
                                    column: 10
                                }
                            }
                        },
                        null,
                        {
                            type: "Literal",
                            value: 3,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 13
                                },
                                end: {
                                    line: 1,
                                    column: 14
                                }
                            }
                        }
                    ],
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 17
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 17
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 17
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 17
            }
        }
    });

    test("日本語 = []", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "AssignmentExpression",
                operator: "=",
                left: {
                    type: "Identifier",
                    name: "日本語",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 3
                        }
                    }
                },
                right: {
                    type: "ArrayExpression",
                    elements: [],
                    loc: {
                        start: {
                            line: 1,
                            column: 6
                        },
                        end: {
                            line: 1,
                            column: 8
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 8
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 8
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 8
            }
        }
    });

    test("T‿ = []", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "AssignmentExpression",
                operator: "=",
                left: {
                    type: "Identifier",
                    name: "T‿",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 2
                        }
                    }
                },
                right: {
                    type: "ArrayExpression",
                    elements: [],
                    loc: {
                        start: {
                            line: 1,
                            column: 5
                        },
                        end: {
                            line: 1,
                            column: 7
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 7
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 7
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 7
            }
        }
    });

    test("T‌ = []", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "AssignmentExpression",
                operator: "=",
                left: {
                    type: "Identifier",
                    name: "T‌",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 2
                        }
                    }
                },
                right: {
                    type: "ArrayExpression",
                    elements: [],
                    loc: {
                        start: {
                            line: 1,
                            column: 5
                        },
                        end: {
                            line: 1,
                            column: 7
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 7
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 7
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 7
            }
        }
    });

    test("T‍ = []", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "AssignmentExpression",
                operator: "=",
                left: {
                    type: "Identifier",
                    name: "T‍",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 2
                        }
                    }
                },
                right: {
                    type: "ArrayExpression",
                    elements: [],
                    loc: {
                        start: {
                            line: 1,
                            column: 5
                        },
                        end: {
                            line: 1,
                            column: 7
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 7
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 7
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 7
            }
        }
    });

    test("x = {}", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "AssignmentExpression",
                operator: "=",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                right: {
                    type: "ObjectExpression",
                    properties: [],
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 6
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 6
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 6
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 6
            }
        }
    });

    test("x = { }", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "AssignmentExpression",
                operator: "=",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                right: {
                    type: "ObjectExpression",
                    properties: [],
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 7
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 7
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 7
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 7
            }
        }
    });

    test("x = { answer: 42 }", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "AssignmentExpression",
                operator: "=",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                right: {
                    type: "ObjectExpression",
                    properties: [{
                        type: "Property",
                        key: {
                            type: "Identifier",
                            name: "answer",
                            loc: {
                                start: {
                                    line: 1,
                                    column: 6
                                },
                                end: {
                                    line: 1,
                                    column: 12
                                }
                            }
                        },
                        value: {
                            type: "Literal",
                            value: 42,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 14
                                },
                                end: {
                                    line: 1,
                                    column: 16
                                }
                            }
                        },
                        kind: "init"
                    }],
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 18
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 18
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 18
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 18
            }
        }
    });

    test("x = { if: 42 }", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "AssignmentExpression",
                operator: "=",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                right: {
                    type: "ObjectExpression",
                    properties: [{
                        type: "Property",
                        key: {
                            type: "Identifier",
                            name: "if",
                            loc: {
                                start: {
                                    line: 1,
                                    column: 6
                                },
                                end: {
                                    line: 1,
                                    column: 8
                                }
                            }
                        },
                        value: {
                            type: "Literal",
                            value: 42,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 10
                                },
                                end: {
                                    line: 1,
                                    column: 12
                                }
                            }
                        },
                        kind: "init"
                    }],
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 14
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 14
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 14
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 14
            }
        }
    });

    test("x = { true: 42 }", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "AssignmentExpression",
                operator: "=",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                right: {
                    type: "ObjectExpression",
                    properties: [{
                        type: "Property",
                        key: {
                            type: "Identifier",
                            name: "true",
                            loc: {
                                start: {
                                    line: 1,
                                    column: 6
                                },
                                end: {
                                    line: 1,
                                    column: 10
                                }
                            }
                        },
                        value: {
                            type: "Literal",
                            value: 42,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 12
                                },
                                end: {
                                    line: 1,
                                    column: 14
                                }
                            }
                        },
                        kind: "init"
                    }],
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 16
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 16
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 16
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 16
            }
        }
    });

    test("x = { false: 42 }", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "AssignmentExpression",
                operator: "=",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                right: {
                    type: "ObjectExpression",
                    properties: [{
                        type: "Property",
                        key: {
                            type: "Identifier",
                            name: "false",
                            loc: {
                                start: {
                                    line: 1,
                                    column: 6
                                },
                                end: {
                                    line: 1,
                                    column: 11
                                }
                            }
                        },
                        value: {
                            type: "Literal",
                            value: 42,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 13
                                },
                                end: {
                                    line: 1,
                                    column: 15
                                }
                            }
                        },
                        kind: "init"
                    }],
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 17
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 17
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 17
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 17
            }
        }
    });

    test("x = { null: 42 }", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "AssignmentExpression",
                operator: "=",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                right: {
                    type: "ObjectExpression",
                    properties: [{
                        type: "Property",
                        key: {
                            type: "Identifier",
                            name: "null",
                            loc: {
                                start: {
                                    line: 1,
                                    column: 6
                                },
                                end: {
                                    line: 1,
                                    column: 10
                                }
                            }
                        },
                        value: {
                            type: "Literal",
                            value: 42,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 12
                                },
                                end: {
                                    line: 1,
                                    column: 14
                                }
                            }
                        },
                        kind: "init"
                    }],
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 16
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 16
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 16
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 16
            }
        }
    });

    test("x = { \"answer\": 42 }", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "AssignmentExpression",
                operator: "=",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                right: {
                    type: "ObjectExpression",
                    properties: [{
                        type: "Property",
                        key: {
                            type: "Literal",
                            value: "answer",
                            loc: {
                                start: {
                                    line: 1,
                                    column: 6
                                },
                                end: {
                                    line: 1,
                                    column: 14
                                }
                            }
                        },
                        value: {
                            type: "Literal",
                            value: 42,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 16
                                },
                                end: {
                                    line: 1,
                                    column: 18
                                }
                            }
                        },
                        kind: "init"
                    }],
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 20
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 20
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 20
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 20
            }
        }
    });

    test("x = { x: 1, x: 2 }", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "AssignmentExpression",
                operator: "=",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                right: {
                    type: "ObjectExpression",
                    properties: [{
                            type: "Property",
                            key: {
                                type: "Identifier",
                                name: "x",
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 6
                                    },
                                    end: {
                                        line: 1,
                                        column: 7
                                    }
                                }
                            },
                            value: {
                                type: "Literal",
                                value: 1,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 9
                                    },
                                    end: {
                                        line: 1,
                                        column: 10
                                    }
                                }
                            },
                            kind: "init"
                        },
                        {
                            type: "Property",
                            key: {
                                type: "Identifier",
                                name: "x",
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 12
                                    },
                                    end: {
                                        line: 1,
                                        column: 13
                                    }
                                }
                            },
                            value: {
                                type: "Literal",
                                value: 2,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 15
                                    },
                                    end: {
                                        line: 1,
                                        column: 16
                                    }
                                }
                            },
                            kind: "init"
                        }
                    ],
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 18
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 18
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 18
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 18
            }
        }
    });

    test("x = { get width() { return m_width } }", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "AssignmentExpression",
                operator: "=",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                right: {
                    type: "ObjectExpression",
                    properties: [{
                        type: "Property",
                        key: {
                            type: "Identifier",
                            name: "width",
                            loc: {
                                start: {
                                    line: 1,
                                    column: 10
                                },
                                end: {
                                    line: 1,
                                    column: 15
                                }
                            }
                        },
                        kind: "get",
                        value: {
                            type: "FunctionExpression",
                            id: null,
                            params: [],
                            body: {
                                type: "BlockStatement",
                                body: [{
                                    type: "ReturnStatement",
                                    argument: {
                                        type: "Identifier",
                                        name: "m_width",
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 27
                                            },
                                            end: {
                                                line: 1,
                                                column: 34
                                            }
                                        }
                                    },
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 20
                                        },
                                        end: {
                                            line: 1,
                                            column: 34
                                        }
                                    }
                                }],
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 18
                                    },
                                    end: {
                                        line: 1,
                                        column: 36
                                    }
                                }
                            },
                            loc: {
                                start: {
                                    line: 1,
                                    column: 15
                                },
                                end: {
                                    line: 1,
                                    column: 36
                                }
                            }
                        }
                    }],
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 38
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 38
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 38
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 38
            }
        }
    });

    test("x = { get undef() {} }", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "AssignmentExpression",
                operator: "=",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                right: {
                    type: "ObjectExpression",
                    properties: [{
                        type: "Property",
                        key: {
                            type: "Identifier",
                            name: "undef",
                            loc: {
                                start: {
                                    line: 1,
                                    column: 10
                                },
                                end: {
                                    line: 1,
                                    column: 15
                                }
                            }
                        },
                        kind: "get",
                        value: {
                            type: "FunctionExpression",
                            id: null,
                            params: [],
                            body: {
                                type: "BlockStatement",
                                body: [],
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 18
                                    },
                                    end: {
                                        line: 1,
                                        column: 20
                                    }
                                }
                            },
                            loc: {
                                start: {
                                    line: 1,
                                    column: 15
                                },
                                end: {
                                    line: 1,
                                    column: 20
                                }
                            }
                        }
                    }],
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 22
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 22
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 22
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 22
            }
        }
    });

    test("x = { get if() {} }", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "AssignmentExpression",
                operator: "=",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                right: {
                    type: "ObjectExpression",
                    properties: [{
                        type: "Property",
                        key: {
                            type: "Identifier",
                            name: "if",
                            loc: {
                                start: {
                                    line: 1,
                                    column: 10
                                },
                                end: {
                                    line: 1,
                                    column: 12
                                }
                            }
                        },
                        kind: "get",
                        value: {
                            type: "FunctionExpression",
                            id: null,
                            params: [],
                            body: {
                                type: "BlockStatement",
                                body: [],
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 15
                                    },
                                    end: {
                                        line: 1,
                                        column: 17
                                    }
                                }
                            },
                            loc: {
                                start: {
                                    line: 1,
                                    column: 12
                                },
                                end: {
                                    line: 1,
                                    column: 17
                                }
                            }
                        }
                    }],
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 19
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 19
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 19
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 19
            }
        }
    });

    test("x = { get true() {} }", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "AssignmentExpression",
                operator: "=",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                right: {
                    type: "ObjectExpression",
                    properties: [{
                        type: "Property",
                        key: {
                            type: "Identifier",
                            name: "true",
                            loc: {
                                start: {
                                    line: 1,
                                    column: 10
                                },
                                end: {
                                    line: 1,
                                    column: 14
                                }
                            }
                        },
                        kind: "get",
                        value: {
                            type: "FunctionExpression",
                            id: null,
                            params: [],
                            body: {
                                type: "BlockStatement",
                                body: [],
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 17
                                    },
                                    end: {
                                        line: 1,
                                        column: 19
                                    }
                                }
                            },
                            loc: {
                                start: {
                                    line: 1,
                                    column: 14
                                },
                                end: {
                                    line: 1,
                                    column: 19
                                }
                            }
                        }
                    }],
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 21
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 21
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 21
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 21
            }
        }
    });

    test("x = { get false() {} }", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "AssignmentExpression",
                operator: "=",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                right: {
                    type: "ObjectExpression",
                    properties: [{
                        type: "Property",
                        key: {
                            type: "Identifier",
                            name: "false",
                            loc: {
                                start: {
                                    line: 1,
                                    column: 10
                                },
                                end: {
                                    line: 1,
                                    column: 15
                                }
                            }
                        },
                        kind: "get",
                        value: {
                            type: "FunctionExpression",
                            id: null,
                            params: [],
                            body: {
                                type: "BlockStatement",
                                body: [],
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 18
                                    },
                                    end: {
                                        line: 1,
                                        column: 20
                                    }
                                }
                            },
                            loc: {
                                start: {
                                    line: 1,
                                    column: 15
                                },
                                end: {
                                    line: 1,
                                    column: 20
                                }
                            }
                        }
                    }],
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 22
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 22
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 22
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 22
            }
        }
    });

    test("x = { get null() {} }", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "AssignmentExpression",
                operator: "=",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                right: {
                    type: "ObjectExpression",
                    properties: [{
                        type: "Property",
                        key: {
                            type: "Identifier",
                            name: "null",
                            loc: {
                                start: {
                                    line: 1,
                                    column: 10
                                },
                                end: {
                                    line: 1,
                                    column: 14
                                }
                            }
                        },
                        kind: "get",
                        value: {
                            type: "FunctionExpression",
                            id: null,
                            params: [],
                            body: {
                                type: "BlockStatement",
                                body: [],
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 17
                                    },
                                    end: {
                                        line: 1,
                                        column: 19
                                    }
                                }
                            },
                            loc: {
                                start: {
                                    line: 1,
                                    column: 14
                                },
                                end: {
                                    line: 1,
                                    column: 19
                                }
                            }
                        }
                    }],
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 21
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 21
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 21
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 21
            }
        }
    });

    test("x = { get \"undef\"() {} }", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "AssignmentExpression",
                operator: "=",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                right: {
                    type: "ObjectExpression",
                    properties: [{
                        type: "Property",
                        key: {
                            type: "Literal",
                            value: "undef",
                            loc: {
                                start: {
                                    line: 1,
                                    column: 10
                                },
                                end: {
                                    line: 1,
                                    column: 17
                                }
                            }
                        },
                        kind: "get",
                        value: {
                            type: "FunctionExpression",
                            id: null,
                            params: [],
                            body: {
                                type: "BlockStatement",
                                body: [],
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 20
                                    },
                                    end: {
                                        line: 1,
                                        column: 22
                                    }
                                }
                            },
                            loc: {
                                start: {
                                    line: 1,
                                    column: 17
                                },
                                end: {
                                    line: 1,
                                    column: 22
                                }
                            }
                        }
                    }],
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 24
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 24
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 24
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 24
            }
        }
    });

    test("x = { get 10() {} }", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "AssignmentExpression",
                operator: "=",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                right: {
                    type: "ObjectExpression",
                    properties: [{
                        type: "Property",
                        key: {
                            type: "Literal",
                            value: 10,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 10
                                },
                                end: {
                                    line: 1,
                                    column: 12
                                }
                            }
                        },
                        kind: "get",
                        value: {
                            type: "FunctionExpression",
                            id: null,
                            params: [],
                            body: {
                                type: "BlockStatement",
                                body: [],
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 15
                                    },
                                    end: {
                                        line: 1,
                                        column: 17
                                    }
                                }
                            },
                            loc: {
                                start: {
                                    line: 1,
                                    column: 12
                                },
                                end: {
                                    line: 1,
                                    column: 17
                                }
                            }
                        }
                    }],
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 19
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 19
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 19
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 19
            }
        }
    });

    test("x = { set width(w) { m_width = w } }", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "AssignmentExpression",
                operator: "=",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                right: {
                    type: "ObjectExpression",
                    properties: [{
                        type: "Property",
                        key: {
                            type: "Identifier",
                            name: "width",
                            loc: {
                                start: {
                                    line: 1,
                                    column: 10
                                },
                                end: {
                                    line: 1,
                                    column: 15
                                }
                            }
                        },
                        kind: "set",
                        value: {
                            type: "FunctionExpression",
                            id: null,
                            params: [{
                                type: "Identifier",
                                name: "w",
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 16
                                    },
                                    end: {
                                        line: 1,
                                        column: 17
                                    }
                                }
                            }],
                            body: {
                                type: "BlockStatement",
                                body: [{
                                    type: "ExpressionStatement",
                                    expression: {
                                        type: "AssignmentExpression",
                                        operator: "=",
                                        left: {
                                            type: "Identifier",
                                            name: "m_width",
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 21
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 28
                                                }
                                            }
                                        },
                                        right: {
                                            type: "Identifier",
                                            name: "w",
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 31
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 32
                                                }
                                            }
                                        },
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 21
                                            },
                                            end: {
                                                line: 1,
                                                column: 32
                                            }
                                        }
                                    },
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 21
                                        },
                                        end: {
                                            line: 1,
                                            column: 32
                                        }
                                    }
                                }],
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 19
                                    },
                                    end: {
                                        line: 1,
                                        column: 34
                                    }
                                }
                            },
                            loc: {
                                start: {
                                    line: 1,
                                    column: 15
                                },
                                end: {
                                    line: 1,
                                    column: 34
                                }
                            }
                        }
                    }],
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 36
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 36
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 36
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 36
            }
        }
    });

    test("x = { set if(w) { m_if = w } }", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "AssignmentExpression",
                operator: "=",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                right: {
                    type: "ObjectExpression",
                    properties: [{
                        type: "Property",
                        key: {
                            type: "Identifier",
                            name: "if",
                            loc: {
                                start: {
                                    line: 1,
                                    column: 10
                                },
                                end: {
                                    line: 1,
                                    column: 12
                                }
                            }
                        },
                        kind: "set",
                        value: {
                            type: "FunctionExpression",
                            id: null,
                            params: [{
                                type: "Identifier",
                                name: "w",
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 13
                                    },
                                    end: {
                                        line: 1,
                                        column: 14
                                    }
                                }
                            }],
                            body: {
                                type: "BlockStatement",
                                body: [{
                                    type: "ExpressionStatement",
                                    expression: {
                                        type: "AssignmentExpression",
                                        operator: "=",
                                        left: {
                                            type: "Identifier",
                                            name: "m_if",
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 18
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 22
                                                }
                                            }
                                        },
                                        right: {
                                            type: "Identifier",
                                            name: "w",
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 25
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 26
                                                }
                                            }
                                        },
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 18
                                            },
                                            end: {
                                                line: 1,
                                                column: 26
                                            }
                                        }
                                    },
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 18
                                        },
                                        end: {
                                            line: 1,
                                            column: 26
                                        }
                                    }
                                }],
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 16
                                    },
                                    end: {
                                        line: 1,
                                        column: 28
                                    }
                                }
                            },
                            loc: {
                                start: {
                                    line: 1,
                                    column: 12
                                },
                                end: {
                                    line: 1,
                                    column: 28
                                }
                            }
                        }
                    }],
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 30
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 30
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 30
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 30
            }
        }
    });

    test("x = { set true(w) { m_true = w } }", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "AssignmentExpression",
                operator: "=",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                right: {
                    type: "ObjectExpression",
                    properties: [{
                        type: "Property",
                        key: {
                            type: "Identifier",
                            name: "true",
                            loc: {
                                start: {
                                    line: 1,
                                    column: 10
                                },
                                end: {
                                    line: 1,
                                    column: 14
                                }
                            }
                        },
                        kind: "set",
                        value: {
                            type: "FunctionExpression",
                            id: null,
                            params: [{
                                type: "Identifier",
                                name: "w",
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 15
                                    },
                                    end: {
                                        line: 1,
                                        column: 16
                                    }
                                }
                            }],
                            body: {
                                type: "BlockStatement",
                                body: [{
                                    type: "ExpressionStatement",
                                    expression: {
                                        type: "AssignmentExpression",
                                        operator: "=",
                                        left: {
                                            type: "Identifier",
                                            name: "m_true",
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 20
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 26
                                                }
                                            }
                                        },
                                        right: {
                                            type: "Identifier",
                                            name: "w",
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 29
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 30
                                                }
                                            }
                                        },
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 20
                                            },
                                            end: {
                                                line: 1,
                                                column: 30
                                            }
                                        }
                                    },
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 20
                                        },
                                        end: {
                                            line: 1,
                                            column: 30
                                        }
                                    }
                                }],
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 18
                                    },
                                    end: {
                                        line: 1,
                                        column: 32
                                    }
                                }
                            },
                            loc: {
                                start: {
                                    line: 1,
                                    column: 14
                                },
                                end: {
                                    line: 1,
                                    column: 32
                                }
                            }
                        }
                    }],
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 34
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 34
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 34
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 34
            }
        }
    });

    test("x = { set false(w) { m_false = w } }", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "AssignmentExpression",
                operator: "=",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                right: {
                    type: "ObjectExpression",
                    properties: [{
                        type: "Property",
                        key: {
                            type: "Identifier",
                            name: "false",
                            loc: {
                                start: {
                                    line: 1,
                                    column: 10
                                },
                                end: {
                                    line: 1,
                                    column: 15
                                }
                            }
                        },
                        kind: "set",
                        value: {
                            type: "FunctionExpression",
                            id: null,
                            params: [{
                                type: "Identifier",
                                name: "w",
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 16
                                    },
                                    end: {
                                        line: 1,
                                        column: 17
                                    }
                                }
                            }],
                            body: {
                                type: "BlockStatement",
                                body: [{
                                    type: "ExpressionStatement",
                                    expression: {
                                        type: "AssignmentExpression",
                                        operator: "=",
                                        left: {
                                            type: "Identifier",
                                            name: "m_false",
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 21
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 28
                                                }
                                            }
                                        },
                                        right: {
                                            type: "Identifier",
                                            name: "w",
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 31
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 32
                                                }
                                            }
                                        },
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 21
                                            },
                                            end: {
                                                line: 1,
                                                column: 32
                                            }
                                        }
                                    },
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 21
                                        },
                                        end: {
                                            line: 1,
                                            column: 32
                                        }
                                    }
                                }],
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 19
                                    },
                                    end: {
                                        line: 1,
                                        column: 34
                                    }
                                }
                            },
                            loc: {
                                start: {
                                    line: 1,
                                    column: 15
                                },
                                end: {
                                    line: 1,
                                    column: 34
                                }
                            }
                        }
                    }],
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 36
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 36
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 36
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 36
            }
        }
    });

    test("x = { set null(w) { m_null = w } }", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "AssignmentExpression",
                operator: "=",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                right: {
                    type: "ObjectExpression",
                    properties: [{
                        type: "Property",
                        key: {
                            type: "Identifier",
                            name: "null",
                            loc: {
                                start: {
                                    line: 1,
                                    column: 10
                                },
                                end: {
                                    line: 1,
                                    column: 14
                                }
                            }
                        },
                        kind: "set",
                        value: {
                            type: "FunctionExpression",
                            id: null,
                            params: [{
                                type: "Identifier",
                                name: "w",
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 15
                                    },
                                    end: {
                                        line: 1,
                                        column: 16
                                    }
                                }
                            }],
                            body: {
                                type: "BlockStatement",
                                body: [{
                                    type: "ExpressionStatement",
                                    expression: {
                                        type: "AssignmentExpression",
                                        operator: "=",
                                        left: {
                                            type: "Identifier",
                                            name: "m_null",
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 20
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 26
                                                }
                                            }
                                        },
                                        right: {
                                            type: "Identifier",
                                            name: "w",
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 29
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 30
                                                }
                                            }
                                        },
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 20
                                            },
                                            end: {
                                                line: 1,
                                                column: 30
                                            }
                                        }
                                    },
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 20
                                        },
                                        end: {
                                            line: 1,
                                            column: 30
                                        }
                                    }
                                }],
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 18
                                    },
                                    end: {
                                        line: 1,
                                        column: 32
                                    }
                                }
                            },
                            loc: {
                                start: {
                                    line: 1,
                                    column: 14
                                },
                                end: {
                                    line: 1,
                                    column: 32
                                }
                            }
                        }
                    }],
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 34
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 34
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 34
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 34
            }
        }
    });

    test("x = { set \"null\"(w) { m_null = w } }", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "AssignmentExpression",
                operator: "=",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                right: {
                    type: "ObjectExpression",
                    properties: [{
                        type: "Property",
                        key: {
                            type: "Literal",
                            value: "null",
                            loc: {
                                start: {
                                    line: 1,
                                    column: 10
                                },
                                end: {
                                    line: 1,
                                    column: 16
                                }
                            }
                        },
                        kind: "set",
                        value: {
                            type: "FunctionExpression",
                            id: null,
                            params: [{
                                type: "Identifier",
                                name: "w",
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 17
                                    },
                                    end: {
                                        line: 1,
                                        column: 18
                                    }
                                }
                            }],
                            body: {
                                type: "BlockStatement",
                                body: [{
                                    type: "ExpressionStatement",
                                    expression: {
                                        type: "AssignmentExpression",
                                        operator: "=",
                                        left: {
                                            type: "Identifier",
                                            name: "m_null",
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 22
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 28
                                                }
                                            }
                                        },
                                        right: {
                                            type: "Identifier",
                                            name: "w",
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 31
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 32
                                                }
                                            }
                                        },
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 22
                                            },
                                            end: {
                                                line: 1,
                                                column: 32
                                            }
                                        }
                                    },
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 22
                                        },
                                        end: {
                                            line: 1,
                                            column: 32
                                        }
                                    }
                                }],
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 20
                                    },
                                    end: {
                                        line: 1,
                                        column: 34
                                    }
                                }
                            },
                            loc: {
                                start: {
                                    line: 1,
                                    column: 16
                                },
                                end: {
                                    line: 1,
                                    column: 34
                                }
                            }
                        }
                    }],
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 36
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 36
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 36
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 36
            }
        }
    });

    test("x = { set 10(w) { m_null = w } }", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "AssignmentExpression",
                operator: "=",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                right: {
                    type: "ObjectExpression",
                    properties: [{
                        type: "Property",
                        key: {
                            type: "Literal",
                            value: 10,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 10
                                },
                                end: {
                                    line: 1,
                                    column: 12
                                }
                            }
                        },
                        kind: "set",
                        value: {
                            type: "FunctionExpression",
                            id: null,
                            params: [{
                                type: "Identifier",
                                name: "w",
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 13
                                    },
                                    end: {
                                        line: 1,
                                        column: 14
                                    }
                                }
                            }],
                            body: {
                                type: "BlockStatement",
                                body: [{
                                    type: "ExpressionStatement",
                                    expression: {
                                        type: "AssignmentExpression",
                                        operator: "=",
                                        left: {
                                            type: "Identifier",
                                            name: "m_null",
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 18
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 24
                                                }
                                            }
                                        },
                                        right: {
                                            type: "Identifier",
                                            name: "w",
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 27
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 28
                                                }
                                            }
                                        },
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 18
                                            },
                                            end: {
                                                line: 1,
                                                column: 28
                                            }
                                        }
                                    },
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 18
                                        },
                                        end: {
                                            line: 1,
                                            column: 28
                                        }
                                    }
                                }],
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 16
                                    },
                                    end: {
                                        line: 1,
                                        column: 30
                                    }
                                }
                            },
                            loc: {
                                start: {
                                    line: 1,
                                    column: 12
                                },
                                end: {
                                    line: 1,
                                    column: 30
                                }
                            }
                        }
                    }],
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 32
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 32
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 32
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 32
            }
        }
    });

    test("x = { get: 42 }", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "AssignmentExpression",
                operator: "=",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                right: {
                    type: "ObjectExpression",
                    properties: [{
                        type: "Property",
                        key: {
                            type: "Identifier",
                            name: "get",
                            loc: {
                                start: {
                                    line: 1,
                                    column: 6
                                },
                                end: {
                                    line: 1,
                                    column: 9
                                }
                            }
                        },
                        value: {
                            type: "Literal",
                            value: 42,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 11
                                },
                                end: {
                                    line: 1,
                                    column: 13
                                }
                            }
                        },
                        kind: "init"
                    }],
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 15
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 15
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 15
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 15
            }
        }
    });

    test("x = { set: 43 }", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "AssignmentExpression",
                operator: "=",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                right: {
                    type: "ObjectExpression",
                    properties: [{
                        type: "Property",
                        key: {
                            type: "Identifier",
                            name: "set",
                            loc: {
                                start: {
                                    line: 1,
                                    column: 6
                                },
                                end: {
                                    line: 1,
                                    column: 9
                                }
                            }
                        },
                        value: {
                            type: "Literal",
                            value: 43,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 11
                                },
                                end: {
                                    line: 1,
                                    column: 13
                                }
                            }
                        },
                        kind: "init"
                    }],
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 15
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 15
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 15
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 15
            }
        }
    });

    test("/* block comment */ 42", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "Literal",
                value: 42,
                loc: {
                    start: {
                        line: 1,
                        column: 20
                    },
                    end: {
                        line: 1,
                        column: 22
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 20
                },
                end: {
                    line: 1,
                    column: 22
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 22
            }
        }
    });

    test("42 /*The*/ /*Answer*/", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "Literal",
                value: 42,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 2
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 2
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 21
            }
        }
    });

    test("42 /*the*/ /*answer*/", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "Literal",
                value: 42,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 2
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 2
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 21
            }
        }
    });

    test("/* multiline\ncomment\nshould\nbe\nignored */ 42", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "Literal",
                value: 42,
                loc: {
                    start: {
                        line: 5,
                        column: 11
                    },
                    end: {
                        line: 5,
                        column: 13
                    }
                }
            },
            loc: {
                start: {
                    line: 5,
                    column: 11
                },
                end: {
                    line: 5,
                    column: 13
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 5,
                column: 13
            }
        }
    });

    test("/*a\r\nb*/ 42", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "Literal",
                value: 42,
                loc: {
                    start: {
                        line: 2,
                        column: 4
                    },
                    end: {
                        line: 2,
                        column: 6
                    }
                }
            },
            loc: {
                start: {
                    line: 2,
                    column: 4
                },
                end: {
                    line: 2,
                    column: 6
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 2,
                column: 6
            }
        }
    });

    test("/*a\rb*/ 42", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "Literal",
                value: 42,
                loc: {
                    start: {
                        line: 2,
                        column: 4
                    },
                    end: {
                        line: 2,
                        column: 6
                    }
                }
            },
            loc: {
                start: {
                    line: 2,
                    column: 4
                },
                end: {
                    line: 2,
                    column: 6
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 2,
                column: 6
            }
        }
    });

    test("/*a\nb*/ 42", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "Literal",
                value: 42,
                loc: {
                    start: {
                        line: 2,
                        column: 4
                    },
                    end: {
                        line: 2,
                        column: 6
                    }
                }
            },
            loc: {
                start: {
                    line: 2,
                    column: 4
                },
                end: {
                    line: 2,
                    column: 6
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 2,
                column: 6
            }
        }
    });

    test("/*a\nc*/ 42", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "Literal",
                value: 42,
                loc: {
                    start: {
                        line: 2,
                        column: 4
                    },
                    end: {
                        line: 2,
                        column: 6
                    }
                }
            },
            loc: {
                start: {
                    line: 2,
                    column: 4
                },
                end: {
                    line: 2,
                    column: 6
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 2,
                column: 6
            }
        }
    });

    test("// line comment\n42", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "Literal",
                value: 42,
                loc: {
                    start: {
                        line: 2,
                        column: 0
                    },
                    end: {
                        line: 2,
                        column: 2
                    }
                }
            },
            loc: {
                start: {
                    line: 2,
                    column: 0
                },
                end: {
                    line: 2,
                    column: 2
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 2,
                column: 2
            }
        }
    });

    test("42 // line comment", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "Literal",
                value: 42,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 2
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 2
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 18
            }
        }
    });

    test("// Hello, world!\n42", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "Literal",
                value: 42,
                loc: {
                    start: {
                        line: 2,
                        column: 0
                    },
                    end: {
                        line: 2,
                        column: 2
                    }
                }
            },
            loc: {
                start: {
                    line: 2,
                    column: 0
                },
                end: {
                    line: 2,
                    column: 2
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 2,
                column: 2
            }
        }
    });

    test("// Hello, world!\n", {
        type: "Program",
        body: [],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 2,
                column: 0
            }
        }
    });

    test("// Hallo, world!\n", {
        type: "Program",
        body: [],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 2,
                column: 0
            }
        }
    });

    test("//\n42", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "Literal",
                value: 42,
                loc: {
                    start: {
                        line: 2,
                        column: 0
                    },
                    end: {
                        line: 2,
                        column: 2
                    }
                }
            },
            loc: {
                start: {
                    line: 2,
                    column: 0
                },
                end: {
                    line: 2,
                    column: 2
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 2,
                column: 2
            }
        }
    });

    test("//", {
        type: "Program",
        body: [],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 2
            }
        }
    });

    test("// ", {
        type: "Program",
        body: [],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 3
            }
        }
    });

    test("/**/42", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "Literal",
                value: 42,
                loc: {
                    start: {
                        line: 1,
                        column: 4
                    },
                    end: {
                        line: 1,
                        column: 6
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 4
                },
                end: {
                    line: 1,
                    column: 6
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 6
            }
        }
    });

    test("// Hello, world!\n\n//   Another hello\n42", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "Literal",
                value: 42,
                loc: {
                    start: {
                        line: 4,
                        column: 0
                    },
                    end: {
                        line: 4,
                        column: 2
                    }
                }
            },
            loc: {
                start: {
                    line: 4,
                    column: 0
                },
                end: {
                    line: 4,
                    column: 2
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 4,
                column: 2
            }
        }
    });

    test("if (x) { // Some comment\ndoThat(); }", {
        type: "Program",
        body: [{
            type: "IfStatement",
            test: {
                type: "Identifier",
                name: "x",
                loc: {
                    start: {
                        line: 1,
                        column: 4
                    },
                    end: {
                        line: 1,
                        column: 5
                    }
                }
            },
            consequent: {
                type: "BlockStatement",
                body: [{
                    type: "ExpressionStatement",
                    expression: {
                        type: "CallExpression",
                        callee: {
                            type: "Identifier",
                            name: "doThat",
                            loc: {
                                start: {
                                    line: 2,
                                    column: 0
                                },
                                end: {
                                    line: 2,
                                    column: 6
                                }
                            }
                        },
                        arguments: [],
                        loc: {
                            start: {
                                line: 2,
                                column: 0
                            },
                            end: {
                                line: 2,
                                column: 8
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 2,
                            column: 0
                        },
                        end: {
                            line: 2,
                            column: 9
                        }
                    }
                }],
                loc: {
                    start: {
                        line: 1,
                        column: 7
                    },
                    end: {
                        line: 2,
                        column: 11
                    }
                }
            },
            alternate: null,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 2,
                    column: 11
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 2,
                column: 11
            }
        }
    });

    test("switch (answer) { case 42: /* perfect */ bingo() }", {
        type: "Program",
        body: [{
            type: "SwitchStatement",
            discriminant: {
                type: "Identifier",
                name: "answer",
                loc: {
                    start: {
                        line: 1,
                        column: 8
                    },
                    end: {
                        line: 1,
                        column: 14
                    }
                }
            },
            cases: [{
                type: "SwitchCase",
                consequent: [{
                    type: "ExpressionStatement",
                    expression: {
                        type: "CallExpression",
                        callee: {
                            type: "Identifier",
                            name: "bingo",
                            loc: {
                                start: {
                                    line: 1,
                                    column: 41
                                },
                                end: {
                                    line: 1,
                                    column: 46
                                }
                            }
                        },
                        arguments: [],
                        loc: {
                            start: {
                                line: 1,
                                column: 41
                            },
                            end: {
                                line: 1,
                                column: 48
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 1,
                            column: 41
                        },
                        end: {
                            line: 1,
                            column: 48
                        }
                    }
                }],
                test: {
                    type: "Literal",
                    value: 42,
                    loc: {
                        start: {
                            line: 1,
                            column: 23
                        },
                        end: {
                            line: 1,
                            column: 25
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 18
                    },
                    end: {
                        line: 1,
                        column: 48
                    }
                }
            }],
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 50
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 50
            }
        }
    });

    test("0", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "Literal",
                value: 0,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 1
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 1
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 1
            }
        }
    });

    test("3", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "Literal",
                value: 3,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 1
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 1
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 1
            }
        }
    });

    test("5", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "Literal",
                value: 5,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 1
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 1
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 1
            }
        }
    });

    test("42", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "Literal",
                value: 42,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 2
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 2
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 2
            }
        }
    });

    test(".14", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "Literal",
                value: 0.14,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 3
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 3
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 3
            }
        }
    });

    test("3.14159", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "Literal",
                value: 3.14159,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 7
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 7
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 7
            }
        }
    });

    test("6.02214179e+23", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "Literal",
                value: 6.02214179e+23,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 14
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 14
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 14
            }
        }
    });

    test("1.492417830e-10", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "Literal",
                value: 1.49241783e-10,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 15
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 15
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 15
            }
        }
    });

    test("0x0", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "Literal",
                value: 0,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 3
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 3
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 3
            }
        }
    });

    test("0e+100", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "Literal",
                value: 0,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 6
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 6
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 6
            }
        }
    });

    test("0xabc", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "Literal",
                value: 2748,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 5
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 5
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 5
            }
        }
    });

    test("0xdef", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "Literal",
                value: 3567,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 5
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 5
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 5
            }
        }
    });

    test("0X1A", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "Literal",
                value: 26,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 4
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 4
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 4
            }
        }
    });

    test("0x10", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "Literal",
                value: 16,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 4
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 4
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 4
            }
        }
    });

    test("0x100", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "Literal",
                value: 256,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 5
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 5
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 5
            }
        }
    });

    test("0X04", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "Literal",
                value: 4,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 4
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 4
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 4
            }
        }
    });

    test("02", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "Literal",
                value: 2,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 2
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 2
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 2
            }
        }
    });

    test("012", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "Literal",
                value: 10,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 3
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 3
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 3
            }
        }
    });

    test("0012", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "Literal",
                value: 10,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 4
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 4
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 4
            }
        }
    });

    test("\"Hello\"", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "Literal",
                value: "Hello",
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 7
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 7
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 7
            }
        }
    });

    test("\"\\n\\r\\t\\v\\b\\f\\\\\\'\\\"\\0\"", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "Literal",
                value: "\n\r\t\u000b\b\f\\'\"\u0000",
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 22
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 22
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 22
            }
        }
    });

    test("\"\\u0061\"", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "Literal",
                value: "a",
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 8
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 8
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 8
            }
        }
    });

    test("\"\\x61\"", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "Literal",
                value: "a",
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 6
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 6
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 6
            }
        }
    });

    test("\"Hello\\nworld\"", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "Literal",
                value: "Hello\nworld",
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 14
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 14
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 14
            }
        }
    });

    test("\"Hello\\\nworld\"", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "Literal",
                value: "Helloworld",
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 2,
                        column: 6
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 2,
                    column: 6
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 2,
                column: 6
            }
        }
    });

    test("\"Hello\\02World\"", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "Literal",
                value: "Hello\u0002World",
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 15
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 15
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 15
            }
        }
    });

    test("\"Hello\\012World\"", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "Literal",
                value: "Hello\nWorld",
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 16
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 16
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 16
            }
        }
    });

    test("\"Hello\\122World\"", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "Literal",
                value: "HelloRWorld",
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 16
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 16
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 16
            }
        }
    });

    test("\"Hello\\0122World\"", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "Literal",
                value: "Hello\n2World",
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 17
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 17
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 17
            }
        }
    });

    test("\"Hello\\312World\"", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "Literal",
                value: "HelloÊWorld",
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 16
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 16
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 16
            }
        }
    });

    test("\"Hello\\412World\"", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "Literal",
                value: "Hello!2World",
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 16
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 16
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 16
            }
        }
    });

    test("\"Hello\\812World\"", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "Literal",
                value: "Hello812World",
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 16
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 16
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 16
            }
        }
    });

    test("\"Hello\\712World\"", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "Literal",
                value: "Hello92World",
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 16
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 16
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 16
            }
        }
    });

    test("\"Hello\\0World\"", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "Literal",
                value: "Hello\u0000World",
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 14
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 14
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 14
            }
        }
    });

    test("\"Hello\\\r\nworld\"", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "Literal",
                value: "Helloworld",
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 2,
                        column: 6
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 2,
                    column: 6
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 2,
                column: 6
            }
        }
    });

    test("\"Hello\\1World\"", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "Literal",
                value: "Hello\u0001World",
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 14
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 14
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 14
            }
        }
    });

    test("var x = /[a-z]/i", {
        type: "Program",
        body: [{
            type: "VariableDeclaration",
            declarations: [{
                type: "VariableDeclarator",
                id: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 5
                        }
                    }
                },
                init: {
                    type: "Literal",
                    value: /[a-z]/i,
                    loc: {
                        start: {
                            line: 1,
                            column: 8
                        },
                        end: {
                            line: 1,
                            column: 16
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 4
                    },
                    end: {
                        line: 1,
                        column: 16
                    }
                }
            }],
            kind: "var",
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 16
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 16
            }
        }
    });

    test("var x = /[x-z]/i", {
        type: "Program",
        body: [{
            type: "VariableDeclaration",
            declarations: [{
                type: "VariableDeclarator",
                id: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 5
                        }
                    }
                },
                init: {
                    type: "Literal",
                    value: /[x-z]/i,
                    loc: {
                        start: {
                            line: 1,
                            column: 8
                        },
                        end: {
                            line: 1,
                            column: 16
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 4
                    },
                    end: {
                        line: 1,
                        column: 16
                    }
                }
            }],
            kind: "var",
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 16
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 16
            }
        }
    });

    test("var x = /[a-c]/i", {
        type: "Program",
        body: [{
            type: "VariableDeclaration",
            declarations: [{
                type: "VariableDeclarator",
                id: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 5
                        }
                    }
                },
                init: {
                    type: "Literal",
                    value: /[a-c]/i,
                    loc: {
                        start: {
                            line: 1,
                            column: 8
                        },
                        end: {
                            line: 1,
                            column: 16
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 4
                    },
                    end: {
                        line: 1,
                        column: 16
                    }
                }
            }],
            kind: "var",
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 16
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 16
            }
        }
    });

    test("var x = /[P QR]/i", {
        type: "Program",
        body: [{
            type: "VariableDeclaration",
            declarations: [{
                type: "VariableDeclarator",
                id: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 5
                        }
                    }
                },
                init: {
                    type: "Literal",
                    value: /[P QR]/i,
                    loc: {
                        start: {
                            line: 1,
                            column: 8
                        },
                        end: {
                            line: 1,
                            column: 17
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 4
                    },
                    end: {
                        line: 1,
                        column: 17
                    }
                }
            }],
            kind: "var",
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 17
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 17
            }
        }
    });

    test("var x = /foo\\/bar/", {
        type: "Program",
        body: [{
            type: "VariableDeclaration",
            declarations: [{
                type: "VariableDeclarator",
                id: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 5
                        }
                    }
                },
                init: {
                    type: "Literal",
                    value: /foo\/bar/,
                    loc: {
                        start: {
                            line: 1,
                            column: 8
                        },
                        end: {
                            line: 1,
                            column: 18
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 4
                    },
                    end: {
                        line: 1,
                        column: 18
                    }
                }
            }],
            kind: "var",
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 18
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 18
            }
        }
    });

    test("var x = /=([^=\\s])+/g", {
        type: "Program",
        body: [{
            type: "VariableDeclaration",
            declarations: [{
                type: "VariableDeclarator",
                id: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 5
                        }
                    }
                },
                init: {
                    type: "Literal",
                    value: /=([^=\s])+/g,
                    loc: {
                        start: {
                            line: 1,
                            column: 8
                        },
                        end: {
                            line: 1,
                            column: 21
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 4
                    },
                    end: {
                        line: 1,
                        column: 21
                    }
                }
            }],
            kind: "var",
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 21
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 21
            }
        }
    });

    test("var x = /[P QR]/\\u0067", {
        type: "Program",
        body: [{
            type: "VariableDeclaration",
            declarations: [{
                type: "VariableDeclarator",
                id: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 5
                        }
                    }
                },
                init: {
                    type: "Literal",
                    value: /[P QR]/g,
                    loc: {
                        start: {
                            line: 1,
                            column: 8
                        },
                        end: {
                            line: 1,
                            column: 22
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 4
                    },
                    end: {
                        line: 1,
                        column: 22
                    }
                }
            }],
            kind: "var",
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 22
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 22
            }
        }
    });

    test("new Button", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "NewExpression",
                callee: {
                    type: "Identifier",
                    name: "Button",
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 10
                        }
                    }
                },
                arguments: [],
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 10
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 10
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 10
            }
        }
    });

    test("new Button()", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "NewExpression",
                callee: {
                    type: "Identifier",
                    name: "Button",
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 10
                        }
                    }
                },
                arguments: [],
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 12
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 12
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 12
            }
        }
    });

    test("new new foo", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "NewExpression",
                callee: {
                    type: "NewExpression",
                    callee: {
                        type: "Identifier",
                        name: "foo",
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 11
                            }
                        }
                    },
                    arguments: [],
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 11
                        }
                    }
                },
                arguments: [],
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 11
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 11
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 11
            }
        }
    });

    test("new new foo()", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "NewExpression",
                callee: {
                    type: "NewExpression",
                    callee: {
                        type: "Identifier",
                        name: "foo",
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 11
                            }
                        }
                    },
                    arguments: [],
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 13
                        }
                    }
                },
                arguments: [],
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 13
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 13
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 13
            }
        }
    });

    test("new foo().bar()", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "CallExpression",
                callee: {
                    type: "MemberExpression",
                    object: {
                        type: "NewExpression",
                        callee: {
                            type: "Identifier",
                            name: "foo",
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 7
                                }
                            }
                        },
                        arguments: [],
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 9
                            }
                        }
                    },
                    property: {
                        type: "Identifier",
                        name: "bar",
                        loc: {
                            start: {
                                line: 1,
                                column: 10
                            },
                            end: {
                                line: 1,
                                column: 13
                            }
                        }
                    },
                    computed: false,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 13
                        }
                    }
                },
                arguments: [],
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 15
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 15
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 15
            }
        }
    });

    test("new foo[bar]", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "NewExpression",
                callee: {
                    type: "MemberExpression",
                    object: {
                        type: "Identifier",
                        name: "foo",
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 7
                            }
                        }
                    },
                    property: {
                        type: "Identifier",
                        name: "bar",
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 11
                            }
                        }
                    },
                    computed: true,
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 12
                        }
                    }
                },
                arguments: [],
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 12
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 12
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 12
            }
        }
    });

    test("new foo.bar()", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "NewExpression",
                callee: {
                    type: "MemberExpression",
                    object: {
                        type: "Identifier",
                        name: "foo",
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 7
                            }
                        }
                    },
                    property: {
                        type: "Identifier",
                        name: "bar",
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 11
                            }
                        }
                    },
                    computed: false,
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 11
                        }
                    }
                },
                arguments: [],
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 13
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 13
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 13
            }
        }
    });

    test("( new foo).bar()", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "CallExpression",
                callee: {
                    type: "MemberExpression",
                    object: {
                        type: "NewExpression",
                        callee: {
                            type: "Identifier",
                            name: "foo",
                            loc: {
                                start: {
                                    line: 1,
                                    column: 6
                                },
                                end: {
                                    line: 1,
                                    column: 9
                                }
                            }
                        },
                        arguments: [],
                        loc: {
                            start: {
                                line: 1,
                                column: 2
                            },
                            end: {
                                line: 1,
                                column: 9
                            }
                        }
                    },
                    property: {
                        type: "Identifier",
                        name: "bar",
                        loc: {
                            start: {
                                line: 1,
                                column: 11
                            },
                            end: {
                                line: 1,
                                column: 14
                            }
                        }
                    },
                    computed: false,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 14
                        }
                    }
                },
                arguments: [],
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 16
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 16
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 16
            }
        }
    });

    test("foo(bar, baz)", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "CallExpression",
                callee: {
                    type: "Identifier",
                    name: "foo",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 3
                        }
                    }
                },
                arguments: [{
                        type: "Identifier",
                        name: "bar",
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 7
                            }
                        }
                    },
                    {
                        type: "Identifier",
                        name: "baz",
                        loc: {
                            start: {
                                line: 1,
                                column: 9
                            },
                            end: {
                                line: 1,
                                column: 12
                            }
                        }
                    }
                ],
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 13
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 13
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 13
            }
        }
    });

    test("(    foo  )()", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "CallExpression",
                callee: {
                    type: "Identifier",
                    name: "foo",
                    loc: {
                        start: {
                            line: 1,
                            column: 5
                        },
                        end: {
                            line: 1,
                            column: 8
                        }
                    }
                },
                arguments: [],
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 13
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 13
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 13
            }
        }
    });

    test("universe.milkyway", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "MemberExpression",
                object: {
                    type: "Identifier",
                    name: "universe",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 8
                        }
                    }
                },
                property: {
                    type: "Identifier",
                    name: "milkyway",
                    loc: {
                        start: {
                            line: 1,
                            column: 9
                        },
                        end: {
                            line: 1,
                            column: 17
                        }
                    }
                },
                computed: false,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 17
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 17
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 17
            }
        }
    });

    test("universe.milkyway.solarsystem", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "MemberExpression",
                object: {
                    type: "MemberExpression",
                    object: {
                        type: "Identifier",
                        name: "universe",
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 8
                            }
                        }
                    },
                    property: {
                        type: "Identifier",
                        name: "milkyway",
                        loc: {
                            start: {
                                line: 1,
                                column: 9
                            },
                            end: {
                                line: 1,
                                column: 17
                            }
                        }
                    },
                    computed: false,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 17
                        }
                    }
                },
                property: {
                    type: "Identifier",
                    name: "solarsystem",
                    loc: {
                        start: {
                            line: 1,
                            column: 18
                        },
                        end: {
                            line: 1,
                            column: 29
                        }
                    }
                },
                computed: false,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 29
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 29
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 29
            }
        }
    });

    test("universe.milkyway.solarsystem.Earth", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "MemberExpression",
                object: {
                    type: "MemberExpression",
                    object: {
                        type: "MemberExpression",
                        object: {
                            type: "Identifier",
                            name: "universe",
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 8
                                }
                            }
                        },
                        property: {
                            type: "Identifier",
                            name: "milkyway",
                            loc: {
                                start: {
                                    line: 1,
                                    column: 9
                                },
                                end: {
                                    line: 1,
                                    column: 17
                                }
                            }
                        },
                        computed: false,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 17
                            }
                        }
                    },
                    property: {
                        type: "Identifier",
                        name: "solarsystem",
                        loc: {
                            start: {
                                line: 1,
                                column: 18
                            },
                            end: {
                                line: 1,
                                column: 29
                            }
                        }
                    },
                    computed: false,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 29
                        }
                    }
                },
                property: {
                    type: "Identifier",
                    name: "Earth",
                    loc: {
                        start: {
                            line: 1,
                            column: 30
                        },
                        end: {
                            line: 1,
                            column: 35
                        }
                    }
                },
                computed: false,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 35
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 35
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 35
            }
        }
    });

    test("universe[galaxyName, otherUselessName]", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "MemberExpression",
                object: {
                    type: "Identifier",
                    name: "universe",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 8
                        }
                    }
                },
                property: {
                    type: "SequenceExpression",
                    expressions: [{
                            type: "Identifier",
                            name: "galaxyName",
                            loc: {
                                start: {
                                    line: 1,
                                    column: 9
                                },
                                end: {
                                    line: 1,
                                    column: 19
                                }
                            }
                        },
                        {
                            type: "Identifier",
                            name: "otherUselessName",
                            loc: {
                                start: {
                                    line: 1,
                                    column: 21
                                },
                                end: {
                                    line: 1,
                                    column: 37
                                }
                            }
                        }
                    ],
                    loc: {
                        start: {
                            line: 1,
                            column: 9
                        },
                        end: {
                            line: 1,
                            column: 37
                        }
                    }
                },
                computed: true,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 38
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 38
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 38
            }
        }
    });

    test("universe[galaxyName]", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "MemberExpression",
                object: {
                    type: "Identifier",
                    name: "universe",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 8
                        }
                    }
                },
                property: {
                    type: "Identifier",
                    name: "galaxyName",
                    loc: {
                        start: {
                            line: 1,
                            column: 9
                        },
                        end: {
                            line: 1,
                            column: 19
                        }
                    }
                },
                computed: true,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 20
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 20
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 20
            }
        }
    });

    test("universe[42].galaxies", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "MemberExpression",
                object: {
                    type: "MemberExpression",
                    object: {
                        type: "Identifier",
                        name: "universe",
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 8
                            }
                        }
                    },
                    property: {
                        type: "Literal",
                        value: 42,
                        loc: {
                            start: {
                                line: 1,
                                column: 9
                            },
                            end: {
                                line: 1,
                                column: 11
                            }
                        }
                    },
                    computed: true,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 12
                        }
                    }
                },
                property: {
                    type: "Identifier",
                    name: "galaxies",
                    loc: {
                        start: {
                            line: 1,
                            column: 13
                        },
                        end: {
                            line: 1,
                            column: 21
                        }
                    }
                },
                computed: false,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 21
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 21
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 21
            }
        }
    });

    test("universe(42).galaxies", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "MemberExpression",
                object: {
                    type: "CallExpression",
                    callee: {
                        type: "Identifier",
                        name: "universe",
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 8
                            }
                        }
                    },
                    arguments: [{
                        type: "Literal",
                        value: 42,
                        loc: {
                            start: {
                                line: 1,
                                column: 9
                            },
                            end: {
                                line: 1,
                                column: 11
                            }
                        }
                    }],
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 12
                        }
                    }
                },
                property: {
                    type: "Identifier",
                    name: "galaxies",
                    loc: {
                        start: {
                            line: 1,
                            column: 13
                        },
                        end: {
                            line: 1,
                            column: 21
                        }
                    }
                },
                computed: false,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 21
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 21
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 21
            }
        }
    });

    test("universe(42).galaxies(14, 3, 77).milkyway", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "MemberExpression",
                object: {
                    type: "CallExpression",
                    callee: {
                        type: "MemberExpression",
                        object: {
                            type: "CallExpression",
                            callee: {
                                type: "Identifier",
                                name: "universe",
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 0
                                    },
                                    end: {
                                        line: 1,
                                        column: 8
                                    }
                                }
                            },
                            arguments: [{
                                type: "Literal",
                                value: 42,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 9
                                    },
                                    end: {
                                        line: 1,
                                        column: 11
                                    }
                                }
                            }],
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 12
                                }
                            }
                        },
                        property: {
                            type: "Identifier",
                            name: "galaxies",
                            loc: {
                                start: {
                                    line: 1,
                                    column: 13
                                },
                                end: {
                                    line: 1,
                                    column: 21
                                }
                            }
                        },
                        computed: false,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 21
                            }
                        }
                    },
                    arguments: [{
                            type: "Literal",
                            value: 14,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 22
                                },
                                end: {
                                    line: 1,
                                    column: 24
                                }
                            }
                        },
                        {
                            type: "Literal",
                            value: 3,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 26
                                },
                                end: {
                                    line: 1,
                                    column: 27
                                }
                            }
                        },
                        {
                            type: "Literal",
                            value: 77,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 29
                                },
                                end: {
                                    line: 1,
                                    column: 31
                                }
                            }
                        }
                    ],
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 32
                        }
                    }
                },
                property: {
                    type: "Identifier",
                    name: "milkyway",
                    loc: {
                        start: {
                            line: 1,
                            column: 33
                        },
                        end: {
                            line: 1,
                            column: 41
                        }
                    }
                },
                computed: false,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 41
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 41
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 41
            }
        }
    });

    test("earth.asia.Indonesia.prepareForElection(2014)", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "CallExpression",
                callee: {
                    type: "MemberExpression",
                    object: {
                        type: "MemberExpression",
                        object: {
                            type: "MemberExpression",
                            object: {
                                type: "Identifier",
                                name: "earth",
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 0
                                    },
                                    end: {
                                        line: 1,
                                        column: 5
                                    }
                                }
                            },
                            property: {
                                type: "Identifier",
                                name: "asia",
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 6
                                    },
                                    end: {
                                        line: 1,
                                        column: 10
                                    }
                                }
                            },
                            computed: false,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 10
                                }
                            }
                        },
                        property: {
                            type: "Identifier",
                            name: "Indonesia",
                            loc: {
                                start: {
                                    line: 1,
                                    column: 11
                                },
                                end: {
                                    line: 1,
                                    column: 20
                                }
                            }
                        },
                        computed: false,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 20
                            }
                        }
                    },
                    property: {
                        type: "Identifier",
                        name: "prepareForElection",
                        loc: {
                            start: {
                                line: 1,
                                column: 21
                            },
                            end: {
                                line: 1,
                                column: 39
                            }
                        }
                    },
                    computed: false,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 39
                        }
                    }
                },
                arguments: [{
                    type: "Literal",
                    value: 2014,
                    loc: {
                        start: {
                            line: 1,
                            column: 40
                        },
                        end: {
                            line: 1,
                            column: 44
                        }
                    }
                }],
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 45
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 45
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 45
            }
        }
    });

    test("universe.if", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "MemberExpression",
                object: {
                    type: "Identifier",
                    name: "universe",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 8
                        }
                    }
                },
                property: {
                    type: "Identifier",
                    name: "if",
                    loc: {
                        start: {
                            line: 1,
                            column: 9
                        },
                        end: {
                            line: 1,
                            column: 11
                        }
                    }
                },
                computed: false,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 11
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 11
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 11
            }
        }
    });

    test("universe.true", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "MemberExpression",
                object: {
                    type: "Identifier",
                    name: "universe",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 8
                        }
                    }
                },
                property: {
                    type: "Identifier",
                    name: "true",
                    loc: {
                        start: {
                            line: 1,
                            column: 9
                        },
                        end: {
                            line: 1,
                            column: 13
                        }
                    }
                },
                computed: false,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 13
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 13
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 13
            }
        }
    });

    test("universe.false", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "MemberExpression",
                object: {
                    type: "Identifier",
                    name: "universe",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 8
                        }
                    }
                },
                property: {
                    type: "Identifier",
                    name: "false",
                    loc: {
                        start: {
                            line: 1,
                            column: 9
                        },
                        end: {
                            line: 1,
                            column: 14
                        }
                    }
                },
                computed: false,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 14
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 14
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 14
            }
        }
    });

    test("universe.null", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "MemberExpression",
                object: {
                    type: "Identifier",
                    name: "universe",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 8
                        }
                    }
                },
                property: {
                    type: "Identifier",
                    name: "null",
                    loc: {
                        start: {
                            line: 1,
                            column: 9
                        },
                        end: {
                            line: 1,
                            column: 13
                        }
                    }
                },
                computed: false,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 13
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 13
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 13
            }
        }
    });

    test("x++", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "UpdateExpression",
                operator: "++",
                prefix: false,
                argument: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 3
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 3
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 3
            }
        }
    });

    test("x--", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "UpdateExpression",
                operator: "--",
                prefix: false,
                argument: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 3
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 3
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 3
            }
        }
    });

    test("eval++", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "UpdateExpression",
                operator: "++",
                prefix: false,
                argument: {
                    type: "Identifier",
                    name: "eval",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 4
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 6
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 6
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 6
            }
        }
    });

    test("eval--", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "UpdateExpression",
                operator: "--",
                prefix: false,
                argument: {
                    type: "Identifier",
                    name: "eval",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 4
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 6
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 6
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 6
            }
        }
    });

    test("arguments++", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "UpdateExpression",
                operator: "++",
                prefix: false,
                argument: {
                    type: "Identifier",
                    name: "arguments",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 9
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 11
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 11
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 11
            }
        }
    });

    test("arguments--", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "UpdateExpression",
                operator: "--",
                prefix: false,
                argument: {
                    type: "Identifier",
                    name: "arguments",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 9
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 11
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 11
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 11
            }
        }
    });

    test("++x", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "UpdateExpression",
                operator: "++",
                prefix: true,
                argument: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 2
                        },
                        end: {
                            line: 1,
                            column: 3
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 3
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 3
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 3
            }
        }
    });

    test("--x", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "UpdateExpression",
                operator: "--",
                prefix: true,
                argument: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 2
                        },
                        end: {
                            line: 1,
                            column: 3
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 3
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 3
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 3
            }
        }
    });

    test("++eval", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "UpdateExpression",
                operator: "++",
                prefix: true,
                argument: {
                    type: "Identifier",
                    name: "eval",
                    loc: {
                        start: {
                            line: 1,
                            column: 2
                        },
                        end: {
                            line: 1,
                            column: 6
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 6
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 6
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 6
            }
        }
    });

    test("--eval", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "UpdateExpression",
                operator: "--",
                prefix: true,
                argument: {
                    type: "Identifier",
                    name: "eval",
                    loc: {
                        start: {
                            line: 1,
                            column: 2
                        },
                        end: {
                            line: 1,
                            column: 6
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 6
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 6
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 6
            }
        }
    });

    test("++arguments", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "UpdateExpression",
                operator: "++",
                prefix: true,
                argument: {
                    type: "Identifier",
                    name: "arguments",
                    loc: {
                        start: {
                            line: 1,
                            column: 2
                        },
                        end: {
                            line: 1,
                            column: 11
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 11
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 11
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 11
            }
        }
    });

    test("--arguments", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "UpdateExpression",
                operator: "--",
                prefix: true,
                argument: {
                    type: "Identifier",
                    name: "arguments",
                    loc: {
                        start: {
                            line: 1,
                            column: 2
                        },
                        end: {
                            line: 1,
                            column: 11
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 11
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 11
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 11
            }
        }
    });

    test("+x", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "UnaryExpression",
                operator: "+",
                prefix: true,
                argument: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 1
                        },
                        end: {
                            line: 1,
                            column: 2
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 2
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 2
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 2
            }
        }
    });

    test("-x", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "UnaryExpression",
                operator: "-",
                prefix: true,
                argument: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 1
                        },
                        end: {
                            line: 1,
                            column: 2
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 2
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 2
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 2
            }
        }
    });

    test("~x", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "UnaryExpression",
                operator: "~",
                prefix: true,
                argument: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 1
                        },
                        end: {
                            line: 1,
                            column: 2
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 2
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 2
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 2
            }
        }
    });

    test("!x", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "UnaryExpression",
                operator: "!",
                prefix: true,
                argument: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 1
                        },
                        end: {
                            line: 1,
                            column: 2
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 2
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 2
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 2
            }
        }
    });

    test("void x", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "UnaryExpression",
                operator: "void",
                prefix: true,
                argument: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 5
                        },
                        end: {
                            line: 1,
                            column: 6
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 6
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 6
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 6
            }
        }
    });

    test("delete x", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "UnaryExpression",
                operator: "delete",
                prefix: true,
                argument: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 7
                        },
                        end: {
                            line: 1,
                            column: 8
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 8
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 8
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 8
            }
        }
    });

    test("typeof x", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "UnaryExpression",
                operator: "typeof",
                prefix: true,
                argument: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 7
                        },
                        end: {
                            line: 1,
                            column: 8
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 8
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 8
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 8
            }
        }
    });

    test("x * y", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "BinaryExpression",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                operator: "*",
                right: {
                    type: "Identifier",
                    name: "y",
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 5
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 5
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 5
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 5
            }
        }
    });

    test("x / y", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "BinaryExpression",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                operator: "/",
                right: {
                    type: "Identifier",
                    name: "y",
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 5
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 5
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 5
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 5
            }
        }
    });

    test("x % y", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "BinaryExpression",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                operator: "%",
                right: {
                    type: "Identifier",
                    name: "y",
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 5
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 5
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 5
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 5
            }
        }
    });

    test("x + y", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "BinaryExpression",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                operator: "+",
                right: {
                    type: "Identifier",
                    name: "y",
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 5
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 5
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 5
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 5
            }
        }
    });

    test("x - y", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "BinaryExpression",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                operator: "-",
                right: {
                    type: "Identifier",
                    name: "y",
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 5
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 5
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 5
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 5
            }
        }
    });

    test("x << y", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "BinaryExpression",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                operator: "<<",
                right: {
                    type: "Identifier",
                    name: "y",
                    loc: {
                        start: {
                            line: 1,
                            column: 5
                        },
                        end: {
                            line: 1,
                            column: 6
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 6
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 6
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 6
            }
        }
    });

    test("x >> y", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "BinaryExpression",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                operator: ">>",
                right: {
                    type: "Identifier",
                    name: "y",
                    loc: {
                        start: {
                            line: 1,
                            column: 5
                        },
                        end: {
                            line: 1,
                            column: 6
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 6
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 6
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 6
            }
        }
    });

    test("x >>> y", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "BinaryExpression",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                operator: ">>>",
                right: {
                    type: "Identifier",
                    name: "y",
                    loc: {
                        start: {
                            line: 1,
                            column: 6
                        },
                        end: {
                            line: 1,
                            column: 7
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 7
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 7
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 7
            }
        }
    });

    test("x < y", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "BinaryExpression",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                operator: "<",
                right: {
                    type: "Identifier",
                    name: "y",
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 5
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 5
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 5
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 5
            }
        }
    });

    test("x > y", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "BinaryExpression",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                operator: ">",
                right: {
                    type: "Identifier",
                    name: "y",
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 5
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 5
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 5
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 5
            }
        }
    });

    test("x <= y", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "BinaryExpression",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                operator: "<=",
                right: {
                    type: "Identifier",
                    name: "y",
                    loc: {
                        start: {
                            line: 1,
                            column: 5
                        },
                        end: {
                            line: 1,
                            column: 6
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 6
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 6
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 6
            }
        }
    });

    test("x >= y", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "BinaryExpression",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                operator: ">=",
                right: {
                    type: "Identifier",
                    name: "y",
                    loc: {
                        start: {
                            line: 1,
                            column: 5
                        },
                        end: {
                            line: 1,
                            column: 6
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 6
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 6
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 6
            }
        }
    });

    test("x in y", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "BinaryExpression",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                operator: "in",
                right: {
                    type: "Identifier",
                    name: "y",
                    loc: {
                        start: {
                            line: 1,
                            column: 5
                        },
                        end: {
                            line: 1,
                            column: 6
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 6
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 6
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 6
            }
        }
    });

    test("x instanceof y", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "BinaryExpression",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                operator: "instanceof",
                right: {
                    type: "Identifier",
                    name: "y",
                    loc: {
                        start: {
                            line: 1,
                            column: 13
                        },
                        end: {
                            line: 1,
                            column: 14
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 14
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 14
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 14
            }
        }
    });

    test("x < y < z", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "BinaryExpression",
                left: {
                    type: "BinaryExpression",
                    left: {
                        type: "Identifier",
                        name: "x",
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 1
                            }
                        }
                    },
                    operator: "<",
                    right: {
                        type: "Identifier",
                        name: "y",
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 5
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 5
                        }
                    }
                },
                operator: "<",
                right: {
                    type: "Identifier",
                    name: "z",
                    loc: {
                        start: {
                            line: 1,
                            column: 8
                        },
                        end: {
                            line: 1,
                            column: 9
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 9
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 9
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 9
            }
        }
    });

    test("x == y", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "BinaryExpression",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                operator: "==",
                right: {
                    type: "Identifier",
                    name: "y",
                    loc: {
                        start: {
                            line: 1,
                            column: 5
                        },
                        end: {
                            line: 1,
                            column: 6
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 6
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 6
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 6
            }
        }
    });

    test("x != y", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "BinaryExpression",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                operator: "!=",
                right: {
                    type: "Identifier",
                    name: "y",
                    loc: {
                        start: {
                            line: 1,
                            column: 5
                        },
                        end: {
                            line: 1,
                            column: 6
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 6
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 6
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 6
            }
        }
    });

    test("x === y", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "BinaryExpression",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                operator: "===",
                right: {
                    type: "Identifier",
                    name: "y",
                    loc: {
                        start: {
                            line: 1,
                            column: 6
                        },
                        end: {
                            line: 1,
                            column: 7
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 7
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 7
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 7
            }
        }
    });

    test("x !== y", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "BinaryExpression",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                operator: "!==",
                right: {
                    type: "Identifier",
                    name: "y",
                    loc: {
                        start: {
                            line: 1,
                            column: 6
                        },
                        end: {
                            line: 1,
                            column: 7
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 7
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 7
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 7
            }
        }
    });

    test("x & y", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "BinaryExpression",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                operator: "&",
                right: {
                    type: "Identifier",
                    name: "y",
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 5
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 5
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 5
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 5
            }
        }
    });

    test("x ^ y", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "BinaryExpression",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                operator: "^",
                right: {
                    type: "Identifier",
                    name: "y",
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 5
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 5
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 5
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 5
            }
        }
    });

    test("x | y", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "BinaryExpression",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                operator: "|",
                right: {
                    type: "Identifier",
                    name: "y",
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 5
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 5
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 5
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 5
            }
        }
    });

    test("x + y + z", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "BinaryExpression",
                left: {
                    type: "BinaryExpression",
                    left: {
                        type: "Identifier",
                        name: "x",
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 1
                            }
                        }
                    },
                    operator: "+",
                    right: {
                        type: "Identifier",
                        name: "y",
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 5
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 5
                        }
                    }
                },
                operator: "+",
                right: {
                    type: "Identifier",
                    name: "z",
                    loc: {
                        start: {
                            line: 1,
                            column: 8
                        },
                        end: {
                            line: 1,
                            column: 9
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 9
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 9
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 9
            }
        }
    });

    test("x - y + z", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "BinaryExpression",
                left: {
                    type: "BinaryExpression",
                    left: {
                        type: "Identifier",
                        name: "x",
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 1
                            }
                        }
                    },
                    operator: "-",
                    right: {
                        type: "Identifier",
                        name: "y",
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 5
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 5
                        }
                    }
                },
                operator: "+",
                right: {
                    type: "Identifier",
                    name: "z",
                    loc: {
                        start: {
                            line: 1,
                            column: 8
                        },
                        end: {
                            line: 1,
                            column: 9
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 9
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 9
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 9
            }
        }
    });

    test("x + y - z", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "BinaryExpression",
                left: {
                    type: "BinaryExpression",
                    left: {
                        type: "Identifier",
                        name: "x",
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 1
                            }
                        }
                    },
                    operator: "+",
                    right: {
                        type: "Identifier",
                        name: "y",
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 5
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 5
                        }
                    }
                },
                operator: "-",
                right: {
                    type: "Identifier",
                    name: "z",
                    loc: {
                        start: {
                            line: 1,
                            column: 8
                        },
                        end: {
                            line: 1,
                            column: 9
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 9
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 9
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 9
            }
        }
    });

    test("x - y - z", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "BinaryExpression",
                left: {
                    type: "BinaryExpression",
                    left: {
                        type: "Identifier",
                        name: "x",
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 1
                            }
                        }
                    },
                    operator: "-",
                    right: {
                        type: "Identifier",
                        name: "y",
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 5
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 5
                        }
                    }
                },
                operator: "-",
                right: {
                    type: "Identifier",
                    name: "z",
                    loc: {
                        start: {
                            line: 1,
                            column: 8
                        },
                        end: {
                            line: 1,
                            column: 9
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 9
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 9
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 9
            }
        }
    });

    test("x + y * z", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "BinaryExpression",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                operator: "+",
                right: {
                    type: "BinaryExpression",
                    left: {
                        type: "Identifier",
                        name: "y",
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 5
                            }
                        }
                    },
                    operator: "*",
                    right: {
                        type: "Identifier",
                        name: "z",
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 9
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 9
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 9
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 9
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 9
            }
        }
    });

    test("x + y / z", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "BinaryExpression",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                operator: "+",
                right: {
                    type: "BinaryExpression",
                    left: {
                        type: "Identifier",
                        name: "y",
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 5
                            }
                        }
                    },
                    operator: "/",
                    right: {
                        type: "Identifier",
                        name: "z",
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 9
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 9
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 9
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 9
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 9
            }
        }
    });

    test("x - y % z", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "BinaryExpression",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                operator: "-",
                right: {
                    type: "BinaryExpression",
                    left: {
                        type: "Identifier",
                        name: "y",
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 5
                            }
                        }
                    },
                    operator: "%",
                    right: {
                        type: "Identifier",
                        name: "z",
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 9
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 9
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 9
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 9
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 9
            }
        }
    });

    test("x * y * z", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "BinaryExpression",
                left: {
                    type: "BinaryExpression",
                    left: {
                        type: "Identifier",
                        name: "x",
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 1
                            }
                        }
                    },
                    operator: "*",
                    right: {
                        type: "Identifier",
                        name: "y",
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 5
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 5
                        }
                    }
                },
                operator: "*",
                right: {
                    type: "Identifier",
                    name: "z",
                    loc: {
                        start: {
                            line: 1,
                            column: 8
                        },
                        end: {
                            line: 1,
                            column: 9
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 9
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 9
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 9
            }
        }
    });

    test("x * y / z", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "BinaryExpression",
                left: {
                    type: "BinaryExpression",
                    left: {
                        type: "Identifier",
                        name: "x",
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 1
                            }
                        }
                    },
                    operator: "*",
                    right: {
                        type: "Identifier",
                        name: "y",
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 5
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 5
                        }
                    }
                },
                operator: "/",
                right: {
                    type: "Identifier",
                    name: "z",
                    loc: {
                        start: {
                            line: 1,
                            column: 8
                        },
                        end: {
                            line: 1,
                            column: 9
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 9
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 9
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 9
            }
        }
    });

    test("x * y % z", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "BinaryExpression",
                left: {
                    type: "BinaryExpression",
                    left: {
                        type: "Identifier",
                        name: "x",
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 1
                            }
                        }
                    },
                    operator: "*",
                    right: {
                        type: "Identifier",
                        name: "y",
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 5
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 5
                        }
                    }
                },
                operator: "%",
                right: {
                    type: "Identifier",
                    name: "z",
                    loc: {
                        start: {
                            line: 1,
                            column: 8
                        },
                        end: {
                            line: 1,
                            column: 9
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 9
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 9
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 9
            }
        }
    });

    test("x % y * z", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "BinaryExpression",
                left: {
                    type: "BinaryExpression",
                    left: {
                        type: "Identifier",
                        name: "x",
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 1
                            }
                        }
                    },
                    operator: "%",
                    right: {
                        type: "Identifier",
                        name: "y",
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 5
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 5
                        }
                    }
                },
                operator: "*",
                right: {
                    type: "Identifier",
                    name: "z",
                    loc: {
                        start: {
                            line: 1,
                            column: 8
                        },
                        end: {
                            line: 1,
                            column: 9
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 9
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 9
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 9
            }
        }
    });

    test("x << y << z", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "BinaryExpression",
                left: {
                    type: "BinaryExpression",
                    left: {
                        type: "Identifier",
                        name: "x",
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 1
                            }
                        }
                    },
                    operator: "<<",
                    right: {
                        type: "Identifier",
                        name: "y",
                        loc: {
                            start: {
                                line: 1,
                                column: 5
                            },
                            end: {
                                line: 1,
                                column: 6
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 6
                        }
                    }
                },
                operator: "<<",
                right: {
                    type: "Identifier",
                    name: "z",
                    loc: {
                        start: {
                            line: 1,
                            column: 10
                        },
                        end: {
                            line: 1,
                            column: 11
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 11
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 11
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 11
            }
        }
    });

    test("x | y | z", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "BinaryExpression",
                left: {
                    type: "BinaryExpression",
                    left: {
                        type: "Identifier",
                        name: "x",
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 1
                            }
                        }
                    },
                    operator: "|",
                    right: {
                        type: "Identifier",
                        name: "y",
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 5
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 5
                        }
                    }
                },
                operator: "|",
                right: {
                    type: "Identifier",
                    name: "z",
                    loc: {
                        start: {
                            line: 1,
                            column: 8
                        },
                        end: {
                            line: 1,
                            column: 9
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 9
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 9
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 9
            }
        }
    });

    test("x & y & z", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "BinaryExpression",
                left: {
                    type: "BinaryExpression",
                    left: {
                        type: "Identifier",
                        name: "x",
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 1
                            }
                        }
                    },
                    operator: "&",
                    right: {
                        type: "Identifier",
                        name: "y",
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 5
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 5
                        }
                    }
                },
                operator: "&",
                right: {
                    type: "Identifier",
                    name: "z",
                    loc: {
                        start: {
                            line: 1,
                            column: 8
                        },
                        end: {
                            line: 1,
                            column: 9
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 9
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 9
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 9
            }
        }
    });

    test("x ^ y ^ z", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "BinaryExpression",
                left: {
                    type: "BinaryExpression",
                    left: {
                        type: "Identifier",
                        name: "x",
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 1
                            }
                        }
                    },
                    operator: "^",
                    right: {
                        type: "Identifier",
                        name: "y",
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 5
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 5
                        }
                    }
                },
                operator: "^",
                right: {
                    type: "Identifier",
                    name: "z",
                    loc: {
                        start: {
                            line: 1,
                            column: 8
                        },
                        end: {
                            line: 1,
                            column: 9
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 9
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 9
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 9
            }
        }
    });

    test("x & y | z", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "BinaryExpression",
                left: {
                    type: "BinaryExpression",
                    left: {
                        type: "Identifier",
                        name: "x",
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 1
                            }
                        }
                    },
                    operator: "&",
                    right: {
                        type: "Identifier",
                        name: "y",
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 5
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 5
                        }
                    }
                },
                operator: "|",
                right: {
                    type: "Identifier",
                    name: "z",
                    loc: {
                        start: {
                            line: 1,
                            column: 8
                        },
                        end: {
                            line: 1,
                            column: 9
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 9
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 9
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 9
            }
        }
    });

    test("x | y ^ z", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "BinaryExpression",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                operator: "|",
                right: {
                    type: "BinaryExpression",
                    left: {
                        type: "Identifier",
                        name: "y",
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 5
                            }
                        }
                    },
                    operator: "^",
                    right: {
                        type: "Identifier",
                        name: "z",
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 9
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 9
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 9
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 9
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 9
            }
        }
    });

    test("x | y & z", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "BinaryExpression",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                operator: "|",
                right: {
                    type: "BinaryExpression",
                    left: {
                        type: "Identifier",
                        name: "y",
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 5
                            }
                        }
                    },
                    operator: "&",
                    right: {
                        type: "Identifier",
                        name: "z",
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 9
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 9
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 9
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 9
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 9
            }
        }
    });

    test("x || y", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "LogicalExpression",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                operator: "||",
                right: {
                    type: "Identifier",
                    name: "y",
                    loc: {
                        start: {
                            line: 1,
                            column: 5
                        },
                        end: {
                            line: 1,
                            column: 6
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 6
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 6
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 6
            }
        }
    });

    test("x && y", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "LogicalExpression",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                operator: "&&",
                right: {
                    type: "Identifier",
                    name: "y",
                    loc: {
                        start: {
                            line: 1,
                            column: 5
                        },
                        end: {
                            line: 1,
                            column: 6
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 6
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 6
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 6
            }
        }
    });

    test("x || y || z", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "LogicalExpression",
                left: {
                    type: "LogicalExpression",
                    left: {
                        type: "Identifier",
                        name: "x",
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 1
                            }
                        }
                    },
                    operator: "||",
                    right: {
                        type: "Identifier",
                        name: "y",
                        loc: {
                            start: {
                                line: 1,
                                column: 5
                            },
                            end: {
                                line: 1,
                                column: 6
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 6
                        }
                    }
                },
                operator: "||",
                right: {
                    type: "Identifier",
                    name: "z",
                    loc: {
                        start: {
                            line: 1,
                            column: 10
                        },
                        end: {
                            line: 1,
                            column: 11
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 11
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 11
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 11
            }
        }
    });

    test("x && y && z", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "LogicalExpression",
                left: {
                    type: "LogicalExpression",
                    left: {
                        type: "Identifier",
                        name: "x",
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 1
                            }
                        }
                    },
                    operator: "&&",
                    right: {
                        type: "Identifier",
                        name: "y",
                        loc: {
                            start: {
                                line: 1,
                                column: 5
                            },
                            end: {
                                line: 1,
                                column: 6
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 6
                        }
                    }
                },
                operator: "&&",
                right: {
                    type: "Identifier",
                    name: "z",
                    loc: {
                        start: {
                            line: 1,
                            column: 10
                        },
                        end: {
                            line: 1,
                            column: 11
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 11
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 11
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 11
            }
        }
    });

    test("x || y && z", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "LogicalExpression",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                operator: "||",
                right: {
                    type: "LogicalExpression",
                    left: {
                        type: "Identifier",
                        name: "y",
                        loc: {
                            start: {
                                line: 1,
                                column: 5
                            },
                            end: {
                                line: 1,
                                column: 6
                            }
                        }
                    },
                    operator: "&&",
                    right: {
                        type: "Identifier",
                        name: "z",
                        loc: {
                            start: {
                                line: 1,
                                column: 10
                            },
                            end: {
                                line: 1,
                                column: 11
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 1,
                            column: 5
                        },
                        end: {
                            line: 1,
                            column: 11
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 11
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 11
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 11
            }
        }
    });

    test("x || y ^ z", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "LogicalExpression",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                operator: "||",
                right: {
                    type: "BinaryExpression",
                    left: {
                        type: "Identifier",
                        name: "y",
                        loc: {
                            start: {
                                line: 1,
                                column: 5
                            },
                            end: {
                                line: 1,
                                column: 6
                            }
                        }
                    },
                    operator: "^",
                    right: {
                        type: "Identifier",
                        name: "z",
                        loc: {
                            start: {
                                line: 1,
                                column: 9
                            },
                            end: {
                                line: 1,
                                column: 10
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 1,
                            column: 5
                        },
                        end: {
                            line: 1,
                            column: 10
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 10
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 10
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 10
            }
        }
    });

    test("y ? 1 : 2", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "ConditionalExpression",
                test: {
                    type: "Identifier",
                    name: "y",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                consequent: {
                    type: "Literal",
                    value: 1,
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 5
                        }
                    }
                },
                alternate: {
                    type: "Literal",
                    value: 2,
                    loc: {
                        start: {
                            line: 1,
                            column: 8
                        },
                        end: {
                            line: 1,
                            column: 9
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 9
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 9
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 9
            }
        }
    });

    test("x && y ? 1 : 2", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "ConditionalExpression",
                test: {
                    type: "LogicalExpression",
                    left: {
                        type: "Identifier",
                        name: "x",
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 1
                            }
                        }
                    },
                    operator: "&&",
                    right: {
                        type: "Identifier",
                        name: "y",
                        loc: {
                            start: {
                                line: 1,
                                column: 5
                            },
                            end: {
                                line: 1,
                                column: 6
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 6
                        }
                    }
                },
                consequent: {
                    type: "Literal",
                    value: 1,
                    loc: {
                        start: {
                            line: 1,
                            column: 9
                        },
                        end: {
                            line: 1,
                            column: 10
                        }
                    }
                },
                alternate: {
                    type: "Literal",
                    value: 2,
                    loc: {
                        start: {
                            line: 1,
                            column: 13
                        },
                        end: {
                            line: 1,
                            column: 14
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 14
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 14
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 14
            }
        }
    });

    test("x = 42", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "AssignmentExpression",
                operator: "=",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                right: {
                    type: "Literal",
                    value: 42,
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 6
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 6
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 6
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 6
            }
        }
    });

    test("eval = 42", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "AssignmentExpression",
                operator: "=",
                left: {
                    type: "Identifier",
                    name: "eval",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 4
                        }
                    }
                },
                right: {
                    type: "Literal",
                    value: 42,
                    loc: {
                        start: {
                            line: 1,
                            column: 7
                        },
                        end: {
                            line: 1,
                            column: 9
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 9
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 9
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 9
            }
        }
    });

    test("arguments = 42", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "AssignmentExpression",
                operator: "=",
                left: {
                    type: "Identifier",
                    name: "arguments",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 9
                        }
                    }
                },
                right: {
                    type: "Literal",
                    value: 42,
                    loc: {
                        start: {
                            line: 1,
                            column: 12
                        },
                        end: {
                            line: 1,
                            column: 14
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 14
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 14
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 14
            }
        }
    });

    test("x *= 42", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "AssignmentExpression",
                operator: "*=",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                right: {
                    type: "Literal",
                    value: 42,
                    loc: {
                        start: {
                            line: 1,
                            column: 5
                        },
                        end: {
                            line: 1,
                            column: 7
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 7
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 7
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 7
            }
        }
    });

    test("x /= 42", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "AssignmentExpression",
                operator: "/=",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                right: {
                    type: "Literal",
                    value: 42,
                    loc: {
                        start: {
                            line: 1,
                            column: 5
                        },
                        end: {
                            line: 1,
                            column: 7
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 7
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 7
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 7
            }
        }
    });

    test("x %= 42", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "AssignmentExpression",
                operator: "%=",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                right: {
                    type: "Literal",
                    value: 42,
                    loc: {
                        start: {
                            line: 1,
                            column: 5
                        },
                        end: {
                            line: 1,
                            column: 7
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 7
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 7
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 7
            }
        }
    });

    test("x += 42", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "AssignmentExpression",
                operator: "+=",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                right: {
                    type: "Literal",
                    value: 42,
                    loc: {
                        start: {
                            line: 1,
                            column: 5
                        },
                        end: {
                            line: 1,
                            column: 7
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 7
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 7
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 7
            }
        }
    });

    test("x -= 42", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "AssignmentExpression",
                operator: "-=",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                right: {
                    type: "Literal",
                    value: 42,
                    loc: {
                        start: {
                            line: 1,
                            column: 5
                        },
                        end: {
                            line: 1,
                            column: 7
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 7
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 7
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 7
            }
        }
    });

    test("x <<= 42", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "AssignmentExpression",
                operator: "<<=",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                right: {
                    type: "Literal",
                    value: 42,
                    loc: {
                        start: {
                            line: 1,
                            column: 6
                        },
                        end: {
                            line: 1,
                            column: 8
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 8
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 8
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 8
            }
        }
    });

    test("x >>= 42", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "AssignmentExpression",
                operator: ">>=",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                right: {
                    type: "Literal",
                    value: 42,
                    loc: {
                        start: {
                            line: 1,
                            column: 6
                        },
                        end: {
                            line: 1,
                            column: 8
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 8
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 8
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 8
            }
        }
    });

    test("x >>>= 42", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "AssignmentExpression",
                operator: ">>>=",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                right: {
                    type: "Literal",
                    value: 42,
                    loc: {
                        start: {
                            line: 1,
                            column: 7
                        },
                        end: {
                            line: 1,
                            column: 9
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 9
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 9
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 9
            }
        }
    });

    test("x &= 42", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "AssignmentExpression",
                operator: "&=",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                right: {
                    type: "Literal",
                    value: 42,
                    loc: {
                        start: {
                            line: 1,
                            column: 5
                        },
                        end: {
                            line: 1,
                            column: 7
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 7
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 7
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 7
            }
        }
    });

    test("x ^= 42", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "AssignmentExpression",
                operator: "^=",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                right: {
                    type: "Literal",
                    value: 42,
                    loc: {
                        start: {
                            line: 1,
                            column: 5
                        },
                        end: {
                            line: 1,
                            column: 7
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 7
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 7
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 7
            }
        }
    });

    test("x |= 42", {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "AssignmentExpression",
                operator: "|=",
                left: {
                    type: "Identifier",
                    name: "x",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                right: {
                    type: "Literal",
                    value: 42,
                    loc: {
                        start: {
                            line: 1,
                            column: 5
                        },
                        end: {
                            line: 1,
                            column: 7
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 7
                    }
                }
            },
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 7
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 7
            }
        }
    });

    test("{ foo }", {
        type: "Program",
        body: [{
            type: "BlockStatement",
            body: [{
                type: "ExpressionStatement",
                expression: {
                    type: "Identifier",
                    name: "foo",
                    loc: {
                        start: {
                            line: 1,
                            column: 2
                        },
                        end: {
                            line: 1,
                            column: 5
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 2
                    },
                    end: {
                        line: 1,
                        column: 5
                    }
                }
            }],
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 7
                }
            }
        }],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 7
            }
        }
    });
})