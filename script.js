const API_URL = "https://api.jikan.moe/v4/anime";
const container = document.getElementById("anime-container");

const loading = document.getElementById("loading");
async function getAnime() {

    try {

        const response = await fetch(API_URL);
        if (!response.ok) {

            throw new Error(
                "API Error: " + response.status
            );

        }

        const data = await response.json();

        console.log("Jikan API response:", data);

        return data.data;

    }

    catch (error) {

        console.error(
            "Jikan API Error:",
            error
        );

        loading.textContent =
            "Unable to load anime.";

        return [];

    }
}

function displayAnime(animeList) {

    container.innerHTML = "";

    animeList.forEach(function(anime) {
        
        const card =
            document.createElement("div");
        
        card.className =
            "anime-card";

        card.innerHTML = `

            <img
                src="${anime.images.jpg.large_image_url}"
                alt="${anime.title}"
            >

            <h3>
                ${anime.title}
            </h3>

            <p>
                Released:
                ${anime.year || "N/A"}
            </p>

            <p>
                Score:
                ${anime.score || "N/A"}
            </p>

            <a
                href="detail.html?id=${anime.mal_id}"
            >
                View Details
            </a>

        `;


        // Add card to page
        container.appendChild(card);

    });

}

async function loadAnime() {

    loading.textContent =
        "Loading anime...";


    const animeList =
        await getAnime();
    if (animeList.length === 0) {

        return;

    }


    loading.style.display =
        "none";


    
    displayAnime(animeList);

}

loadAnime();