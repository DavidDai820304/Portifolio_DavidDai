let duplicate = [1,2,3,4,5];
console.log(duplicate.length);

for(let i = 0; i < 5; i++) { 
    duplicate.push(duplicate[i]); 
}
console.log(duplicate);