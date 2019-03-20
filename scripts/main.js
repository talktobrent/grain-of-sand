
$(document).ready(function () {
  console.log(myhistory)
  $('input').on('keyup', function (e) {
    if (e.keyCode === 13) {
      $('#search').click();
    }
  });
  $('#search').click(function () {
    console.log(myhistory)
    console.log($('input').val());
    let string = $('input').val().trim();
    $('input').val('');
    past = null;
    if (string) {
      for (let x of myhistory) {
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
          let coords = { lat: $(`#${string.split(' ').join('_')}`).data().Latitude, lng: $(`#${string.split(' ').join('_')}`).data().Longitude - 0.075 }
          map.setCenter(coords);
          map.setZoom(12);
      } else {
        $.getJSON('http://0.0.0.0:5000/api/' + string, function (data) {
          console.log(data);
          if ($.type(data) !== "string") {
            Object.assign(data, {"query": string})
            myhistory.push(data);
            console.log(myhistory)
            if (signedIn) {
              localStorage.setItem(key, JSON.stringify(myhistory));
            }
            let coords = plot(data);
            coords.lng -= 0.075
            console.log(coords)
            map.setCenter(coords);
            map.setZoom(12);
          } else {
            alert(data);
            myhistory.push({"query": string, Words: null});
          }
        })
      }
    }
  });
});

// Show hide menu
function show_hide() {
  let click = document.getElementById("drop-content");
  if (click.style.display === "none") {
    click.style.display = "block";
  } else {
    click.style.display = "none"
  }
}


const navTriggerEl = document.querySelector(".hamburger");
const navEl = document.querySelector("nav");
const contentEl = document.querySelector(".content");
const hamburgerBarsEl = document.getElementsByTagName("span");

function toggleNav() {
  navTriggerEl.addEventListener("click", function () {
    navEl.classList.toggle("open");
    contentEl.classList.toggle("shift");
    animateHamburgers();
  });
}

function animateHamburgers() {
  for (let item of hamburgerBarsEl) {
    item.classList.toggle("change");
  }
}

toggleNav();
