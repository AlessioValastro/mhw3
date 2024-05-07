const questions = document.querySelectorAll(".faq__row--question");

questions.forEach((question) => {
  question.addEventListener("click", (event) => {
    const row = event.currentTarget.parentNode;
    const answer = row.querySelector(".faq__row--answer");

    answer.classList.toggle("faq__answer--open");
  });
});

const getStarted = document.querySelector("#getStarted");
const loginInterface = document.querySelector(".get-started__content");
const loginContainer = document.querySelector(".get-started");

loginInterface.addEventListener("click", (event) => {
  event.stopPropagation();
});

getStarted.addEventListener("click", () => {
  loginContainer.classList.add("display-flex");
  document.body.classList.add("overflow-hidden");
  updatePosition();

  loginContainer.addEventListener("click", () => {
    loginContainer.classList.remove("display-flex");
    document.body.classList.remove("overflow-hidden");
    window.removeEventListener("scroll", updatePosition);
  });

  loginContainer.removeEventListener("click");
});

function updatePosition() {
  const scrollTopPos = window.scrollY;
  const distanzaDaTop = scrollTopPos + "px";
  loginContainer.style.top = distanzaDaTop;
}


/*
function onTokenJson(json){
  console.log(json)
}

function onTokenResponse(response){
  return response.json();
}

fetch("https://api.twitter.com/oauth2/token", {
  method: "POST", 
  body: 'grant_type=client_credentials',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
  }
})
.then(onTokenResponse)
.then(onTokenJson);

function onJson(json) {
  console.log(json);
}
function onResponse(response) {
  return response.json();
}
fetch("https://api.twitter.com/2/tweets/1744385975197827477", {
  method: "GET",
  headers: {
    'Authorization': 'Bearer '+ bearerToken, 
  }
}).then(onResponse).then(onJson);
*/

//non riesco a fare funzionare twitter

const client_id = "3ba9cf04555740078284e09716140ed2";
const client_secret = "43b93cfe3b304bc1b31eb96a3a960bbb";
let token;

function onTokenJson(json) {
  token = json.access_token;

  fetch(
    "https://api.spotify.com/v1/artists?ids=4Z8W4fKeB5YxbusRsdQVPb,2DaxqgrOhkeH0fpeiQq2f4,2ye2Wgw4gimLv2eAKyk1NB,3qm84nBOXUEQ2vnTfUTTFC,2sil8z5kiy4r76CRTXxBCA,6bMul6rmRS03x38tWKYifO",
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  )
    .then(onResponse)
    .then(onJson);
}

function onTokenResponse(response) {
  return response.json();
}

function onJson(json) {
  console.log(json);

  const box = document.querySelector(".friends__box");
  json.artists.forEach((artist) => {
    const innerBox = document.createElement("div");
    const img = document.createElement("img");
    const intestazione = document.createElement("div");
    const h3 = document.createElement("h3");
    const p = document.createElement("p");
    const descrizione = document.createElement("p");

    box.appendChild(innerBox);
    innerBox.classList.add("friends__box--inner-box");
    innerBox.appendChild(intestazione);
    intestazione.classList.add("friends__inner-box--intestazione");

    img.src = artist.images[2].url;
    intestazione.appendChild(img);

    h3.innerHTML = artist.name;
    intestazione.appendChild(h3);

    p.innerHTML = "followers: " + artist.followers.total;
    intestazione.appendChild(p);

    descrizione.classList.add("friends__inner-box--descrizione")
    descrizione.innerHTML = artist.genres;
    innerBox.appendChild(descrizione)
  });
}

function onResponse(response) {
  return response.json();
}

fetch("https://accounts.spotify.com/api/token", {
  method: "POST",
  body: "grant_type=client_credentials",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    Authorization: "Basic " + btoa(client_id + ":" + client_secret),
  },
})
  .then(onTokenResponse)
  .then(onTokenJson);
