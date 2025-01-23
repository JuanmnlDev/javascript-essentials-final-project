const search_btn = document.getElementById("search-btn");
search_btn.addEventListener("click", () => {
	searchTravelRecomendations(document.getElementById("search").value);
});

async function searchTravelRecomendations(keyword) {
	const response = await fetch("./data/travel_recommendation_api.json");

	if (!response.ok) {
		throw new Error(`Response status: ${response.status}`);
	}

	const data = await response.json();
	console.log(data);
}
