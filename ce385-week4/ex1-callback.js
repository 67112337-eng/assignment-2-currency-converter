const students = [
  { id: "6501", name: "Somchai Jaidee", major: "CE", score: 85 },
  { id: "6502", name: "Somsri Rukdee", major: "CS", score: 92 },
  { id: "6503", name: "Anan Sukjai", major: "SE", score: 78 },
  { id: "6504", name: "Kanya Wongsa", major: "IT", score: 88 }
];

// ส่วนที่ 2 — เขียนฟังก์ชัน fetchStudentById ตามธรรมเนียม error-first
function fetchStudentById(id, callback) {
  // ตรวจสอบเงื่อนไข id ไม่ใช่ string หรือว่างเปล่า
  if (typeof id !== "string" || id.trim() === "") {
    return callback(new Error("รหัสนักศึกษาไม่ถูกต้อง"));
  }

  // หน่วงเวลา 300ms เพื่อจำลองการค้นหาฐานข้อมูล
  setTimeout(() => {
    const student = students.find((s) => s.id === id);

    if (!student) {
      return callback(new Error(`ไม่พบรหัสนักศึกษา ${id}`));
    }

    // ส่งสำเนา object กลับไปเมื่อพบข้อมูล
    return callback(null, { ...student });
  }, 300);
}

// ส่วนที่ 3 — เรียกใช้ครบ 3 กรณี
console.log("=== เริ่มต้นทดสอบข้อที่ 1 ===");

// กรณี ก) id ที่มีจริง
fetchStudentById("6501", (err, student) => {
  if (err) {
    console.error("กรณี ก [Error]:", err.message);
    return;
  }
  console.log("กรณี ก [Success]:", student);
});

// กรณี ข) id ที่ไม่มีจริง
fetchStudentById("9999", (err, student) => {
  if (err) {
    console.error("กรณี ข [Error]:", err.message);
    return;
  }
  console.log("กรณี ข [Success]:", student);
});

// กรณี ค) id ผิดรูปแบบ (เช่น เป็นตัวเลข 42)
fetchStudentById(42, (err, student) => {
  if (err) {
    console.error("กรณี ค [Error]:", err.message);
    return;
  }
  console.log("กรณี ค [Success]:", student);
});