// 계좌
const AmsError = require('./amsError');

class Account {
  constructor(number, pw, onwer, balance) {
    this.number = number;
    this.pw = pw;
    this.onwer = onwer;
    this.balance = balance;
  }
  set onwer(onwer) {
    this._onwer = onwer;
  }
  set number(number) {
    this._number = number;
  }
  set balance(balance) {
    this._balance = balance;
  }
  set pw(pw) {
    this._pw = pw;
  }
  get pw() {
    return this._pw;
  }
  get onwer() {
    return this._onwer;
  }
  get number() {
    return this._number;
  }
  get balance() {
    return this._balance;
  }
  Add(money) {
    // throw new AmsError(200, '계좌 비밀번호가 아닙니다.');
    return (this.balance += money);
  }
  out(money) {
    const result = this.balance - money;
    // throw new AmsError(200, '계좌 비밀번호가 아닙니다.');
    if (result <= 0) throw new AmsError(201, '통장 잔고가 부족합니다.');
    return (this.balance = result);
  }
  getBalance() {
    // throw new AmsError(200, '계좌 비밀번호가 아닙니다.');
    return this.balance;
  }
  toString() {
    // throw new AmsError(200, '계좌 비밀번호가 아닙니다.');
    return `${this.onwer}님 ${this.number}계좌에 ${this.balance}남아있습니다. `;
  }
}
const test = new Account('110-428-308100', 12345, '태현', 50000);
try {
  test.Add(10000, 12342);
} catch (err) {
  console.log(err.toString(), 'dd');
}

// 마이너스 계좌
// 대출금액 프로퍼티
// 셋/겟
// toString()
//getBalance()
class MinusAccount extends Account {
  constructor(number, pw, onwer, balance, loan) {
    super(number, pw, onwer, balance);
    this.loan = loan;
  }
  set loan(loan) {
    this._loan = loan;
  }
  get loan() {
    return this._loan;
  }
  getBalance(pwassword) {
    if (pwassword !== this.pw) return;
    const balance = super.getBalance(pwassword);
    return `${balance - this.loan}`;
  }
  toString(pwassword) {
    if (pwassword !== this.pw) return;
    const allToString = super.toString(pwassword);
    return `${allToString},대출금은  ${this.loan} 입니다.`;
  }
}

const test2 = new MinusAccount('110-428-308100', 12345, '태현', 50000, 10000);

module.exports = {
  Account,
  MinusAccount,
};
