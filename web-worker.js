importScripts("./yob2022.js")
importScripts("./support2.js")

let namesArray = names.split(/\r?\n/).map(n => n.split(",")[0]);

function addRandomUsernames(size, usernames) {
  try {
    while (usernames.length() < size) {
      let r1 = namesArray.random();
      let r2 = namesArray.random();
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

let size = 2 ** 20;
let maxSize = 2 ** 27;
let usernames = addRandomUsernames(size, new ControlledArray())

function log(string){
  console.log(string);
  postMessage(string);
}


while (size < usernames.maxLength()) {

  try {
    let time;
    let result
    ({ time, result } = timeIt(() => addRandomUsernames(size, usernames)));
    usernames = result;
    //console.log(`Made a new array of size ${usernames.length().f()} with a speed of ${time.ff()}`)
    //console.log(`This array has entries (count): ${usernames.length().ff()}`)
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

  log(`When the size is ${usernames.length().f()}, then it took the following times to find usernames: ${timeToFind.time.ff()}, ${timeUnfindable.time.ff()}`)

  size *= 2
}
log("The program has ended")