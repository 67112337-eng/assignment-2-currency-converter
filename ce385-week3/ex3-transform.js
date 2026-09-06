// ข้อมูลตั้งต้นสำหรับทดสอบ (ใช้ชุดเดียวกับข้อ 2)
const students = [
    { id: '66001', name: 'Alice',   major: 'CE', score: 85 },
    { id: '66002', name: 'Bob',     major: 'IT', score: 45 },
    { id: '66003', name: 'Charlie', major: 'CE', score: 72 },
    { id: '66004', name: 'David',   major: 'IT', score: 38 },
    { id: '66005', name: 'Eve',     major: 'CE', score: 90 },
    { id: '66006', name: 'Frank',   major: 'IT', score: 60 }
];

// ==========================================
// ส่วนที่ 1 — เขียนฟังก์ชันประมวลผล (ใช้ map, filter, reduce)
// ==========================================

// 1. คืน array ของชื่อทุกคน
const getNames = (studentsList) => {
    return studentsList.map(student => student.name);
};

// 2. คืน array ของคนที่คะแนน >= 50
const getPassedStudents = (studentsList) => {
    return studentsList.filter(student => student.score >= 50);
};

// 3. คืนผลรวมคะแนนทั้งหมด
const getTotalScore = (studentsList) => {
    return studentsList.reduce((acc, student) => acc + student.score, 0);
};

// 4. คืนคะแนนเฉลี่ย (ทศนิยม 2 ตำแหน่ง) — หากเป็น array ว่าง ให้คืน 0 ไม่ใช่ NaN
const getAverageScore = (studentsList) => {
    if (studentsList.length === 0) return 0;
    const total = getTotalScore(studentsList);
    return Number((total / studentsList.length).toFixed(2));
};

// 5. นับจำนวนคนแยกตามเกรด เช่น { A: 2, B: 1, F: 1 } (ใช้ reduce + ให้ค่าเริ่มต้นเป็น {})
const countByGrade = (studentsList) => {
    return studentsList.reduce((acc, student) => {
        let grade = 'F';
        if (student.score >= 80) grade = 'A';
        else if (student.score >= 70) grade = 'B';
        else if (student.score >= 60) grade = 'C';
        else if (student.score >= 50) grade = 'D';

        acc[grade] = (acc[grade] || 0) + 1;
        return acc;
    }, {});
};

// 6. คืนนักศึกษาที่คะแนนสูงสุด (ใช้ reduce)
const getTopStudent = (studentsList) => {
    if (studentsList.length === 0) return null;
    return studentsList.reduce((max, student) => (student.score > max.score ? student : max), studentsList[0]);
};


// ==========================================
// ส่วนที่ 2 — ท่อข้อมูลต่อกัน (Chaining ในบรรทัดเดียว)
// โจทย์: หาคะแนนเฉลี่ยของนักศึกษาสาขา CE ที่สอบผ่าน (score >= 50) โดยใช้ filter -> map -> reduce
// ==========================================

const cePassedAvgScore = Number((students.filter(s => s.major === 'CE' && s.score >= 50).map(s => s.score).reduce((acc, score, _, arr) => acc + score / arr.length, 0)).toFixed(2));


// ==========================================
// ส่วนที่ 3 — ทดสอบกรณีขอบ (Edge Case: Array ว่าง [])
// ==========================================

console.log("=== ส่วนที่ 1: ทดสอบฟังก์ชันปกติ ===");
console.log("getNames:", getNames(students));
console.log("getPassedStudents:", getPassedStudents(students).map(s => s.name));
console.log("getTotalScore:", getTotalScore(students));
console.log("getAverageScore:", getAverageScore(students));
console.log("countByGrade:", countByGrade(students));
console.log("getTopStudent:", getTopStudent(students));

console.log("\n=== ส่วนที่ 2: ท่อข้อมูลต่อกัน (CE สอบผ่าน คะแนนเฉลี่ย) ===");
console.log("CE Passed Avg Score:", cePassedAvgScore);

console.log("\n=== ส่วนที่ 3: ทดสอบกรณี Array ว่าง [] (ต้องไม่ error) ===");
const emptyList = [];
console.log("getNames([]):", getNames(emptyList));
console.log("getPassedStudents([]):", getPassedStudents(emptyList));
console.log("getTotalScore([]):", getTotalScore(emptyList));
console.log("getAverageScore([]):", getAverageScore(emptyList)); // ต้องได้ 0 ไม่ใช่ NaN
console.log("countByGrade([]):", countByGrade(emptyList));
console.log("getTopStudent([]):", getTopStudent(emptyList));