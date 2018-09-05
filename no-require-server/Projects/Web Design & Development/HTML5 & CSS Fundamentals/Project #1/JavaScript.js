function FV1() {
    var NameNumberOne = document.getElementById("FName").value;
    var NameNumberOneDef = /^[a-zA-Z\s\'\-]{3,15}$/;

    if (NameNumberOneDef.test(NameNumberOne)) {
        document.getElementById("FirstNameSpan").innerHTML = "";
        document.getElementById("FName").style.borderColor = "green";
        return true;
    }
    else {
        document.getElementById("FirstNameSpan").innerHTML = "<strong>Please enter a valid name (3-15 characters)</strong>";
        document.getElementById("FName").style.borderColor = "red";
        return false;
    }
}

function FV2() {
    var NameNumberTwo = document.getElementById("LName").value;
    var NameNumberTwoDef = /^[a-zA-Z\s\'\-]{3,15}$/;

    if (NameNumberTwoDef.test(NameNumberTwo)) {
        document.getElementById("SecondNameSpan").innerHTML = "";
        document.getElementById("LName").style.borderColor = "green";
        return true;
    }
    else {
        document.getElementById("SecondNameSpan").innerHTML = "<strong>Please enter a valid name (3-15 characters)</strong>";
        document.getElementById("LName").style.borderColor = "red";
        return false;
    }
}

function FV3() {
    var NameNumberThree = document.getElementById("UName").value;
    var NameNumberThreeDef = /^[a-zA-Z\s\'\-\0-9]{3,15}$/;

    if (NameNumberThreeDef.test(NameNumberThree)) {
        document.getElementById("ThirdNameSpan").innerHTML = "";
        document.getElementById("UName").style.borderColor = "green";
        return true;
    }
    else {
        document.getElementById("ThirdNameSpan").innerHTML = "<strong>Please enter a valid name (3-15 characters)</strong>";
        document.getElementById("UName").style.borderColor = "red";
        return false;
    }
}

function FV4() {
    function FV4One();
    function FV4Two();
}

function FV4One() {
    var GmailDef = /^[a-zA-Z\0-9]{6,30}$/;
    var GmailUser = document.getElementById("GMail").value;
    if (GmailDef.test(GmailUser)) {
        document.getElementById("G-mailSpan").innerHTML = "";
        document.getElementById("GMail").style.borderColor = "green";
        return true;
    }
    else {
        document.getElementById("G-mailSpan").innerHTML = "<Strong>Please enter a valid G-mail (6-30 characters)</strong>";
        document.getElementById("GMail").style.borderColor = "red";
        return false;
    }
}

function FV4Two() {
    if (form1.Google - mail.value.includes("@gmail.com")) { 
        document.getElementById("G-mailSpan").innerHTML = "";
        document.getElementById("GMail").style.borderColor = "green";
        return true;
}
    else {
        document.getElementById("G-mailSpan").innerHTML = "<Strong>Please enter a valid G-mail (6-30 characters)</strong>";
        document.getElementById("GMail").style.borderColor = "red";
        return false;
    }
}

function FV5() {
    var PassDef = /^[a-zA-Z\0-9\-\_]{8,17}$/;
    var PassUser = document.getElementById("pass").value;
    if (PassDef.test(PassUser)) {
        document.getElementById("PasswordSpan").innerHTML = "";
        document.getElementById("pass").style.borderColor = "green";
        return true;
    }
    else {
        document.getElementById("PasswordSpan").innerHTML = "<strong>Please enter a valid password (8-30 characters, it can only contain Latin letters, numbers, and the following symbols: ( _ , - )</strong>";
        document.getElementById("pass").style.borderColor = "red";
        return false;
    }
}

function BirthYear() {

    var BirthYear2 = document.getElementById("BYear").value;
    var Birthyear2Def = /^[1900-2000]{4}$/
    if (Birthyear2Def.test(BirthYear2)) {
        document.getElementById("BirthYearSpan").innerHTML = "";
        document.getElementById("BYear").style.borderColor = "green";
        return true;
    }
    else {
        document.getElementById("BirthYearSpan").innerHTML = "<strong>Please enter a valid Birthyear: (1900,2000)</strong>";
        document.getElementById("BYear").style.borderColor = "red";
        return true;
    }
}
