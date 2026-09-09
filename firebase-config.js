import { db, auth } from "./firebase-config.js";
import { collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// DOM Elements
const skillsGrid = document.getElementById("skills-grid");
const btnCreateSkill = document.getElementById("btn-create-skill");

// Mockup Data กรณีที่ยังไม่ได้ใส่ข้อมูลใน Firebase Firestore
const sampleSkills = [
    {
        title: "พื้นฐานการเขียนเว็บด้วย HTML/CSS",
        category: "เทคโนโลยี",
        description: "สอนการทำเว็บไซต์เบื้องต้น เหมาะสำหรับผู้เริ่มต้นที่อยากมีเว็บเป็นของตัวเอง",
        author: "ครูสมชาย สายโค้ด",
        level: "เริ่มต้น"
    },
    {
        title: "เทคนิคถ่ายภาพด้วยสมาร์ตโฟน",
        category: "ศิลปะและการถ่ายภาพ",
        description: "เรียนรู้การจัดองค์ประกอบภาพ แสง และมุมกล้องให้ดูมืออาชีพด้วยมือถือเครื่องเดียว",
        author: "น้องพิม ม.5",
        level: "ทุกระดับ"
    },
    {
        title: "ภาษาอังกฤษเพื่อการสื่อสารในชีวิตประจำวัน",
        category: "ภาษา",
        description: "เน้นการฝึกพูดและฟังบทสนทนาจริงที่ใช้บ่อย ไม่เน้นไวยากรณ์เคร่งครัด",
        author: "พี่จอห์น ชุมชนหมอแปลง",
        level: "ปานกลาง"
    }
];

// ฟังก์ชันโหลดข้อมูลทักษะ
async function loadSkills() {
    try {
        // หากต้องการเชื่อมต่อ Firestore จริงให้ยกเลิก Comment บรรทัดล่างนี้:
        /*
        const q = query(collection(db, "skills"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const skills = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        renderSkills(skills);
        */

        // ใช้ข้อมูล Sample Data สำหรับการแสดงผลเริ่มต้น
        renderSkills(sampleSkills);
    } catch (error) {
        console.error("Error loading skills: ", error);
        skillsGrid.innerHTML = `<p class="text-red-500 col-span-full text-center">เกิดข้อผิดพลาดในการโหลดข้อมูล</p>`;
    }
}

// ฟังก์ชันสำหรับสร้าง HTML และ Render สู่หน้าจอ
function renderSkills(skills) {
    if (skills.length === 0) {
        skillsGrid.innerHTML = `<p class="text-slate-500 col-span-full text-center">ยังไม่มีข้อมูลการแบ่งปันทักษะ</p>`;
        return;
    }

    skillsGrid.innerHTML = skills.map(skill => `
        <div class="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition p-6 flex flex-col justify-between hover:-translate-y-1 transform duration-200">
            <div>
                <div class="flex justify-between items-start mb-3">
                    <span class="text-xs font-semibold px-2.5 py-1 bg-indigo-50 text-indigo-600 rounded-full">
                        ${skill.category}
                    </span>
                    <span class="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                        ${skill.level}
                    </span>
                </div>
                <h3 class="text-lg font-bold text-slate-800 mb-2 hover:text-indigo-600 transition cursor-pointer">
                    ${skill.title}
                </h3>
                <p class="text-slate-600 text-sm mb-4 line-clamp-2">
                    ${skill.description}
                </p>
            </div>
            <div class="pt-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
                <span class="font-medium text-slate-700">โดย: ${skill.author}</span>
                <button class="text-indigo-600 hover:text-indigo-800 font-semibold">สนใจเรียนรู้ →</button>
            </div>
        </div>
    `).join("");
}

// Event Listeners
btnCreateSkill?.addEventListener("click", () => {
    alert("ระบบกำลังเปิดให้เพิ่มทักษะเร็วๆ นี้ (กรุณาลงชื่อเข้าใช้ก่อน)");
});

// Initialize App
document.addEventListener("DOMContentLoaded", () => {
    loadSkills();
});
