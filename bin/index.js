#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const program = require('commander');

program
  .command('-h')
  .description('Generates new code')

