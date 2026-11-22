# CreditMatch — ARU responsive website prototype

เว็บไซต์ต้นแบบระบบกลางเพื่อการเทียบโอนหน่วยกิตและจับคู่รายวิชาระดับมหาวิทยาลัย

## เริ่มใช้งาน
1. แตกไฟล์ ZIP
2. เปิด `index.html` ด้วยเว็บเบราว์เซอร์ (ต้องมีอินเทอร์เน็ตสำหรับ Tailwind CDN, Google Fonts และ Lucide icons)
3. คลิกเมนูเพื่อเปิดหน้าต่าง ๆ
4. สามารถใช้ VS Code Live Server เพื่อทดสอบได้

## โครงสร้างไฟล์
- `index.html` แดชบอร์ด
- `pages/applications.html` คำร้องของฉัน
- `pages/mapping.html` จับคู่รายวิชาและอัปโหลดไฟล์จำลอง
- `pages/courses.html` ฐานข้อมูลรายวิชา
- `pages/criteria.html` เกณฑ์กลาง
- `pages/review.html` งานพิจารณาคำร้อง
- `pages/support.html` คู่มือและติดต่อ
- `assets/css/style.css` รูปแบบเพิ่มเติม
- `assets/js/data.js` ข้อมูลตัวอย่าง
- `assets/js/app.js` ส่วนประกอบร่วม การนำทาง และพฤติกรรมหน้าจอ

## ขอบเขต
ต้นแบบ Frontend สำหรับทดลอง UI/UX เท่านั้น ไม่มี backend, authentication, OCR, PDF extraction, AI semantic matching, database, file upload server หรือการอนุมัติจริง ข้อมูลตัวอย่างเก็บใน localStorage ของเบราว์เซอร์ คะแนนความสอดคล้องเป็นข้อมูลจำลอง รายชื่อหลักสูตรและเงื่อนไขเกณฑ์ต้องตรวจสอบกับมหาวิทยาลัยก่อนใช้งานจริง

## ข้อแนะนำก่อนใช้งานจริง
ใช้ Tailwind build pipeline แทน CDN; เชื่อมต่อ API, ฐานข้อมูลหลักสูตร, SSO, RBAC, audit log, document storage, PDPA controls, server-side validation และ workflow การอนุมัติที่ได้รับการรับรอง
