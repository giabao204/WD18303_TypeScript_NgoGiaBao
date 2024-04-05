import validate from "./StaticZipCodeValidator";

let strings = ["hello", "05836", "101"];

strings.forEach((s) => {
    console.log(`"${s}" ${validate(s) ? "matches" : "does not match"}`);
});