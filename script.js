// Some simple anime data
// Jikan API URL
const API_URL = "https://api.jikan.moe/v4/anime";


// Find the anime container
const container = document.getElementById("anime-container");


// Fetch anime data from API
async function getAnime() {

    try {

        // Send request to API
        const response = await fetch(API_URL);

        // Convert response into JavaScript object
        const data = await response.json();

        // Return anime data
        return data.data;

    } catch (error) {

        console.log("Error fetching anime:", error);

    }
}
async function displayAnime() {

    // Get anime from API
    const animeList = await getAnime();

    // Check if data was received
    if (!animeList) {
        return;
    }


    animeList.forEach(function(anime) {

        // Create a card
        const card = document.createElement("div");

        // Add CSS class
        card.className = "anime-card";


        // Put anime information inside card
        card.innerHTML = `
            <img 
                src="${anime.images.jpg.image_url}"
                alt="${anime.title}"
            >

            <h3>${anime.title}</h3>

            <p>
                Year: ${anime.year || "N/A"}
            </p>

            <a href="detail.html?id=${anime.mal_id}">
                View Details
            </a>
        `;


        // Add card to webpage
        container.appendChild(card);
    });
}


// Call the function
displayAnime();


// Display anime on the home page
if (container) {

    animeList.forEach(function(anime) {

        // Create a new card
        const card = document.createElement("div");

        // Give the card a CSS class
        card.className = "anime-card";

        // Add HTML inside the card
        card.innerHTML = `
            <img src="${anime.image}" alt="${anime.title}">

            <h3>${anime.title}</h3>

            <p>Year: ${anime.year}</p>

            <a href="detail.html?title=${encodeURIComponent(anime.title)}">
                View Details
            </a>
        `;

        // Add the card to the page
        container.appendChild(card);
    });
}


// Get anime title from the URL
const urlParams = new URLSearchParams(window.location.search);

const animeTitle = urlParams.get("title");


// Show details on detail.html
if (animeTitle) {

    // Find the selected anime
    const selectedAnime = animeList.find(function(anime) {
        return anime.title === animeTitle;
    });


    if (selectedAnime) {

        document.getElementById("anime-image").src =
            selectedAnime.image;

        document.getElementById("anime-title").textContent =
            selectedAnime.title;

        document.getElementById("anime-year").textContent =
            selectedAnime.year;

        document.getElementById("anime-producer").textContent =
            selectedAnime.producer;

        document.getElementById("anime-duration").textContent =
            selectedAnime.duration;

        document.getElementById("anime-rating").textContent =
            selectedAnime.rating;

        document.getElementById("anime-rank").textContent =
            selectedAnime.rank;

        document.getElementById("anime-synopsis").textContent =
            selectedAnime.synopsis;

        document.getElementById("anime-background").textContent =
            selectedAnime.background;

        document.getElementById("anime-themes").textContent =
            selectedAnime.themes;
    }
}