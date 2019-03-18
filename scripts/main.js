
$(document).ready(function () {
  console.log(history)
  $('input').on('keyup', function (e) {
    if (e.keyCode === 13) {
      $('#search').click();
    }
  });
  $('#search').click(function () {
    console.log($('input').val());
    let string = $('input').val().trim();
    $('input').val('');
    if (string) {
      $.getJSON('http://0.0.0.0:5000/api/' + string, function (data) {
        console.log(data);
        history.push(data);
        if (signedIn) {
          localStorage.setItem(key, JSON.stringify(history));
        }
        let coords = plot(data);
        map.setCenter(coords);
        map.setZoom(12);
      });
    }
  });
});
