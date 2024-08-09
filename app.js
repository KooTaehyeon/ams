const { Account, MinusAccount } = require('./ams');
const AccountRepositories = require('./accountRepositories');

const { createInterface } = require('readline');
const fs = require('fs');
const accountRepository = new AccountRepositories();
// 키보드 입력을 위한 인터페이스 생성
const consoleInterface = createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 키보드 입력 받기
const readLine = function (message) {
  return new Promise((resolve) => {
    consoleInterface.question(message, (userInput) => {
      resolve(userInput);
    });
  });
};
const JSON_FILE_PATH = './ams.json';
const saveAccounts = (accounts) => {
  // 저장
  try {
    fs.writeFileSync(JSON_FILE_PATH, JSON.stringify(accounts), 'utf-8');
  } catch (error) {
    console.error('저장실패', error);
  }
};
const initJson = () => {
  // 초기 파일
  if (!fs.existsSync(JSON_FILE_PATH)) {
    fs.writeFileSync(JSON_FILE_PATH, JSON.stringify([]), 'utf-8');
  }
};

const loadAccounts = (JSON_FILE_PATH) => {
  // json 파일 넣기
  try {
    const data = fs.readFileSync(JSON_FILE_PATH, 'utf-8');
    const accountsData = JSON.parse(data);
    accountsData.map((accountData) => {
      let account;
      if (accountData.loan !== undefined) {
        account = new MinusAccount(
          accountData.number,
          accountData.pw,
          accountData.onwer,
          accountData.balance,
          accountData.loan
        );
      } else {
        account = new Account(
          accountData.number,
          accountData.pw,
          accountData.onwer,
          accountData.balance
        );
      }
      accountRepository.addAccount(account);
    });
  } catch (err) {
    console.log('파일로드 실패', err);
  }
};
// fs.writeFileSync(JSON_FILE_PATH, JSON.stringify([]), 'utf-8');

initJson(JSON_FILE_PATH);
loadAccounts(JSON_FILE_PATH);
// 메뉴 출력
const printMenu = function () {
  console.log(
    '--------------------------------------------------------------------'
  );
  console.log(
    '1.계좌등록 | 2.계좌목록 | 3.예금 | 4.출금 | 5.검색 | 6.삭제 | 7.종료'
  );
  console.log(
    '--------------------------------------------------------------------'
  );
};
// const account0 = new Account('110-428-308200', 12345, '구태현', 1200000);
// const account = new Account('110-428-308100', 12345, '구태현', 1900000);
// const account2 = new Account('110-428-308101', 12345, '구태현1', 100000);
// const account3 = new Account('110-428-308102', 12345, '구태현2', 100000);
const upaccount = new Account('110-428-308200', 12345, '구태현임', 1400000);
const minusAccount = new MinusAccount(
  '110-428-308100',
  12345,
  '구태현s',
  100000,
  2000
);
// accountRepository.addAccount(account0);
// accountRepository.addAccount(account2);
// accountRepository.addAccount(account);
// accountRepository.addAccount(account3);
accountRepository.addAccount(minusAccount);
accountRepository.addAccount(upaccount);

const app = async function () {
  console.log(
    `====================================================================`
  );
  console.log(
    `--------------     KOSTA 은행 계좌 관리 프로그램     ---------------`
  );
  console.log(
    `====================================================================`
  );

  let running = true;
  while (running) {
    printMenu();
    let index = null;
    let menuNum = parseInt(await readLine('> '));
    switch (menuNum) {
      case 1:
        // createAccount();
        console.log('■ 등록 계좌 종류 선택');
        const header =
          '--------------------------------\n' +
          '1. 입출금계좌 | 2. 마이너스 계좌\n' +
          '--------------------------------';
        console.log(header);
        let account = null;
        let no = parseInt(await readLine('> '));
        if (no <= 3) {
          console.log('1,2 로 골라주세요');
          break;
        }
        let accountNum = await readLine('- 계좌번호 : ');
        let accountOwner = await readLine('- 예금주명 : ');
        let password = parseInt(await readLine('- 비밀번호 : '));
        let initMoney = parseInt(await readLine('- 입금액 : '));
        let rentMoney = 0;

        if (no === 1) {
          account = new Account(accountNum, password, accountOwner, initMoney);
          accountRepository.addAccount(account);
        } else {
          rentMoney = parseInt(await readLine('- 대출금액 : '));
          account = new MinusAccount(
            accountNum,
            password,
            accountOwner,
            initMoney,
            rentMoney
          );
          accountRepository.addAccount(account);
        }
        // 신규 계좌 등록
        console.log('신규 계좌 등록 결과 메시지 출력');
        saveAccounts(accountRepository.findByAll());
        break;
      case 2: // 전체계좌 목록 출력
        console.log('-------------------------------------------------------');
        console.log('계좌구분 \t 계좌번호 \t 예금주 \t 잔액');
        console.log('-------------------------------------------------------');
        console.log(accountRepository.findByAll());
        break;
      case 3: // 입금
        // 계좌번호와 입금액 입력 받아 입금 처리
        let inputNo = await readLine('- 계좌번호 : ');
        let inputMoney = parseInt(await readLine('- 입금액 : '));
        // console.log(inputNo, inputMoney);
        console.log('입금에 따른 메시지 출력');
        index = accountRepository.findByNumber(inputNo.toString());
        accountRepository._accounts[index].Add(inputMoney);
        saveAccounts(accountRepository.findByAll());
        break;
      case 4: // 출금
        // 계좌번호와 출금액 입력 받아 출금 처리
        let outputNo = await readLine('- 계좌번호 : ');
        let outputMoney = parseInt(await readLine('- 출금액 : '));
        // console.log(outputNo, outputMoney);
        console.log('출금에 따른 메시지 출력');
        index = accountRepository.findByNumber(outputNo.toString());
        accountRepository._accounts[index].out(outputMoney);
        saveAccounts(accountRepository._accounts[index]);
        break;
      case 5: // 계좌번호로 검색
        // 계좌 번호 입력 받아 계좌 정보 출력
        let searchNum = await readLine('- 계좌번호 : ');
        // console.log(searchNum);
        index = accountRepository.findByNumber(searchNum.toString());
        console.log(
          '검색 결과 출력 :',
          accountRepository && accountRepository._accounts[index]
        );
        saveAccounts(accountRepository && accountRepository._accounts[index]);
        break;
      case 6:
        console.log('계좌 삭제');
        // 계좌 번호 입력 받아 계좌 해당 계좌 삭제
        let deleteNum = await readLine('- 계좌번호 : ');
        console.log(deleteNum);
        console.log('삭제 결과 출력');
        accountRepository.DeleteAccount(deleteNum);
        console.log(accountRepository.findByAll());
        saveAccounts(accountRepository.findByAll());
        break;
      case 7:
        console.log('>>> 프로그램을 종료합니다.');
        consoleInterface.close();
        saveAccounts(accountRepository.findByAll());
        running = false;
        break;
      default:
        console.log('잘못 선택하셨습니다.');
    }
  }
};

app();
