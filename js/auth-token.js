
// AuthToken 받아오는 js 함수 구현
function getAuthToken (username, password){
  axios({
    url : "http://localhost:8000/api/members/auth-token/",
    method: 'post',
    data:{
      username:username,
      password : password,
    }
  }).then(function(response) {
    // 토큰 만료일 7일로 설정
    var token = response.data.token;
    setCookie('token',token,7);

    var user = response.data.user;
    // 유저정보를 표시할 요소에 텍스트를 채움
    $('#loginCheck').text(user.username + "님으로 로그인 중입니다.");
    // 이후 해당 요소의 'none' 클래스 속성을 삭제
    $('#loginCheck').removeClass('none');
    // form 에 'none' 클래스 속성 추가
    $('form#login').addClass('none');

  }).catch(function(error){
    console.log(error);
    console.log(error.response);
  });
}

$('form#login').submit(function (event){
  // form내부의 input 요소들의 값 가져오기
  var username = $('#username').val();
  var password = $('#password').val();

  // Token 을 가져오는 함수 실행
  getAuthToken(username,password)

  // form 내부의 input요소를 비워줌
  $('#username').val('');
  $('#password').val('');

  // form의 기본이벤트(post요청)를 실행시키지 않음
  event.preventDefault();
})
