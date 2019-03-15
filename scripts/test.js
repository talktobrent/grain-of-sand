$(document).ready(function () {
  $('input').on('keyup', function (e) {
    if (e.keyCode === 13) {
      $('button').click();
    }
  });
  $('button').click(function () {
    console.log($('input').val());
    let string = $('input').val().trim();
    $.getJSON('http://0.0.0.0:5000/api/' + string, function (data) {
      console.log(data);
      let coords = { lat: data.Latitude, lng: data.Longitude };
      console.log(coords);
      let marker = new H.map.Marker(coords);
      map.addObject(marker);
      map.setCenter(coords);
      map.setZoom(14);
    });
  });
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
});
