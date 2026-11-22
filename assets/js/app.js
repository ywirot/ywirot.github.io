/**
 * CreditMatch ARU — Frontend demonstration
 * HTML owns page content; CSS owns appearance; this file owns behavior only.
 * All course and curriculum data below are fictional examples.
 */

'use strict';

const STORAGE_KEY = 'creditmatch_simple_v3';

const SOURCE_COURSES = [
  { code: 'CS101', name: 'การเขียนโปรแกรมเบื้องต้น', credits: 3, category: 'major' },
  { code: 'GE101', name: 'ภาษาอังกฤษเพื่อการสื่อสาร', credits: 3, category: 'gened' },
  { code: 'CS205', name: 'โครงสร้างข้อมูล', credits: 3, category: 'major' },
  { code: 'EL100', name: 'การพัฒนาทักษะชีวิต', credits: 3, category: 'elective' },
];

const TARGET_COURSES = [
  { code: 'COM1101', name: 'หลักการเขียนโปรแกรม', credits: 3, category: 'major' },
  { code: 'GEN1002', name: 'ภาษาอังกฤษเพื่อการสื่อสาร', credits: 3, category: 'gened' },
  { code: 'COM2203', name: 'โครงสร้างข้อมูลและขั้นตอนวิธี', credits: 3, category: 'major' },
  { code: 'FRE1001', name: 'วิชาเลือกเสรี', credits: 3, category: 'elective' },
];

const FACULTY_MAJORS = {
  'คณะวิทยาศาสตร์และเทคโนโลยี': ['วิทยาการคอมพิวเตอร์', 'เทคโนโลยีสารสนเทศ'],
  'คณะวิทยาการจัดการ': ['บริหารธุรกิจ', 'การบัญชี'],
  'คณะครุศาสตร์': ['การศึกษาปฐมวัย', 'คณิตศาสตร์'],
  'คณะมนุษยศาสตร์และสังคมศาสตร์': ['ภาษาอังกฤษ', 'รัฐประศาสนศาสตร์'],
};

const CATEGORY_LABELS = {
  gened: 'ศึกษาทั่วไป',
  major: 'วิชาเฉพาะ',
  elective: 'เลือกเสรี',
};

function getCourse(collection, code) {
  return collection.find((course) => course.code === code);
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && Array.isArray(saved.mappings)) {
      return { mappings: saved.mappings, submitted: Boolean(saved.submitted) };
    }
  } catch (error) {
    console.warn('Unable to load saved demonstration data:', error);
  }

  return { mappings: [], submitted: false };
}

const state = loadState();

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.warn('Unable to save demonstration data:', error);
    showToast('ไม่สามารถบันทึกข้อมูลในเบราว์เซอร์ได้');
  }
}

function totalCredits() {
  return state.mappings.reduce((sum, mapping) => {
    const course = getCourse(TARGET_COURSES, mapping.target);
    return sum + (course?.credits ?? 0);
  }, 0);
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(showToast.timeoutId);
  showToast.timeoutId = setTimeout(() => {
    toast.hidden = true;
  }, 3000);
}

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

// Shared top navigation (markup lives in each HTML page).
function initializeNavigation() {
  const toggle = document.getElementById('menu-toggle');
  const navigation = document.getElementById('site-nav');
  if (!toggle || !navigation) return;

  toggle.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
}

function initializeHome() {
  document.getElementById('home-count').textContent = state.mappings.length;
  document.getElementById('home-credits').textContent = totalCredits();
  document.getElementById('home-status').textContent = state.submitted
    ? 'ส่งคำร้องแล้ว (จำลอง)'
    : 'ยังไม่ได้ส่งคำร้อง';
}

function initializeMapping() {
  const faculty = document.getElementById('faculty');
  const major = document.getElementById('major');
  const sourceSelect = document.getElementById('source-course');
  const targetSelect = document.getElementById('target-course');
  const preview = document.getElementById('mapping-preview');
  const addButton = document.getElementById('add-mapping');
  const rows = document.getElementById('mapping-rows');
  const total = document.getElementById('mapping-total');

  function updateMajors() {
    major.replaceChildren();
    for (const name of FACULTY_MAJORS[faculty.value] ?? []) {
      const option = createElement('option', '', name);
      option.value = name;
      major.append(option);
    }
  }

  function updatePreview() {
    const source = getCourse(SOURCE_COURSES, sourceSelect.value);
    const target = getCourse(TARGET_COURSES, targetSelect.value);
    preview.replaceChildren();
    addButton.disabled = !(source && target);

    if (!source || !target) {
      preview.textContent = 'เลือกรายวิชาทั้งสองฝั่งเพื่อดูข้อมูลเปรียบเทียบ';
      return;
    }

    preview.append(createElement('strong', '', `${source.name} → ${target.name}`));
    preview.append(createElement(
      'p',
      'preview-note',
      `หมวดวิชา: ${CATEGORY_LABELS[target.category]} • หน่วยกิต: ${source.credits} → ${target.credits}`,
    ));
    preview.append(createElement(
      'p',
      'hint',
      source.category === target.category
        ? 'หมวดวิชาตรงกัน แต่ยังต้องตรวจสอบคำอธิบายรายวิชาและเกณฑ์จริง'
        : 'หมวดวิชาต่างกัน ต้องให้เจ้าหน้าที่ตรวจสอบ',
    ));
  }

  function renderMappings() {
    rows.replaceChildren();
    total.textContent = totalCredits();

    if (state.mappings.length === 0) {
      const row = createElement('tr');
      const cell = createElement('td', 'empty', 'ยังไม่มีรายการจับคู่');
      cell.colSpan = 4;
      row.append(cell);
      rows.append(row);
      return;
    }

    state.mappings.forEach((mapping, index) => {
      const target = getCourse(TARGET_COURSES, mapping.target);
      const row = createElement('tr');
      row.append(createElement('td', '', mapping.source));
      row.append(createElement('td', '', mapping.target));
      row.append(createElement('td', '', CATEGORY_LABELS[target?.category] ?? '-'));

      const actionCell = createElement('td');
      const removeButton = createElement('button', 'remove-button', 'ลบ');
      removeButton.type = 'button';
      removeButton.addEventListener('click', () => {
        state.mappings.splice(index, 1);
        state.submitted = false;
        saveState();
        renderMappings();
      });
      actionCell.append(removeButton);
      row.append(actionCell);
      rows.append(row);
    });
  }

  faculty.addEventListener('change', updateMajors);
  sourceSelect.addEventListener('change', updatePreview);
  targetSelect.addEventListener('change', updatePreview);

  addButton.addEventListener('click', () => {
    const source = sourceSelect.value;
    const target = targetSelect.value;
    if (!getCourse(SOURCE_COURSES, source) || !getCourse(TARGET_COURSES, target)) return;

    if (state.mappings.some((mapping) => mapping.source === source && mapping.target === target)) {
      showToast('รายการนี้ถูกเพิ่มแล้ว');
      return;
    }

    state.mappings.push({ source, target });
    state.submitted = false;
    saveState();
    renderMappings();
    showToast('เพิ่มรายการจับคู่แล้ว');
  });

  updateMajors();
  updatePreview();
  renderMappings();
}

function initializeApplications() {
  const list = document.getElementById('application-list');
  const total = document.getElementById('application-total');
  const status = document.getElementById('application-status');
  const submitButton = document.getElementById('submit-application');

  function renderApplication() {
    list.replaceChildren();
    total.textContent = totalCredits();
    status.textContent = state.submitted ? 'ส่งคำร้องแล้ว (จำลอง)' : 'ฉบับร่าง';
    submitButton.disabled = state.mappings.length === 0 || state.submitted;

    if (state.mappings.length === 0) {
      list.append(createElement('p', 'empty', 'ยังไม่มีรายการ กรุณาจับคู่รายวิชาก่อน'));
      return;
    }

    for (const mapping of state.mappings) {
      const source = getCourse(SOURCE_COURSES, mapping.source);
      const target = getCourse(TARGET_COURSES, mapping.target);
      const item = createElement('article', 'application-item');
      item.append(createElement('strong', '', `${source?.name ?? mapping.source} → ${target?.name ?? mapping.target}`));
      item.append(createElement(
        'p',
        'application-detail',
        `${mapping.source} → ${mapping.target} • ${target?.credits ?? 0} หน่วยกิต • ${CATEGORY_LABELS[target?.category] ?? '-'}`,
      ));
      list.append(item);
    }
  }

  submitButton.addEventListener('click', () => {
    if (state.mappings.length === 0 || state.submitted) return;
    state.submitted = true;
    saveState();
    renderApplication();
    showToast('ส่งคำร้องตัวอย่างเรียบร้อย');
  });

  renderApplication();
}

// Each HTML page declares its own page ID; no HTML is injected to build a page.
document.addEventListener('DOMContentLoaded', () => {
  initializeNavigation();

  const page = document.body.dataset.page;
  if (page === '0') initializeHome();
  if (page === '1') initializeMapping();
  if (page === '2') initializeApplications();
});
