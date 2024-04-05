export class ParsenlnBasedZipCodeValidator {
    isAcceptable(s: string){
        return s.length === 5 && parseInt(s).toString() === s;
    }
}

export {ZipCodeValidator as RegexbasedZipCodeValidator} from "./ZipCodeValidator"