function findMatchAt(array, index, length, searchFor, chunkSize) {
  let slice = array.slice(index * chunkSize, (index + 1) * chunkSize);
  let locallyValid = true;
  for (let i = 0; i < searchFor.length && locallyValid; i++) {
    if (searchFor.charCodeAt(i) != slice[i]) {
      locallyValid = false
      break;
    }
  }
  if (locallyValid) {
    return index
  }
  return -1;
}

function fullSearch(array, string, chunkSize) {
  let foundTheString = false;
  for (let j = 0; j < array.length / chunkSize; j++) {
    let result = findMatchAt(array, j, string.length, string, chunkSize)
    if (result >= 0) {
      console.log("We found it at: " + result)
      foundTheString = true;
      break;
    }
  }
  if (!foundTheString)
    console.log(" -- We didn't find a match.")
}

function timeIt(f){
  start = performance.now()
  f()
  end = performance.now();
  time = (end - start).floor()
  return time;
}

//From https://stackoverflow.com/a/12646864/10047920
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
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