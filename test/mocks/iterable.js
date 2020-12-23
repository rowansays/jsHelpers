export const mockIterableIntegers = {
  [Symbol.iterator]: () => {
    let step = 0
    return {
      next: () => {
        step++
        switch (step) {
          case 1 : return { value: 1, done: false }
          case 2 : return { value: 2, done: false }
          case 3 : return { value: 3, done: false }
          default : return { value: undefined, done: true }
        }
      }
    }
  }
}
export const mockIterableMixed = {
  [Symbol.iterator]: () => {
    let step = 0
    return {
      next: () => {
        step++
        switch (step) {
          case 1 : return { value: undefined, done: false }
          case 2 : return { value: true, done: false }
          case 3 : return { value: false, done: false }
          case 4 : return { value: 123, done: false }
          case 5 : return { value: 123n, done: false }
          case 6 : return { value: 'abcdef', done: false }
          case 7 : return { value: Symbol(), done: false }
          case 8 : return { value: ['a', 'b', 'c'], done: false }
          case 9 : return { value: { name: 'Space Cadet' }, done: false }
          case 10 : return { value: () => {}, done: false }
          default : return { value: undefined, done: true }
        }
      }
    }
  }
}
export const mockIterableNamedObjects = {
  [Symbol.iterator]: () => {
    let step = 0
    return {
      next: () => {
        step++
        switch (step) {
          case 1 : return { value: { name: 'Kitten' }, done: false }
          case 2 : return { value: { name: 'Bunny' }, done: false }
          case 3 : return { value: { name: 'Spider' }, done: false }
          default : return { value: undefined, done: true }
        }
      }
    }
  }
}
export const mockIterableXyz = {
  [Symbol.iterator]: () => {
    let step = 0
    return {
      next: () => {
        step++
        switch (step) {
          case 1 : return { value: 'x', done: false }
          case 2 : return { value: 'y', done: false }
          case 3 : return { value: 'z', done: false }
          default : return { value: undefined, done: true }
        }
      }
    }
  }
}
