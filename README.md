[![Build Status](https://travis-ci.org/JiriChara/kindergarten.svg?branch=master)](https://travis-ci.org/JiriChara/kindergarten)
[![Code Climate](https://codeclimate.com/github/JiriChara/kindergarten/badges/gpa.svg)](https://codeclimate.com/github/JiriChara/kindergarten)
[![Test Coverage](https://codeclimate.com/github/JiriChara/kindergarten/badges/coverage.svg)](https://codeclimate.com/github/JiriChara/kindergarten/coverage)
[![Issue Count](https://codeclimate.com/github/JiriChara/kindergarten/badges/issue_count.svg)](https://codeclimate.com/github/JiriChara/kindergarten)
[![Dependency Status](https://gemnasium.com/JiriChara/kindergarten.svg)](https://gemnasium.com/JiriChara/kindergarten)
[![NPM Dowloads](https://img.shields.io/npm/dm/kindergarten.svg)](https://www.npmjs.com/package/kindergarten)
[![NPM Version](https://img.shields.io/npm/v/kindergarten.svg)](https://www.npmjs.com/package/kindergarten)
[![ESDoc](https://doc.esdoc.org/github.com/JiriChara/kindergarten/badge.svg)](https://doc.esdoc.org/github.com/JiriChara/kindergarten/)

![Kindergarten](https://raw.github.com/JiriChara/kindergarten/master/images/kindergarten.png) v1.5.2

Kindergarten helps you to separate your business logic into modules and add a security layer over them. It is based on sandbox pattern. Kindergarten will work well with all frameworks and libraries you like: VueJS, React, Angular, Ember, Backbone etc. etc. etc...

## Terms Used in Kindergarten

### Perimeter

Perimeter is a module that represents an area in you application (certain component, page, button, header etc.). Perimeter defines methods that should be exposed and rules that must be followed on that particular area.

### Sandbox

Modules (perimeters) are plugged into sandbox and all exposed methods will be accessible through it. Sandbox is governed by a governess and she is the one who makes sure that all rules are followed in order to prevent any kind of troubles.

### Governess

The governess is guarding your sandbox. She makes sure that child doesn't do any unauthorized activities and she can deal with troubles your way!

### Child

Child in Kindergarten represents the current user of your application.

## Example

```javascript
import {
  createPerimeter,
  createSandbox
} from 'kindergarten';
import { guard } from 'kindergarten/decorators';

import Child from './Child';
import Television from './Television';
import CableTv from './CableTv';

// Definition of the perimeter
const homePerimeter = createPerimeter({
  purpose: 'home',

  can: {
    watch: [Television],

    eat(candy) {
      // Only 5 candies allowed
      return this.child.eatenCandies < 5;
    }
  },

  cannot: {
    watch: [CableTv],
    visitWebPage: /drugs|sex|rock-and-roll|guns/
  },

  expose: [
    'watchTv',
    'browseInternet',
    'eat'
  ],

  watchTv(tv) {
    this.guard('watch', tv);

    console.log(`${this.childName()} is watching ${tv.type}`);
  },

  @guard
  eat(candy) {
    // decorator will call this following line automatically:
    // this.guard('eat', candy);

    console.log(`${this.childName()} is eating a candy #${++this.child.eatenCandies}`);
  },

  @guard('visitWebPage')
  browseInternet(site) {
    console.log(`${this.childName()} is browsing on following site: ${site}`);
  },

  childName() {
    return `${this.child.name}`;
  }
});

// Child
const child = new Child("John Smith Jr.");

// Definition of Sandbox
const sandbox = createSandbox(child);
sandbox.loadModule(homePerimeter);

// No problemo
sandbox.home.watchTv(new Television());

// Throws AccessDenied error
sandbox.home.watchTv(new CableTv());
sandbox.home.watchTv(CableTv);

// Fails after a while
for (let i = 0; i <= 6; i++) {
  sandbox.home.eat('Tasty Candy');
});

sandbox.home.browseInternet('http://google.com'); // no problem

// Throws AccessDenied error
sandbox.home.browseInternet('http://buy-drugs-and-guns-online.com');
```

## Installation

### npm

```shell
yarn add kindergarten
```

## Usage

### Sandbox

The Sandbox is where the magic happens, that's why Kindergarten makes it really easy for you to create a new sandbox. For instance you can inherit from `Sandbox` class:

```javascript
import { Sandbox } from 'kindergarten';

class MyClass extends Sandbox {
  constructor(currentUser, perimeters) {
    this.child = currentUser
    // same as this.loadModule(...perimeters)
    this.loadPerimeter(...perimeters);
  }

  @guard
  someProtectedMethod() {
    // this method will be guarded
  }
}
```

You can also use `@sandbox` decorator, where inheritance is not applicable:

```javascript
import { createPerimeter } from 'kindergarten';
import { sandbox } from 'kindergarten/decorators';
import { Component } from 'react';

const adminPerimeter = createPerimeter({
  purpose: 'admin',

  govern: {
    'can route': function (location) {
      return location === 'admin' ?
        (this.child && this.child.isAdmin) :
        true;
    }
  }
});

@sandbox(null, {
  perimeters: [
    adminPerimeter
  ]
})
@connect(
  state => ({ child: state.auth.user })
)
export default class BaseRouter extends Component {
  guardRoute(route) {
    return (nextState, replace, callback) =>
      this.guard('route', route, nextState, replace, callback);
  }

  render() {
    return (
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={HomePage} />
          <Route path="about" component={AboutPage} />
          <Route path="contact" component={ContactPage} />
          <Route path="admin" component={AdminPage} onEnter={this.guardRoute('admin')} />
          <Route path="login" component={LoginPage} />
        </Route>
      </Router>
    );
  }
}
```

If you don't want to use decorators, then you can use `sandbox` method directly:

```javascript
sandbox(child, sandboxOptions)(class MyComponent extends Component {
  // ...
});
```

### Rule

`Rule` class is used internally be kindergarten. It's probably not a good idea to use it directly, but who knows..

```javascript
import { Rule } from 'kindergarten';
// or
// import { createRule } from 'kindergarten';
import { HeadGoverness } from 'kindergarten';

import currentUser, as child  from 'your/awesome-application/currentUser';
import Like form 'your/awesome-application/models/Like';
import Comment form 'your/awesome-application/models/Comment';

const rule1 = Rule.create('can create', [Comment]);
// or
// const rule1 = createRule('can create', [Comment]);

const rule2 = Rule.create('can create', [Like]);

const governess = new HeadGoverness();
governess.addRule(rule1, rule2); // Head Governess will learn the rules

governess.guard('create', new Like()); // no problem!
governess.isAllowed('create', Comment); // true
governess.isAllowed('create', {}); // false
```

### Governess

The `guard()` method throws `AccessDenied` error by default, but sometimes we want something else. In react-router example above we want to redirect user to login page rather than throwing an error. We could change our `guardRoute` method to do that for us, but there is a better way! We can create our own governess for routing!

```javascript
import {
  HeadGoverness,
  AccessDenied
} from 'kindergarten';

export default class RoutingGoverness extends HeadGoverness {
  guard(action, route, nextState, replace, callback) {
    try {
      super.guard(action, route);
    } catch (e) {
      if (e instanceof AccessDenied) {
        replace('login');
        callback(e.message);
      } else {
        callback(e.message);
      }
    }
  callback();
  }
}
```

and put her on the sandbox our sandbox:

```javascript
// ...
import { RoutingGoverness } form './governesses';

@sandbox(child, {
  perimeters,
  governess: RoutingGoverness
})
class BaseRouter extends Component {
  // ...
}
```

Kindergarten has also some predefined governesses:

#### German Governess

German governess loves rules :trollface:. She automatically guards all exposed methods.

```javascript
import {
  createPerimeter,
  createSandbox
} from 'kindergarten';

const perimeter = createPerimeter({
  purpose: 'articles',

  govern: {
    'can update': function (article) {
      return this._isAdminOrCreatorOf(article);
    }
  },

  expose: [
    'update'
  ],

  _isAdminOrCreatorOf(article) {
    return this.child.role === 'admin' || (
      this.child.role === 'moderator' &&
        this.child === article.author
    ) && !this.child.isBanned;
  },

  update(article, attrs) {
    // We don't need the line bellow GermanGoverness will add it
    // this.guard('update', article);
    return article.update(attrs);
  },
});

// ...

const currentUser = { role: 'regularGuy' };

const sandbox = createSandbox(currentUser, {
  governess: GermanGoverness
});

sandbox.loadModule(perimeter);

sandbox.articles.update(currentUser); // throws AccessDenied error
```

#### Strict Governess

Strict governess is useful if you sometimes forget to protect your exposed methods by calling `guard()` in their body. Strict governess throws an `AccessDenied` error if user calls exposed method that does not call `guard()` in it's body. **Careful!** The exposed method is executed and the `AccessDenied` error is thrown afterwards. Rollback is on your own! `StrictGoverness` might be useful during development.

```javascript
import {
  StrictGoverness,
  Rule
} from 'kindergarten';

const governess = new StrictGoverness();

governess.addRule(Rule.create('can watch', () => true);

governess.governed((tv) => {
  governess.guard('watch', tv);
  return 'hello';
}); // all right

governess.governed(() => {
  // NO guard call here
  return 'hello';
}); // throws Kindergarten.AccessDenied
```

#### Easy Governess

`EasyGoverness` allows child to do anything:

```javascript
import { Perimeter, Sandbox, EasyGoverness } from 'kindergarten';

const perimeter = new Perimeter({
  purpose: 'playing',
  govern: {
    'cannot watch'() {
      // child can't watch anything
      return true;
    }
  },
  expose: [
    'watch'
  ],
  watch(thing) {
    this.guard('watch', thing);
  }
});

perimeter.governess = EasyGoverness;

const sandbox = new Sandbox({});
sandbox.loadModule(perimeter);
sandbox.playing.watch('bad channel'); // easy going
```

#### Middleware Governess

`MiddlewareGoverness` allows you to execute a given method whenever some exposed method is called through the sandbox.

```javascript
import {
  createPerimeter,
  createSandbox,
  MiddlewareGoverness
} from 'kindergarten';

const child = {};

const perimeter = createPerimeter({
  purpose: 'playing',
  govern: {
    ['cannot watch']() {
      // child can't watch anything
      return true;
    }
  },
  expose: [
    'watch'
  ],
  watch(thing) {
    this.guard('watch', thing);
  }
});

const sandbox = createSandbox(child, {
  governess: new MiddlewareGoverness((governess, exposedMethod, exposedMethodCallingArgs, callingContext) => {
    // do somethig here
  });
});

sandbox.loadModule(perimeter);
sandbox.playing.watch({}); // callback above will be called
```

### Perimeter

Perimeter contains set of rules for governess and some methods that should be exposed to sandbox.

```javascript
import { Perimeter }  from 'kindergarten';

const TV = () => {};

const perimeter1 = createPerimeter({
  purpose: 'perimeter1',
  govern: {
    can: {
      watch: [TV]
    }
  }
});

const perimeter2 = createPerimeter({
  purpose: 'perimeter2',
  govern: {
    cannot: {
      watch: [TV]
    }
  }
});

const sandbox = createSandbox({});

sandbox.loadModule(perimeter1, perimeter2);

sandbox.perimeter1.isAllowed('watch', new TV()); // true
sandbox.perimeter2.isAllowed('watch', new TV()); // false
sandbox.isAllowed('watch', new TV()); // false
```

### Purpose

When sandbox loads perimeter, a new `Purpose` is created. Sandbox copies all exposed methods into the instance of the purpose, so they are callable through the purpose namespace.

```javascript
import {
  Perimeter,
  Sanbox,
  GermanGoverness,
  Purpose
} from 'kindergarten';

const perimeter = new Perimeter({
  purpose: 'foo',

  govern: {
    'cannot foo': () => true
  },

  expose: [
    'foo'
  ],

  foo: function () {}
});

const user = {};

const sandbox = new Sandbox(user, {
  perimeters: [
    perimeter
  ],

  governess: GermanGoverness
});

const myPurpose = new Purpose(perimeter.purpose, sandbox);
myPurpose._loadPerimeter(perimeter);

myPurpose.foo(); // throws Kindergarten.AccessDenied
```

**DO NOT USE** `Purpose` directly, it's meant to be used internally by a sandbox.

## More About Kindergarten

* [Protect Your React Apps with Kindergarten](https://medium.com/@JiriChara/protect-your-react-apps-with-kindergarten-6b78f47a85f1#.kujr69a6k)
* [Introducing Kindergarten](https://medium.com/@JiriChara/introducing-kindergarten-81d77e0e1f11#.suwqgn8et)
* [Documentation](https://doc.esdoc.org/github.com/JiriChara/kindergarten/)

## Thanks to..

[coffeeaddict](https://github.com/coffeeaddict) for [inspiration](https://github.com/coffeeaddict/kindergarten).

## License
The MIT License (MIT) - See file 'LICENSE' in this project

## Copyright
Copyright © 2016 Jiri Chara. All Rights Reserved.
