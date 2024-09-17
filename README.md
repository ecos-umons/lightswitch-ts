# Dimmable light switch

This repository contains a simple example of a dimmable light switch. The example is very basic, since it is used for teaching purposes by the Software Engineering Lab of the Faculty of Sciences at the University of Mons.

The aim of the example is to illustrate how to implement a visual UI controlled by a statechart,
based on a state design pattern in object-oriented style. The example also illustrates how to write unit tests for testing the behaviour of this statechart.

The example is implemented in **TypeScript**, and has a visual frontend created with **VueJS**, running in a web browser of your choice.
The example has been built with [Vite](https://vitejs.dev), a frontend development enviroment and build tool for JavaScript.
The code is tested with [Vitest](https://junit.org/junit5/), a Vite-native unit testing framework.

## Instructions

You will need to have a running version of npm on your machine in order to be able to compile and execute this code. If this is the case, you will be able to build, test and execute the code as follows: 

### Project Setup

To install all necessary dependencies run the following instruction from the command-line:

```sh
npm install
```

### Compile and Hot-Reload (for Development purposes)

To compile and execute the code during development, run the following command-line instruction:

```sh
npm run dev
```


### Test with Vitest

To run all unit tests with [Vitest](https://vitest.dev/), run the following command-line instruction:

```sh
npm run test
```

### Compile production build

To create an optimized and minified production build, run the following command-line instruction:

```sh
npm run build
npm run serve
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## License

Source code distributed under MIT license.

## Contributors

The following members of the Software Engineering Lab (Faculty of Sciences, University of Mons, Belgium) contributed to this project:

-   Guillaume Cardoen
-   Tom Mens
