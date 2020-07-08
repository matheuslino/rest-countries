// document ready
$(() => {

// =======================================
// Global var
// =======================================
var title1 = $("#title1");
var title2 = $("#title2");
var contentHome = $("#content-home");
var contentDetails = $("#content-details");
var btnReturn = $("#btn-return");
var btnSearch = $("#search");

// =======================================
// General
// =======================================
function changeView(add, remove) {
  add.addClass('d-none');
  remove.removeClass('d-none');
}

// Check if it's select or details page
if(contentHome.hasClass("d-none")) {
  title1.addClass('text-right');
}
else {
  title1.removeClass('text-right');
}

// Return page
btnReturn.on('click', () => {
  changeView(contentDetails, contentHome);
});

// Send data
btnSearch.on('click', () => {
  changeView(contentHome, contentDetails);
});

});