# Marker

A command line utility for compiling markdown files live.

## Install

``` bash
$ npm install -g marker
```

## Usage

```
Usage: marker -i <file> -o <file> [options]

Options:

    -h, --help           output usage information
    -V, --version        output the version number
    -i, --input <file>   Specify the input file.
    -o, --output <file>  Specify the output file.
    -w, --watch          Watch the file for changes.
    --pedantic           Conform to obscure parts of markdown.pl as much as possible. Don't fix original markdown bugs.
    --gfm                Enable github flavoured markdown.
    --sanitize           Sanitize output. Ignore any HTML input
```

## License

Copywrite (c) 2012, Kurtis Schmidt. (MIT License)

See LICENSE for more info.
