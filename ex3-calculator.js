// --- ค่าเกณฑ์คงที่ (Constants) ---
const MAX_WORKSHOP_RAW = 60;
const WORKSHOP_WEIGHT = 20;
const TOTAL_MAX_SCORE = 100;
const TARGET_SCORE = 80;

// --- คะแนนดิบของนักศึกษา ---
const workshopRaw = 48;
const attendance = 9;
const project = 17;
const midterm = 15;
const final = 24;

// --- คำนวณผลลัพธ์ ---
// 1. แปลงคะแนน Workshop ตามสูตร: (คะแนนดิบ ÷ 60) × 20
const workshopCalculated = (workshopRaw / MAX_WORKSHOP_RAW) * WORKSHOP_WEIGHT;

// 2. คำนวณคะแนนรวมทั้งหมด
const totalScore = workshopCalculated + attendance + project + midterm + final;

// 3. คำนวณว่าคิดเป็นกี่เปอร์เซ็นต์ของคะแนนเต็ม 100
const scorePercentage = (totalScore / TOTAL_MAX_SCORE) * 100;

// 4. คำนวณว่ายังขาดอีกกี่คะแนนจึงจะได้ 80 คะแนน
const scoreNeeded = TARGET_SCORE - totalScore;

// --- แสดงผลเป็นใบสรุปคะแนน (ใช้ .toFixed(2) ในการแสดงผล) ---
console.log(`===== รายงานสรุปผลคะแนนวิชา CE385 =====
คะแนน Workshop (แปลงแล้ว) : ${workshopCalculated.toFixed(2)} / ${WORKSHOP_WEIGHT}
คะแนนเข้าเรียน            : ${attendance.toFixed(2)}
คะแนนโครงงาน             : ${project.toFixed(2)}
คะแนนกลางภาค             : ${midterm.toFixed(2)}
คะแนนปลายภาค             : ${final.toFixed(2)}
---------------------------------------
คะแนนรวมทั้งหมด           : ${totalScore.toFixed(2)} / ${TOTAL_MAX_SCORE}
คิดเป็น                   : ${scorePercentage.toFixed(2)}%
คะแนนที่ขาดเพื่อให้ได้ 80 คะแนน: ${scoreNeeded.toFixed(2)} คะแนน
================================-------`);