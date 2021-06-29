#!/usr/bin/env node

import { Command } from 'commander/esm.mjs';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.1.0');

program.helpOption('-h, --help', 'output usage information');

program.parse();
