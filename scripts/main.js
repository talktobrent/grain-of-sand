
$(document).ready(function () {
  console.log(history)
  $('input').on('keyup', function (e) {
    if (e.keyCode === 13) {
      $('#search').click();
    }
  });
  $('#search').click(function () {
    console.log(history)
    console.log($('input').val());
    let string = $('input').val().trim();
    $('input').val('');
    past = null;
    if (string) {
      for (let x of history) {
        if (x.query === string) {
          past = x;
          break;
        }
      }
      if (past && past.Words === null) {
        return;
      }
      if (past) {
        $(`#${string.split(' ').join('_')}`)
          .addClass('current')
          .prependTo('section.history')
          $('article').not(`#${string.split(' ').join('_')}`).removeClass('current')
          let coords = { lat: $(`#${string.split(' ').join('_')}`).data().Latitude, lng: $(`#${string.split(' ').join('_')}`).data().Longitude }
          map.setCenter(coords);
          map.setZoom(12);
      } else {
        $.getJSON('http://0.0.0.0:5000/api/' + string, function (data) {
          console.log(data);
          if (data !== 'bad') {
            Object.assign(data, {"query": string})
            history.push(data);
            console.log(history)
            if (signedIn) {
              localStorage.setItem(key, JSON.stringify(history));
            }
            let coords = plot(data);
            map.setCenter(coords);
            map.setZoom(12);
          } else {
            alert("Not Found");
            history.push({"query": string, Words: null});
          }
        })
      }
    }
  });
});
