// ==========================================
// ส่วนที่ 1 — เขียนฟังก์ชันคำนวณ
// ==========================================

// 1. ตรวจสอบว่า score เป็นตัวเลข และอยู่ในช่วง 0 - 100
const isValidScore = (score) => {
    return typeof score === 'number' && score >= 0 && score <= 100;
};

// 2. แปลงคะแนนเป็นเกรด โดยใช้ Array + find ตาม Hint โจทย์
const toGrade = (score) => {
    if (!isValidScore(score)) return 'Invalid Score';
    
    const gradeRules = [
        { limit: 80, grade: 'A' },
        { limit: 75, grade: 'B+' },
        { limit: 70, grade: 'B' },
        { limit: 65, grade: 'C+' },
        { limit: 60, grade: 'C' },
        { limit: 55, grade: 'D+' },
        { limit: 50, grade: 'D' },
        { limit: 0,  grade: 'F' }
    ];

    const rule = gradeRules.find(r => score >= r.limit);
    return rule ? rule.grade : 'F';
};

// 3. คำนวณคะแนนเก็บแปลงแล้ว: (raw / full) * weight
const calculateWorkshopScore = (raw, full = 60, weight = 20) => {
    return (raw / full) * weight;
};

// 4. คำนวณคะแนนรวม 5 ก้อน
const calculateTotal = (workshop, attendance, project, midterm, final) => {
    return workshop + attendance + project + midterm + final;
};


// ==========================================
// ส่วนที่ 2 — ทดสอบ สร้างข้อมูลนักศึกษา 3 คน และแสดงผลตาราง
// ==========================================

const students = [
    { id: '66001', name: 'Alice', rawWorkshop: 48, attendance: 10, project: 25, midterm: 18, final: 20 },
    { id: '66002', name: 'Bob',   rawWorkshop: 30, attendance: 8,  project: 20, midterm: 12, final: 15 },
    { id: '66003', name: 'Charlie', rawWorkshop: 45, attendance: 10, project: 28, midterm: 22, final: 24 }
];

const studentSummaryTable = students.map(student => {
    const workshopScore = calculateWorkshopScore(student.rawWorkshop);
    const totalScore = calculateTotal(workshopScore, student.attendance, student.project, student.midterm, student.final);
    const grade = toGrade(totalScore);

    return {
        ID: student.id,
        Name: student.name,
        Workshop: workshopScore.toFixed(2),
        TotalScore: totalScore.toFixed(2),
        Grade: grade
    };
});

console.log("=== ส่วนที่ 2: สรุปข้อมูลนักศึกษา 3 คน ===");
console.table(studentSummaryTable);


// ==========================================
// ส่วนที่ 3 — พิสูจน์ค่าเริ่มต้น (Default Parameters)
// ==========================================

const test1 = calculateWorkshopScore(48);
const test2 = calculateWorkshopScore(48, 60, 20);
const test3 = calculateWorkshopScore(48, undefined, 25);

console.log("\n=== ส่วนที่ 3: พิสูจน์ค่าเริ่มต้น ===");
console.log(`calculateWorkshopScore(48) : ${test1}`);
console.log(`calculateWorkshopScore(48, 60, 20) : ${test2}`);
console.log(`calculateWorkshopScore(48, undefined, 25) : ${test3}`);

/*
  อธิบายผลลัพธ์จากส่วนที่ 3 (Comment ตามโจทย์สั่ง):
  - test1 และ test2 ได้ผลลัพธ์เท่ากัน (16) เพราะการเรียก calculateWorkshopScore(48) ไม่ได้ส่งค่า full และ weight 
    JavaScript จึงนำค่า Default Parameters ที่ตั้งไว้ (full = 60, weight = 20) มาใช้คำนวณโดยอัตโนมัติ
  - test3 เมื่อส่ง undefined เข้าไปในตำแหน่ง full ตัว JavaScript จะข้ามค่า undefined และใช้ค่า Default (full = 60) เช่นกัน
    แต่เนื่องจากมีการส่ง weight = 25 ใหม่ ผลลัพธ์จึงถูกคำนวณเป็น (48 / 60) * 25 = 20
*/