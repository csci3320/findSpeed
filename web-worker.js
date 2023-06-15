importScripts("./yob2022.js")
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
  }
});
Object.assign(Number.prototype, {
  floor() {
    return Math.floor(this)
  }
});

let namesArray = names.split(/\r?\n/).map(n => n.split(",")[0]);

function randomName() {
  let r1 = Math.floor(Math.random() * namesArray.length)
  return namesArray[r1]
}

function getRandomUsernames(size, usernames = []) {
  //let usernames = []
  while (usernames.length < size) {
    let r1 = randomName();
    let r2 = randomName();
    let email = r1 + r2 + "@unomaha.edu"
    // if (!usernames.includes(email)) {
    usernames.push(email)
    // }

  }
  return usernames
}

function findInArray(array, value) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] == value)
      return true;
  }
  return false;
}


let size = 2048;
let maxSize = 10_000_000;
let usernames = getRandomUsernames(size)


while (size < maxSize) {



  let toFind = usernames[Math.floor(usernames.length / 4)];
  let unfindable = "aa@unomaha.edu"

  let timeUnfindable = timeIt(() => findInArray(usernames, unfindable)).time
  let timeToFind = timeIt(() => findInArray(usernames, toFind)).time

  console.log(`When the size is ${size.f()}/${maxSize.f()}, then it took the following times to find usernames: ${timeToFind}, ${timeUnfindable}`)

  size *= 2
  try {
    console.log("Starting to make a new Array")
    let time;
    let result
    ({ time, result } = timeIt(() => getRandomUsernames(size * 2, usernames)));
    usernames = result;
    console.log("Ending making a new Array with a speed of " + time.floor().f())
  } catch (e) {
    console.error(e)
    console.log("It doesn't look like we can get an array that's any bigger.")
    break;
  }

  //console.log(usernames)
  //break;
}
console.log("The program has ended")