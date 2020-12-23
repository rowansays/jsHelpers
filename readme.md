# Rowan's JavaScript Helpers

Library of [pure](https://en.wikipedia.org/wiki/Pure_function) JavaScript filters and predicates. This library is available via node package manager and may be installed by using the following command:

```
npm i @rowansays/helpers
```

[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT) [![npm version](https://badge.fury.io/js/%40rowansays%2Fhelpers.svg)](https://badge.fury.io/js/%40rowansays%2Fhelpers) [![install size](https://packagephobia.com/badge?p=@rowansays/helpers)](https://packagephobia.com/result?p=@rowansays/helpers) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Functions

### castArray()

 * clones existing arrays
 * converts Map, Set, and other iterables to arrays
 * optional filtering of allowed types
 * optional recursion

### castString()

 * strings pass through unaltered
 * numbers are coerced to strings
 * an empty string is returned for everything else

### castStringArray()

 * filter an array preserving all string values
 * numbers are coerced to strings
 * all other values are excluded from the array

### isIterable()

 * returns `true` for all iterables

### isIterableObject()

 * returns `true` for all iterables except strings
