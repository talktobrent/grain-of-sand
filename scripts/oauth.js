
//initialize search history array
let history = []
key = 'anon'

function signOut () {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    alert('You have been successfully signed out');
    $('.g-signin2').css('display', 'block');
    key = 'anon'
    history = []
    $('article').remove()
  });
}

function onSignIn (googleUser) {
  var profile = googleUser.getBasicProfile();
  const url = 'http://0.0.0.0:5000/api/verify';
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  $('.g-signin2').css('display', 'none');
  $('.data').css('display', 'block');
  $('#pic').attr('src', profile.getImageUrl());
  $('#email').text(profile.getEmail());
  var id_token = googleUser.getAuthResponse().id_token;
  console.log(id_token);
  fetch(url, {
    method: 'POST',
    mode: 'cors',
    // cache: 'no-cache',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(id_token)
  })
    .then(function (response) {
      if (response.status != 201) {
        alert('error: invalid login');
      } else {
        key = profile.getId().toString()
        let old = localStorage.getItem(key)
        if (old) {
          old = JSON.parse(old)
          old = old.concat(history)
          localStorage.setItem(key, JSON.stringify(old))
          history = old
          $('article').remove()
          for (let x of history) {
            last = plot(x)
          }
          map.setCenter(last);
          map.setZoom(12);
        } else {
          localStorage.setItem(key, JSON.stringify(history))
        }
        console.log(history)
      }
    });
}
