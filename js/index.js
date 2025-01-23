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

	//search in data object that matches the name with the keyword
	//and return the city
	let searchResultTotal = [];
	const searchResultCountries = searchDestinations(
		true,
		keyword,
		data.countries
	);
	const searchResultTemples = searchDestinations(false, keyword, data.temples);
	const searchResultBeaches = searchDestinations(false, keyword, data.beaches);

	//combine the results and save it in searchResultTotal
	searchResultTotal = [
		...searchResultTotal,
		...searchResultCountries,
		...searchResultTemples,
		...searchResultBeaches,
	];

	//crete search result list
	const search_result_list = document.createElement("ul");

	//iterate the results, get the element and add it to the list
	searchResultTotal.forEach((item) => {
		search_result_list.appendChild(createCard(item));
	});

	//add the list to the DOM
	const search_result = document.getElementById("search-result");
	search_result.innerHTML = "";
	search_result.append(search_result_list);
}

function searchDestinations(is_city = true, keyword, data) {
	let destinations = [];
	if (is_city) {
		data.forEach((country) => {
			country.cities.forEach((city) => {
				if (city.name.toLowerCase().includes(keyword.toLowerCase())) {
					destinations = [...destinations, city];
				}
			});
		});
	} else {
		data.forEach((destination) => {
			if (destination.name.toLowerCase().includes(keyword.toLowerCase())) {
				destinations = [...destinations, destination];
			}
		});
	}
	return destinations;
}

function createCard(destination) {
	const list_item = document.createElement("li");
	const card = document.createElement("div");
	card.classList.add("search-card");

	const img = document.createElement("img");
	img.src = `./assets/images/${destination.imageUrl}`;
	img.alt = destination.name;

	const h3 = document.createElement("h3");
	h3.textContent = destination.name;

	const p = document.createElement("p");
	p.textContent = destination.description;

	const bookBtn = document.createElement("button");
	bookBtn.textContent = "Book Now";
	bookBtn.classList.add("btn-action");

	card.appendChild(img);
	card.appendChild(h3);
	card.appendChild(p);
	card.appendChild(bookBtn);

	list_item.appendChild(card);

	return list_item;
}
