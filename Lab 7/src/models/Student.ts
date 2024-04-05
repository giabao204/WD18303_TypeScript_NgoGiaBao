import {Person} from '../interface/Person'

export class Student implements Person {
    fullName: string;
    firstName: string ;
    middleInitial: string ;
    lastName: string ;
    constructor(firstName: string, middleInitial: string,lastName: string  ){
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = middleInitial + " " +  firstName + " " + lastName;
    }
}