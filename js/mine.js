"use strict";
/* g e t d   at  a  */
let ancor = document.querySelectorAll("#btn");
for (let i = 0; i < ancor.length; i++) {
  ancor[i].addEventListener("click", function (e) {
    get_data(`${e.target.getAttribute('attr')}`);

  })

};
async function get_data(type) {
  let movie = await fetch(
    `https://api.themoviedb.org/3/movie/${type}?api_key=eba8b9a7199efdcb0ca1f96879b83c44`,
  );
  let data = await movie.json();
  data = data.results;
  check_img(data);
  display(data);

};
get_data("now_playing");




/* ga e t d   at  a  */
/* search */

const debounce = (func,time)=>{
  let timer=null;
  return function(...args){
    if(timer){
      clearTimeout(timer);
      timer= null;
    }
    timer = setTimeout(()=>{
     func.apply(this,args);
     timer=null; 
    },time);

  }
}

let searchInbut = document.querySelector("#search");
searchInbut.addEventListener("input", debounce(function (e) {
  if (e.target.value != "") {
    search(e.target.value);
  } else { get_data("now_playing") };

},1000));


async function search(type) {
  let movie = await fetch(`https://api.themoviedb.org/3/search/movie?query=${type}&api_key=4819b6a81e9aff8a06059e2bddd92b05&language=en-US&include_adult=false`);
  let data = await movie.json();
  data = data.results;
  check_img(data);
  display(data);

}







/* search */
/* function display */
function display(results) {
  let cartona = "";
  for (let i = 0; i < results.length; i++) {
    cartona += `
            <div class="col-lg-4 col-md-6 col-sm-12 animate__animated animate__zoomIn">
              <div class="contant position-relative overflow-hidden rounded-3 border">
                <img class="w-100" src="${check_img(results[i])}" alt="movie img" />
                <div class="layer d-none animate__animated position-absolute">
                  <h2 class="m-2 animate__animated animate__fadeInLeft text-center">
                   ${results[i].title ? results[i].title : results[i].name}
                  </h2>
                  <p class="text-center animate__animated animate__fadeInLeft">
                    ${results[i].overview}
                  </p>
                  <div class="text-center">
                    <p>
                      <span class="fst-normal">Release Date<span>: ${results[i]
        .release_date ? results[i].release_date : results[i].first_air_date}</span></span>
                    </p>
                  </div>
                  <div class="text-center">
                    <p>
                     ${get_Stars(results[i])}                  
                    </p>
                  </div>
                  <div class="circle  d-flex justify-content-center ">
                    <p class=" text-center p-1 h5 ">${results[
        i
      ].vote_average.toFixed(1)}</p>
                  </div>
                </div>
              </div>
            </div>
            `;
  }

  document.querySelector("#data-show").innerHTML = cartona;
};
/* function display */

/* function get_Stars */


function get_Stars(items) {
  if (items.vote_average < 1) {
    return '<i class="fa-solid fa-star text-muted fs-6"></i>';
  } else if (items.vote_average < 2) {
    let term = "";
    return (
      term + '<i class="fa-regular fa-star-half-stroke text-warning fs-6"></i>'
    );
  } else if (items.vote_average < 3) {
    return '<i class="fa-solid fa-star text-warning fs-6"></i>';
  } else if (items.vote_average < 4) {
    let term = "";
    for (let i = 0; i < 1; i++) {
      term += `<i class="fa-solid fa-star text-warning fs-6"></i>`;
    }

    return (
      term + '<i class="fa-regular fa-star-half-stroke text-warning fs-6"></i>'
    );
  } else if (items.vote_average < 5) {
    let term = "";
    for (let i = 0; i < 2; i++) {
      term += `<i class="fa-solid fa-star text-warning fs-6"></i>`;
    }
    return term;
  } else if (items.vote_average < 6) {
    let term = "";
    for (let i = 0; i < 2; i++) {
      term += `<i class="fa-solid fa-star text-warning fs-6"></i>`;
    }

    return (
      term + '<i class="fa-regular fa-star-half-stroke text-warning fs-6"></i>'
    );
  } else if (items.vote_average < 7) {
    let term = "";
    for (let i = 0; i < 3; i++) {
      term += `<i class="fa-solid fa-star text-warning fs-6"></i>`;
    }

    return term;
  } else if (items.vote_average < 8) {
    let term = "";
    for (let i = 0; i < 3; i++) {
      term += `<i class="fa-solid fa-star text-warning fs-6"></i>`;
    }
    return (
      term + '<i class="fa-regular fa-star-half-stroke text-warning fs-6"></i>'
    );
  } else if (items.vote_average < 9) {
    let term = "";
    for (let i = 0; i < 4; i++) {
      term += `<i class="fa-solid fa-star text-warning fs-6"></i>`;
    }
    return term;
  } else if (items.vote_average < 10) {
    let term = "";
    for (let i = 0; i < 4; i++) {
      term += `<i class="fa-solid fa-star text-warning fs-6"></i>`;
    }
    return (
      term + '<i class="fa-regular fa-star-half-stroke text-warning fs-6"></i>'
    );
  } else {
    let term = "";
    for (let j = 0; j < 5; j++) {
      term += `<i class="fa-solid fa-star text-warning fs-6"></i>`;
    }
    return term;
  }
};


/* function get_Stars */

/* check_img*/



function check_img(data) {

  if (data.poster_path == null && data.backdrop_path == null) {
    return './img/default-movie.jpg'
  } else if (data.poster_path == null) {
    return `${"https://image.tmdb.org/t/p/w500" + data.backdrop_path}`;
  } else if (data.hasOwnProperty('poster_path')) {
    return `${"https://image.tmdb.org/t/p/w500" + data.poster_path}`;


  }



};
/* check_img*/



/* show data after loding */
$(document).ready(function () {

  $(".loader").fadeOut(1000, function () {
    $("#loding").slideUp(1000, function () {
      $("body").css("overflow", "auto");
    });
  });

  backTob();

});
/* show data after loding */

/* function to back to top */

function backTob() {
  $(window).on("scroll", function () {
    let { top: topOfsearch } = $("#search").offset();
    let windowScroll = $(window).scrollTop();

    if (windowScroll > topOfsearch) {

      $("#backToTop").fadeIn(1000);

    } else { $("#backToTop").fadeOut(1000); }
  })


}

$("#backToTop").on("click", function () {
  $("html,body").animate({ scrollTop: 0 }, 2000)
})


/* function to back to top */


/* nav bar function */

/*go to contact us */
$("#contactUs").on("click", function () {

  let { top: contactTop } = $("#contact").offset();
  $("html,body").animate({ scrollTop: contactTop }, 2000)


})

/*go to contact us */
$("#open_close_nave").on("click", function () {

  let width_of_contact = $("#nav_ancor").innerWidth();


  if ($("nav #nav_bar").css("left") == "0px") {
    $("nav #nav_bar").animate({ left: `-${width_of_contact}` }, 1000);

    $('.icon #open_close_nave ').removeClass("fa-solid fa-xmark");
    $('.icon #open_close_nave ').addClass("fa-solid fa-align-justify");

  } else {
    $("nav #nav_bar").animate({ left: `0 ` }, 1500)
    $('.icon #open_close_nave ').removeClass("fa-solid fa-align-justify");
    $('.icon #open_close_nave ').addClass("fa-solid fa-xmark");

  }



});


/* nav bar function */


function empty() {
  userName.value = "";
  email.value = "";
  password.value = "";
  setTimeout(() => {
    signUpMessage.classList.add("visually-hidden");
  }, 3000);
}

// function exist() {
//   for (let i = 0; i < accounts.length; i++) {
//     if (
//       accounts[i].name === account.name ||
//       accounts[i].userEmail === account.userEmail
//     ) {
//       signUpFailed.classList.remove("visually-hidden");
//       return true;
//     }
//   }
// }
let userName = document.getElementById("name");
let email = document.getElementById("email");
let password = document.getElementById("password");
let repassword = document.getElementById("repassword");
let spmitbtn = document.getElementById("form-btn");
let spmitMessage = document.getElementById("success");
let spmitFailed = document.getElementById("fspmit");
let validationMass = document.getElementById("validMass");
let massValBtn = document.getElementById("closemass");
let phone = document.getElementById("phone");


function isValidName(value) {
  let regex = /^[A-Z][a-z0-9]{2,15}$/;
  if (regex.test(value)) {
    document
      .getElementById("name-validate")
      .classList.replace("d-block", "d-none");
    return true;
  } else {
    document
      .getElementById("name-validate")
      .classList.replace("d-none", "d-block");
    return false;
  }
};
userName.addEventListener("change", function (e) {
  isValidName(e.target.value)

})

function isValidEmail(value) {
  let regex = /^[A-Za-z0-9-_]+@(gmail|yahoo|hotmail)\.com$/;
  if (regex.test(value)) {
    document
      .getElementById("email-validate")
      .classList.replace("d-block", "d-none");
    return true;
  } else {
    document
      .getElementById("email-validate")
      .classList.replace("d-none", "d-block");

    return false;
  }
}
email.addEventListener("change", function (e) {
  isValidEmail(e.target.value)

})
function isValidpass(value) {
  let regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
  if (regex.test(value)) {

    document
      .getElementById("password-validate")
      .classList.replace("d-block", "d-none");
    return true;
  } else {

    document
      .getElementById("password-validate")
      .classList.replace("d-none", "d-block");
    return false;
  }
}
password.addEventListener("change", function (e) {
  isValidpass(e.target.value);

});




function isValidphone(value) {
  let regex = /^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/;
  if (regex.test(value)) {


    document
      .getElementById("phone-validate")
      .classList.replace("d-block", "d-none");
    return true;
  } else {

    document
      .getElementById("phone-validate")
      .classList.replace("d-none", "d-block");
    return false;
  }
}
phone.addEventListener("change", function (e) {
  isValidphone(e.target.value);

});