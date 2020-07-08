// document ready
$(() => {

// =======================================
// Global var
// =======================================
var title1 = $("#title1");
var title2 = $("#title2");
var contentHome = $("#content-home");
var contentDetails = $("#content-details");
var regionSelect = $("#region-select");
var countrySelect = $("#country-select");
var flagSection = $("#flag-section");
var btnReturn = $("#btn-return");
var btnSearch = $("#search");
var nameField = $("#nameField");
var capitalField = $("#capitalField");
var regionField = $("#regionField");
var subregField = $("#subregField");
var popField = $("#popField");
var langField = $("#langField");
var imgCountryField = $("#imgCountryField");
var neighborSection = $("#neighbor-section");
var getAll = 'https://restcountries.eu/rest/v2/all/';
var getByRegion = 'https://restcountries.eu/rest/v2/region/';
var getByCode = 'https://restcountries.eu/rest/v2/alpha/';

// =======================================
// Navigation
// =======================================
function changeView(add, remove) {
	add.addClass('d-none');
	remove.removeClass('d-none');
}

// Return page
btnReturn.on('click', () => {
	changeView(contentDetails, contentHome);
});

// Send data
btnSearch.on('click', () => {
	let code = countrySelect.find(":selected").val();
	changeView(contentHome, contentDetails);
	getCountryInfo(code);
});

// Check if it's select or details page
if(contentHome.hasClass("d-none")) {
	title1.addClass('text-right');
}
else {
	title1.removeClass('text-right');
}

// =======================================
// API Methods
// =======================================

function getFlags(countryCode, url) {

	let temp = "";

	temp += `<div class="col-6 col-md-2 mb-4">` +
	`<a href="${countryCode}" class="flagLink">` +
	`<img src="${url}" class="flag zoom shadow-sm">` +
	`</a>` +
	`</div>`;	
	
	return temp;
}

// Get countries by region
regionSelect.on('change', () => {

	let op = regionSelect.find(":selected").val();
	let options = {
		method: 'GET',
		mode: 'cors',
		cache: 'default'
	}

	fetch(getByRegion + op, options)
	.then(res => res.json())
	.then(data => init(data))
	.catch(e => console.log('Error: ' + e));

	function init(data) {
		
		// temp vars
		let ops = "";
		let flags = "";

		for (let i = 0; i < data.length; i++) {
			flags += getFlags(data[i].alpha3Code, data[i].flag);
			ops += `<option value="${data[i].alpha3Code}">${data[i].name}</option>`;
		}		

		// Store values
		flagSection.html(flags);
		countrySelect.html(ops);

		// update listeners
		updateImages();
	}
});

// Get country by flag click
function updateImages() {
	$(".flagLink").on('click', function(event) {
		event.preventDefault();
		let code = $(this).attr("href");
		getCountryInfo(code);
		changeView(contentHome, contentDetails);
	});
}

// Get country info
function getCountryInfo(code) {

	let options = {
		method: 'GET',
		mode: 'cors',
		cache: 'default'
	}

	fetch(getByCode + code, options)
	.then(res => res.json())
	.then(data => init(data))
	.catch(e => console.log('Error: ' + e));

	function init(data) {

		// temp vars
		var neighbours = "";
		let lang = "";

		for (let i = 0; i < data.languages.length; i++)
			lang += data.languages[i].name + ' ';

		for(let i = 0; i < data.borders.length; i++) {
			fetch(getByCode + data.borders[i], options)
			.then(res => res.json())
			.then(data2 => neighbours += getFlags(data.borders[i], data2.flag))
			.then(() => {
				neighborSection.html(neighbours);
				updateImages();
			})
			.catch(e => console.log('Error: ' + e));
		}

		// Store values
		imgCountryField.attr('src', data.flag);
		nameField.html(data.name);
		capitalField.html(data.capital);
		regionField.html(data.region);
		subregField.html(data.subregion);
		popField.html(new Intl.NumberFormat('pt-IN', { maximumSignificantDigits: 3 }).format(data.population));
		langField.html(lang);
	}
}

});