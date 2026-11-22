# CreditMatch ARU — HTML-first edition

เว็บต้นแบบ Responsive สำหรับมหาวิทยาลัยราชภัฏพระนครศรีอยุธยา

## ไฟล์
- `index.html` — หน้าแรก
- `pages/mapping.html` — เลือกหลักสูตรและจับคู่รายวิชา
- `pages/applications.html` — ตรวจสอบและส่งคำร้องจำลอง
- `pages/help.html` — คู่มือ
- `assets/css/style.css` — CSS จัดเป็นหมวดพร้อมคอมเมนต์ (แก้สีที่ `:root`)
- `assets/js/app.js` — JavaScript แบ่งฟังก์ชันและข้อมูลตัวอย่างอย่างชัดเจน

## วิธีใช้
แตก ZIP แล้วเปิด `index.html` หรือเปิดด้วย VS Code Live Server
ต้องใช้อินเทอร์เน็ตสำหรับ Tailwind CSS CDN และ Google Fonts

## การแก้ไข
- เนื้อหาและโครงสร้าง: แก้ใน HTML ของหน้านั้น ๆ
- สีและรูปแบบ: แก้ `assets/css/style.css`
- รายวิชาตัวอย่าง, การจับคู่, การบันทึก: แก้ `assets/js/app.js`

ข้อมูลถูกเก็บใน `localStorage` ของเบราว์เซอร์ ไม่ได้ส่งไปยังเซิร์ฟเวอร์
ไม่มีฐานข้อมูลจริง, AI, OCR, การเข้าสู่ระบบ หรือการอนุมัติจริง
