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
  try {
    while (usernames.length < size && usernames.length < 40_000_000) {
      let r1 = randomName();
      let r2 = randomName();
      if (r1 == r2) continue;
      let email = r1 + r2 + "@unomaha.edu"
      // if (!usernames.includes(email)) {
      usernames.push(email)
      // }

    }
  } catch (e) {
    console.error(e)
  }
  finally {
    return usernames
  }
}

function findInArray(array, value) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] == value)
      return true;
  }
  return false;
}


let size = 2 ** 23;
let maxSize = 2 ** 24;
let usernames = getRandomUsernames(size)


while (size <= maxSize) {

  try {
    let time;
    let result
    ({ time, result } = timeIt(() => getRandomUsernames(size, usernames)));
    usernames = result;
    console.log("Made a new array of size " + usernames.length.f() + " with a speed of " + time.floor().f())
  } catch (e) {
    console.error(e)
    console.log("It doesn't look like we can get an array that's any bigger.")
    break;
  }

  let toFind = usernames[Math.floor(usernames.length / 4)];
  let unfindable = "EmmaEmma@unomaha.edu"//usernames[Math.floor(usernames.length / 2)]

  let timeUnfindable = timeIt(() => findInArray(usernames, unfindable)).time
  let timeToFind = timeIt(() => findInArray(usernames, toFind)).time

  console.log(`When the size is ${usernames.length.f()}/${maxSize.f()}, then it took the following times to find usernames: ${timeToFind}, ${timeUnfindable}`)

  size *= 2


  //console.log(usernames)
  //break;
}
console.log("The program has ended")