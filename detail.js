const API_URL = "https://api.jikan.moe/v4/anime/";
const params = new URLSearchParams(
    window.location.search
);

const animeId = params.get("id");
const loading = document.getElementById("detail-loading");

const image = document.getElementById("anime-image");
const title = document.getElementById("anime-title");
const type = document.getElementById("anime-type");
const episodes = document.getElementById("anime-episodes");
const score = document.getElementById("anime-score");

const year = document.getElementById("anime-year");
const producer = document.getElementById("anime-producer");
const duration = document.getElementById("anime-duration");
const rating = document.getElementById("anime-rating");
const rank = document.getElementById("anime-rank");
const themes = document.getElementById("anime-themes");

const synopsis = document.getElementById("anime-synopsis");
const background = document.getElementById("anime-background");

const animeUrl = document.getElementById("anime-url");

async function getAnimeDetails() {

    try {

        if (!animeId) {
            throw new Error("Anime ID is missing");
        }

        console.log("Loading anime ID:", animeId);

        const response = await fetch(
            API_URL + animeId
        );

        console.log(
            "Jikan detail status:",
            response.status
        );

        if (!response.ok) {
            throw new Error(
                "API Error: " + response.status
            );
        }

        const result = await response.json();

        console.log(
            "Anime details:",
            result.data
        );

        return result.data;

    } catch (error) {

        console.error(
            "Detail API Error:",
            error
        );

        loading.textContent =
            "Unable to load anime details.";

        return null;
    }
}


async function displayDetails() {

    const anime = await getAnimeDetails();

    if (!anime) {
        return;
    }

    image.src =
        anime.images?.jpg?.large_image_url ||
        anime.images?.jpg?.image_url ||
        "";

    image.alt =
        anime.title || "Anime poster";

    title.textContent =
        anime.title || "N/A";


    type.textContent =
        anime.type || "N/A";

    episodes.textContent =
        "Episodes: " +
        (anime.episodes ?? "N/A");

    score.textContent =
        "★ " +
        (anime.score ?? "N/A");

    year.textContent =
        anime.year || "N/A";

    if (
        anime.producers &&
        anime.producers.length > 0
    ) {

        producer.textContent =
            anime.producers
                .map(function(item) {
                    return item.name;
                })
                .join(", ");

    } else {

        producer.textContent = "N/A";

    }


    duration.textContent =
        anime.duration || "N/A";



    rating.textContent =
        anime.rating || "N/A";

    rank.textContent =
        anime.rank || "N/A";


    if (
        anime.themes &&
        anime.themes.length > 0
    ) {

        themes.textContent =
            anime.themes
                .map(function(item) {
                    return item.name;
                })
                .join(", ");

    } else {

        themes.textContent = "N/A";

    }


    synopsis.textContent =
        anime.synopsis ||
        "No synopsis available.";



    background.textContent =
        anime.background ||
        "No background information available.";

    animeUrl.href =
        anime.url || "#";


    loading.style.display = "none";
}

displayDetails();