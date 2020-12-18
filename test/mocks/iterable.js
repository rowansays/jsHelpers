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
