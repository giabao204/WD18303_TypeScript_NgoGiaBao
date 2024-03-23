// Cau 1
// let number1: number = 5;
// let number2: number = 2.8;
// let phrase: string = 'Result is ';
// let permit: boolean = true;
//
// const result = number1 + number2;
// if(permit){
//     console.log(phrase + result);
// }else{
//     console.log('Not show result');
// }
//
//
// function add(x: number = 5){
//     let phe : string = 'Result is ';
//
//     phe = '10';
//     x = 2.8;
//
//     return phe + x;
// }
// let resu: number = add();
//
//
// let person2 : {
//     name: string,
//     age: number
// }
//
// person2 = {
//     name: "TypeScript",
//     age: 11
// }
// console.log(person2.name);
//
// //Tao them mang chuoi, tao them mang object
// let hoobbies: string[] = ['Sports','Cooking'];
//
// hoobbies.forEach(element => {
//     console.log(element.length);
// });
//
// // Cau 4
// // 1
// enum Role{ADMIN, SUPERADMIN, DEVELOPMENT};
//
// const person: {
//     name: string,
//     age: number,
//     hobbies: string[],
//     role: number,
//     roletuple: [number, string]
// } ={
//     name: 'typeScript',
//     age: 11,
//     hobbies: ['Sports', 'Cokking'],
//     role: Role.ADMIN,
//     roletuple: [2 ,'author']
// }
//
// let favouriteActivites: any[];
// favouriteActivites = [5, 'Sports', true];
//
// if (person.role === Role.DEVELOPMENT){
//     console.log('is author');
//
// }
//
// person.roletuple.push('admin');
// person.roletuple[1] = '10';
// person.roletuple =[0, 'admin'];
//
// 2
// type Combinable = number | string;
// function combine(input1: Combinable, input2: Combinable, resultConversion: 'as-number'|'as-text'){
//     let reslut;
//
//     if(typeof input1==='number' && typeof input2==='number' || resultConversion==='as-number'){
// reslut = parseFloat(input1) + parseFloat(input2);
//
//     }else{
//         reslut = input1.toString() + input2.toString();
//     }
//     return reslut;
// }
//
// const combineNumber = combine(30, 26, 'as-number');
// console.log(combineNumber);
//
// const combineStringNumber = combine('30', '36', 'as-number')
// console.log(combineStringNumber);
//
// const combineText = combine('typescipt', 'javascipt', 'as-text');
// console.log(combineText);

// Cau 4
    const pokemon: number = 48;

    async function callAPI(url:string) {
        let data: Response = await fetch(url);

        return await data.json();
    }

console.log(Math.floor(Math.random() * 48) + 1);

let APP: HTMLElement | null = document.getElementById('app')
let html: string = '';

for (let index = 0; index < 48; index++) {
    const data: any = callAPI(`https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 48) + 1}/`);

    data.then(function(response: any){
        html += `
        <div class="col-1">
                    <div class="card p-1 mb-3 shadow position-relative">
                        <span class="position-absolute top-0">${response.id}</span>
                        <img src="${response.sprites.front_default}" alt="${response.name}">
                    </div>
                </div>
        `;
        APP?.innerHTML= html;
    });
    
};


class CountdownTimer {
    private countdownInterval: number | null = null;
    private countdownDuration: number = 10 * 60; // 10 minutes in seconds
  
    constructor(private displayElement: HTMLElement) {}
  
    startCountdown(): void {
      let currentTime = this.countdownDuration;
      this.updateDisplay(currentTime);
  
      this.countdownInterval = setInterval(() => {
        currentTime--;
        this.updateDisplay(currentTime);
        if (currentTime <= 0) {
          this.stopCountdown();
        }
      }, 1000);
    }
  
    stopCountdown(): void {
      if (this.countdownInterval !== null) {
        clearInterval(this.countdownInterval);
        this.countdownInterval = null;
      }
    }
  
    private updateDisplay(time: number): void {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      this.displayElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
  }
  
  // Sử dụng
  const startButton = document.getElementById('startButton');
  const stopButton = document.getElementById('stopButton');
  const timerDisplay = document.getElementById('timerDisplay');
  
  if (startButton && stopButton && timerDisplay) {
    const timer = new CountdownTimer(timerDisplay);
  
    startButton.addEventListener('click', () => {
      timer.startCountdown();
    });
  
    stopButton.addEventListener('click', () => {
      timer.stopCountdown();
    });
  }
  
