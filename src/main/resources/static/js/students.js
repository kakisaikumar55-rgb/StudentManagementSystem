// ======================================================
// CAMPUSONE STUDENT MANAGEMENT
// ======================================================


// Spring Boot REST API
const API_URL = "/api/students";


// Store students in browser memory
let students = [];


// Current editing student ID
let editingStudentId = null;


// ======================================================
// PAGE LOAD
// ======================================================

document.addEventListener("DOMContentLoaded", function () {

    loadStudents();

});


// ======================================================
// LOAD STUDENTS
// ======================================================

async function loadStudents() {

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {

            throw new Error(
                "Unable to load students. HTTP Status: "
                + response.status
            );

        }

        students = await response.json();

        displayStudents(students);

    } catch (error) {

        console.error("Load students error:", error);

        alert(
            "Unable to load students.\n\n" +
            "Please check whether the Spring Boot API is running."
        );

    }

}


// ======================================================
// DISPLAY STUDENTS
// ======================================================

function displayStudents(studentList) {

    const table =
        document.getElementById("studentsTable");


    table.innerHTML = "";


    if (!studentList || studentList.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="8"
                    style="text-align:center;padding:25px;">

                    No students found.

                </td>
            </tr>
        `;

        return;

    }


    studentList.forEach(function (student) {

        const row = document.createElement("tr");


        row.innerHTML = `

            <td>
                ${student.id ?? ""}
            </td>

            <td>
                ${escapeHtml(student.studentId ?? "")}
            </td>

            <td>
                ${escapeHtml(student.name ?? "")}
            </td>

            <td>
                ${escapeHtml(student.email ?? "")}
            </td>

            <td>
                ${escapeHtml(student.department ?? "")}
            </td>

            <td>
                ${escapeHtml(student.year ?? "")}
            </td>

            <td>

                <span class="status-badge">

                    ${escapeHtml(student.status ?? "Active")}

                </span>

            </td>

            <td>

                <button
                    class="edit-btn"
                    onclick="editStudent(${student.id})">

                    Edit

                </button>


                <button
                    class="delete-btn"
                    onclick="deleteStudent(${student.id})">

                    Delete

                </button>

            </td>

        `;


        table.appendChild(row);

    });

}


// ======================================================
// OPEN ADD STUDENT FORM
// ======================================================

function openStudentForm() {

    editingStudentId = null;


    document.getElementById(
        "studentModalTitle"
    ).textContent = "Add Student";


    document.getElementById(
        "saveStudentButton"
    ).textContent = "Save Student";


    document.getElementById(
        "studentForm"
    ).reset();


    document.getElementById(
        "studentDbId"
    ).value = "";


    document.getElementById(
        "studentModal"
    ).style.display = "flex";

}


// ======================================================
// CLOSE STUDENT FORM
// ======================================================

function closeStudentForm() {

    document.getElementById(
        "studentModal"
    ).style.display = "none";


    editingStudentId = null;

}


// ======================================================
// ADD / UPDATE STUDENT
// ======================================================

document.getElementById(
    "studentForm"
).addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        const student = {

            studentId:
                document.getElementById(
                    "studentId"
                ).value.trim(),

            name:
                document.getElementById(
                    "studentName"
                ).value.trim(),

            email:
                document.getElementById(
                    "studentEmail"
                ).value.trim(),

            phone:
                document.getElementById(
                    "studentPhone"
                ).value.trim(),

            gender:
                document.getElementById(
                    "studentGender"
                ).value,

            department:
                document.getElementById(
                    "studentDepartment"
                ).value,

            year:
                document.getElementById(
                    "studentYear"
                ).value,

            status:
                document.getElementById(
                    "studentStatus"
                ).value

        };


        // Basic validation
        if (
            !student.studentId ||
            !student.name ||
            !student.email ||
            !student.department
        ) {

            alert(
                "Please fill all required fields."
            );

            return;

        }


        // UPDATE
        if (editingStudentId !== null) {

            await updateStudent(
                editingStudentId,
                student
            );

        }

        // ADD
        else {

            await addStudent(student);

        }

    }
);


// ======================================================
// ADD STUDENT
// ======================================================

async function addStudent(student) {

    try {

        const response = await fetch(
            API_URL,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify(student)
            }
        );


        if (!response.ok) {

            const errorText =
                await response.text();

            console.error(
                "Add student error:",
                errorText
            );

            throw new Error(
                "HTTP " + response.status
            );

        }


        alert(
            "Student added successfully."
        );


        closeStudentForm();


        await loadStudents();


    } catch (error) {

        console.error(
            "Add student error:",
            error
        );

        alert(
            "Unable to add student.\n\n" +
            "Please check the Spring Boot API."
        );

    }

}


// ======================================================
// EDIT STUDENT
// ======================================================

function editStudent(id) {

    const student = students.find(
        function (item) {

            return Number(item.id) === Number(id);

        }
    );


    if (!student) {

        alert(
            "Student details not found."
        );

        return;

    }


    editingStudentId = student.id;


    document.getElementById(
        "studentModalTitle"
    ).textContent = "Edit Student";


    document.getElementById(
        "saveStudentButton"
    ).textContent = "Update Student";


    document.getElementById(
        "studentDbId"
    ).value = student.id ?? "";


    document.getElementById(
        "studentId"
    ).value = student.studentId ?? "";


    document.getElementById(
        "studentName"
    ).value = student.name ?? "";


    document.getElementById(
        "studentEmail"
    ).value = student.email ?? "";


    document.getElementById(
        "studentPhone"
    ).value = student.phone ?? "";


    document.getElementById(
        "studentGender"
    ).value = student.gender ?? "Male";


    document.getElementById(
        "studentDepartment"
    ).value = student.department ?? "";


    document.getElementById(
        "studentYear"
    ).value = student.year ?? "1st Year";


    document.getElementById(
        "studentStatus"
    ).value = student.status ?? "Active";


    document.getElementById(
        "studentModal"
    ).style.display = "flex";

}


// ======================================================
// UPDATE STUDENT
// ======================================================

async function updateStudent(id, student) {

    try {

        const response = await fetch(
            `${API_URL}/${id}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify(student)
            }
        );


        if (!response.ok) {

            const errorText =
                await response.text();

            console.error(
                "Update student error:",
                errorText
            );

            throw new Error(
                "HTTP " + response.status
            );

        }


        alert(
            "Student updated successfully."
        );


        closeStudentForm();


        await loadStudents();


    } catch (error) {

        console.error(
            "Update student error:",
            error
        );

        alert(
            "Unable to update student.\n\n" +
            "Please check the Spring Boot PUT API."
        );

    }

}


// ======================================================
// DELETE STUDENT
// ======================================================

async function deleteStudent(id) {

    const student = students.find(
        function (item) {

            return Number(item.id) === Number(id);

        }
    );


    const studentName =
        student
            ? student.name
            : "this student";


    const confirmed = confirm(
        "Are you sure you want to delete " +
        studentName +
        "?"
    );


    if (!confirmed) {

        return;

    }


    try {

        const response = await fetch(
            `${API_URL}/${id}`,
            {
                method: "DELETE"
            }
        );


        if (!response.ok) {

            const errorText =
                await response.text();

            console.error(
                "Delete student error:",
                errorText
            );

            throw new Error(
                "HTTP " + response.status
            );

        }


        alert(
            "Student deleted successfully."
        );


        await loadStudents();


    } catch (error) {

        console.error(
            "Delete student error:",
            error
        );

        alert(
            "Unable to delete student.\n\n" +
            "Please check the Spring Boot DELETE API."
        );

    }

}


// ======================================================
// SEARCH STUDENTS
// ======================================================

function searchStudents() {

    const searchValue =
        document.getElementById(
            "studentSearch"
        ).value
        .toLowerCase()
        .trim();


    if (!searchValue) {

        displayStudents(students);

        return;

    }


    const filteredStudents =
        students.filter(
            function (student) {

                return (

                    String(
                        student.id ?? ""
                    )
                    .toLowerCase()
                    .includes(searchValue)

                    ||

                    String(
                        student.studentId ?? ""
                    )
                    .toLowerCase()
                    .includes(searchValue)

                    ||

                    String(
                        student.name ?? ""
                    )
                    .toLowerCase()
                    .includes(searchValue)

                    ||

                    String(
                        student.email ?? ""
                    )
                    .toLowerCase()
                    .includes(searchValue)

                    ||

                    String(
                        student.department ?? ""
                    )
                    .toLowerCase()
                    .includes(searchValue)

                );

            }
        );


    displayStudents(filteredStudents);

}


// ======================================================
// LOGOUT
// ======================================================

function logoutUser(event) {

    event.preventDefault();


    const confirmed = confirm(
        "Are you sure you want to logout?"
    );


    if (!confirmed) {

        return;

    }


    localStorage.removeItem(
        "loggedIn"
    );


    localStorage.removeItem(
        "username"
    );


    window.location.href =
        "index.html";

}


// ======================================================
// HTML SECURITY
// ======================================================

function escapeHtml(value) {

    return String(value)

        .replaceAll("&", "&amp;")

        .replaceAll("<", "&lt;")

        .replaceAll(">", "&gt;")

        .replaceAll('"', "&quot;")

        .replaceAll("'", "&#039;");

}