import benchmark from 'benchmark';
import acorn from 'acorn';
import babelParser from '@babel/parser';
import cherow from 'cherow';
import esprima from 'esprima';
import fs from 'fs';

const parsers = {
    acorn: {
        parse: acorn.parse,
    },
    babel: {
        parse: babelParser.parse,
    },
    cherow: {
        parse: cherow.parse,
    },
    esprima: {
        parse: esprima.parse
    }

};

const ref = setInterval(() => {}, 500);
const suite = new benchmark.Suite();


suite.on('complete', () => {
    console.log(suite);
    clearInterval(ref);
});

const createSuite = (name, language, input) => {
    suite.add(`${name}-${language}`, () => parsers[name].parse(input));
};

function testReact() {
    const language = 'react';
    const input = fs.readFileSync( "./node_modules/react/cjs/react.development.js", 'utf8' );
    createSuite('acorn', language, input);
    createSuite('babel', language, input);
    createSuite('cherow', language, input);
    createSuite('esprima', language, input);
}

function testTypescript() {
    const language = 'typescript';
    const input = fs.readFileSync( "./node_modules/typescript/bin/tsc", 'utf8' );
    createSuite('acorn', language, input);
    createSuite('babel', language, input);
    createSuite('cherow', language, input);
    createSuite('esprima', language, input);
}

testReact();
testTypescript();

suite.run({ 'async': false });