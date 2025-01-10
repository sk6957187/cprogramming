console.log("Example of Javascript write in another pages");

function funNormal() {
    console.log("I am normal function.");
    console.log("I am executed now");
}
function fullName(firstName, lastName){
    let name = `Full name: ${firstName} ${lastName}`;
    // return `Full name: ${firstName} ${lastName}`;
    return name;
}
funNormal();
let fName = prompt("Enter first name");
let lName = prompt("Enter last name");
let name = fullName(fName,lName);
console.log(name);

var addition = function (a,b){
    return a+b;
}
console.log(addition(2,3));

