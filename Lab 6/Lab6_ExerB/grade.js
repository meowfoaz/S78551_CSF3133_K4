/*
 * PART 1: LIST OF IDENTIFIED AND FIXED ERRORS
 * Error 1  (grade.html, Line 9):  Missing 'return' in onsubmit="return checkMark()", causing page reload.
 * Error 2  (grade.html, Line 17): Typo in onclick="showtable()" -> fixed casing to showTable().
 * Error 3  (grade.html, Line 19): Wrong script filename "grades.js" -> fixed to "grade.js".
 * Error 4  (grade.js, Line 5):    Assignment '=' instead of comparison '===' in if (name = "").
 * Error 5  (grade.js, Line 9):    Typo in isNan(mark) -> fixed casing to isNaN(mark).
 * Error 6  (grade.js, Line 14):   Used '&&' instead of '||' in range check (mark < 0 && mark > 100).
 * Error 7  (grade.js, Line 28):   Typo in getElementByID -> fixed casing to getElementById.
 * Error 8  (grade.js, Line 30):   British spelling 'style.colour' -> fixed to 'style.color'.
 * Error 9  (grade.js, Line 31):   'return true;' submitted the form and wiped the result -> changed to 'return false;'.
 * Error 10 (grade.js, Line 38):   Loop started at i = 1, skipping Grade A -> changed to i = 0.
 * Error 11 (grade.js, Line 42):   Typo in 'innerHtml' -> fixed casing to 'innerHTML'.
 */

function checkMark() {
    let name = document.forms["gradeForm"]["name"].value.trim();
    let mark = document.forms["gradeForm"]["mark"].value.trim();

    // Fixed Error 4: Use === for comparison instead of =
    if (name === "") {
        alert("Name must be filled out.");
        return false;
    }

    // Part 2 (Task 5): Check if the mark field is empty
    if (mark === "") {
        alert("Mark field cannot be empty.");
        return false;
    }

    // Fixed Error 5: Correct capitalization for isNaN()
    if (isNaN(mark)) {
        alert("Please enter a valid numeric value.");
        return false;
    }

    mark = parseInt(mark);

    // Fixed Error 6: Use logical OR (||) so marks below 0 OR above 100 trigger the alert
    if (mark < 0 || mark > 100) {
        alert("Mark must be between 0 and 100.");
        return false;
    }

    let grade;
    let color;

    // Part 2 (Task 6): Set grade and corresponding text color
    if (mark >= 80) {
        grade = "A";
        color = "green";
    } else if (mark >= 65) {
        grade = "B";
        color = "green";
    } else if (mark >= 50) {
        grade = "C";
        color = "orange";
    } else {
        grade = "F";
        color = "red";
    }

    // Part 2 (Task 8): Get current date and time using Date()
    let now = new Date();

    // Fixed Errors 7 & 8: Correct getElementById casing and American 'color' property
    let resultEl = document.getElementById("result");
    resultEl.innerHTML = name + " got grade " + grade + "<br>Checked on: " + now;
    resultEl.style.color = color;

    // Fixed Error 9: Return false so the form does not refresh the page
    return false;
}

// Part 2 (Task 7): Generate a random whole number from 0 to 100 into the mark field
function generateRandomMark() {
    document.getElementById("mark").value = Math.floor(Math.random() * 101);
}

function showTable() {
    let grades = ["A", "B", "C", "F"];
    let ranges = ["80-100", "65-79", "50-64", "0-49"];
    let tableHTML = "<table><tr><th>Grade</th><th>Mark range</th></tr>";

    // Fixed Error 10: Start loop at i = 0 so Grade A is included
    for (let i = 0; i < grades.length; i++) {
        tableHTML += "<tr><td>" + grades[i] + "</td><td>" + ranges[i] + "</td></tr>";
    }

    tableHTML += "</table>";

    // Fixed Error 11: Correct capitalization for innerHTML
    document.getElementById("tableContainer").innerHTML = tableHTML;
}