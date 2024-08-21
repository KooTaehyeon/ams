export class Student {
  constructor(id, name, kor, eng, math) {
    this.id = id;
    this.name = name;
    this.kor = kor;
    this.eng = eng;
    this.math = math;
    this.all = Number(kor) + Number(eng) + Number(math);
    this.avg = parseInt((Number(kor) + Number(eng) + Number(math)) / 3);
    this.rank = '';
  }
  addRank(num) {
    this.rank = num;
  }
  // toString() {
  //   alert(
  //     `번호:${this.id}이름:${this.name}국어:${this.kor}영어:${this.eng}수학:${this.math}평균:${this.avg}총점:${this.all}`
  //   );
  // }
}
