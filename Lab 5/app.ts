// Bài 1
type Admin = {
    name: string;
    privileges: string[];
};

type Employee = {
    name: string;
    startDate: Date;
};

type ElevateEmployee = Admin & Employee;

// Bài 2
class Car {
    drive() {
        console.log('Driving...');
    }
}

class Truck{
    drive() {
        console.log('Driving a truck');
    }

    loadCargo(amount: number){
        console.log('Loading cargo ...' + amount);
    }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle){
    vehicle.drive();
    if (vehicle instanceof Truck) {
        vehicle.loadCargo(1000);
    }
}

// Bài 3
interface Bird {
    type: 'bird';
    flyingSpeed: number;
}

interface Horse {
    type: 'horse';
    runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal){
    let speed;
    switch (animal.type){
        case 'bird':
            speed = animal.flyingSpeed;
            break;
        case 'horse':
            speed = animal.runningSpeed;
    }
    console.log('Moving at speed: ' + speed);
}

// Bài 4
//Generic

function merge<T extends object, U extends object>(objA: T, objB: U){
    return Object.assign(objA, objB);
}

const mergeObj = merge({name: 'Max', hobbies: ['Sports']}, {age: 30});
console.log(mergeObj);

// Generic interface
interface Lengthy{
    length: number;
}

function countAndDescribe <T extends Lengthy>(element: T): [T, string] {
    let descriptionText = 'Got no value.';
    if (element.length === 1) {
        descriptionText = 'Got 1 element.';
    } else if (element.length > 1){
        descriptionText = 'Got ' + element.length + 'elements.';
    }
    return [element, descriptionText];
}

// Generic class
class DataStorage<T extends string | number | boolean> {
    private data: T[] = [];
  
    addItem(item: T) {
      this.data.push(item);
    }
  
    removeItem(item: T) {
      if (this.data.indexOf(item) === -1) {
        return;
      }
      this.data.splice(this.data.indexOf(item), 1);
    }
  
    getItems() {
      return [...this.data];
    }
  }
  
  const textStorage = new DataStorage<string>();
  textStorage.addItem('Max');
  textStorage.addItem('Manu');
  textStorage.removeItem('Max');
  console.log(textStorage.getItems());
  
  const numberStorage = new DataStorage<number>();

// Bài 5
// Tạo các phần tử DOM
const loginDiv = document.getElementById("Login");
const appDiv = document.getElementById("app");

if (loginDiv && appDiv) {
    const loginHeader = document.createElement("div");
    loginHeader.textContent = "Login";

    const usernameInput = document.createElement("input");
    usernameInput.type = "text";
    usernameInput.placeholder = "Enter username";

    const startButton = document.createElement("button");
    startButton.textContent = "Start";

    // Xử lý sự kiện khi nhấn nút Start
    startButton.addEventListener("click", () => {
        const username = usernameInput.value;
        console.log("Username:", username);
    });

    // Thêm các phần tử vào DOM
    loginDiv.appendChild(loginHeader);
    loginDiv.appendChild(usernameInput);
    loginDiv.appendChild(startButton);
} else {
    console.error("Element with id 'Login' or 'app' not found.");
}
