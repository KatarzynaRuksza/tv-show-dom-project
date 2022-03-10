function setup() {
  createCardForShows();
  createAlphabeticalMenuForShows();
  searchTheEpisodes();
  selectTheEpisodeFromList();
}
const selectShow = document.querySelector("#showsMenu");

// Creating one card for each show with image and description included

function createCardForShows() {
  const allShows = getAllShows();
  const showDiv = document.querySelector("#showDiv");

  allShows.forEach((show) => {
    const showCard = document.createElement("div");
    showCard.id = "showCard";
    showCard.className = "card mb-3";
    showCard.style = "max-width: 540px;";
    const showCardRow = document.createElement("div");
    showCardRow.className = "row no-gutters";

    const showCardRowColumn1 = document.createElement("div");
    showCardRowColumn1.className = "col-md-5";
    const showCardRowColumn1Img = document.createElement("img");
    showCardRowColumn1Img.className = "crd-img";
    showCardRowColumn1Img.id = "cardImg";

    if (show.image !== null) {
      showCardRowColumn1Img.src = show.image.original;
    }

    const showCardRowColumn2 = document.createElement("div");
    showCardRowColumn2.className = "col-md-7";
    const showCardRowColumn2Body = document.createElement("div");
    showCardRowColumn2Body.className = "card-body";
    const showCardTitle = document.createElement("h5");
    showCardTitle.className = "card-title";
    showCardTitle.innerText = show.name;
    const showCardSummary = document.createElement("p");
    showCardSummary.className = "card-text";

    showCardSummary.innerHTML = show.summary;

    const showCardBody = document.createElement("div");
    showCardBody.className = "card-body ";
    const showCardBodyUlElement = document.createElement("ul");
    showCardBodyUlElement.className = "list-group ";

    const showBodyLi1 = document.createElement("li");
    showBodyLi1.className = "list-group-item text-right bg-dark";
    showBodyLi1.innerHTML = `Genres: ${show.genres}`;

    const showBodyLi2 = document.createElement("li");
    showBodyLi2.className = "list-group-item text-right bg-dark";
    showBodyLi2.innerHTML = `Status: ${show.status}`;

    const showBodyLi3 = document.createElement("li");
    showBodyLi3.className = "list-group-item text-right bg-dark";
    showBodyLi3.innerHTML = `Rating: ${show.rating.average}`;

    const showBodyLi4 = document.createElement("li");
    showBodyLi4.className = "list-group-item text-right bg-dark";
    showBodyLi4.innerHTML = `Runtime: ${show.runtime}`;

    showDiv.appendChild(showCard);
    showCard.appendChild(showCardRow);
    showCardRow.appendChild(showCardRowColumn1);
    showCardRowColumn1.appendChild(showCardRowColumn1Img);
    showCardRow.appendChild(showCardRowColumn2);
    showCardRowColumn2.appendChild(showCardRowColumn2Body);
    showCardRowColumn2Body.appendChild(showCardTitle);
    showCardRowColumn2Body.appendChild(showCardSummary);
    showCardRow.appendChild(showCardBody);
    showCardBody.appendChild(showCardBodyUlElement);
    showCardBodyUlElement.appendChild(showBodyLi1);
    showCardBodyUlElement.appendChild(showBodyLi2);
    showCardBodyUlElement.appendChild(showBodyLi3);
    showCardBodyUlElement.appendChild(showBodyLi4);
  });
}

// Creating alphabetically sorted list of all shows

function createAlphabeticalMenuForShows() {
  const allShows = getAllShows();
  const sortAllShows = allShows.sort(function (a, b) {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    }
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    }
    return 0;
  });

  const selectShow = document.querySelector("#showsMenu");
  sortAllShows.forEach((show) => {
    const showOption = document.createElement("option");
    showOption.value = show.id;
    showOption.innerText = show.name;
    selectShow.appendChild(showOption);
  });

  selectShow.addEventListener("change", (event) => {
    const showDiv = document.querySelector("#showDiv");
    if (event.target.value === "") {
      showDiv.style.display = "flex";
    } else {
      fetchEpisodesFromAPI(event.target.value);
      showDiv.style.display = "none";
    }
  });
}

// * This function is to fetch the data from the API and than render the episodes by calling the initial makePageForEpisodes () function;

const fetchEpisodesFromAPI = (id) => {
  fetch(`https://api.tvmaze.com/shows/${id}/episodes`)
    .then((response) => response.json())
    .then((data) => makePageForEpisodes(data))
    .catch((err) => console.log(err));
};

// This function creates a card for each episode

function makePageForEpisodes(episodeList) {
  const episodeDiv = document.querySelector("#episodeDiv");
  episodeDiv.innerHTML = "";
  const selectTheEpisodes = document.querySelector("#selectEpisodes");
  selectTheEpisodes.innerHTML = "";
  const optionElement = document.createElement("option");
  optionElement.innerText = "All episodes";
  selectTheEpisodes.appendChild(optionElement);

  episodeList.forEach((episode) => {
    const optionElement = document.createElement("option");
    optionElement.innerText = `S${episode.season
      .toString()
      .padStart(2, "0")}E${episode.number.toString().padStart(2, "0")} - ${
      episode.name
    }`;

    optionElement.value = `S${episode.season
      .toString()
      .padStart(2, "0")}E${episode.number.toString().padStart(2, "0")}`;

    selectTheEpisodes.appendChild(optionElement);

    const episodeCard = document.createElement("div");
    episodeCard.className = "card col-3 m-3";

    episodeCard.id = `S${episode.season
      .toString()
      .padStart(2, "0")}E${episode.number.toString().padStart(2, "0")}`;
    const episodeCardHeader = document.createElement("div");
    episodeCardHeader.className = "card-header";
    const episodeName = document.createElement("h5");
    episodeName.className = "card-title";
    episodeName.innerText = `${episode.name} ${episodeCard.id}`;

    const episodeImg = document.createElement("img");
    episodeImg.className = "card-img-top";

    if (episode.image !== null) {
      episodeImg.src = episode.image.medium;
    }

    const cardPElement = document.createElement("p");
    cardPElement.className = "card-text";
    cardPElement.innerHTML = episode.summary;
    const cardFooter = document.createElement("div");
    cardFooter.className = "card-footer";
    const cardFooterLink = document.createElement("a");
    cardFooterLink.className = "card-link text-success";
    cardFooterLink.innerHTML = "The original source TVMaze.com";
    cardFooterLink.href = "https://www.tvmaze.com/";
    episodeDiv.appendChild(episodeCard);
    episodeCard.appendChild(episodeCardHeader);
    episodeCardHeader.appendChild(episodeName);
    episodeCard.appendChild(episodeImg);
    episodeCard.appendChild(cardPElement);
    episodeCard.appendChild(cardFooter);
    cardFooter.appendChild(cardFooterLink);
  });
}

// This function search and list for input value that matches with the values in the 'card title' or 'card summary'.

function searchTheEpisodes() {
  const inputSearchElement = document.querySelector("#inputSearch");
  const inputSpanElement = document.querySelector(".searchHolder");

  function inputSelect(e) {
    const addedInput = e.target.value.toLowerCase();
    const cardList = document.querySelectorAll(".card");

    let list = Array.from(cardList);

    list.forEach(function (card) {
      if (card.innerText.toLowerCase().indexOf(addedInput) !== -1) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
    let newList = list.filter((item) => item.style.display === "block");
    inputSpanElement.textContent = `Search results: ${newList.length}`;
  }
  inputSearchElement.addEventListener("input", inputSelect);
}

// This function  displays only episodes that match the input in select episodes field

function selectTheEpisodeFromList() {
  const selectTheEpisodes = document.querySelector("#selectEpisodes");
  selectTheEpisodes.addEventListener("change", selectFromMenu);

  function selectFromMenu(event) {
    const cardList = document.querySelectorAll(".card");

    cardList.forEach((episode) => {
      if (event.target.value === "All episodes") {
        episode.style.display = "block";
      } else {
        episode.id === event.target.value
          ? (episode.style.display = "block")
          : (episode.style.display = "none");
      }
    });
  }
}

//button go to all shows that takes back to the initial state with show cards displayed

const goBackToTheStart = document.querySelector("#goBackToTheStart");

goBackToTheStart.addEventListener("click", function () {
  const showDiv = document.querySelector("#showDiv");
  showDiv.style.display = "flex";
});

window.onload = setup;
