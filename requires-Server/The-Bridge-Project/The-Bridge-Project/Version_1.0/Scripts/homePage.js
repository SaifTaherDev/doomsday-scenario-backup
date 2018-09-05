var marketingContainer = document.body.querySelector("#marketingContainer");
var marketHeading = document.body.querySelector("#marketHeading");
var marketPara = document.body.querySelector("#marketPara");
var marketImgContainer = document.body.querySelector("#marketImgContainer");

class marketObject {
    constructor(heading, paragraph, image) {
        this.heading = heading;
        this.paragraph = paragraph;
        this.image = image;
    }
};

var marketObjects = [
    new marketObject("High-Quality & Robust", "Bridge will make use of the latest technologies in the market to ensure you are delivered with the highest-quality of websites.", '<img id="imgOne" src="images/headerImage.png" />'),
    new marketObject("Web Design & Layout", "Bridge was very careful about choosing whom to hire as web designers. These designers are like no other! We have only the most creative, passionate and skilled web designers! Don't worry, your website <b>will</b> look awesome!", '<img id="imgTwo" src="images/webDesign.png" />'),
    new marketObject("Secure", "Equipped with the most powerful cybersecurity libraries and frameworks at its arsenal, Bridge <b>will not</b> let an intruder through.", '<img id="imgThree" src="images/hacker.png" />'),
    new marketObject("Scalability", "<h4>Whether you demand a small website for your online clothing store, or a major website to manage all of your company's assets, Bridge will deliver you an efficent, highly-scalable solution that fits your different needs.</h4>", '<img id="imgFour" src="images/scalability.png" />'),
    new marketObject("SEO", "<h4>You needn't worry anymore about showing up in the top results of the most popular search engines. Our expereince with search algorithims enables us to optimize your website to show at the top of any related search.</h4>", '<img id="imgFive" src="images/SEO.png" />'),
]

window.onload = function slideShow() {
    marketingContainer.style.opacity = 1;
    marketHeading.innerHTML = marketObjects[0].heading;
    marketPara.innerHTML = marketObjects[0].paragraph;
    marketImgContainer.innerHTML = marketObjects[0].image;
    var counter = 1;
    setInterval(function () {
        marketingContainer.style.opacity = 0;
        setTimeout(function () {
            marketingContainer.style.opacity = 1;
            marketHeading.innerHTML = marketObjects[counter].heading;
            marketPara.innerHTML = marketObjects[counter].paragraph;
            marketImgContainer.innerHTML = marketObjects[counter].image;
            if (counter == 4) {
                counter = -1;
            }
            counter++;
        }, 1100)
    }, 7500)
}