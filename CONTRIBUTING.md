# Contributing to Composi

Thank you for taking the time to read our contribution guidelines. You can start contributing in many ways like filing bug reports, improving the documentation, and helping others.

## Style

Composi is written in ES6. We do this to take better advantage of modern JavaScript features. We use ES6 import and export for structing the code. This is to enable proper bundling with Rollup.

1. Use let or const for variables.
2. Use destructuring where possible.
3. Use arrow functions where appropriate for block scoping and conciseness.
4. When using arrow functions, if there is one parameter, do not enclose it in parenthesis:

```javascript 
  const announce = message => alert(message)
```
5. Any classes should be in ES6. The older prototype-based classes will not be accepted.
6. Any ES6 features that cannot be polyfilled will not be accepted.


## Bugs

Before submitting a bug issue, search the Composi repository issues to make sure the same issue has not already been submitted.

Be thorough in your title and report, don't leave out important details, describe your setup and [include any relevant code](https://en.wikipedia.org/wiki/Minimal_Working_Example) with your issue.

When providing code samples in your issue, make sure to enclose them in Github markup block syntax:

\`\`\`javascript

code here...

\`\`\`

Possible code block tags are:

\`\`\`javascript

\`\`\`html

\`\`\`css

\`\`\`jsx

## Performance Improvement

If you feel you can improve the performance of any part of Composi, please provide a perf test with before and after results. This may require links to an online perf test site.

Also, if you notice a performance issue affecting your app, please let us know about it. This might be something in Composi that we can address or it might be the result of how you are using Composi.

## New Feature

If you have an idea for a new feautre that you think would be useful for other users, please let us know. Make sure the title and description clearly explain what this feature is. Remember that examples are worth a thousand words, so try to provide one, at least as a code block.

Please be aware that what might seem like a good idea to you might be out of scope for what we want Composi to be.

## Documentation

Please let us know if you find any typos or egrecious gramatical errors in the docs. The repository's documentation in in the `/docs` folder.

We are also open to pull requests that improve the documentation for ease of comprehension, or that provide better examples or new examples where missing.

## Tests

Before making a pull request, do a build and then run the tests:

```bash
npm run build

npm test
```

If you are proposing a new feature, you will propably need to create a test to make sure it is working as expected. We use Mocha and Chai for tests. These are run in the browser so that we can test actual DOM results. Depending on the feature you are proposing, you may not need actual access to the DOM but a mere test on a vNode might be sufficient.

Examine the current tests to see how we use Mocha and Chai with Composi. Remember, if you've made a change to Composi's source code, you will need to build before running the tests.
