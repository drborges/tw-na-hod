HOD - AngularJS Dark Magic
===============================
### Directives vs. Unit Testing

# Requirements

- git (:~)
- nodeJS
- npm
- bower
- mocha
- mocha-phantomjs
- gulp

# Getting the source and configuring the tooling

```bash
$ git clone https://github.com/drborges/unit-testing-angular-directives.git hod
$ cd hod
$ npm install -g mocha mocha-phantomjs gulp
$ npm install
$ bower install
```

# Running the Specs

- Single run:

```bash
$ gulp spec
```

- Continuously Testing:

```bash
$ gulp watch
```

- Mocha runner in the browser:

```bash
$ open spec/spec.runner.html
```