import { basicSort, nameSort, numberSort } from './utils/sort.js';
export class StudentRepository {
  constructor() {
    this.student = [];
  }
  addStudent(obj) {
    const is = this.student.some((is) => is.id === obj.id);
    if (!is) {
      const copy = [...this.student];
      copy.push(obj);
      const studentRank = basicSort(copy, 'all');

      studentRank.forEach((element, idx) => {
        return element.addRank(idx + 1);
      });
      // const rank = studentRank.map((item, idx) => {
      //   return studentRank[idx].addRank(idx + 1);
      this.student = studentRank;
      return true;
    } else {
      alert('학번 중복');
      return false;
    }
  }
  numberSearch(number) {
    const numbers = this.student.filter((numbers) => numbers.id === number);
    if (numbers.length <= 1) {
      return numbers;
    } else {
      alert('없는 학번입니다.');
      return this.student;
    }
  }
  nameSearch(name) {
    const names = this.student.filter((names) => names.name === name);
    if (names.length <= 1) {
      return names;
    } else {
      alert('없는 이름입니다.');
      return this.student;
    }
  }
  nameSort() {
    return nameSort(this.student);
  }
  numberSort() {
    return numberSort(this.student, 'id');
  }
  deleteStudent(id) {
    const deleteStudent = this.student.filter((item) => item.id !== id);
    return (this.student = deleteStudent);
  }
}
