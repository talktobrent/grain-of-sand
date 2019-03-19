
//initialize session search history array, default cookie and user key
let history = []
signedIn = false

function signOut () {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    alert('You have been successfully signed out');
    $('.g-signin2').css('display', 'inline-block');
    $('#pic').css('display', 'none')
    $('#sign-out').css('display', 'none')
    delete key
    signedIn = false
    history = []
    $('article').remove()
    console.log(group)
    group.removeAll();
  });
}

function onSignIn (googleUser) {
  var profile = googleUser.getBasicProfile();
  const url = 'http://0.0.0.0:5000/api/verify';
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
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
        signedIn = true
        $('.g-signin2').css('display', 'none');
        $('#pic').css('display', 'inline-block')
        $('#sign-out').css('display', 'inline-block')
        $('#pic').attr('src', profile.getImageUrl());
        key = profile.getId().toString() 
        let old = localStorage.getItem(key)
        console.log(old)
        if (old && JSON.parse(old).length) {
          old = JSON.parse(old);
          old = old.concat(history);
          old = Array.from(new Set(old));
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























