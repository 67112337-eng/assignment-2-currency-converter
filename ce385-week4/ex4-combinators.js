const wait = (ms, value, willFail = false) =>
  new Promise((resolve, reject) => {
    setTimeout(
      () => (willFail ? reject(new Error(`${value} ล้มเหลว`)) : resolve(value)),
      ms
    );
  });

// ฟังก์ชันสำหรับ สถานการณ์ที่ 4: เลิกรอเมื่อเกินเวลา
function timeoutPromise(ms) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error("Timeout: เกินเวลาที่กำหนด"));
    }, ms);
  });
}

async function main() {
  console.log("=== เริ่มต้นทดสอบข้อที่ 4 ===");

  console.log("\n--- สถานการณ์ที่ 1: หน้าแรก (Promise.all) ---");
  try {
    const pageData = await Promise.all([
      wait(300, "โปรไฟล์"),
      wait(400, "ตารางเรียน"),
      wait(500, "ประกาศ")
    ]);
    console.log(`เปิดหน้าแรก: ${pageData.join(" + ")}`);
  } catch (error) {
    console.log(`หน้าแรกเปิดไม่ได้: ${error.message}`);
  }
  try {
    await Promise.all([
      wait(300, "โปรไฟล์"),
      wait(400, "ตารางเรียน"),
      wait(500, "ประกาศ", true) // ประกาศล้มเหลว
    ]);
  } catch (error) {
    console.log(`หน้าแรกเปิดไม่ได้: ${error.message}`);
  }

  console.log("\n--- สถานการณ์ที่ 2: แจ้งเตือนผลสอบ (Promise.allSettled) ---");
  const notifications = await Promise.allSettled([
    wait(300, "อีเมล"),
    wait(500, "SMS", true), // SMS ล้มเหลว
    wait(400, "แอป")
  ]);

  console.log("รายงานสถานะการแจ้งเตือน:");
  notifications.forEach((res, index) => {
    const channels = ["อีเมล", "SMS", "แอป"];
    if (res.status === "fulfilled") {
      console.log(` - ${channels[index]}: สำเร็จ (${res.value})`);
    } else {
      console.log(` - ${channels[index]}: ล้มเหลว (${res.reason.message})`);
    }
  });

  console.log("\n--- สถานการณ์ที่ 3: Mirror Server (Promise.any) ---");
  try {
    const fastestSuccess = await Promise.any([
      wait(300, "mirror-A", true), // mirror-A เร็วกว่าแต่ล้มเหลว
      wait(600, "mirror-B") // mirror-B ช้ากว่าแต่สำเร็จ
    ]);
    console.log(`ได้ข้อมูลตัวแรกที่สำเร็จ -> ใช้ข้อมูลจาก: ${fastestSuccess}`);
  } catch (error) {
    console.log("ทุก Mirror server ล้มเหลวทั้งหมด");
  }

  console.log("\n--- สถานการณ์ที่ 4: ค้นหาฐานข้อมูล (Promise.race) ---");
  try {
    const result = await Promise.race([
      wait(1200, "ข้อมูลจาก DB ใหม่"), // ดึงข้อมูลจริงใช้ 1200ms
      timeoutPromise(800) // ผู้ใช้รอได้แค่ 800ms
    ]);
    console.log(`ดึงข้อมูลสำเร็จ: ${result}`);
  } catch (error) {
    console.log(`เกิน 800ms -> เลิกรอ -> ใช้แคชเก่าแทน (${error.message})`);
  }
}

main();