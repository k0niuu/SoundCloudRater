const scriptPath = "blablabla1";
const randomNum = Math.floor(Math.random() * 1000000) + 1;
console.log(randomNum);
const updatedPath = scriptPath.slice(0, -1) + randomNum;
console.log(updatedPath);
