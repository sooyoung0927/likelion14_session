// 회원가입
function signup() {
  const id = document.getElementById('id').value;
  const pw = document.getElementById('password').value;

  localStorage.setItem(id, pw);
  alert('회원가입 완료');
}
document.getElementById('btn_signup').addEventListener('click', signup);

// 로그인
function login() {
  const id = document.getElementById('loginid').value;
  const pw = document.getElementById('loginpassword').value;
  const userData = localStorage.getItem(id);

  if (!userData) {
    alert('존재하지 않는 아이디입니다.');
    return;
  }

  if (userData === pw) {
    showTodoPage(id, userData);
  } else {
    alert('비밀번호가 틀렸습니다.');
  }
}
document.getElementById('btn_login').addEventListener('click', login);

// ==================================================

// 로그인 후 화면
function showTodoPage(id, userData) {
  const logindiv = document.getElementById('login');
  const signupdiv = document.getElementById('signup');
  const signuph1 = document.getElementById('signuph1');
  const loginh1 = document.getElementById('loginh1');
  logindiv.remove();
  signupdiv.remove();
  signuph1.remove();
  loginh1.remove();
  // 기존 요소들 제거

  const welcomediv = document.createElement('div');

  const welcomeh2 = document.createElement('h1');
  welcomeh2.textContent = `${id}님 환영합니다!`;

  const list = document.createElement('h2');
  list.textContent = `${id}님의 todo List!`;

  const alertMessage = document.createElement('span');
  const input = document.createElement('input');
  input.setAttribute('id', 'todo');

  const addButton = document.createElement('button');
  addButton.setAttribute('id', 'add-button');
  addButton.textContent = '+';

  const todoList = document.createElement('div');
  todoList.setAttribute('id', 'todo-list');

  welcomediv.appendChild(welcomeh2);
  welcomediv.appendChild(list);
  welcomediv.appendChild(alertMessage);
  welcomediv.appendChild(input);
  welcomediv.appendChild(addButton);
  welcomediv.appendChild(todoList);

  document.body.appendChild(welcomediv);

  // ==================================================

  // todo 넣을 배열 생성
  let todolist = [];

  // todo 목록
  function todo() {
    // 로컬스토리지에 저장된 todo가 없으면 그냥 함수 종료
    if (localStorage.getItem('Todos') === null) return;
    // 현재 로그인한 유저의 todo만 걸러낸 배열
    const filterLists = JSON.parse(localStorage.getItem('Todos')).filter(
      (list) => userData === list.id,
    );

    // 입력창 초기화
    todoList.innerHTML = '';

    filterLists.forEach((filterList) => {
      // todo 요소 생성
      const item = document.createElement('div');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      const text = document.createElement('span');
      const deleteButton = document.createElement('button');
      deleteButton.textContent = '제거하기';
      text.textContent = filterList.todo;

      item.appendChild(checkbox);
      item.appendChild(text);
      item.appendChild(deleteButton);
      todoList.appendChild(item);

      // 체크박스 채크
      checkbox.addEventListener('change', function (event) {
        text.style.textDecoration = event.currentTarget.checked
          ? 'line-through'
          : 'none';
      });

      // 삭제
      deleteButton.addEventListener('click', function (event) {
        // 로컬스토리지에서 삭제
        const todos = JSON.parse(localStorage.getItem('Todos'));
        const newTodos = todos.filter((t) => t.todo !== filterList.todo);
        localStorage.setItem('Todos', JSON.stringify(newTodos));
        // todo에서 삭제
        todoList.removeChild(event.currentTarget.parentNode);
      });
    });
  }

  todo();

  // ==================================================

  // + 버튼 눌렀을 때 실행되는 함수
  addButton.addEventListener('click', function () {
    if (input.value === '') {
      alertMessage.textContent = '할 일을 입력하세요!';
      return;
    }

    // todo에 작성한 걸(로컬스토리지에 저장된 거) 가져올 때
    // 문자열 -> 배열
    if (localStorage.getItem('Todos') !== null) {
      todolist = JSON.parse(localStorage.getItem('Todos'));
    }

    // .push : 배열에 새로운 항목을 추가
    // 배열 -> 문자열 (로컬스토리지는 문자열만 다룸)
    todolist.push({ id: userData, todo: input.value });
    localStorage.setItem('Todos', JSON.stringify(todolist));

    todo();

    // 입력창 비우기
    input.value = '';
    alertMessage.textContent = '';
  });
}


