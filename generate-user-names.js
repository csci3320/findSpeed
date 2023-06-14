const fs = require("fs")

let names = fs.readFileSync("./yob2022.csv", "utf-8").split(/\r?\n/)
let allNames = names.map(n=>n.split(",")[0])
console.log(allNames.length)
let setNames = new Array(...new Set(allNames));
console.log(setNames.length)

let allEmails = [];
let emails = "" //= [];
for(let i  = 0; i < 10000000; i++){
  let n1 = setNames[Math.floor(Math.random() * setNames.length)]
  let n2 = setNames[Math.floor(Math.random() * setNames.length)]
  let name = n1 + "@" + n2 + ".com"
  allEmails.push(name);
}

allEmails = [...new Set(allEmails)]
emails = allEmails.join("\n")

console.log(emails.length.toLocaleString())

fs.writeFileSync("./emails.csv", emails)