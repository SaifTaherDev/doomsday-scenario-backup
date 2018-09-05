
var navbarContainer = document.body.querySelector("#bigNavbarContainer");
var footerContainer = document.body.querySelector("#customerFeedback")

navbarContainer.innerHTML =  '<div id="bigNavbar" class="row container-fluid" ><div id="navbarContentContainer" class="container"><div id="logoContainer" class="animated hvr-overline-from-center col-3"> <a href="home-page.html"><img class ="logo" src="images/bridgeLogo.png" /></a></div><div class="col-9" id="navButtonContainerContainer"> <div class="row" id="navButtonContainer"> <span class="animated col-4"><span id="aboutBigNav">about</span></span> <span class="col-4"><span id="contactBigNav">contact</span></span> <span class="col-4"><span id="examplesBigNav">examples</span></span></div></div></div></div>';
footerContainer.innerHTML = '<div id="customersTitle"><h1>What Customers Say...</h1></div><div id="customerSlideshow" class="jumbotron"> <div id="customersConatiner" class="container"> <div class="row"> <div id="customerImageContainer" class="col-12 col-sm-4"> <img id="customerImage" src=""/> </div><div class="col-12 col-sm-8" id="customerQuote"></div></div></div></div> <div id="footer"> <div class="container"> <img class="logo" src="images/bridgeLogo.png"/> <div id="followUs"> Follow us on: </div><div id="verticalLine"></div><div id="socialMediaContainer" class="container col-lg-2 col-md-3"> <i class="fab fa-facebook-square"><span> Facebook</span></i> <i class="fab fa-twitter"><span> Twitter</span></i> <i class="fab fa-google-plus"><span> Google+</span></i> </div></div></div>'

var bigNavbar = [document.body.querySelector("#contactBigNav"), document.body.querySelector("#aboutBigNav"), document.body.querySelector("#examplesBigNav")];

function navigateToAnotherPage(element, newLocation) {
    element.onclick = function () {
        window.location.href = newLocation;
    }
};

navigateToAnotherPage(bigNavbar[0], "contact.html")
navigateToAnotherPage(bigNavbar[1], "about.html")
navigateToAnotherPage(bigNavbar[2], "examples.html")

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
    new person("<h2>Anood Bint-Abdullah</h2><p>'I've been running an online fashion and clothing store for years, and it's secure and functional as always. Thank you, <b>Bridge</b>!'</p>", "images/people/woman3.jpg"),
    new person("<h2>Eric Abdoulaye</h2><p>'Teaching in Nigeria can be a very daunting job. But <b>Bridge</b> built an online grading tool to help me with grading the students' homework. I've been heavily reliant on this tool ever since.'</p>", "images/people/man4.jpg"),
];

window.onload = function () {
    customerQuote.innerHTML = peopleArray[0].quote;
    customerImage.setAttribute("src", peopleArray[0].image);

    customerImageContainer.style.opacity = "1";
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
var navBar = document.body.querySelector("#bigNavbar");
var navBarContent = document.body.querySelectorAll("#navButtonContainer span span");
var navBarContentContainers = document.body.querySelectorAll("#navButtonContainer > span");
var logo = document.body.querySelector(".logo");

function changeButtonContainersProps(num) {
    navBarContentContainers[num].addEventListener('mouseover', function () {
        navBarContentContainers[num].style.borderTopColor = "white";
    });
    navBarContentContainers[num].addEventListener('mouseleave', function () {
        navBarContentContainers[num].style.borderTopColor = "transparent";
    });
};

navBar.addEventListener('mouseover', function () {
    navBar.style.background = "#313531";
});
navBar.addEventListener('mouseleave', function () {
    navBar.style.background = "transparent";
});

changeButtonContainersProps(0);
changeButtonContainersProps(1);
changeButtonContainersProps(2);