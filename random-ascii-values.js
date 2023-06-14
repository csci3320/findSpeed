let r = [];

//From https://stackoverflow.com/a/12646864/10047920
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}


for(let i = 0; i < 26; i++){
  r.push(i + 97)
}
shuffleArray(r)
console.log(r);