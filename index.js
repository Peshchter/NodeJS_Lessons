const { program } = require('commander');
const fs = require('fs');
const path = require('path');
const { Transformer } = require('./transform');

program
    .requiredOption('-s, --shift <number>', 'a shift', n => parseInt(n))
    .option('-i, --input [inputfile]', 'an input file')
    .option('-o, --output [outputfile]', 'an output file')
    .requiredOption('-a, --action [type]', 'an action encode/decode');

program.parse();
const options = program.opts();

//обработка сдвига
if (!Number.isInteger(options.shift)) {
    console.error(`Type error! Shift must be an integer! But we have ${typeof(options.shift)}`);
    process.exit(1);
}

//создание потоков ввода/вывода
let rStream, wStream;
if (options.input) {
    const inputfile = path.resolve(__dirname, options.input)
    fs.access(inputfile, fs.constants.R_OK, (err) => {
        if (err){
            console.error('Error reading input file');
            process.exit(1);}
        })
    rStream = fs.createReadStream(inputfile);
} else {
    rStream = process.stdin;
}

if (options.output) {
    const outputfile = path.resolve(__dirname, options.output)
    fs.access(outputfile, fs.constants.W_OK, (err) => {
        if (err){
            console.error('Error writing output file')
            process.exit(1);}
        })
    wStream = fs.createWriteStream(outputfile, {
            flags: 'a',
            defaultEncoding: 'utf8'
        });
} else {
    wStream = process.stdout
}

//обработка действия
let action, transform;
switch ((options.action).toLowerCase()) {
    case 'encode':
        transform = new Transformer({
            shift: options.shift
        });
        rStream.pipe(transform).pipe(wStream);
        break;
    case 'decode':
        transform = new Transformer({
            shift: -options.shift
        });
        rStream.pipe(transform).pipe(wStream);
        break;
    default:
        console.error("Action must be an 'encode' or 'decode'!");
        process.exit(1);
}