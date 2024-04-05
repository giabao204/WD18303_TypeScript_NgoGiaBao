//  <reference path="studentCalc.ts">;
import { studentCalc } from './studentCalc.';

let TotalFee = studentCalc.AnualFeeCalc(1500, 4);

console.log("Output:" + TotalFee);