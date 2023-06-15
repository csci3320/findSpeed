importScripts("./yob2022.js")

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
        console.log(`We created an array with ${this.array.length.ff()} bytes, ${this.maxLength().f()} entries, and with a denominator of ${denominator}.`)
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
  maxLength(){
    return Math.floor(this.array.length / this.stepSize);
  }
  push(string){
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
      if(code == 0){
        return toReturn;
      }
      toReturn += String.fromCharCode(code)
    }
    return toReturn;
  }
  length(){
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
  ff(){
    return this.floor().f()
  }
});


let namesArray = names.split(/\r?\n/).map(n => n.split(",")[0]);

function randomName() {
  let r1 = Math.floor(Math.random() * namesArray.length)
  return namesArray[r1]
}

function getRandomUsernames(size, usernames) {
  try {
    while (usernames.length() < size) {
      let r1 = randomName();
      let r2 = randomName();
      if (r1 == r2) continue;
      let email = r1 + r2 + "@unomaha.edu"
      usernames.push(email)
    }
  } catch (e) {
    console.error(e)
  }
  finally {
    return usernames
  }
}

function findInArray(array, value) {
  for (let i = 0; i < array.length(); i++) {
    if (array.getAt(i) == value)
      return true;
  }
  return false;
}

let controlledArray = new ControlledArray();


let size = 2 ** 1;
let maxSize = 2 ** 27;
let usernames = getRandomUsernames(size, controlledArray)

console.log("Creating initial random username array")


while (size < usernames.maxLength()) {

  try {
    let time;
    let result
    ({ time, result } = timeIt(() => getRandomUsernames(size, usernames)));
    usernames = result;
    console.log(`Made a new array of size ${usernames.length().f()} with a speed of ${time.ff()}`)
    console.log(`This array has entries (count): ${usernames.maxLength().ff()}`)
  } catch (e) {
    console.error(e)
    console.log("It doesn't look like we can get an array that's any bigger.")
    break;
  }

  let toFind = usernames.getAt(usernames.length()/2);
  let unfindable = "EmmaEmma@unomaha.edu"

  let timeToFind = timeIt(() => findInArray(usernames, toFind))
  if(!timeToFind.result)
    console.error("Couldn't find it")
  let timeUnfindable = timeIt(() => findInArray(usernames, unfindable))

  console.log(`When the size is ${usernames.length().f()}, then it took the following times to find usernames: ${timeToFind.time.ff()}, ${timeUnfindable.time.ff()}`)

  size *= 2


  //console.log(usernames)
  //break;
}
console.log("The program has ended")