[![Build Status](https://travis-ci.org/JiriChara/kindergarten.svg?branch=master)](https://travis-ci.org/JiriChara/kindergarten)
[![Code Climate](https://codeclimate.com/github/JiriChara/kindergarten/badges/gpa.svg)](https://codeclimate.com/github/JiriChara/kindergarten)
[![Test Coverage](https://codeclimate.com/github/JiriChara/kindergarten/badges/coverage.svg)](https://codeclimate.com/github/JiriChara/kindergarten/coverage)
[![Issue Count](https://codeclimate.com/github/JiriChara/kindergarten/badges/issue_count.svg)](https://codeclimate.com/github/JiriChara/kindergarten)
[![Dependency Status](https://gemnasium.com/JiriChara/kindergarten.svg)](https://gemnasium.com/JiriChara/kindergarten)
[![NPM Dowloads](https://img.shields.io/npm/dm/kindergarten.svg)](https://www.npmjs.com/package/kindergarten)
[![NPM Version](https://img.shields.io/npm/v/kindergarten.svg)](https://www.npmjs.com/package/kindergarten)

![Kindergarten](https://raw.github.com/JiriChara/kindergarten/master/images/kindergarten.png) v1.0.0

Kindergarten is an implementation of the sandbox pattern in JavaScript with some extra goodies. Kindergarten helps you to separate your business logic into modules and add some security layer over them. Kindergarten will work well with all the frameworks and libraries you like: React, Angular, Ember, Redux and many more.

```javascript
import {
  createPerimeter,
  createSandbox
} from 'kindergarten';

import Child from './Child';
import Television from './Television';
import CableTv from './CableTv';

// Definition of Perimeter
const homePerimeter = createPerimeter({
  purpose: 'playing',

  govern: {
    'can watch': [Television],
    'cannot watch': [CableTv],
    ['can eat'](candy) {
      // Only 5 candies allowed
      return this.child.eatenCandies < 5;
    },
    'cannot visitWebPage': /sex|porn|xxx/
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

  eat(candy) {
    this.guard('eat', candy);

    console.log(`${this.childName()} is eating a candy #${++this.child.eatenCandies}`);
  },

  browseInternet(site) {
    this.guard('visitWebPage', site);

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

sandbox.playing.watchTv(new Television());

// Throws AccessDenied error
sandbox.playing.watchTv(new CableTv());

// Fails after a while
times(6, () => {
for (let i = 0; i <= 6; i++) {
  sandbox.playing.eat('Tasty Candy');
});

sandbox.playing.browseInternet('http://google.com'); // no problem

// Throws AccessDenied error
sandbox.playing.browseInternet('http://some-website-that-contains-porn.com');
```

## Installation

### npm

```shell
npm install kindergarten
```

## Advanced Usage

Let's look on some classes available in Kindergarten in more detail.

### Rule

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

const governess = new HeadGoverness(child);
governess.addRule(rule1, rule2);

governess.guard('create', new Like()); // no problem!
governess.isAllowed('create', Comment); // true
governess.isAllowed('create', {}); // false
```

### Governess

![Governess](https://raw.github.com/JiriChara/kindergarten/master/images/governess.png)

Governess is responsible for a child on a sandbox. Sandbox uses `HeadGoverness` by default, but you can replace her by your own governess or by one of the predefined governess: `GermanGoverness`, `StrictGoverness` or `EasyGoverness`.

```javascript
const sandbox = createSandbox(currentUser);

// Sandbox will use GermanGoverness
sandbox.governess = Kindergarten.GermanGoverness;
```
#### German Governess

German governess loves rules :trollface:. She automatically guards all exposed methods. This means, that she calls `guard()` and passes the name of the exposed method as a first argument and arguments passed to that exposed method accordingly. German governess can only be used within a sandbox.

```javascript
const perimeter = createPerimeter({
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

const sandbox = createSandbox(currentUser);

sandbox.loadModule(perimeter);

sandbox.governess = new GermanGoverness(currentUser);

sandbox.articles.update(currentUser); // throws Kindergarten.AccessDenied \o/
```

German governess is really good if you wish to protect all the exposed methods.


#### Strict Governess

Strict governess is useful if you sometimes forget to protect your exposed methods by calling `guard()` in their body. Strict governess throws an `AccessDenied` error if user calls exposed method that does not contain call of `guard()`. **Careful!** The exposed method is executed and then it throws the `AccessDenied` error. Rollback is on your own!

```javascript
import {
  StrictGoverness,
  Rule
} from 'kindergarten';

const governess = new StrictGoverness({});

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
import { Perimeter } from 'kindergarten';

const perimeter = new Perimeter({
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

const sandbox = new Kindergarten.Sandbox({});
sandbox.loadModule(perimeter);
sandbox.playing.watch({}); // easy going
```

### Purpose

When sandbox loads perimeter, a new `Purpose` is created. Sandbox copies all exposed methods into the instance of the purpose, so they are callable. It works simply like this:

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
    ['cannot foo']() {
      return true;
    }
  },

  expose: [
    'foo'
  ],

  foo: function () {}
});

const user = {};

const sandbox = new Sandbox(user);
sandbox.governess = new GermanGoverness(user);
sandbox.loadModule(perimeter);

const myPurpose = new Purpose(perimeter.purpose, sandbox);
myPurpose._loadPerimeter(perimeter);

myPurpose.foo(); // throws Kindergarten.AccessDenied
```

**DO NOT USE** `Purpose` directly, it's meant to be used internally by a sandbox.


### Perimeter

Perimeter contains set of rules for governess and optionally some methods that should be exposed to sandbox.

```javascript
import { Perimeter }  from 'kindergarten';

const TV = () => {};

const perimeter1 = createPerimeter({
  purpose: 'perimeter1',
  govern: {
    'can watch': [TV]
  }
});

const perimeter2 = createPerimeter({
  purpose: 'perimeter2',
  govern: {
    'cannot watch': [TV]
  }
});

const sandbox = createSandbox({});

sandbox.loadModule(perimeter1, perimeter2);

sandbox.perimeter1.isAllowed('watch', new TV()); // false
sandbox.perimeter2.isAllowed('watch', new TV()); // false
sandbox.isAllowed('watch', new TV()); // false
```

Notice that `sandbox.perimeter1.isAllowed('watch', new TV());` is evaluated to `false`. It happens, because perimeter1 does not have it's own governess and the governess of the sandbox is used! This is **VERY IMPORTANT** to understand! Now let's look at the same example, but this time each perimeter has it's own governess:

```javascript
const TV = function () {};
const user = {};

const perimeter1 = createPerimeter({
  purpose: 'perimeter1',
  govern: {
    'can watch': [TV]
  },
  governess: new HeadGoverness(user)
});

const perimeter2 = createPerimeter({
  purpose: 'perimeter2',
  govern: {
    'cannot watch': [TV]
  },
  governess: new HeadGoverness(user)
});

const sandbox = Kindergarten.sandbox(user);

sandbox.loadModule(perimeter1, perimeter2);

sandbox.perimeter1.isAllowed('watch', new TV()); // true
sandbox.perimeter2.isAllowed('watch', new TV()); // false
sandbox.isAllowed('watch', new TV()); // false
```

### Sandbox

![Sandbox](https://raw.github.com/JiriChara/kindergarten/master/images/sandbox.png)

Sandbox is a place where child can play governed by a governess. Sandbox can load multiple perimeters. Each sandbox has it's governess. If not specified, the `HeadGoverness` will be used. The governess of the sandbox knows all the rules of all the perimeters (even if they have their own governess), this is important so the `isAllowed` method can be called directly on an instance of the `Sandbox`;

## Thanks to..

[coffeeaddict](https://github.com/coffeeaddict) for [inspiration](https://github.com/coffeeaddict/kindergarten).

## License
The MIT License (MIT) - See file 'LICENSE' in this project

## Copyright
Copyright © 2016 Jiri Chara. All Rights Reserved.
