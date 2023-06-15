class ControlledArray {
  array
  stepSize = 40
  currentIndex = 0
  constructor() {
    let found = false;
    let denominator = 1;
    let maxSearchSize = 2 ** 32;

    // Generate the biggest array that JS will let us create
    while (!found) {
      try {
        this.array = new Uint8Array(maxSearchSize / denominator)
        console.log(`Generated an array with ${this.array.length.ff()} bytes, ${this.maxLength().f()} entries, and on try ${denominator}.`)
        found = true;
      }
      catch (e) {
        if (e.name == "RangeError") {
          denominator++;
          continue;
        }
        console.error(e.name)
        return;
      }
    }
  }
  maxLength() {
    return Math.floor(this.array.length / this.stepSize);
  }
  push(string) {
    this.setAt(this.currentIndex++, string)
  }
  setAt(index, string) {
    let startingIndex = index * this.stepSize;

    if (startingIndex >= this.array.length) {
      throw "[Internal] You tried to get an array index that is too high"
    }

    for (let i = 0; i < string.length & i < this.stepSize; i++) {
      this.array[startingIndex + i] = string.charCodeAt(i)
    }
  }
  getAt(index) {
    let startingIndex = index * this.stepSize;
    let toReturn = "";
    for (let i = 0; i < this.stepSize; i++) {
      let code = this.array[startingIndex + i];
      if (code == 0) {
        return toReturn;
      }
      toReturn += String.fromCharCode(code)
    }
    return toReturn;
  }
  length() {
    return this.currentIndex;
  }

}


function timeIt(f) {
  start = performance.now()
  let result = f()
  end = performance.now();
  time = (end - start)
  return { time, result };
}

Object.assign(String.prototype, {
  f() {
    return this.toLocaleString("en-US")
  }
});

Object.assign(Number.prototype, {
  f() {
    return this.toLocaleString("en-US")
  },
  floor() {
    return Math.floor(this)
  },
  ff() {
    return this.floor().f()
  }
});

Object.assign(Array.prototype, {
  random() {
    let r1 = Math.floor(Math.random() * this.length)
    return this[r1]
  }
})

function findInArray(array, value) {
  for (let i = 0; i < array.length(); i++) {
    if (array.getAt(i) == value)
      return true;
  }
  return false;
}