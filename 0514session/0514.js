// 회원가입 함수
function signup() {
  const id = document.getElementById('id').value;
  const pw = document.getElementById('password').value;

  // 로컬스토리지에 저장 (id 기준)
  localStorage.setItem(id, pw);
  alert('회원가입 완료');
}
document.getElementById('btn_signup').addEventListener('click', signup);

// 로그인 함수
function login() {
  const id = document.getElementById('loginid').value;
  const pw = document.getElementById('loginpassword').value;

  const userData = localStorage.getItem(id); //저장된 id키의 정보 가져옴,pw반환

  if (!userData) {
    alert('존재하지 않는 아이디입니다.');
    return;
  }

  if (userData === pw) {
    const logindiv = document.getElementById('login');
    const signupdiv = document.getElementById('signup');
    logindiv.remove();
    signupdiv.remove();

    const signuph1 = document.getElementById('signuph1');
    const loginh1 = document.getElementById('loginh1');
    signuph1.remove();
    loginh1.remove();
    //기존 것들 안 보이게

    const welcomediv = document.createElement('div');
    const welcomeh2 = document.createElement('h2');

    welcomeh2.textContent = `${id}님 환영합니다!`;

    welcomediv.appendChild(welcomeh2);
    document.body.appendChild(welcomediv);
  } else {
    alert('비밀번호가 틀렸습니다.');
  }
}
document.getElementById('btn_login').addEventListener('click', login);
