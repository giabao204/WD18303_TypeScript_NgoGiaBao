// class Department {
//     public name: string;
//     private employees: string[] = [];
//     constructor(n: string){
//         this.name = n;
//     }

//     describe() {
//         console.log('Department: ' + this.name);
//     }

//     addEmployees(employee: string){
//         this.employees.push(employee);
//     }

//     printEmployeeInformation() {
//         // console.log('Employees of ' + this.name + ':');
//         for (const employee of this.employees) {
//             console.log(employee);
//         }
//     }
// }

// const accounting = new Department('Accounting');
// console.log(accounting.name);
// accounting.name= 'Tèo';
// accounting.describe();

// const accountingCopy = { name: 'BBBBB', describe: accounting.describe};

// accountingCopy.describe();

// accounting.addEmployees('Tèo');
// accounting.addEmployees('bao');


// accounting.printEmployeeInformation();


// class ITDepartment extends Department {
//     admins: string[];
//     constructor(id: string, admins: string[]){
//         super(id, 'IT');
//         this.admins = admins; 
//     }
// }

// class Department {
//     static id: string;
//     public name: string;

//     constructor(id: string, name: string){
//         Department.id = id;
//         this.name = name;
//     }

//     static desribe(name: string) {
//         console.log(`Department (${Department.id}): ${name}`);
//     }
// }
// Department.id = 'd1';
// Department.desribe('Max');

/*******************************************************************/
// Bài 1
interface AddFn {
    (a: number, b: number): number;
}
let add: AddFn;
add = (n1: number, n2: number) => {
    return n1 + n2;
}
console.log(add(4, 1));
// Bài 2
interface Named {
    readonly name?: string;
    outName?: string;
}

interface Greetable extends Named {
    greet(phrase: string): void;
}
class Person implements Greetable {
    readonly name?: string;
    outName?: string;

    constructor(name?: string) {
        this.name = name;
    }

    greet(phrase: string): void {
        console.log(`${phrase} ${this.name}`);
    }
}
let user1: Greetable;
user1 = new Person('Bao');


user1.greet('Hi there - I am');
console.log(user1);
// Bài 3
abstract class Department {
    static fiscalYear = 2020;

    protected employees: string[] = [];

    constructor(protected readonly id: string, public name: string) {

    }
    static createEmloyee(name: string) {
        return { name: name };
    }

    abstract describe(this: Department): void;
    addEmployee(employee: string) {
        this.employees.push(employee);
    }
    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}

class ITDepartment extends Department {
    admins: string[];
    constructor(id: string, admins: string[]) {
        super(id, 'IT');
        this.admins = admins;
    }
    describe() {
        console.log('IT Department - ID: ' + this.id);
    }
}
const employee1 = Department.createEmloyee('Max');
console.log(employee1, Department.fiscalYear);

const it = new ITDepartment('d1', ['Max']);

it.addEmployee('Max');
it.addEmployee('Manu');
// Bài 4
// 1. Định nghĩa các interface/lớp cho sở thích
interface Hobby {
    name: string;
}

class ActiveHobby implements Hobby {
    constructor(public name: string) {}
}

// 2. Functions
function sum(x: number = 5, y?: number): number {
    return x + (y ? y : 0);
}

function speech(output: any): void {
    console.log("result: " + output);
}

function throwError(errorMsg: string): never {
    throw new Error(errorMsg);
}

function addAndHandle(x: number, y: number, cb: (num: number) => void) {
    const result = x + y;
    cb(result);
}

// 3. Person class
enum Role { ADMIN, SUPERADMIN, DEVELOPMENT }

interface PersonData {
    name: string;
    age: number;
    hobbies: string[];
    role: Role;
    roleTuple: [number, string];
}

class Person1 implements PersonData {
    constructor(public name: string, public age: number, public hobbies: string[], public role: Role, public roleTuple: [number, string]) {}
}

// 4. Các thực thể khác
type Combinable = number | string;

class Utility {
    static combine(input1: Combinable, input2: Combinable, resultConversion: 'as-number'|'as-text'): Combinable {
        if (typeof input1 === 'number' && typeof input2 === 'number' || resultConversion === 'as-number') {
            return parseFloat(input1 as string) + parseFloat(input2 as string);
        } else {
            return input1.toString() + input2.toString();
        }
    }
}

// Sử dụng
const hobbies: Hobby[] = [new ActiveHobby('Sports'), new ActiveHobby('Cooking')];
const activeHobbies: Hobby[] = [new ActiveHobby('Hiking')];

console.log(activeHobbies);

speech(sum(5, 12));
speech(sum(8, 5));

let nothing: null = null;

addAndHandle(10, 20, (result) => { console.log(result); });

let number1: number = 5;
let number2: number = 2.8;
let phrase: string = 'Result is ';
let permit: boolean = true;

const result = number1 + number2;
if (permit) {
    console.log(phrase + result);
} else {
    console.log('Not show result');
}

console.log(Utility.combine(30, 26, 'as-number'));
console.log(Utility.combine('30', '36', 'as-number'));
console.log(Utility.combine('typescipt', 'javascipt', 'as-text'));
