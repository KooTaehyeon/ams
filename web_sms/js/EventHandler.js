import { StudentRepository } from './StudentRepository.js';
import { Student } from './Student.js';
import { subjects } from './utils/validator.js';
// 학생 관리 클래스
const repositort = new StudentRepository();
// 초기 state
let state = repositort.student;
const localStorages = localStorage.getItem('repositort') ?? false;

export const EventHandler = () => {
  const forms = document.querySelector('form');
  forms.addEventListener('submit', submitEvent);
  const search = document.querySelector('.text-start button');
  search.addEventListener('click', searchStudent);
  const select = document.querySelector('#sortSelect');
  select.addEventListener('change', changeStudent);
  const delBtn = document.querySelector('.btn-warning');
  delBtn.addEventListener('click', deleteStudent);
};
// 등록
const submitEvent = (e) => {
  e.preventDefault();
  const id = document.querySelector('input[name=sno]');
  const name = document.querySelector('input[name=sname]');
  const kor = document.querySelector('input[name=kor]');
  const eng = document.querySelector('input[name=eng]');
  const math = document.querySelector('input[name=math]');
  // 검증
  const idExp = subjects(id.value.trim(), '학번');
  const nameExp = subjects(name.value.trim(), '이름');
  const engExp = subjects(eng.value.trim(), '영어');
  const korExp = subjects(kor.value.trim(), '국어');
  const mathExp = subjects(math.value.trim(), '수학');

  if (typeof idExp === 'string') return alert(subjects(id.value, '학번'));
  if (typeof nameExp === 'string') return alert(subjects(name.value, '이름'));
  if (typeof engExp === 'string') return alert(subjects(eng.value, '영어'));
  if (typeof korExp === 'string') return alert(subjects(kor.value, '국어'));
  if (typeof mathExp === 'string') return alert(subjects(math.value, '수학'));
  const studentData = new Student(
    id.value,
    name.value,
    eng.value,
    kor.value,
    math.value
  );
  repositort.addStudent(studentData);
  // setState로 state 변경과 렌더링 요청
  localStorage.setItem('repositort', JSON.stringify(repositort));
  setRender(repositort);
};

// 검색
const searchStudent = () => {
  const input = document.querySelector('input[name=searchInp]').value;
  const select = document.querySelector('.form-select').value;
  let complete = null;
  if (input.trim() === '') return setRender(repositort);
  if (select === 'ssn') {
    complete = repositort.numberSearch(input);
  } else if (select === 'name') {
    complete = repositort.nameSearch(input);
  }
  setRender(complete, true);
};

// 정렬
const changeStudent = () => {
  const change = document.querySelector('#sortSelect').value;
  let complete = null;
  if (change === 'name') {
    complete = repositort.nameSort();
  } else if (change === 'ssn') {
    complete = repositort.numberSort();
  } else {
    return setRender(repositort);
  }
  setRender(complete, true);
};
// 삭제
const deleteStudent = () => {
  const id = document.querySelector('input[name=sno]');
  // 검증
  const idExp = subjects(id.value.trim(), '학번');
  if (typeof idExp === 'string') return alert(subjects(id.value, '학번'));
  repositort.deleteStudent(id.value);
  setRender(repositort);
};

// 랜더링
const tbody = document.querySelector('tbody');
const render = () => {
  tbody.innerHTML = `
   ${state
     .map((item) => {
       return `<tr>
              <td>${item.id}</td>
              <td>${item.name}</td>
              <td>${item.kor}</td>
              <td>${item.eng}</td>
              <td>${item.math}</td>
              <td>${item.all}</td>
              <td>${item.avg}</td>
              <td>${item.rank}</td>
            </tr>
    `;
     })
     .join('')}
       `;
};
// state 변경 및 렌더링
const setRender = (newRender, copy) => {
  if (copy) {
    state = newRender;
  } else {
    state = newRender.student;
  }
  render();
};
if (localStorages) {
  const data = JSON.parse(localStorages);
  for (const property of data.student) {
    const localStudent = new Student(
      property.id,
      property.name,
      property.eng,
      property.kor,
      property.math,
      property.rank
    );
    repositort.addStudent(localStudent);
  }
  setRender(repositort);
}
