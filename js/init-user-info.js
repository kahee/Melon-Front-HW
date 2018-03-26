
// 1.클라이언트에 'token'이라는 Cookie가 있는지 확인
// 2. 만약 있다면 해당 값을 가져온 후,
// 3. getUserInfo()를 실행
// ->  UserDetail에 Get요청, pk 없음
//  url api/members/info/
// request.user 를 기준으로 serialize한 User정보를 리턴
// 4. 유저정보를 가져온 후 , getAuthToken .then()아래 유저정보 표시 로직을 실행
function initUserInfo(){
var token = getCookie('token')
console.log(token)
if (token){
  axios({
    url: "http://localhost:8000/api/members/info/",
    method:"get",
    headers:{
      Authorization : 'Token' + ' ' + token
    }
  }).then(function(response){
    setUserInfo(response.data);
  }).catch(function(error){
    console.log(error.response);
  });
}
}


function setUserInfo (user){
// 유저정보를 표시할 요소에 텍스트를 채움
$('#loginCheck').text(user.username + "님으로 로그인 중입니다.");
// 이후 해당 요소의 'none' 클래스 속성을 삭제
$('#loginCheck').removeClass('none');
// form 에 'none' 클래스 속성 추가
$('form#login').addClass('none');
}
