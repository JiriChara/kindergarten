[![Build Status](https://travis-ci.org/JiriChara/kindergarten.svg?branch=master)](https://travis-ci.org/JiriChara/kindergarten)
[![Code Climate](https://codeclimate.com/github/JiriChara/kindergarten/badges/gpa.svg)](https://codeclimate.com/github/JiriChara/kindergarten)
[![Test Coverage](https://codeclimate.com/github/JiriChara/kindergarten/badges/coverage.svg)](https://codeclimate.com/github/JiriChara/kindergarten/coverage)
[![Issue Count](https://codeclimate.com/github/JiriChara/kindergarten/badges/issue_count.svg)](https://codeclimate.com/github/JiriChara/kindergarten)
[![Dependency Status](https://gemnasium.com/JiriChara/kindergarten.svg)](https://gemnasium.com/JiriChara/kindergarten)
[![NPM Dowloads](https://img.shields.io/npm/dm/kindergarten.svg)](https://www.npmjs.com/package/kindergarten)
[![NPM Version](https://img.shields.io/npm/v/kindergarten.svg)](https://www.npmjs.com/package/kindergarten)

![Kindergarten](https://raw.github.com/JiriChara/kindergarten/master/images/kindergarten.png) v1.0.0

Kindergarten is here to help you to separate your authorization logic into modules. Those modules are called perimeters and they contains instructions & rules for it's governess and methods to be exposed to sandbox (I will tell you about the sandbox and the governess later in this README - don't worry). A very simple perimeter might look like this:

```javascript
import { Perimeter } from 'kindergarten';
// or
// import { createPerimeter } from 'kindergarten';
import { isObject } from 'lodash';
import Television form 'your/awesome-application/models/Television';
import CableTv form 'your/awesome-application/models/CableTv';

const childPerimeter = new Perimeter({
  purpose: 'playing', // the purpose of the perimeter

  govern: { // instruction for governess
    'can watch': [Television],
    'cannot watch': [CableTv],
    ['can eat'](candy) {
      // `this` points to childPerimeter
      return isObject(candy) && this.child.quotum.allows(candy);
    }
  },

  expose: [ // what should be exposed to sandbox?
    'watchTv',
    'eat'
  ],

  watchTv(tv) {
    // governess will guard child
    this.guard('watch', tv);

    // `this` eferences the current perimeter
    this.child.watch(tv);

    this.sleep(4);
  },

  eat: (candy) {
    this.guard('eat', candy);

    this.child.eat(candy);
  },

  // this method is private and it is not available in sandbox
  sleep: (len) {
    this.child.sleep(len);
  }
});
```

In above example we have created a child perimeter with following instructions for it's governess:

* child can watch a Television
* child cannot watch a CableTv
* child can eat a Candy, but just some amount of it

We have specified that `watchTv` and `eat` methods should be exposed to sandbox. This means when sandbox loads the perimeter, only the `watchTv` and `eat` methods will be publicly available. The `sleep` method can be called inside of one of the exposed methods, but we can't call that method through the sandbox - it's private. Now it's time to create a sandbox

```javascript
import { Sandbox } from 'kindergarten/sandbox';
// or
// import { createSandbox } from 'kindergarten/createSandbox';
import { AccessDenied } from 'kindergarten/errors';
import { times } from 'lodash';
import currentUser, as child  from 'your/awesome-application/currentUser';
import childPerimeter from 'your/awesome-application/perimeters/childPerimeter';
import Television form 'your/awesome-application/models/Television';
import CableTv form 'your/awesome-application/models/CableTv';
import Liquorice form 'your/awesome-application/models/Liquorice';

const sandbox = new Sandbox(child);
// or
// const sandbox = createSandbox(child);
sandbox.loadModule(childPerimeter);

// child will watch television
// notice that the `watchTv` method is available through namespace which is
// the purpose of the perimeter
sandbox.playing.watchTv(new Television());

try {
  // Child is not allowed to watch cable tv
  sandbox.playing.watchTv(new this.CableTv());
} catch (e) {
  console.log(e instanceof AccessDenied); // true
}

times(10, function() {
  // this will fail after a while
  sandbox.playing.eat(new Liquorice());
});

// fails - no such method
sandbox.playing.sleep(8);

sandbox.isAllowed('watch', Television); // true  (sandbox uses Governess of sandbox)
sandbox.isAllowed('watch', new Television()); // true  (sandbox uses Governess of sandbox)
sandbox.isAllowed('watch', Netflix); // false (sandbox uses Governess of sandbox)
sandbox.playing.isAllowed('watch', Netflix); // false (sandbox uses Governess of perimeter)
```

Fist we have created a new sandbox and we gave it a reference to a child - in real world applications it's usually the current user. We loaded our perimeter. The `playing` namespace is now available, because it's the purpose of the our perimeter. All the exposed methods from perimeter are now available as well. Notice that the `AccessDenied` error is thrown when child is trying to watch cable TV. It's raised by `this.guard('watch', tv)` statement in `watchTv` method of child perimeter. This guard method is available in every perimeter and if we call it, then the perimeter will delegate that call to the governess. The governess is the one-responsible for all the rules to take the place. Perimeters use [head governess](https://github.com/JiriChara/kindergarten/blob/master/lib/kindergarten/governesses/head-governess.js) by default, but it's possible to create your own governess and give her the lead over your perimeter or even sandbox. If you specify a governess for the sandbox, then this governess will be used by perimeters in that sandbox by default, but we can still have our own governess for a specific perimeter. You can use [strict governess](https://github.com/JiriChara/kindergarten/blob/master/lib/kindergarten/governesses/strict-governess.js), [easy governess](https://github.com/JiriChara/kindergarten/blob/master/lib/kindergarten/governesses/easy-governess.js), [German governess](https://github.com/JiriChara/kindergarten/blob/master/lib/kindergarten/governesses/german-governess.js) or create you own by inheriting from head governess.

## Installation

### npm

```shell
npm install kindergarten
```

## Advanced Usage

Let's look on some classes available in Kindergarten in more detail.

### Rule

Rules are used by a governess. Governess can learn many rules and they are specified in perimeter in most of the cases. Rules can be constructed programmatically as well and it is simple as that:

```javascript
import { Rule } from 'kindergarten/rule';
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

var governess = new HeadGoverness(child);
governess.addRule(rule1, rule2);

governess.guard('create', new Like()); // no problem!
```

### Governess

![Governess](https://raw.github.com/JiriChara/kindergarten/master/images/governess.png)

Governess is responsible for a child on a sandbox. Sandbox uses `HeadGoverness` by default, but you can replace her by your own governess or by one of the predefined governess: `GermanGoverness`, `StrictGoverness` or `EasyGoverness`.

```javascript
import { createSandbox } from 'kindergarten';

const sandbox = createSandbox(currentUser);

// Sandbox will use GermanGoverness
sandbox.governess = Kindergarten.GermanGoverness;
```

Governess calls all exposed methods in sandbox through `governed()` method. By default it looks like this:


```javascript
governed(callback, args = [], callingContext = null) {
  return callback.apply(callingContext, args);
}
```

, but you can override it in you custom governesses. Other useful method is `isAllowed()`, it returns true if child is allowed to do some action. `guard()` works same, but it throws an `AccessDenied` error if child is not allowed to proceed some action.

#### German Governess

German governess loves rules as every German :trollface:. She automatically guards all exposed methods. This means that she calls `guard()` and passes the name of the exposed method as a first argument and arguments passed to that exposed method accordingly. German governess can only be used within a sandbox.

```javascript
const perimeter = new Kindergarten.Perimeter({
  purpose: 'articles',

  govern: {
    ['can update'](article) {
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

const sandbox = Kindergarten.sandbox(currentUser);

sandbox.loadModule(perimeter);

sandbox.governess = new Kindergarten.GermanGoverness(currentUser);

sandbox.articles.update(currentUser); // throws Kindergarten.AccessDenied \o/
```

German governess is really good if you wish to protect all the exposed methods to the sandbox.


#### Strict Governess

Strict governess is useful if you sometimes forget to protect your exposed methods by calling `guard()` in their body. Strict governess throws an `AccessDenied` error if user calls exposed method that does not contain call of `guard()`. **Careful!** The exposed method is executed and then it throws the `AccessDenied` error. Rollback is on your own!

```javascript
const governess = new Kindergarten.StrictGoverness({});

governess.addRule(Kindergarten.Rule.create('can watch', () => true);

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
const perimeter = new Kindergarten.Perimeter({
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

perimeter.governess = new Kindergarten.EasyGoverness;

var sandbox = new Kindergarten.Sandbox({});
sandbox.loadModule(perimeter);
sandbox.playing.watch({}); // easy going
```

### Purpose

When sandbox loads perimeter, a new `Purpose` is created. Sandbox copies all exposed methods into the instance of the purpose, so they are callable. It works like this:

```javascript
var perimeter = new Kindergarten.Perimeter({
  purpose: 'foo',
  govern: {
    'cannot foo': {
      rule: function () {
        return true;
      }
    }
  },
  expose: [
    'foo'
  ],
  foo: function () {}
});

var user = {};

var sandbox = new Kindergarten.Sandbox(user);
sandbox.governess = new Kindergarten.GermanGoverness(user);
sandbox.loadModule(perimeter);

var myPurpose = new Kindergarten.Purpose(perimeter.purpose, sandbox);
myPurpose._loadPerimeter(perimeter);

myPurpose.foo(); // throws Kindergarten.AccessDenied
```

**DO NOT USE** `Purpose` directly, it's meant to be used internally by a sandbox.


### Perimeter

Perimeter contains set of rules for governess and optionally some methods that should be exposed to sandbox. Let me show you an example of perimeter w/o exposed methods:

```javascript
var TV = function () {};

var perimeter1 = new Kindergarten.Perimeter({
  purpose: 'perimeter1',
  govern: {
    'can watch': [TV]
  }
});

var perimeter2 = new Kindergarten.Perimeter({
  purpose: 'perimeter2',
  govern: {
    'cannot watch': [TV]
  }
});

var sandbox = Kindergarten.sandbox({});

sandbox.loadModule(perimeter1, perimeter2);

sandbox.perimeter1.isAllowed('watch', new TV()); // false
sandbox.perimeter2.isAllowed('watch', new TV()); // false
sandbox.isAllowed('watch', new TV()); // false
```

Notice that `sandbox.perimeter1.isAllowed('watch', new TV());` is evaluated to `false`. It happens, because perimeter1 does not have it's own governess and the governess of the sandbox is used! This is **VERY IMPORTANT** to understand! Now let's look at the same example, but this time each perimeter has it's own governess:

```javascript
var TV = function () {};
var user = {};

var perimeter1 = new Kindergarten.Perimeter({
  purpose: 'perimeter1',
  govern: {
    'can watch': [TV]
  },
  governess: new Kindergarten.HeadGoverness(user)
});

var perimeter2 = new Kindergarten.Perimeter({
  purpose: 'perimeter2',
  govern: {
    'cannot watch': [TV]
  },
  governess: new Kindergarten.HeadGoverness(user)
});

var sandbox = Kindergarten.sandbox(user);

sandbox.loadModule(perimeter1, perimeter2);

sandbox.perimeter1.isAllowed('watch', new TV()); // true
sandbox.perimeter2.isAllowed('watch', new TV()); // false
sandbox.isAllowed('watch', new TV()); // false
```

### Sandbox

![Sandbox](https://raw.github.com/JiriChara/kindergarten/master/images/sandbox.png)

Sandbox is a place where child can play governed by a governess. Sandbox can load multiple perimeters. Each sandbox has a governess. If not specified, the `HeadGoverness` will be used. The governess of the sandbox knows all the rules of all the perimeters (even if they have their own governess), this is important so the `isAllowed` method can be called directly on an instance of the `Sandbox`;

## Thanks to..

[coffeeaddict](https://github.com/coffeeaddict) for [inspiration](https://github.com/coffeeaddict/kindergarten).

## License
The MIT License (MIT) - See file 'LICENSE' in this project

## Copyright
Copyright © 2016 Jiri Chara. All Rights Reserved.
