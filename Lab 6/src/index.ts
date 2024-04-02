// function ThuCungEx(constructor: Function){
//     console.log("Đây là hàm ThuCungEx");
// }
// @ThuCungEx
// class ThuCung{
//     constructor(private ten: string, private tuoi: number) { }
// }

// let tc1 = new ThuCung('Chi Qa Qa', 9);
// let tc2 = new ThuCung('Mập', 12);
// console.log("tc1 = ", tc1);
// console.log("tc2 = ", tc2);
// /////////////////////////////////////////////////////////////
// function BaseHV(constructor: Function){
//     constructor.prototype.phai = true;
//     constructor.prototype.ngaytao = new Date().toLocaleString('vi');
// }
// @BaseHV
// class HocVien { constructor(public ht: string) { } }
// let hv1 = new HocVien('I Am Bao'); 
// console.log(hv1);
// /////////////////////////////////////////////////////////////////
// function themTT<T extends { new(...args: any[]): {} }>(constructor: T){
//     return class extends constructor{
//         mmauxe: string = 'Xanh';
//     }
// }

// @themTT
// class XeMay{
//     constructor(private tx: string, private gia: number) {}
// }

// const x1 = new XeMay('Vision 125', 39.5);
// console.log(x1, (x1 as any)["mmauxe"]);
// ///////////////////////////////////////////////////////////////////////////
// function ChangeHS(constructor: Function): any {
//     return class {
//         private hovaten: string;
//         private phai: boolean;
//         constructor(h: string){
//             this.hovaten = h;
//             this.phai = true;
//         }
//     }
// }
// @ChangeHS
// class HocSinh{
//     public name: string;
//     constructor(h: string) { this.name = h; }
// }
// let u1 = new HocSinh("I AM BAO");
// console.log(u1);
// ///////////////////////////////////////////////////////////////////////
// function BaseUser1(constructor: Function) {
//     console.log(`Đây là hàm BaseUser 1`);
// }
// function BaseUser2(constructor: Function) {
//     console.log(`Đây là hàm BaseUser 2`);
// }
// @BaseUser1 @BaseUser2
// class User {constructor(public name: string) {} }
// let u2 = new User('Lượm');
// console.log(u2);
// //////////////////////////////////////////////////////////////////////
// class Pet {
//     private name: string;
//     private age: number;

//     constructor(name: string, age: number) {
//         this.name = name;
//         this.age = age;
//     }
// }
// function PetLogger(constructor: Function) {
//     console.log("Đây là PetLogger");
// }
// @PetLogger
// class Animal {
//     private name: string;
//     private age: number;

//     constructor(name: string, age: number) {
//         this.name = name;
//         this.age = age;
//     }
// }
// const pet1 = new Pet('Nô nô', 9);
// const pet2 = new Pet('Mập', 2);
// console.log("pet1=", pet1);
// console.log("pet2=", pet2);

// const animal1 = new Animal('Dog', 5);
// const animal2 = new Animal('Cat', 3);
// console.log("animal1=", animal1);
// console.log("animal2=", animal2);

// ///////////////////////////////////////////
// function CheckStingLength(numberOfLength: number){
//     return function(constructor: Object, prototypeName: string){
//         const getValue = function() {};
//         const setValue = function(nameValue: string){
//             if(nameValue.length  <= numberOfLength){
//                 console.log(`${prototypeName} ${nameValue} qua ngan, ${prototypeName} phai > ${numberOfLength} ky tu`);
//             } else {
//                 console.log("Gia tri nay da duoc cap nhat");
//             }
//         };
//         Object.defineProperty(constructor, prototypeName, {
//             get: getValue,
//             set: setValue,
//         });
//     }
// }

// class User2{
//     public usuername: string;

//     @CheckStingLength(7)
//     public password: string;

//     constructor(username: string, password: string){
//         this.usuername = username;
//         this.password = password;
//     }
// }
// let user = new User2("12334556", "12");

// user.password= "password"


// Bài 1: Class decorator
function Logger(constructor: Function) {
    console.log('Logging...');
  
    console.log(constructor);
  }
  
  @Logger
  class Person {
    name = 'Max';
  
    constructor() {
      console.log('Creating person object...');
    }
  }
  
  const pers = new Person();
  
  console.log(pers);

// Bài 2: Decorator factory
function Logger1(logString: string) {
    return function (constructor: Function) {
      console.log(logString);
      console.log(constructor);
    };
  }
  
  @Logger1('LOGGING PERSON')
  class Person1 {
    name = 'Max';
  
    constructor() {
      console.log('Creating person object...');
    }
  }

  const pers1 = new Person1();

  console.log(pers1);

//Bài 3: Property decorator
function Log(target: any, propertyName: string | Symbol) {
    console.log('Property decorator!');
  
    console.log(target, propertyName);
  }
  
  class Product {
    @Log
    title: string;
  
    private _price: number;
  
    set price(val: number) {}
  
    constructor(t: string, p: number) {
      this.title = t;
      this.price = p;
    }
  
    getPriceWithTax() {}
  }
  
  const product = new Product('Sản phẩm 1', 100000);
  
  console.log(product);

// Bài 4: Method decorator
function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
    console.log('Method decorator!');
  
    console.log(target);
    console.log(name);
  
    console.log(descriptor);
  }
  
  class Product2 {
    title: string;
    private _price: number;
  
    set price(val: number) {}
  
    constructor(t: string, p: number) {
      this.title = t;
      this.price = p;
    }
  
    @Log3
    getPriceWithTax() {}
  }
  
  const product2 = new Product('Sản phẩm 1', 100000);
  
  product2.getPriceWithTax();
  
// Bài 5: Autobind decorator
function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };

    return adjDescriptor;
}

class Printer {
    message = 'This works!';

    @Autobind
    showMessage() {
        console.log(this.message);
    }
}

const p = new Printer();
p.showMessage();

const button = document.querySelector('button') as HTMLButtonElement | null;
if (button) {
    button.addEventListener('click', p.showMessage);
}

