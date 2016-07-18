import {
  isPerimeter
} from '../utils';

const guard = (target, name, descriptor) => {
  const method = descriptor.value;

  descriptor.value = function (...args) {
    if (!isPerimeter(this)) {
      throw new Error(
        'Guard decorator can only be used within perimeter.'
      );
    }

    this.guard(name, ...args);

    return method.apply(this, args);
  };
};

export default guard;
