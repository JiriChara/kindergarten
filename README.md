[![Build Status](https://travis-ci.org/JiriChara/kindergarten.svg?branch=master)](https://travis-ci.org/JiriChara/kindergarten)
[![Code Climate](https://codeclimate.com/github/JiriChara/kindergarten/badges/gpa.svg)](https://codeclimate.com/github/JiriChara/kindergarten)
[![Test Coverage](https://codeclimate.com/github/JiriChara/kindergarten/badges/coverage.svg)](https://codeclimate.com/github/JiriChara/kindergarten/coverage)
[![Issue Count](https://codeclimate.com/github/JiriChara/kindergarten/badges/issue_count.svg)](https://codeclimate.com/github/JiriChara/kindergarten)
[![Dependency Status](https://gemnasium.com/JiriChara/kindergarten.svg)](https://gemnasium.com/JiriChara/kindergarten)

![Kindergarten](https://raw.github.com/JiriChara/kindergarten/master/images/kindergarten.png) (beta)

Kindergarten is here to help you to separate your authorization logic into modules. Those modules are called perimeters and they contains instructions & rules for it's governess and methods to be exposed to sandbox (I will tell you about the sandbox and the governess later in this README - don't worry). A very simple perimeter might look like this:

```javascript
var childPerimeter = new Kindergarten.Perimeter(
  'playing', // the purpose of the perimeter
  {
    govern: { // instruction for governess
      'can watch': {
        items: [Television]
      },
      'cannot watch': {
        items: [CableTv]
      },
      'can eat': {
        rule: function (candy) {
          // `this` will point to the current perimeter
          return candy instanceof Candy && this.child.quotum.allows(candy);
        }
      }
    },

    expose: [ // what should be exposed to sandbox?
      'watchTv',
      'eat'
    ]
  }
);

// implement the logic of perimeter
_.extend(childModule, {
  watchTv: function(tv) {
    // governess will guard child
    this.guard('watch', tv);

    // `this` will point to the current perimeter
    this.child.watch(tv);

    this.sleep(4);
  },

  eat: function(candy) {
    this.guard('eat', candy);

    this.child.eat(candy);
  },

  // this method is private and it will not be available in sandbox
  sleep: function(len) {
    this.child.sleep(len);
  }
});
```

We have created a child perimeter with following instructions for the governess:

* child can watch a Television
* child cannot watch a CableTv
* child can eat a Candy, but just some amount of it

We have specified that `watchTv` and `eat` methods should be exposed to sandbox. This means when sandbox loads the perimeter, only the `watchTv` and `eat` methods will be publicly available. The `sleep` method can be called within one of the exposed methods, but we can't call that method through the sandbox - it's private. Let me show you what sandbox can do:

```javascript
var sandbox = Kindergarten.sandbox(child);
sandbox.loadModule(childPerimeter);

// child will watch television
// notice that the `watchTv` method is available through namespace which is
// basically the purpose of the perimeter
sandbox.playing.watchTv(new Television());

try {
  // Child is not allowed to watch cable tv
  sandbox.playing.watchTv(new this.CableTv());
} catch (e) {
  console.log(e instanceof this.Kindergarten.AccessDenied); // true
}

_.times(10, function() {
  // this will fail after a while
  sandbox.playing.eat(new Liquorice());
});

// fails - no such method
sandbox.playing.sleep(8);

sandbox.isAllowed('watch', Television); // true  (use Governess of sandbox)
sandbox.isAllowed('watch', new Television()); // true  (use Governess of sandbox)
sandbox.isAllowed('watch', Netflix); // false (use Governess of sandbox)
sandbox.playing.isAllowed('watch', Netflix); // false (use Governess of perimeter)
```

Fist we have created a new sandbox and we gave it a reference to a child - in real world applications it's usually the current user. We loaded our perimeter. The `playing` namespace is now available, because it's the purpose of the our perimeter. All the exposed methods from perimeter are now available. Notice that the `Kindergarten.AccessDenied` error is thrown when child is trying to watch cable TV. It's because of the `this.guard('watch', tv)` statement in `watchTv` method of child perimeter. This guard method is available in every perimeter and if we call it, then the perimeter will delegate that call to the governess. The governess is the one-responsible for all the rules to take the place. Perimeters use [head governess](https://github.com/JiriChara/kindergarten/blob/master/lib/kindergarten/governesses/head-governess.js) by default, but it's possible to create your own governess and give her the lead over your perimeter or even sandbox. If you specify a governess for the sandbox, then this governess will be used by perimeters in that sandbox by default, but we can still have our own governess for a specific perimeter. You can use [strict governess](https://github.com/JiriChara/kindergarten/blob/master/lib/kindergarten/governesses/strict-governess.js), [easy governess](https://github.com/JiriChara/kindergarten/blob/master/lib/kindergarten/governesses/easy-governess.js), [German governess](https://github.com/JiriChara/kindergarten/blob/master/lib/kindergarten/governesses/german-governess.js) or create you own by inheriting from head governess.

## Installation

### npm

```
npm install kindergarten
```

### Bower

```
bower install kindergarten
```

## Advanced Usage

Let's look on some classes available in Kindergarten in more detail. I really recommend you to copy/paste all the examples and play with it in the console!

### Rule

Rules are used by a governess. Governess can learn many rules and they are specified in perimeter in most of the cases. Rules can be constructed programmatically as well and it is simple as that:

```javascript
var Article = function () {};

var rule = Kindergarten.Rule.create('can view', {
  items: [Article]
});

// or

var anotherRule = Kindergarten.Rule.create('can update', {
  rule: function (item1, item2) {
    return item1 === item2;
  }
});
```

Does it look similar? It should, because the definition of the rule is very similar to `govern` object of a perimeter! Actually that's how the governess learn the rules from the perimeter. Note: rules are not meant to be used as a standalone object, but they are rather used by governess internally. It's faster and safer to define multiple rules using perimeter. It is possible to create a rule using it's constructor as well, but I will not describe that here. Dive into the code if you are interested.

OK. Now you have a `rule`, but what can you do with it? Actually not much..: `rule` only have one method `verify()` and some attributes. The interesting attributes are `isPositive`, `isCustom` and `isStrict`, so let me explain what they do:

* `isPositive` 'can' rules are positive and 'cannot' rules are negative.
* `isCustom` look at the example above the second rule is custom, because it's definition contains the custom `rule` callback.
* `isStrict` negative rules are strict and custom rules are strict. This flag is used by governess internally. See below.

Governess uses those flags to authorize child's actions. This authorization process has following steps:

1. governess checks if she is guarded. If not (meaning the `ungarded` flag is set to `true`), then the child is allowed to do anything.
2. governess checks if she has any rule that allows child to perform given action. This means that she goes through all the rules that have `isPositive` flag and calls the `verify()` method on them. If one of that calls returns `true` then she found one.
3. governess checks if there is a strict rule that disallows child to perform given action. It's basically same process as above, but now governess is looking for a rule which `isStrict` and it's `verify()` method returns `false`.
4. If governess didn't found any rule that allows child to perform desired action or she found a rule that strictly disallows that action, then it means that child is not authorized. In any other case child is authorized.

#### "Why the hell is governess looking only for strict rules in the step #3?" asked a vigilant programmer..

Let me show you an example:

```javascript
var user = {};
var Like = function () {};

var rule1 = Kindergarten.Rule.create('can create', {
  items: [Comment]
});

var rule2 = Kindergarten.Rule.create('can create', {
  items: [Like]
});

var governess = new Kindergarten.HeadGoverness(user);
governess.addRule(rule1, rule2);

governess.guard('create', new Like()); // no problem!
```

Both of the rules are positive and not strict. When `governess.guard('create', new Like());` is evaluated the `verify()` method of the `rule1` returns `false` if the rule would have been strict, then the child would never be able to **like** something :crying_cat:.

### Governess

![Governess](https://raw.github.com/JiriChara/kindergarten/master/images/governess.png)

Governess is responsible for a child on a sandbox. Sandbox uses `HeadGoverness` by default, but you can replace her by your own governess or by one of the predefined governess: `GermanGoverness`, `StrictGoverness` or `EasyGoverness`.

```javascript
var sandbox = Kindergarten.sandbox(currentUser);

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
var perimeter = new Kindergarten.Perimeter({
  purpose: 'articles',

  govern: {
    'can update': {
      rule(article) {
        return this._isAdminOrCreatorOf(article);
      }
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

var currentUser = { role: 'regularGuy' };

var sandbox = Kindergarten.sandbox(currentUser);

sandbox.loadModule(perimeter);

sandbox.governess = new Kindergarten.GermanGoverness(currentUser);

sandbox.articles.update(currentUser); // throws Kindergarten.AccessDenied \o/
```

German governess is really good if you wish to protect all the exposed methods to the sandbox.


#### Strict Governess

Strict governess is useful if you sometimes forget to protect your exposed methods by calling `guard()` in their body. Strict governess throws an `AccessDenied` error if user calls exposed method that does not contain call of `guard()`. **Careful!** The exposed method is executed and then it throws the `AccessDenied` error. Rollback is on your own!

```javascript
var governess = new Kindergarten.StrictGoverness({});

governess.addRule(Kindergarten.Rule.create('can watch', {
  rule: function () {
    return true;
  }
}));

governess.governed(function (tv) {
  governess.guard('watch', tv);
  return 'hello';
}); // all right

governess.governed(function () {
  // NO guard call here
  return 'hello';
}); // throws Kindergarten.AccessDenied
```

#### Easy Governess

`EasyGoverness` allows child to do anything:

```javascript
var perimeter = new Kindergarten.Perimeter({
  purpose: 'playing',
  govern: {
    'cannot watch': {
      rule: function () {
        // child can't watch anything
        return true;
      }
    }
  },
  expose: [
    'watch'
  ],
  watch: function (thing) {
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
myPurpose._addPerimeter(perimeter);

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
    'can watch': {
      items: [TV]
    }
  }
});

var perimeter2 = new Kindergarten.Perimeter({
  purpose: 'perimeter2',
  govern: {
    'cannot watch': {
      items: [TV]
    }
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
    'can watch': {
      items: [TV]
    }
  },
  governess: new Kindergarten.HeadGoverness(user)
});

var perimeter2 = new Kindergarten.Perimeter({
  purpose: 'perimeter2',
  govern: {
    'cannot watch': {
      items: [TV]
    }
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
