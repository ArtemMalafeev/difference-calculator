## Status
[![Actions Status](https://github.com/ArtemMalafeev/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/ArtemMalafeev/frontend-project-lvl2/actions) [![Node.js CI](https://github.com/ArtemMalafeev/frontend-project-lvl2/actions/workflows/node.js.yml/badge.svg)](https://github.com/ArtemMalafeev/frontend-project-lvl2/actions/workflows/node.js.yml) [![Maintainability](https://api.codeclimate.com/v1/badges/b69c149b6e66be768283/maintainability)](https://codeclimate.com/github/ArtemMalafeev/frontend-project-lvl2/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/b69c149b6e66be768283/test_coverage)](https://codeclimate.com/github/ArtemMalafeev/frontend-project-lvl2/test_coverage)
____

## Description

###Difference calculator

Allows you to find the difference between two files with extensions: json, yml, yaml.

Supports three types of output format:
1. Stylish;
2. Plain;
3. JSON.
____

## Installation


`make install`

### Usage

```
Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
-V, --version        output the version number
-f, --format [type]  output format (default: "stylish")
-h, --help           output usage information
```
____
## Asciinema

1. Flat difference in json format:
   [![asciicast](https://asciinema.org/a/hfNixJuUOglTgCfuaF0Bq0Rio.svg)](https://asciinema.org/a/hfNixJuUOglTgCfuaF0Bq0Rio)
 
2. Flat difference in yaml format:
   [![asciicast](https://asciinema.org/a/InsieLNNkyxT80tdbS1rhhNf9.svg)](https://asciinema.org/a/InsieLNNkyxT80tdbS1rhhNf9)

3. Recursive difference in stylish format (default):
   [![asciicast](https://asciinema.org/a/oybX1ZasLZvJmvThT4u7dM9Wy.svg?rows=46)](https://asciinema.org/a/oybX1ZasLZvJmvThT4u7dM9Wy?rows=46)

4. Recursive difference in plain format:
   [![asciicast](https://asciinema.org/a/xXorEIVS23MCtHXlSujaeV49Z.svg)](https://asciinema.org/a/xXorEIVS23MCtHXlSujaeV49Z)

5. Recursive difference in json format:
   [![asciicast](https://asciinema.org/a/y2FmH5g2CMEyufu0ScF6t2FWf.svg?rows=9)](https://asciinema.org/a/y2FmH5g2CMEyufu0ScF6t2FWf?rows=9)
   
____