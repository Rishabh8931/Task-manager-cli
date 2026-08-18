#!/usr/bin/env node

import { dispatch } from "./dispatcher.js";

const args = process.argv.slice(2);

dispatch(args);
