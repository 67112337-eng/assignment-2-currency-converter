// ฟังก์ชันแปลงคะแนนเป็นเกรด
function toGrade(score) {
  // ส่วนที่ 2: ตรวจสอบข้อมูลนำเข้าก่อนตัดเกรด (Validation)
  if (score < 0 || score > 100) {
    return "คะแนนไม่ถูกต้อง ต้องอยู่ระหว่าง 0-100";
  }

  // ส่วนที่ 1: ตัดเกรดตามเกณฑ์วิชา (เรียงจากมากไปน้อย)
  if (score >= 80) {
    return "เกรด A";
  } else if (score >= 75) {
    return "เกรด B+";
  } else if (score >= 70) {
    return "เกรด B";
  } else if (score >= 65) {
    return "เกรด C+";
  } else if (score >= 60) {
    return "เกรด C";
  } else if (score >= 55) {
    return "เกรด D+";
  } else if (score >= 50) {
    return "เกรด D";
  } else {
    return "เกรด F";
  }
}

// ส่วนที่ 3: ชุดข้อมูลสำหรับทดสอบตามที่โจทย์กำหนด
const testScores = [95, 80, 79, 75, 70, 65, 60, 55, 50, 49, 0, -5, 120];

console.log("===== รายงานผลการทดสอบตัดเกรด =====");
// วนลูปทดสอบด้วย for...of
for (const score of testScores) {
  const result = toGrade(score);
  console.log(`คะแนน ${score} -> ${result}`);
}