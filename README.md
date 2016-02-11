[![NPM Package][npm_img]][npm_site]
[![Travis][ci_img]][ci_site]
[![Dependency Status][david_img]][david_site]

# redux-tooltip

A tooltip [React](https://facebook.github.io/react/) component for [Redux](https://github.com/rackt/redux).

## Installation

```
npm install --save redux-tooltip
```

## Examples

Please check out [examples](https://github.com/kuy/redux-tooltip/tree/master/examples) directory.

## Getting Started

`redux-tooltip` provides a Redux reducer and Higher Order components; `Tooltip` and `Origin`.
The reducer handles actions that are dispatched from the components and changes Redux's state tree.
Since both components are already connected to Redux store (this also means they can call `store.dispatch()`),
the `Tooltip` component receives changes of props from the store and updates itself.

The recommended setup is that a single (shared) `Tooltip` component and multiple `Origin` components.
If you hover on the origin element, the tooltip will be shown.

#### 1. Put a shared `Tooltip` component to [Container component](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.lek6bm8mf)

```
import { Tooltip } from 'redux-tooltip';

class App extends React.Component {
  render() {
    return (
      <div>
        <Page />
        <Tooltip>
          Hello Tooltip!
        </Tooltip>
      </div>
    );
  }
}
```

#### 2. Wrap your content with an `Origin` component in Container or Presentatinal component

```
import { Origin } from 'redux-tooltip';

class Page extends React.Component {
  render() {
    return (
      <p>
        Please hover <Origin>here</Origin>.
      </p>
    );
  }
}
```

#### 3. Combine `redux-tooltip` reducer with yours

```
import { reducer as tooltip } from 'redux-tooltip';

// ...

export default combineReducers(
  { your, reducers, ..., tooltip }
);
```

That's it!

## API

### `<Tooltip />`

A tooltip component. Please wrap a content which should be shown in a tooltip.

+ `name` *(`string`)*: A name of tooltip. This is used by `<Origin />` component.
+ `place` *(`string`|`string[]`)*: A default direction of tooltip. This value can be overwritten by `<Origin />`'s `place` prop.
+ `within` *(`DOM Element`)*: A DOM element which is used to restrict the position where this tooltip is placed within.
+ `onHover` *(`Function`)*: A callback function to be called on mouseover at tooltip.
+ `onLeave` *(`Function`)*: A callback function to be called on mouseout at tooltip.

### `<Origin />`

An origin component. Please wrap an element which triggers the action to show a tooltip.
In most cases, you may use this component without any options.
For advanced usage, you can override the default handlers; `onMouseEnter` and `onMouseLeave`.

+ `name` *(`string`|`string[]`)*: A name(s) to specify which tooltip(s) should be used.
+ `content` *(`string`)*: A text content for tooltip.
+ `place` *(`string`|`string[]`)*: A name of direction to specify a location of tooltip.
+ `tagName` *(`string`)*: A tag name of wrapper element. Default is `span`.
+ `delay` *(`boolean`|`number`|`string`)*: A number of duration for delay feature.
+ `delayOn` *(`string`)*: A name of timing to enable the delay. `show`, `hide`, or `both`. Default is `hide`.
+ `onTimeout` *(`Function`)*: A callback function when timeout by delay feature.
+ `onMouseEnter` *(`Function`)*: An event handler of mouseenter.
+ `onMouseLeave` *(`Function`)*: An event handler of mouseleave.

#### Origin.wrapBy(*tagName*)

```
// Invalid SVG...
// Origin component wraps children with <span> tag in default.
function Shape() {
  return (
    <svg width="80" height="80">
      <Origin>
        <rect x="10" y="10" width="20" height="30" />
      </Origin>
    </svg>
  );
}

// Perfect!
// Origin.wrapBy() method can be used to create customized Origin component which wraps with your favorite tag.
const SVGOrigin = Origin.wrapBy('g');

function Shape() {
  return (
    <svg width="80" height="80">
      <SVGOrigin>
        <rect x="10" y="10" width="20" height="30" />
      </SVGOrigin>
    </svg>
  );
}
```

### `reducer`

A Redux reducer must be combined with yours.

### `middleware`

Please apply this middleware if you want to use 'delay' feature.

### `actions`

#### delay(*action*, options = { *duration*: 1500, *callback*: null })

A helper function to enable 'delay' feature.
Internally, it sets a duration of delay to the [meta](https://github.com/acdlite/flux-standard-action#meta) section of given action.
In `options` argument, `duration` is used for duration of delay. `callback` is a callback function which is called after expired delay.

## Development

### Setup

```
npm install
npm run build
```

### Start dev server for example

```
npm start
```

Open `http://localhost:8080/webpack-dev-server/` for auto-reloading.
If you want to debug with React Dev Tools, `http://localhost:8080/` will be preferred.

### Run test

This executes both unit and integration tests:

```
npm test
```

#### Unit test

```
npm run test:unit
```

#### Integration test

We're currently use PhantomJS 2.1.1 for testing environment.
Following command will launch the headless browser and run test suite.

```
npm run test:feature
```

If you prefer 'single-run', which means that the browser is closed after testing, try following command:

```
npm run test:feature:ci
```

### TODO

+ Introduce ESLint
+ API documentation using ESDoc

## Changelog

See the [Releases](https://github.com/kuy/redux-tooltip/releases) page on GitHub.

## License

MIT

## Author

Yuki Kodama / [@kuy](https://twitter.com/kuy)

[npm_img]: https://img.shields.io/npm/v/redux-tooltip.svg
[npm_site]: https://www.npmjs.org/package/redux-tooltip
[ci_img]: https://img.shields.io/travis/kuy/redux-tooltip/master.svg?style=flat-square
[ci_site]: https://travis-ci.org/kuy/redux-tooltip
[david_img]: https://img.shields.io/david/kuy/redux-tooltip.svg
[david_site]: https://david-dm.org/kuy/redux-tooltip
