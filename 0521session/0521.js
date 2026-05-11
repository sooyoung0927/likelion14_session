// API에서 사용자 데이터를 가져오는 함수
async function fetchData() {
  try {

    // api 호출
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const users = await response.json(); 
    // response.json() : 서버에서 받아온 텍스트를 JS 객체로 변환

    // 사용자 정보를 화면에 출력
    const userListDiv = document.getElementById('user-list');
    userListDiv.innerHTML = ''; // 기존 내용을 비우기
    
    users.forEach((user) => {
      const userDiv = document.createElement('div');
      userDiv.classList.add('user');

      userDiv.innerHTML = `
      <h2>${user.userId}번 님의 ${user.id}번째 게시글</h2>      
      <p>제목 : ${user.title}</p>
      <p>내용 : ${user.body}</p>
     `;

      userListDiv.appendChild(userDiv);
    });
  } catch (error) {
    console.error('데이터 가져오기 오류:', error);
  }
}

// 페이지 로드 후 데이터 가져오기 실행
fetchData();
