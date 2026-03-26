console.log("String Exp");

// console.log("Reverse the String");
// let str1 = prompt("Enter a string to reverse:");
// let str2 = "";
// for (let i = str1.length - 1; i >= 0; i--) {
//     str2 += str1.charAt(i);
// }
// // alert("Reversed String: " + str2);
// console.log("Reversed String: " + str2);


//Uppercase, LowerCase, Digit, SpecialCase count
// str1 = prompt("Enter a string");
// let upper = 0;
// let lower = 0;
// let number = 0;
// let special = 0;
// for(let i=0; i<str1.length; i++){
//     let ch = str1.charAt(i);
//     if(ch >= 'a' && ch <= 'z'){
//         lower++;
//     } else if(ch >= 'A' && ch <= 'Z'){
//         upper++;
//     } else if(ch >= 0 && ch <= 9){
//         number++;
//     } else{
//         special++;
//     }
// }
// console.log(`Upper case: ${upper}, Lower case: ${lower}, Number: ${number}, Special characters: ${special}`);


// Convert Upper case to lower and Lower to upper
// let str1 = prompt("Enter a sting");
// let str2 = "";
// for(let i=0; i<str1.length; i++){
//     let ch = str1.charAt(i);
//     if(ch>='A' && ch<='Z'){
//         str2 = str2+ String.fromCharCode(ch.charCodeAt(0)+32);
//     } else if(ch>='a' && ch<='z'){
//         str2 += String.fromCharCode(ch.charCodeAt(0)-32); 
//     } 
// }
// console.log("Converted String:",str2);

// find the sum in array:-

let arr = [1,3,4,5,6,7];
let sum = 0;
arr.forEach(element => {
    sum += element;
});
console.log(`sum is: ${sum}`);
