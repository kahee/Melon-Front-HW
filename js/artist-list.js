// 초기화시 실행할 내용물
var pageNum =1;
getArtists(pageNum);


$('#btnMoreArtists').click(function (){
  clickMoreArtists();
});

// 더 보기 버튼을 눌렀을 때 동작
function clickMoreArtists() {
  pageNum += 1;
  getArtists(pageNum);
}


function getArtists(pageNum){
  axios.get('http://localhost:8000/api/artist/',{
    params: {
      page: pageNum,
    }
  })
  .then(function (response){
    // ul.artist-list
    var artistListElement = $('.artist-list')
    // 응답의 artists 정보 목록
    var artists = response.data.results;
    // artists 정보 목록을 순회
    for (var i=0;i<artists.length;i++) {
      // 현재 artist 정보
      var curArtist = artists[i]
      // 현재 aritst 정보를 담은 li.artist-item 요소를 복사
      var curArtistItemElement = $('#artist-item-template').clone();
      // 복사한 아티엠에서 .artist-name에 해당하는 속성을 text를 curArtist의 name값으로 설정
      curArtistItemElement.find('.artist-name').text(curArtist.name);
      curArtistItemElement.find('.artist-img-profile').attr('src',curArtist.img_profile)
      // ul.aritst-list 에 복사한 li.aritst-item요소를 가장 뒤에 삽입
      artistListElement.append(curArtistItemElement);
    }
    // response.data.next
    // #btnMoreArtists의 display 속성을 none으로 지정
    if(response.data.next == null ){
      $('#btnMoreArtists').css('display','none');
    }

  })
  .catch(function (error){
    console.log(error)
  });
}
