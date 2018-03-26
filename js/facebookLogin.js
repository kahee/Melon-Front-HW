
  function facebookLogin(){
    // 이 브라우저가 페이스북 로그인이 되어있는지 검사
    FB.getLoginStatus(function (response) {
      // 만약 로그인 되어있지 않다면
      if (response.status != 'connected') {
        // 로그인 대화상자를 사용해 로그인 유도
        FB.login(function (response) {
          // 로그인이 완료되면 accessToken을 가져와서
          var accessToken = response.authResponse.accessToken;
        });
      } else {
        accessToken = response.authResponse.accessToken;
      }
      // DRF에 Facebook access_token을 사용한 AuthToken요청
      axios({
        url:'http://localhost:8000/api/members/facebook-auth-token/',
        method:'post',
        data : {
          access_token : accessToken
        }
      }).then(function (response){
        // 요청에 성공하면 setCookie 및 setUserInfo 실행
        console.log(response)
        var token = response.data.token;
        var user = response.data.user;
        setCookie('token',token,7);
        setUserInfo(user);
      }).catch(function (error){
        console.log(error);
        console.log(error.response);
      });
    });
  }
