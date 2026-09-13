const students = [
  { id: "6501", name: "Somchai Jaidee", major: "CE", score: 85 },
  { id: "6502", name: "Somsri Rukdee", major: "CS", score: 92 },
  { id: "6503", name: "Anan Sukjai", major: "SE", score: 78 },
  { id: "6504", name: "Kanya Wongsa", major: "IT", score: 88 }
];

// ฟังก์ชัน helper สำหรับตัดเกรด
function calculateGrade(score) {
  if (score >= 80) return "A";
  if (score >= 70) return "B";
  if (score >= 60) return "C";
  if (score >= 50) return "D";
  return "F";
}

// ส่วนที่ 1 — เขียน fetchStudentByIdAsync คืน Promise (ห้ามใช้คำว่า async)
function fetchStudentByIdAsync(id) {
  return new Promise((resolve, reject) => {
    if (typeof id !== "string" || id.trim() === "") {
      return reject(new Error("รหัสนักศึกษาไม่ถูกต้อง"));
    }

    setTimeout(() => {
      const student = students.find((s) => s.id === id);
      if (!student) {
        return reject(new Error(`ไม่พบรหัสนักศึกษา ${id}`));
      }
      return resolve({ ...student });
    }, 300);
  });
}

console.log("=== เริ่มต้นทดสอบข้อที่ 2 ===");

// ส่วนที่ 2 — เรียกใช้ครบ 3 กรณีด้วย .then / .catch / .finally
// กรณี ก) id ที่มีจริง
fetchStudentByIdAsync("6501")
  .then((student) => console.log("กรณี ก [Success]:", student))
  .catch((err) => console.error("กรณี ก [Error]:", err.message))
  .finally(() => console.log("กรณี ก: ทำงานเสร็จสิ้น (Finally)"));

// กรณี ข) id ที่ไม่มีจริง
fetchStudentByIdAsync("9999")
  .then((student) => console.log("กรณี ข [Success]:", student))
  .catch((err) => console.error("กรณี ข [Error]:", err.message))
  .finally(() => console.log("กรณี ข: ทำงานเสร็จสิ้น (Finally)"));

// กรณี ค) id ผิดรูปแบบ
fetchStudentByIdAsync(42)
  .then((student) => console.log("กรณี ค [Success]:", student))
  .catch((err) => console.error("กรณี ค [Error]:", err.message))
  .finally(() => console.log("กรณี ค: ทำงานเสร็จสิ้น (Finally)"));

// ส่วนที่ 3 — เขียน "โซ่" (Promise Chain) 3 ขั้น
setTimeout(() => {
  console.log("\n--- ทดสอบ Promise Chain 3 ขั้น ---");
  fetchStudentByIdAsync("6501")
    // ขั้น 1: แปลงเป็น { name, grade }
    .then((student) => {
      return {
        name: student.name,
        grade: calculateGrade(student.score)
      };
    })
    // ขั้น 2: แปลงเป็นข้อความรายงาน 1 บรรทัด
    .then((data) => {
      return `รายงาน: นักศึกษา ${data.name} ได้เกรด ${data.grade}`;
    })
    // ขั้น 3: พิมพ์ออกทาง console
    .then((report) => {
      console.log(report);
    })
    .catch((err) => console.error("Chain Error:", err.message));
}, 1000);

// ส่วนที่ 4 (โบนัส +0.5) — เขียน promisify(fn) อเนกประสงค์
function promisify(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn(...args, (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    });
  };
}

// ฟังก์ชันตัวอย่างแบบ error-first สำหรับทดสอบ promisify
function fetchStudentCallback(id, callback) {
  if (typeof id !== "string" || id.trim() === "") {
    return callback(new Error("รหัสนักศึกษาไม่ถูกต้อง"));
  }
  setTimeout(() => {
    const student = students.find((s) => s.id === id);
    if (!student) return callback(new Error(`ไม่พบรหัสนักศึกษา ${id}`));
    return callback(null, { ...student });
  }, 300);
}

setTimeout(() => {
  console.log("\n--- ทดสอบ Promisify (โบนัส) ---");
  const fetchStudentPromisified = promisify(fetchStudentCallback);

  fetchStudentPromisified("6502")
    .then((res) => console.log("[Promisified Success]:", res))
    .catch((err) => console.error("[Promisified Error]:", err.message));
}, 2000);