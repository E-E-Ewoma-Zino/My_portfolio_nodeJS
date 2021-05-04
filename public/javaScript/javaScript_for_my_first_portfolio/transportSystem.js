// javascript code for transport system

// here is all the initialization
let signUpContainer = document.getElementById("signUpContainer");
let signInContainer = document.getElementById("signInContainer");
let intro = document.getElementById("intro");
let signUpBtn = document.getElementById("signUpBtn");
let optionsContainer = document.getElementById("optionsContainer");
let option1 = document.getElementById("viewAvaliableSeats");
let option2 = document.getElementById("reserveASeat");
let option3 = document.getElementById("viewMyReservation");
let option4 = document.getElementById("viewAllReservation");
let firstNameDOM = document.getElementById("firstName");
let lastNameDOM = document.getElementById("lastName");
let userNameDOM = document.getElementById("userName");
let passwordDOM = document.getElementById("password");
let tempUN = document.getElementById("tempUserName");
let tempPass = document.getElementById("tempPassword");
let seat = [];
let firstName = [];
let lastName = [];
let userName = [];
let password = [];
let personSeat = [];
let isActive = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
let btnActive = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
let signUpBool = false;
let signInBool = false;
let doneRegistration = false;
let personNum = 0;
let userNum = 0;

// i used this to set values for fake users to occupie some seats
setValue();

// i disable all the options so you will first see the intro
option1.style.display = "none";
option2.style.display = "none";
option3.style.display = "none";
option4.style.display = "none";

// These are the options functions to activate the option different option and call their function
// open view avaliable seat option and call the viewAvaliabeSeat() function
function viewAvailableSeatsOption() {
    optionDisplay("block", "none", "none", "none");

    viewAvailableSeats();
}

// open the reserve a seat option and call the reserveASeat() function
function reserveASeatOption() {
    optionDisplay("none", "block", "none", "none");
}

// open view reservation option and call the viewMyReserbation() function
function viewMyReservationOption() {
    optionDisplay("none", "none", "block", "none");

    viewMyReservation();
}

// open view all reservation option and call the viewAllReservation() function
function viewAllReservationOption() {
    optionDisplay("none", "none", "none", "block");

    viewAllReservation();
}

// this quits the options field and takes you back to the intro field
function quit() {
    // if person seat is empty 
    // set doneRegistration to false and quite display and remove all the details
    if (personSeat[userNum] == "" || personSeat[userNum] == [] || personSeat[userNum] == undefined) {
        alert("You have not made any reservation!\nYou have not reserved any seat.\nYour activities will be cancled!");

        doneRegistration = false;

        quitDisplay();

        removeDetails();

        return 0;
    }

    // if doneRegistration is false that means the first if statement will execute
    if (doneRegistration == false) {
        quitDisplay();
    } // if doneReservtion is true, which means person seat is not empty
    else {
        // quit display, set doneRegistration to false for next user,
        // empty the seat, userName++, personSeat++
        quitDisplay();

        doneRegistration = false;

        seat = [];
        console.log("Empty seat " + seat);
        console.log(`personSeat[${personNum}] = ${personSeat[personNum]}`);
        console.log(`personSeat = ${personSeat}`);

        userNum++;
        personNum++;
        console.log("Person num " + personNum);
    }

    // remove the values used in the input field, so the next user will not see your details
    firstNameDOM.value = "";
    lastNameDOM.value = "";
    userNameDOM.value = "";
    passwordDOM.value = "";
    tempUN.value = "";
    tempPass.value = "";

    // remove the stetement used in the viewMyReservation function
    document.getElementById("yourSeat").innerHTML = "";
}

// 
// this is the function to display the seats that are stil avaliable
function viewAvailableSeats() {
    choosen2(0);
}

// this function helps you reserve a seat
function reserveASeat(num) {

    // when the user clicks on a seat the number assigned to that seat will 
    // be recieved by this function and that number is used by all other 
    // options that displays seat in any way
    // 
    // here 30 is added to num because num(viewAllReservation) + 30 will give you the next seat option(reserveASeat) and num + 60 will give you the next seat option(viewMyReservation)
    let num2 = num + 30;


    console.log("Seat num " + num);
    console.log("Seat num2 " + num2);

    // if seat has been taken end this function
    for (let i = 0; i < personSeat.length; i++) {
        for (let j = 0; j < personSeat[i].length; j++) {
            if (num == personSeat[i][j]) {
                console.log("Seat Taken");
                return 0;
            }
        }
    }

    // used to turn the seat on/off
    if (btnActive[num] == false) {
        document.getElementsByClassName("busSeat")[num2].style.background = "rgba(40, 50, 60, 1)";

        btnActive[num] = true;

        seat.push(num);
    } else {

        document.getElementsByClassName("busSeat")[num2].style.background = "rgb(125, 189, 224)";



        btnActive[num] = false;

        seat.splice(searchSeat(num), 1);
    }

    console.log("Reserve Seat" + seat);

}

// 
// this function shows you the reservtion you have made
function viewMyReservation() {
    console.log("VMR");

    console.log("VMR un" + userNum);
    console.log("VMR ps" + personSeat);


    try {
        clean(60);

        document.getElementById("yourSeat").innerHTML = "We reserved you seat " +
            "<pre style=\"font-size: 19px; font-weight: bold; color: black;\">" +
            "  " + personSeat[userNum].toString() + "</pre>";

        for (let i = 0; i < personSeat[userNum].length; i++) {
            document.getElementsByClassName("busSeat")[personSeat[userNum][i] + 60].style.background = "rgba(40, 50, 60, 0.1)";
        }
    } catch (error) {
        alert("Don't forget you have no reservation yet!");
    }
}

//
// this function shows you all the reservations
function viewAllReservation() {
    console.log("VAR");

    try {
        let table = "";

        for (let i = 0; i < personSeat.length; i++) {
            table += "<tr><td>" + lastName[i].toString() +
                "</td><td>" + firstName[i].toString() +
                "</td><td>" + personSeat[i].toString() + "</td></tr>";
        }

        document.getElementById("tableBody").innerHTML = table;
    } catch (error) {
        alert("Don't forget you have no reservation yet!");
    }
}

// 
// this function cleans the seats by making all seat avaliable
function clean(num) {
    console.log("Clean");

    for (let i = 0; i < 30; i++) {
        document.getElementsByClassName("busSeat")[i + num].style.background = "rgb(125, 189, 224)";
    }

    // set all active tn to false
    btnActive = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
}

// 
// this function searches the value in num and see if it is in seat[] i fit is in seat it will not add that seat num to seat
function searchSeat(num) {
    for (let i = 0; i < seat.length; i++) {
        if (seat[i] == num) {
            return i;
        }
    }
}

// 
// choosen makes all seats that has been taken to be dulled out and the avaliable seats to be hightlighed
function choosen(num) {
    console.log("refresh");
    for (let i = 0; i < 30; i++) {
        if (isActive[i] == true) {
            document.getElementsByClassName("busSeat")[i + num].style.background = " rgba(40, 50, 60, 0.1)";
        } else {
            document.getElementsByClassName("busSeat")[i + num].style.background = "rgb(125, 189, 224)";
        }
    }
}

// 
// choosen2 goes the extra way to check if the doneRegistration is true bedfore highlighting the seats
function choosen2(num) {
    for (let i = 0; i < 30; i++) {
        if (isActive[i] == true && doneRegistration == true) {
            document.getElementsByClassName("busSeat")[i + num].style.background = " rgba(40, 50, 60, 0.1)";
        } else if (isActive[i] == false) {
            document.getElementsByClassName("busSeat")[i + num].style.background = "rgb(125, 189, 224)";
        }
        else {
            console.log("view seat Missed!");
        }
    }
}

// 
// this function displau the input page for the user to signUp
function signUpFunction() {
    if (signUpBool === false) {
        signUpBool = true;
        signInBool = false;
        signUpContainer.style.display = "block";
        signInContainer.style.display = "none";
    } else {
        signUpBool = false;
        signInContainer.style.display = "none";
        signUpContainer.style.display = "none";
    }
}

// 
// this function displau the input page for the user to signIn
function signInFunction() {
    if (signInBool === false) {
        signInBool = true;
        signUpBool = false;
        signUpContainer.style.display = "none";
        signInContainer.style.display = "block";
    } else {
        signInBool = false;
        signInContainer.style.display = "none";
        signUpContainer.style.display = "none";
    }
}

// 
// the submit function will checck to see if you are signing Up of signing In using 1(sign UP) and 2(signIn)
function submit(num) {
    // the user is a new uswe and is signing up
    if (num == 1) {

        console.log("Sign Up");

        // if input field is empty do this 
        if (firstNameDOM.value == "" || lastNameDOM.value == "" || passwordDOM.value == "" || userNameDOM.value == "") {
            alert("Please enter your details");
        }//else do this 
        else {
            // assign user num to person number
            userNum = personNum;
            console.log("Submit function\nuserNum " + userNum);
            console.log("personNum " + personNum);

            // prepear the page
            clean(0);
            clean(30);
            choosen(0);
            choosen(30);
            access();

        }
    }

    // the user is an old user and is signing In
    if (num == 2) {
        console.log("Sign In");

        // i crete a variable to keep track if the user should be given access
        let accessVerifier = false;

        console.log("UserNum before loop " + userNum);

        // set userNum to 0
        userNum = 0;

        // if the input field is empty 
        if (tempUN.value == "" || tempPass.value == "") {
            alert("Please enter your details");
        }// else check if user is verified
        else {

            console.log("personNum " + personNum);
            
            // check user input with all inputs to see is user verified
            for (userNum = 0; userNum < personNum; userNum++) {

                // if user input is currect access verication 1 complete
                if (userName[userNum] == tempUN.value) {
                    console.log("Access verify 1!");
                    document.getElementById("wrongUserName").style.display = "none";
                    accessVerifier = true;
                } else {
                    console.log("Not access verify 1!");
                    document.getElementById("wrongUserName").style.display = "block";
                }

                // if password input is correct grant access
                if (password[userNum] == tempPass.value) {
                    console.log("Access verify 2!");
                    if (accessVerifier == true) {
                        document.getElementById("wrongPassword").style.display = "none";
                        access();
                        accessVerifier = false;

                        // prepare the page
                        clean(0);
                        clean(30);
                        choosen(0);
                        choosen(30);

                        console.log("userNum " + userNum);
                        break;
                    }

                } else {
                    console.log("Not access verify 2!");
                    document.getElementById("wrongPassword").style.display = "block";
                }
            }
        }
    }
}

// open all required field for the user
function access() {
    optionsContainer.style.display = "block";
    intro.style.display = "none";
    signUpContainer.style.display = "none";
    signInContainer.style.display = "none";

    console.log("submit");
    console.log("Person num " + personNum);
}

// 
// ths done function tells the program that the use has finished reservation
function done() {
    console.log("Done");

    // if the user has not reserve a seat do this
    if (seat.length == 0) {
        alert("You have not made any reservation!");
        doneRegistration = false;
    }// else prepare for reservation
     else {
        alert("Your reservation is being processed!");

        // set doneReservation to true
        doneRegistration = true;

        // set all seats that has been taken to true
        for (let i = 0; i < seat.length; i++) {
            isActive[seat[i]] = true;
        }

        // if the user was an old user do this
        if (signInBool == true) {

            // this function
            setActive();

            console.log("Before seat concat " + seat);
            console.log(`personSeat[${personNum}] = ${personSeat[personNum]}\n `);


            personSeat[userNum] = seat;
            console.log(`personSeat[${personNum}] = ${personSeat[personNum]}\nseat = ${seat}`);


            seat = [];

            console.log("Done empty seat " + seat);

            clean(0);
            clean(30);
            choosen(0);
            choosen(30);

            return 0;
        }

        // sets the isActive to the correct value
        setActive();

        console.log("Before seat concat " + seat);
        console.log(`personSeat[${personNum}] = ${personSeat[personNum]}\n `);

        // assigns the value of seat to personSeat
        personSeat[personNum] = seat;
        console.log(`personSeat[${personNum}] = ${personSeat[personNum]}\nseat = ${seat}`);

        // empty seat
        seat = [];

        console.log("Done empty seat " + seat);

        // save the user details 
        firstName[personNum] = firstNameDOM.value;
        lastName[personNum] = lastNameDOM.value;
        userName[personNum] = userNameDOM.value;
        password[personNum] = passwordDOM.value;

        // prepare...
        clean(0);
        clean(30);
        choosen(0);
        choosen(30);
    }

}

// 
// sets the current user seats to false
function setActive() {
    if (personSeat[userNum] == undefined) {
        console.log("New User");
    }
    else {
        for (let i = 0; i < personSeat[userNum].length; i++) {
            isActive[personSeat[userNum][i]] = false;
        }
    }
}

// 
// the clear function removes the choosen seats of the current user
function clearSeat() {
    console.log("Seat cleaned");
    if (personSeat[userNum] == undefined || personSeat[userNum] == []) {
        alert("New User, Reserve a seat first!");
    }
    else {
        for (let i = 0; i < personSeat[userNum].length; i++) {
            isActive[personSeat[userNum][i]] = false;
        }

        seat = [];
        personSeat[userNum] = [];

        clean(30);
        choosen2(30);
    }
}

// 
// the display option displays the current page for the user
function optionDisplay(display1, display2, display3, display4) {
    intro.style.display = "none";
    option1.style.display = display1;
    option2.style.display = display2;
    option3.style.display = display3;
    option4.style.display = display4;
}

// 
// this removes all the options and takes you back to the intro page
function quitDisplay() {
    intro.style.display = "block";
    option1.style.display = "none";
    option2.style.display = "none";
    option3.style.display = "none";
    option4.style.display = "none";
    optionsContainer.style.display = "none";
}

// 
// easily remove the user details from the program
function removeDetails() {
    personSeat[personNum] = [];
    firstName[personNum] = [];
    lastName[personNum] = [];
    userName[personNum] = [];
    password[personNum] = [];
    seat = [];
}

// 
// this sets the fake user and their details
function setValue() {
    personNum = 0;
    for (let i = 0; i < 5; i++, personNum++) {
        let u = [];
        u[0] = Math.floor(Math.random() * 30);
        u[1] = Math.floor(Math.random() * 30);
        u[2] = Math.floor(Math.random() * 30);
        firstName[i] = i + "A";
        lastName[i] = i + "A";
        userName[i] = i + "A";
        password[i] = i + "A";
        personSeat[i] = u;
        for (let j = 0; j < personSeat[i].length; j++) {
            isActive[personSeat[i][j]] = true;
        }
    }
}

// THANK YOU FOR JOINNING ME IN MY JOURNEY