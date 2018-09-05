var navbarContainer = document.body.querySelector("#navbarContainer");
var footerContainer = document.body.querySelector("#footerContainer")

navbarContainer.innerHTML = '<div class="jumbotron-fluid d-none d-sm-none d-md-block" id="navbar_bigscreens"><nav class="navbar navbar-default"><div class="container"><a class="navbar-brand" href="Home_Page.html"><img id="bridgeLogo" src="images/bridgeLogo.png" /></a><div class="row col-md-4"><span id="contactBigNav" class="col-md-4">contact</span><span id="aboutBigNav" class="col-md-4">about</span><span  id="examplesBigNav" class="col-md-4">examples</span></div></div></nav></div><div class="jumbotron-fluid d-block d-md-none" id="navbar_smallscreens"><nav class="navbar navbar-default"><div class="container"><a class="navbar-brand" href="Home_Page.html"><img id="bridgeLogo_small" src="images/bridgeLogo.png" /></a><div class="row"><span id="contactSmallNav" class="col-4">contact</span><span id="aboutSmallNav" class="col-4">about</span><span id="examplesSmallNav" class="col-4">examples</span></div></div></nav></div>';
footerContainer.innerHTML = '<div id="customersTitle"><h1>What Customers Say...</h1></div><div id="customerSlideshow" class="jumbotron"> <div class="container"> <div class="row"> <div id="customerImageContainer" class="col-12 col-sm-4"> <img id="customerImage" src="images/people/man4.jpg"/> </div><div class="col-12 col-sm-8" id="customerQuote"> <h2>Eric Abdoulaye</h2><p>\'Teaching in Nigeria can be a very daunting job. But <b> Bridge</b> built an online grading tool to help me with grading the students\' homework. I\'ve been heavily reliant on this tool ever since.\'</p></div></div></div></div>'

var bigNavbar = [document.body.querySelector("#contactBigNav"), document.body.querySelector("#aboutBigNav"), document.body.querySelector("#examplesBigNav")];
var smallNavbar = [document.body.querySelector("#contactSmallNav"), document.body.querySelector("#aboutSmallNav"), document.body.querySelector("#examplesSmallNav")]

function navigateToAnotherPage(element, newLocation) {
    element.onclick = function () {
        window.location.href = newLocation;
    }
};

navigateToAnotherPage(bigNavbar[0], "contact.html")
navigateToAnotherPage(bigNavbar[1], "about.html")
navigateToAnotherPage(bigNavbar[2], "examples.html")
navigateToAnotherPage(smallNavbar[0], "contact.html")
navigateToAnotherPage(smallNavbar[1], "about.html")
navigateToAnotherPage(smallNavbar[2], "examples.html")

var title = document.body.querySelector("#title");
var customerImage = document.body.querySelector("#customerImage");
var customerQuote = document.body.querySelector("#customerQuote");
var peopleCounter = 0;

class person {
    constructor(quote, image) {
        this.quote = quote;
        this.image = image;
    }
};

var peopleArray = [
    new person("<h2>Mariam Michael</h2><p>'I really like <b>Bridge</b>. They are one of the most repsectful companies I've ever dealt with. I highly recommend them.'</p>", "images/people/woman1.jpg"),
    new person("<h2>Alfred James</h2><p>'I've been a regular customer for <b>Bridge</b> through the years. their code is robust and secure.'</p>", "images/people/man1.jpg"),
    new person("<h2>Marwa El-Masraway</h2><p>'As a diet & fitness expert, <b>Bridge</b> has built me a website which proved to be extremely useful for creating an online presence for my health center.'</p>", "images/people/woman2.jpg"),
    new person("<h2>Wang-Chen</h2><p>'Our company collaborated with <b>Bridge</b> back in 2010. Together, we've created tens of online mini-games. And, thanks to them, Our website was very succesful and it recieved a lot of traffic.'</p>", "images/people/man3.jpg"),
    new person("<h2>Anood Bint-Abdullah</h2><p>I've been running an online fashion and clothing store for years, and it's secure and functional as always. Thank you, <b>Bridge</b>!</p>", "images/people/woman3.jpg"),
    new person("<h2>Eric Abdoulaye</h2><p>'Teaching in Nigeria can be a very daunting job. But <b>Bridge</b> built an online grading tool to help me with grading the students' homework. I've been heavily reliant on this tool ever since.'</p>", "images/people/man4.jpg"),
];

window.onload = function () {
    customerImageContainer.style.opacity = "1";
    setTimeout(
        function () {
            title.innerHTML = "<h1>Welcome to Bridge</h1><h3> We connect the server with the client</h3>"
        }, 100);
    setInterval(
        function () {
            if (peopleCounter == 5) {
                peopleCounter = 0;
            };
            customerImage.style.opacity = "0";
            customerQuote.style.opacity = "0";


            setTimeout(function () {
                customerQuote.innerHTML = peopleArray[peopleCounter].quote;
                customerImage.setAttribute("src", peopleArray[peopleCounter].image);
            }, 1050)
            setTimeout(function () {
                customerImage.style.opacity = "1";
                customerQuote.style.opacity = "1";
            }, 2050)
            peopleCounter++;
        }, 10000);
}
