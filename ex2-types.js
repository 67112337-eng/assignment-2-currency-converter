const strVal = "สวัสดี";
const numVal = 100;
const boolVal = true;
let undefVal;
const nullVal = null;
const arrVal = [1, 2, 3];

console.log(`--- ส่วนที่ 1: ตรวจสอบชนิดข้อมูล 6 ชนิด ---`);
console.log(`ค่า: ${strVal} | ชนิด: ${typeof strVal}`);
console.log(`ค่า: ${numVal} | ชนิด: ${typeof numVal}`);
console.log(`ค่า: ${boolVal} | ชนิด: ${typeof boolVal}`);
console.log(`ค่า: ${undefVal} | ชนิด: ${typeof undefVal}`);
console.log(`ค่า: ${nullVal} | ชนิด: ${typeof nullVal}`); // หมายเหตุ: typeof null จะได้ "object" (เป็นบั๊กประวัติศาสตร์ของ JS)
console.log(`ค่า: ${arrVal} | ชนิด: ${typeof arrVal}`); // Array ก็เป็น object ใน JS

// --- ส่วนที่ 2: ตอบคำถามด้วยโค้ด ---
console.log(`\n--- ส่วนที่ 2: ตอบคำถามด้วยโค้ด ---`);
console.log(`typeof null ได้ผลเป็น: ${typeof null}`);

let unassignedVar;
console.log(`ตัวแปรที่ยังไม่ได้กำหนดค่า มีชนิดเป็น: ${typeof unassignedVar}`);

const nanVal = Number("abc");
console.log(`typeof NaN ได้ผลเป็น: ${typeof nanVal}`);

// --- ส่วนที่ 3: การแปลงชนิดข้อมูล ---
console.log(`\n--- ส่วนที่ 3: การแปลงชนิดข้อมูล ---`);
const inputAge = "20";
const inputScore = "85.5";

// แปลง inputAge เป็นตัวเลขแล้วบวก 5 (ใช้ Number() แปลง)
const ageNum = Number(inputAge) + 5;
console.log(`แปลง inputAge เป็นตัวเลขแล้วบวก 5 ได้: ${ageNum}`);

// แปลง inputScore แล้วแสดงผลทศนิยม 1 ตำแหน่งด้วย .toFixed(1)
const scoreNum = Number(inputScore).toFixed(1);
console.log(`แปลง inputScore มีทศนิยม 1 ตำแหน่ง: ${scoreNum}`);

// เปรียบเทียบความแตกต่างระหว่าง inputAge === 20 กับ Number(inputAge) === 20
console.log(`inputAge === 20 ได้ผลเป็น: ${inputAge === 20}`);
console.log(`Number(inputAge) === 20 ได้ผลเป็น: ${Number(inputAge) === 20}`);