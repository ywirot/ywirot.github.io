# CreditMatch ARU — HTML-first edition

เวอร์ชันปรับปรุง: ทุกหน้าเก็บโครงสร้าง HTML และข้อความของหน้านั้นโดยตรง ไม่ใช้ JavaScript สร้างหน้าเว็บทั้งหน้า

- `index.html` หน้าหลัก
- `pages/mapping.html` เลือกหลักสูตร จับคู่รายวิชา และตารางรายการ
- `pages/applications.html` ตรวจสอบและส่งคำร้องจำลอง
- `pages/help.html` คู่มือ
- `assets/css/style.css` สี รูปแบบ ฟอนต์ และ responsive layout เท่านั้น
- `assets/js/app.js` เฉพาะพฤติกรรมการทำงาน เช่น เมนูมือถือ จับคู่รายวิชา บันทึกใน localStorage

วิธีใช้: แตกไฟล์ ZIP แล้วเปิด `index.html` หรือใช้ VS Code Live Server ต้องใช้อินเทอร์เน็ตเพื่อโหลด Tailwind CSS CDN และ Google Fonts

**ข้อจำกัด:** ระบบต้นแบบ ไม่มีฐานข้อมูลจริง ไม่มี OCR/AI ไม่มีการเข้าสู่ระบบและการอนุมัติจริง ข้อมูลรายวิชา คณะ และหลักสูตรเป็นตัวอย่าง
