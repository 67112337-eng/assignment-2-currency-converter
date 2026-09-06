// ==========================================
// ส่วนที่ 1 — สร้างข้อมูลตั้งต้น (อย่างน้อย 6 คน)
// ==========================================
const students = [
    { id: '66001', name: 'Alice',   major: 'CE', score: 85, contact: { email: 'alice@ce.com', phone: '0812345678' } },
    { id: '66002', name: 'Bob',     major: 'IT', score: 45, contact: { email: 'bob@it.com', phone: '0823456789' } },
    { id: '66003', name: 'Charlie', major: 'CE', score: 72, contact: { email: 'charlie@ce.com', phone: '0834567890' } },
    { id: '66004', name: 'David',   major: 'IT', score: 38, contact: { email: 'david@it.com', phone: '0845678901' } },
    { id: '66005', name: 'Eve',     major: 'CE', score: 90, contact: { email: 'eve@ce.com', phone: '0856789012' } },
    { id: '66006', name: 'Frank',   major: 'IT', score: 60, contact: { email: 'frank@it.com', phone: '0867890123' } }
];

// ==========================================
// ส่วนที่ 2 — เขียนฟังก์ชันค้นหา (เงื่อนไข: return ทุกตัว / ห้ามแก้ array ต้นฉบับ)
// ==========================================

// 1. คืนนักศึกษาคนนั้น หรือ undefined ถ้าไม่พบ (ใช้ find)
const findById = (studentsList, id) => {
    return studentsList.find(student => student.id === id);
};

// 2. คืน array ของนักศึกษาในสาขานั้น (ใช้ filter)
const findByMajor = (studentsList, major) => {
    return studentsList.filter(student => student.major === major);
};

// 3. คืน true ถ้ามีอย่างน้อย 1 คนที่คะแนนต่ำกว่า 50 (ใช้ some)
const hasFailingStudent = (studentsList) => {
    return studentsList.some(student => student.score < 50);
};

// 4. คืนอีเมล หรือข้อความ "ไม่พบข้อมูลติดต่อ" ถ้าไม่มี
// เงื่อนไขโจทย์: ต้องใช้ Optional Chaining (?.) และ Nullish Coalescing (??)
const getEmail = (studentsList, id) => {
    const student = findById(studentsList, id);
    return student?.contact?.email ?? "ไม่พบข้อมูลติดต่อ";
};

// ==========================================
// ส่วนที่ 3 — ทดสอบกรณีหาไม่เจอ + เพิ่มนักศึกษาที่ไม่มี contact
// ==========================================

console.log("=== ทดสอบหาข้อมูลที่ไม่พบ ===");
console.log("findById 9999:", findById(students, "9999")); // แสดง undefined
console.log("getEmail 9999:", getEmail(students, "9999"));   // แสดง "ไม่พบข้อมูลติดต่อ"

// เพิ่มนักศึกษา 1 คนที่ไม่มี contact โดยใช้ Spread Operator [...] เพื่อไม่กระทบ array ต้นฉบับ
const newStudent = { id: '66007', name: 'Grace', major: 'CE', score: 75 }; // ไม่มี contact
const updatedStudents = [...students, newStudent];

console.log("\n=== ทดสอบ getEmail กับนักศึกษาใหม่ที่ไม่มี contact ===");
console.log("getEmail 66007:", getEmail(updatedStudents, "66007")); // แสดง "ไม่พบข้อมูลติดต่อ"

console.log("\n=== ทดสอบฟังก์ชันอื่นๆ ===");
console.log("findByMajor('CE'):", findByMajor(students, 'CE').map(s => s.name));
console.log("hasFailingStudent:", hasFailingStudent(students));