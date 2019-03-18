// Initialize the platform object:
var platform = new H.service.Platform({
  'app_id': '7DZj4FZSRWbx6FTL8JER',
  'app_code': '9SXulP-IrrM3ZJnMBwBHLQ',
  useHTTPS: true
});
var pixelRatio = window.devicePixelRatio || 1;
var defaultLayers = platform.createDefaultLayers({
  tileSize: pixelRatio === 1 ? 256 : 512,
  ppi: pixelRatio === 1 ? undefined : 320
});

// Step 2: initialize a map - this map is centered over Europe
var map = new H.Map(document.getElementById('map'),
  defaultLayers.normal.map, {
    center: { lat: 50, lng: 5 },
    zoom: 1,
    pixelRatio: pixelRatio
  });

// Step 3: make the map interactive
// MapEvents enables the event system
// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// Create the default UI components
var ui = H.ui.UI.createDefault(map, defaultLayers);


// plot markers based on search history
function plot (data) {
  let coords = { lat: data.Latitude, lng: data.Longitude };
  let marker = new H.map.Marker(coords);
  map.addObject(marker);
  if (data.WQ) {
    var text = data.Address;
    var button = '///';
  } else {
    var text = data.Words;
    var button = '@';
  }
  $('section.history').prepend(
    $('<article/>')
      .data(data)
      .addClass('current')
      .append([
        '<p>' + text + '</p>',
        $('<button/>')
          .text(button)
          .click(function () {
            $(this).parent().find('p').text(function () {
              if ($(this).parent().data().WQ) {
                $(this).siblings('button').text('@');
                $(this).parent().data().WQ = false;
                return $(this).parent().data().Words;
              } else {
                $(this).siblings('button').text('///');
                $(this).parent().data().WQ = true;
                return $(this).parent().data().Address;
              }
            });
          })
      ])
  );
  $('article').click(function () {
    $(this).addClass('current')
    let coords = { lat: $(this).data().Latitude, lng: $(this).data().Longitude }
    map.setCenter(coords);
    map.setZoom(12);
    $('article').not($(this)).removeClass('current')
  })
  $('article').slice(1).removeClass('current')
  return coords;
}