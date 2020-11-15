// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"app.js":[function(require,module,exports) {
/**
 * 1 Get form reference using document.getElementById('long-link-form')
 * 2 Add a submit listener to the form using addEventListener('submit')
 * 3 do event.preventDefault() to prevent default action JS/Browser performs
 * 4 access and store link values from the event using event.target.link.value in a constant
 * 5 Interpolate apiUrl and the link value together e.g. `https://api.shrtco.de/v2/shorten?url=${url}` in a constant
 * 6 fetch(apiUrl)
 *  .then(response => response.json())
 *  .then(response => console.log(response)) response will consist { ok, result }
 *  .catch(error => console.log(error))
 */
var mainContainer = document.querySelector('.main-container');
var longLink = document.getElementById('long-link-form');
var notificationContainer = document.querySelector('#notification-container');
var spinner = document.querySelector('.spinner');
longLink.addEventListener('submit', function (event) {
  event.preventDefault();
  spinner.style.display = 'flex';
  var url = event.target.link.value;
  var apiUrl = "https://api.shrtco.de/v2/shorten?url=".concat(url);
  fetch(apiUrl).then(function (response) {
    var json = response.json();
    json.then(function (data) {
      spinner.style.display = 'none';

      if (data.ok) {
        // everything is good
        var short_link = data.result.short_link; // below line dispatches and creates an event at the same time.

        createCard(short_link);
      } else {
        var errorMessage = data.error; // below line dispatches and creates an event at the same time. It can be done in one instruction or split it in to two

        notificationContainer.dispatchEvent(new CustomEvent('notify', {
          detail: errorMessage
        }));
      }
    });
  });
});

function createCard(short_link) {
  var cardElement = document.createElement('div');
  cardElement.classList.add('card');
  var formElement = document.createElement('form');
  formElement.id = 'short-link-form';
  var inputShortLink = document.createElement('input');
  inputShortLink.value = short_link;
  inputShortLink.readOnly = true;
  var buttonElement = document.createElement('button');
  buttonElement.type = 'submit';
  buttonElement.classList.add('button-copy');
  buttonElement.innerHTML = 'Copy';
  buttonElement.addEventListener('click', function (event) {
    event.preventDefault();
    buttonElement.classList.toggle('button-copy');
    buttonElement.classList.toggle('button-copied');

    if (buttonElement.classList.contains('button-copy')) {
      buttonElement.value = 'Copy';
    } else {
      buttonElement.value = 'Copied';
      notificationContainer.dispatchEvent(new CustomEvent('notify', {
        detail: 'Link successfully copied! 🎊'
      }));
    }

    inputShortLink.select();
    document.execCommand('copy');
    /* alert("Copied the link") */
  });
  formElement.appendChild(inputShortLink);
  formElement.appendChild(buttonElement);
  cardElement.appendChild(formElement);
  document.getElementById('shorten-links-container').appendChild(cardElement);
}
/**
 * 0. Create a function first and pass a param then execute it after line 25
 * 1. Create an empty div using document.createElement('div') and give and add a class using classList.add('card') const cardElement
 * 2. Create a form in javascript using document.createElement('form') and give a id short-link-form e.g. const formElement
 * 3. Create an input element in js using document.createElement('input') and assign it to a constant e.g const inputShortLink =
 *  3.1 set value to what you get from the api result.short_link
 *  3.2 set readonly to true
 * 4 Create an input element using document.createElement('input') and assign it to a const buttonElement
 *  4.1 set type submit
 *  4.2 add a class using .classList.add('button-copy')
 *  4.3 set value to Copy
 * 5. Append number 3 and number 4 to number 2 using appendChild e.g. formElement.appendChild([inputShortLink, buttonElement])
 * 6. Append formElement to cardElement.appendChild(formElement)
 * 7. Append cardElement to shorten-links-container element
 */

/**
 * stage 2
 * 1. addEventListener 'click' to the buttonElement and enure preventDefault happens
 * 2. When the button is clicked, toggle class button-copy with button-copied
 * 3. to copy the short_link to the clipboard
 *
 */


{
  /* Notification html example
  <div class="success-alert">
    <strong>Link successfully copied! 🎊</strong>
    <input type="button" class="close" data-dismiss="alert" value="OK" />
  </div> 
  */
}
/**
 * Displaying notifications
 *
 * 1. Create a CustomEvent('notify', { detail: errorMessage }) whenever error happens and store it in a const event = new CustomEvent('notify', { detail: errorMessage })
 *  1.1 use notificationContainer to dispatch e.g. notificationContainer.dispatchEvent(event)
 * 2. Make notification-container to listen to 'notify' events notificationContainer.addEventListener('notify', ...)
 * 3. Create a function and call it createNotification(message) { }
 * 4. Create empty div using document.createElement('div') e.g. const notificationElement
 *  4.1 add using classList.add('success-alert')
 * 5. Create strong element using const strongElement = document.createElement('strong')
 *  5.1 assign message parameter here strongElement.innerHtml = `${message} 🎊`
 * 6. Create input element using document.createElement('input') and store in a constant e.g. buttonElement
 *  6.1 add a class using buttonElement.classList.add('close')
 *  6.2 buttonElement.value = 'OK'
 *  6.3 buttonElement.type = 'button'
 * 7. notificationElement.appendChild(buttonElement)
 * 8. notificationElement.appendChild(strongElement)
 * 9. notificationContainer.appendChild(notificationElement)
 *
 */

notificationContainer.addEventListener('notify', function (event) {
  console.log(event.detail);
  createNotification(event.detail);
});

function createNotification(message) {
  var notificationElement = document.createElement('div');
  notificationElement.classList.add('success-alert');
  var strongElement = document.createElement('strong');
  strongElement.innerHTML = "".concat(message);
  var buttonElement = document.createElement('input');
  buttonElement.classList.add('close');
  buttonElement.type = 'button';
  buttonElement.value = 'OK';
  buttonElement.addEventListener('click', function (event) {
    //notificationContainer.style.display = 'none'
    notificationContainer.innerHTML = '';
  });
  notificationElement.appendChild(buttonElement);
  notificationElement.appendChild(strongElement);
  notificationContainer.appendChild(notificationElement);
}
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53761" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app.js"], null)
//# sourceMappingURL=/app.c328ef1a.js.map