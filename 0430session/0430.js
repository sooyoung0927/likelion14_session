document.addEventListener('DOMContentLoaded', function () {
  const input = document.querySelector('#todo');
  const addButton = document.querySelector('#add-button');
  const todoList = document.querySelector('#todo-list');
  const alert = document.querySelector('span');

  //버튼 눌렀을 때
  const addTodo = function () {
    if (input.value !== '') {
      const item = document.createElement('div');
      // 체크박스
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      // 입력
      const text = document.createElement('span');
      // 제거버튼
      const deleteButton = document.createElement('button');
      deleteButton.textContent = '제거하기';

      text.textContent = input.value;
      input.value = '';

      item.appendChild(checkbox);
      item.appendChild(text);
      item.appendChild(deleteButton);
      todoList.appendChild(item);

      // 체크박스
      checkbox.addEventListener('change', function (event) {
        if (event.currentTarget.checked) {
          text.style.textDecoration = 'line-through';
        } else {
          text.style.textDecoration = 'none';
        }
      });

      // 제거버튼
      deleteButton.addEventListener('click', function (event) {
        todoList.removeChild(event.currentTarget.parentNode);
      });
      input.value = '';
      alert.textContent = '';
    } else alert.textContent = '할 일을 입력하세요!';
  };

  addButton.addEventListener('click', addTodo);
});
