// ฟังก์ชันหาราคาเมนูอาหาร
function getMenuPrice(menu) {
  switch (menu) {
    // ใช้ fall-through รวมกลุ่มเมนูราคา 50 บาทเข้าด้วยกันโดยตั้งใจ
    case "ข้าวผัด":
    case "ข้าวมันไก่":
    case "ข้าวหมูแดง":
      return 50;
    case "ผัดไทย":
      return 60;
    case "ต้มยำกุ้ง":
      return 120;
    default:
      return 0; // เมนูไม่มีในรายการ
  }
}

// ฟังก์ชันหาตัวคูณขนาด
function getSizeMultiplier(size) {
  switch (size) {
    case "ธรรมดา":
      return 1;
    case "พิเศษ":
      return 1.5;
    case "จัมโบ้":
      return 2;
    default:
      return 1;
  }
}

// ส่วนที่ 3: ออเดอร์ 5 รายการ (มีเมนูไม่มีในรายการ 1 รายการเพื่อทดสอบ default)
const orders = [
  { menu: "ผัดไทย", size: "พิเศษ", qty: 2 },
  { menu: "ข้าวผัด", size: "ธรรมดา", qty: 1 },
  { menu: "ต้มยำกุ้ง", size: "จัมโบ้", qty: 1 },
  { menu: "ข้าวมันไก่", size: "พิเศษ", qty: 3 },
  { menu: "ชาพาเมซาน", size: "ธรรมดา", qty: 2 } // เมนูทดสอบ default
];

console.log("===== รายการสั่งอาหาร และสรุปราคา =====");
let grandTotal = 0;

for (const order of orders) {
  const price = getMenuPrice(order.menu);
  const multiplier = getSizeMultiplier(order.size);
  const itemTotal = price * multiplier * order.qty;
  
  grandTotal += itemTotal;
  console.log(`${order.menu} (${order.size}) x${order.qty} = ${itemTotal} บาท`);
}

console.log("-------------------------------------");
console.log(`ราคารวมทั้งหมด: ${grandTotal} บาท`);