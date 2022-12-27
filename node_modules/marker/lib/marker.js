var fs = require('fs'),
    program = require('commander'),
    marked = require('marked');

program
    .version('0.1.2')
    .usage('-i <file> -o <file> [options]')
    .option('-i, --input <file>', 'Specify the input file.')
    .option('-o, --output <file>', 'Specify the output file.')
    .option('-w, --watch', 'Watch the file for changes.')
    .option('--pedantic', 'Conform to obscure parts of markdown.pl as much as possible. Don\'t fix original markdown bugs.')
    .option('--gfm', 'Enable github flavoured markdown.')
    .option('--sanitize', 'Sanitize output. Ignore any HTML input')
    .parse(process.argv);

// Set the marked preferences
marked.setOptions({
    gfm: program.gfm,
    pedantic: program.pedantic,
    sanitize: program.sanitize
});

// Check the command line arguments
if (!program.input) {
    console.log(program.helpInformation());
    process.exit();
}

if (!program.output) {
    console.log(program.helpInformation());
    process.exit();
}

fs.stat(program.input, function(err, stats) {
    if (err) {
        console.log(err);
        process.exit();
    }

    if (!stats.isFile()) {
        console.log(program.input + ' is not a file.');
        process.exit();
    }

    // Run one build right away
    processFile();

    // If we are watching the file then start the watch loop
    if (program.watch) {
        watchFile();
    }
});

// Watch program.input and build to program.output on any change.
function watchFile() {
    console.log('Watching file ' + program.input + '.');
    console.log('Press Ctrl-C to quit.');

    fs.watch(program.input, function(fileEvent, filename) {
        processFile();
    });
}

// Convert program.input from Markdown to HTML and write to program.output
function processFile() {
    fs.readFile(program.input, 'utf-8', function(err, data) {
        if (err) {
            console.log(err);
            process.exit();
        }

        var output = marked(data);
        fs.createWriteStream(program.output, {
            flags: 'w',
            encoding: 'utf-8',
            mode: 0666
        }).write(output);
    });
}
