// ประกาศตัวแปรเก็บข้อมูลส่วนตัวของนักศึกษา
// ห้ามใช้ var ให้ใช้ const หรือ let เท่านั้น
const nickname = "อะตอม";
const studentId = "67112337";
const age = 22;
const major = "วิศวกรรมคอมพิวเตอร์";
const enrolledCourses = 6;
const remainingYears = 2; // จำนวนปีที่เหลือจนกว่าจะจบ

// คำนวณปีที่จะจบจากตัวแปร 2569 + จำนวนปีที่เหลือ
const gradYear = 2569 + remainingYears;

// แสดงผลด้วย Template Literal (ใช้เครื่องหมาย ` `)
console.log(`===== บัตรแนะนำตัว =====
ชื่อเล่น       : ${nickname}
รหัสนักศึกษา   : ${studentId}
อายุ         : ${age} ปี
สาขาวิชา     : ${major}
ลงทะเบียน    : ${enrolledCourses} วิชา
ปีที่จะจบ      : ${gradYear}
========================`);