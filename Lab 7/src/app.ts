import validate from "./components/StaticZipCodeValidator";
import {Person} from './interface/Person';
import {Student} from './models/Student';
import { studentCalc } from './namespaces/studentCalc';


let strings = ["hello", "05836", "101"];

strings.forEach((s) => {
    console.log(`"${s}" ${validate(s) ? "matches" : "does not match"}`);
});


function greeter(person: Person) {
    return "hello " + person.firstName + " " + person.lastName;
}

let student1: Student = new Student("Bao","Gia","Ngo");

document.body.innerHTML = greeter(student1);

let TotalFee = studentCalc.AnualFeeCalc(1500, 4);

console.log("Output:" + TotalFee);