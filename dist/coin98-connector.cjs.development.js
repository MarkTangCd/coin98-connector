'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var abstractConnector = require('@web3-react/abstract-connector');
var warning = _interopDefault(require('tiny-warning'));

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };
  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct.bind();
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

// A type of promise-like that resolves synchronously and supports only one observer

const _iteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator"))) : "@@iterator";

const _asyncIteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.asyncIterator || (Symbol.asyncIterator = Symbol("Symbol.asyncIterator"))) : "@@asyncIterator";

// Asynchronously call a function and send errors to recovery continuation
function _catch(body, recover) {
	try {
		var result = body();
	} catch(e) {
		return recover(e);
	}
	if (result && result.then) {
		return result.then(void 0, recover);
	}
	return result;
}

function parseSendReturn(sendReturn) {
  return sendReturn.hasOwnProperty('result') ? sendReturn.result : sendReturn;
}

var NoEthereumProviderError = /*#__PURE__*/function (_Error) {
  _inheritsLoose(NoEthereumProviderError, _Error);

  function NoEthereumProviderError() {
    var _this;

    _this = _Error.call(this) || this;
    _this.name = _this.constructor.name;
    _this.message = 'No Ethereum provider was found on window.bitkeep.';
    return _this;
  }

  return NoEthereumProviderError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
var UserRejectedRequestError = /*#__PURE__*/function (_Error2) {
  _inheritsLoose(UserRejectedRequestError, _Error2);

  function UserRejectedRequestError() {
    var _this2;

    _this2 = _Error2.call(this) || this;
    _this2.name = _this2.constructor.name;
    _this2.message = 'The user rejected the request.';
    return _this2;
  }

  return UserRejectedRequestError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
var Coin98Connector = /*#__PURE__*/function (_AbstractConnector) {
  _inheritsLoose(Coin98Connector, _AbstractConnector);

  function Coin98Connector(kwargs) {
    var _this3;

    _this3 = _AbstractConnector.call(this, kwargs) || this;
    _this3.handleNetworkChanged = _this3.handleNetworkChanged.bind(_assertThisInitialized(_this3));
    _this3.handleChainChanged = _this3.handleChainChanged.bind(_assertThisInitialized(_this3));
    _this3.handleAccountsChanged = _this3.handleAccountsChanged.bind(_assertThisInitialized(_this3));
    _this3.handleClose = _this3.handleClose.bind(_assertThisInitialized(_this3));
    return _this3;
  }

  var _proto = Coin98Connector.prototype;

  _proto.handleChainChanged = function handleChainChanged(chainId) {
    var _window$coin;

    {
      console.log("Handling 'chainChanged' event with payload", chainId);
    }

    this.emitUpdate({
      chainId: chainId,
      provider: (_window$coin = window.coin98) == null ? void 0 : _window$coin.provider
    });
  };

  _proto.handleAccountsChanged = function handleAccountsChanged(accounts) {
    {
      console.log("Handling 'accountsChanged' event with payload", accounts);
    }

    if (accounts.length === 0) {
      this.emitDeactivate();
    } else {
      this.emitUpdate({
        account: accounts[0]
      });
    }
  };

  _proto.handleClose = function handleClose(code, reason) {
    {
      console.log("Handling 'close' event with payload", code, reason);
    }

    this.emitDeactivate();
  };

  _proto.handleNetworkChanged = function handleNetworkChanged(networkId) {
    var _window$coin2;

    {
      console.log("Handling 'networkChanged' event with payload", networkId);
    }

    this.emitUpdate({
      chainId: networkId,
      provider: (_window$coin2 = window.coin98) == null ? void 0 : _window$coin2.provider
    });
  };

  _proto.activate = function activate() {
    try {
      var _temp5 = function _temp5(_result) {
        if (_exit2) return _result;

        function _temp2() {
          return _extends({
            provider: window.coin98.provider
          }, account ? {
            account: account
          } : {});
        }

        var _temp = function () {
          if (!account) {
            // if enable is successful but doesn't return accounts, fall back to getAccount (not happy i have to do this...)
            return Promise.resolve(window.coin98.provider.enable().then(function (sendReturn) {
              return sendReturn && parseSendReturn(sendReturn)[0];
            })).then(function (_window$coin98$provid2) {
              account = _window$coin98$provid2;
            });
          }
        }();

        // if unsuccessful, try enable
        return _temp && _temp.then ? _temp.then(_temp2) : _temp2(_temp);
      };

      var _exit2 = false;

      var _this5 = this;

      if (!window.coin98) {
        throw new NoEthereumProviderError();
      }

      if (window.coin98.provider.on) {
        window.coin98.provider.on('chainChanged', _this5.handleChainChanged);
        window.coin98.provider.on('accountsChanged', _this5.handleAccountsChanged);
        window.coin98.provider.on('close', _this5.handleClose);
        window.coin98.provider.on('networkChanged', _this5.handleNetworkChanged);
      } // try to activate + get account via eth_requestAccounts


      var account;

      var _temp6 = _catch(function () {
        return Promise.resolve(window.coin98.provider.send('eth_requestAccounts').then(function (sendReturn) {
          return parseSendReturn(sendReturn)[0];
        })).then(function (_window$coin98$provid) {
          account = _window$coin98$provid;
        });
      }, function (error) {
        if (error.code === 4001) {
          throw new UserRejectedRequestError();
        }

        "development" !== "production" ? warning(false, 'eth_requestAccounts was unsuccessful, falling back to enable') : void 0;
      });

      return Promise.resolve(_temp6 && _temp6.then ? _temp6.then(_temp5) : _temp5(_temp6));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.getProvider = function getProvider() {
    try {
      var _window$coin3;

      return Promise.resolve((_window$coin3 = window.coin98) == null ? void 0 : _window$coin3.provider);
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.getChainId = function getChainId() {
    try {
      var _temp13 = function _temp13() {
        function _temp9() {
          if (!chainId) {
            try {
              chainId = parseSendReturn(window.coin98.provider.send({
                method: 'net_version'
              }));
            } catch (_unused) {
              "development" !== "production" ? warning(false, 'net_version v2 was unsuccessful, falling back to manual matches and static properties') : void 0;
            }
          }

          if (!chainId) {
            if (window.coin98.provider.isDapper) {
              chainId = parseSendReturn(window.coin98.provider.cachedResults.net_version);
            } else {
              chainId = window.coin98.provider.chainId || window.coin98.provider.netVersion || window.coin98.provider.networkVersion || window.coin98.provider._chainId;
            }
          }

          return chainId;
        }

        var _temp8 = function () {
          if (!chainId) {
            var _temp12 = _catch(function () {
              return Promise.resolve(window.coin98.provider.send('net_version').then(parseSendReturn)).then(function (_window$coin98$provid4) {
                chainId = _window$coin98$provid4;
              });
            }, function () {
              "development" !== "production" ? warning(false, 'net_version was unsuccessful, falling back to net version v2') : void 0;
            });

            if (_temp12 && _temp12.then) return _temp12.then(function () {});
          }
        }();

        return _temp8 && _temp8.then ? _temp8.then(_temp9) : _temp9(_temp8);
      };

      if (!window.coin98) {
        throw new NoEthereumProviderError();
      }

      var chainId;

      var _temp14 = _catch(function () {
        return Promise.resolve(window.coin98.provider.send('eth_chainId').then(parseSendReturn)).then(function (_window$coin98$provid3) {
          chainId = _window$coin98$provid3;
        });
      }, function () {
        "development" !== "production" ? warning(false, 'eth_chainId was unsuccessful, falling back to net_version') : void 0;
      });

      return Promise.resolve(_temp14 && _temp14.then ? _temp14.then(_temp13) : _temp13(_temp14));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.getAccount = function getAccount() {
    try {
      var _temp21 = function _temp21() {
        function _temp17() {
          if (!account) {
            account = parseSendReturn(window.coin98.provider.send({
              method: 'eth_accounts'
            }))[0];
          }

          return account;
        }

        var _temp16 = function () {
          if (!account) {
            var _temp20 = _catch(function () {
              return Promise.resolve(window.coin98.provider.enable().then(function (sendReturn) {
                return parseSendReturn(sendReturn)[0];
              })).then(function (_window$coin98$provid6) {
                account = _window$coin98$provid6;
              });
            }, function () {
              "development" !== "production" ? warning(false, 'enable was unsuccessful, falling back to eth_accounts v2') : void 0;
            });

            if (_temp20 && _temp20.then) return _temp20.then(function () {});
          }
        }();

        return _temp16 && _temp16.then ? _temp16.then(_temp17) : _temp17(_temp16);
      };

      if (!window.coin98) {
        throw new NoEthereumProviderError();
      }

      var account;

      var _temp22 = _catch(function () {
        return Promise.resolve(window.coin98.provider.send('eth_accounts').then(function (sendReturn) {
          return parseSendReturn(sendReturn)[0];
        })).then(function (_window$coin98$provid5) {
          account = _window$coin98$provid5;
        });
      }, function () {
        "development" !== "production" ? warning(false, 'eth_accounts was unsuccessful, falling back to enable') : void 0;
      });

      return Promise.resolve(_temp22 && _temp22.then ? _temp22.then(_temp21) : _temp21(_temp22));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.deactivate = function deactivate() {
    if (window.coin98 && window.coin98.provider.removeListener) {
      window.coin98.provider.removeListener('chainChanged', this.handleChainChanged);
      window.coin98.provider.removeListener('accountsChanged', this.handleAccountsChanged);
      window.coin98.provider.removeListener('close', this.handleClose);
      window.coin98.provider.removeListener('networkChanged', this.handleNetworkChanged);
    }
  };

  _proto.isAuthorized = function isAuthorized() {
    try {
      if (!window.coin98) {
        return Promise.resolve(false);
      }

      return Promise.resolve(_catch(function () {
        return Promise.resolve(window.coin98.provider.send('eth_accounts').then(function (sendReturn) {
          if (parseSendReturn(sendReturn).length > 0) {
            return true;
          } else {
            return false;
          }
        }));
      }, function () {
        return false;
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return Coin98Connector;
}(abstractConnector.AbstractConnector);

exports.Coin98Connector = Coin98Connector;
exports.NoEthereumProviderError = NoEthereumProviderError;
exports.UserRejectedRequestError = UserRejectedRequestError;
//# sourceMappingURL=coin98-connector.cjs.development.js.map
