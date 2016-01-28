'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = middleware;

var _actions = require('./actions');

var _utils = require('./utils');

function getToken(state, name) {
  var tooltips = state.tooltip;

  var tooltip = tooltips[name];
  if (tooltip) {
    return tooltip.timeout;
  }
}

function middleware(store) {
  return function (next) {
    return function (action) {
      // Clear timeout
      var names = (0, _utils.resolve)(action);
      names.forEach(function (name) {
        var token = getToken(store.getState(), name);
        token && clearTimeout(token);
      });

      if (!action.meta || !action.meta.delay) {
        return next(action);
      }

      // Setup timeout
      names.forEach(function (name) {
        var newToken = setTimeout(function () {
          // Ignore if token is cleared
          var token = getToken(store.getState(), name);
          if (token !== null) {
            // Clear timeout token
            next((0, _actions.endTimeout)({ name: name }));

            // Dispatch original action
            delete action.meta['delay'];
            next(action);
          }
        }, action.meta.delay);

        // Store timeout token
        next((0, _actions.startTimeout)({ name: name, token: newToken }));
      });

      return names;
    };
  };
}