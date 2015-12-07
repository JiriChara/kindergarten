[![Build Status](https://travis-ci.org/JiriChara/kindergarten.svg?branch=master)](https://travis-ci.org/JiriChara/kindergarten)

# kindergarten

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
        items: [Candy],
        rule: function (candy) {
          // `this` will point to the current perimeter
          return this.child.quotum.allows(candy);
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

sandbox.isAllowed('watch', Television); // true
sandbox.isAllowed('watch', new Television()); // true
sandbox.isAllowed('watch', Netflix); // false
sandbox.playing.isAllowed('watch', Netflix); // false
```

Fist we have created a new sandbox and we gave it a reference to a child - in real world applications it's usually the current user. We loaded our perimeter. The `playing` namespace is now available, because it's the purpose of the our perimeter. All the exposed methods from perimeter are now available. Notice that the `Kindergarten.AccessDenied` error is thrown when child is trying to watch cable TV. It's because of the `this.guard('watch', tv)` statement in `watchTv` method of child perimeter. This guard method is available in every perimeter and if we call it, then the perimeter will delegate that call to the governess. The governess is the one-responsible for all the rules to take the place. Perimeters use [head governess](https://github.com/JiriChara/kindergarten/blob/master/lib/kindergarten/governesses/head-governess.js) by default, but it's possible to create your own governess and give her the lead over your perimeter or even sandbox. If you specify a governess for the sandbox, then this governess will be used by perimeters in that sandbox by default, but we can still have our own governess for a specific perimeter. You can use [strict governess](https://github.com/JiriChara/kindergarten/blob/master/lib/kindergarten/governesses/strict-governess.js), [easy governess](https://github.com/JiriChara/kindergarten/blob/master/lib/kindergarten/governesses/easy-governess.js) or create you own by inheriting from head governess.

Thanks to [coffeeaddict](https://github.com/coffeeaddict) for [inspiration](https://github.com/coffeeaddict/kindergarten).

## Installation

### npm

```
npm install kindergarten
```

### Bower

```
bower install kindergarten
```
## License
The MIT License (MIT) - See file 'LICENSE' in this project

## Copyright
Copyright © 2015 Jiri Chara. All Rights Reserved.
