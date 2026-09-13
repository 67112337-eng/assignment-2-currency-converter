// Workshop 3 - ข้อที่ 3: async/await และลำดับ vs ขนาน

const students = [
  { id: "6501", name: "Somchai Jaidee", major: "CE", score: 85 },
  { id: "6502", name: "Somsri Rukdee", major: "CS", score: 92 },
  { id: "6503", name: "Anan Sukjai", major: "SE", score: 78 },
  { id: "6504", name: "Kanya Wongsa", major: "IT", score: 88 }
];

function calculateGrade(score) {
  if (score >= 80) return "A";
  if (score >= 70) return "B";
  if (score >= 60) return "C";
  if (score >= 50) return "D";
  return "F";
}

// นำเวอร์ชัน Promise จากข้อ 2 มาใช้
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

// ส่วนที่ 1 — reportSequential(): ดึงทีละคนตามลำดับ
async function reportSequential() {
  const ids = ["6501", "6502", "6503"];
  const startTime = Date.now();

  console.log("\n--- 1. ดึงข้อมูลแบบตามลำดับ (Sequential) ---");
  for (const id of ids) {
    const student = await fetchStudentByIdAsync(id);
    console.log(`ดึงข้อมูลสำเร็จ: ${student.name}`);
  }

  const duration = Date.now() - startTime;
  console.log(`[Sequential] ใช้เวลาทั้งหมด: ${duration} ms`);
  return duration;
}

// ส่วนที่ 2 — reportParallel(): ดึงพร้อมกันแบบขนาน
async function reportParallel(seqDuration) {
  const ids = ["6501", "6502", "6503"];
  const startTime = Date.now();

  console.log("\n--- 2. ดึงข้อมูลแบบขนาน (Parallel) ---");
  const promises = ids.map((id) => fetchStudentByIdAsync(id));
  const results = await Promise.all(promises);

  results.forEach((student) => {
    console.log(`ดึงข้อมูลสำเร็จ: ${student.name}`);
  });

  const duration = Date.now() - startTime;
  console.log(`[Parallel] ใช้เวลาทั้งหมด: ${duration} ms`);

  const speedup = (seqDuration / duration).toFixed(2);
  console.log(`>> แบบขนานเร็วขึ้นประมาณ ${speedup} เท่า`);
}

// ส่วนที่ 3 — safeReport(id): try-catch-finally
async function safeReport(id) {
  try {
    const student = await fetchStudentByIdAsync(id);
    const grade = calculateGrade(student.score);
    console.log(`พบข้อมูล: ${student.name} (เกรด ${grade})`);
  } catch (error) {
    console.log(`ตรวจไม่พบ: ${error.message}`);
  } finally {
    console.log(`-- จบการตรวจสอบ ${id} --`);
  }
}

// ฟังก์ชันหลักรันเรียงตามลำดับ
async function main() {
  console.log("=== เริ่มต้นทดสอบข้อที่ 3 ===");

  const seqDuration = await reportSequential();
  await reportParallel(seqDuration);

  console.log("\n--- 3. ทดสอบ safeReport (try-catch-finally) ---");
  await safeReport("6501"); // พบข้อมูล
  await safeReport("9999"); // ไม่พบข้อมูล
}

main();

/* 
ส่วนที่ 4 — ตอบคำถามท้ายไฟล์
คำถาม : ทำไม try-catch ครอบ await จับ reject ได้ แต่ครอบการเรียก callback ธรรมดาไม่ได้?
ตอบ: 
- การใช้ await จะหยุดรอการทำงานของ Promise และทำการ unwrap ค่า หรือ "แปลง" Rejection 
  ของ Promise ให้กลายเป็นการ throw exception ทางเทคนิค จึงทำให้ try-catch ดักจับได้เหมือน synchronous code
- ส่วน callback ธรรมดาจะถูกส่งไปทำงานใน Event Loop ควบคู่กับระบบ Asynchronous (เช่น setTimeout) 
  ซึ่งทำงานหลังจากที่บล็อก try-catch รันผ่านและออกจาก call stack ไปเรียบร้อยแล้ว try-catch จึงไม่สามารถดักจับ error ได้

คำถาม : ทดลอง "ลืม await" หน้า Promise.all แล้วเอาผลไปใช้ต่อ เกิดอะไรขึ้น?
ตอบ: 
- ตัวแปรจะไม่ได้เก็บ Array ของผลลัพธ์ข้อมูลนักศึกษา แต่จะเก็บ object ประเภท "Promise { <pending> }" แทน
- เมื่อนำไปใช้ต่อ เช่น การทำ .forEach() จะเกิด TypeError: results.forEach is not a function 
  เพราะ Promise object ไม่มี method forEach ทำให้โปรแกรมทำงานผิดพลาดทันที
*/