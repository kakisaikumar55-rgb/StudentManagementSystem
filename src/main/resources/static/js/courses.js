const COURSE_API = "/api/courses";

let courses = [];


document.addEventListener("DOMContentLoaded", loadCourses);


async function loadCourses() {

    try {

        const response = await fetch(COURSE_API);

        if (!response.ok) {
            throw new Error("Failed to load courses");
        }

        courses = await response.json();

        displayCourses(courses);

    } catch (error) {

        console.error(error);

        alert("Unable to load courses.");

    }
}


function displayCourses(data) {

    const table =
        document.getElementById("coursesTable");

    table.innerHTML = "";

    if (data.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="7" style="text-align:center;">
                    No courses found
                </td>
            </tr>
        `;

        return;
    }


    data.forEach(course => {

        table.innerHTML += `
            <tr>

                <td>${course.id}</td>

                <td>${course.courseId}</td>

                <td>${course.courseName}</td>

                <td>${course.department}</td>

                <td>${course.duration}</td>

                <td>${course.description || ""}</td>

                <td>

                    <button
                        class="action-btn edit-btn"
                        onclick="editCourse(${course.id})">
                        Edit
                    </button>

                    <button
                        class="action-btn delete-btn"
                        onclick="deleteCourse(${course.id})">
                        Delete
                    </button>

                </td>

            </tr>
        `;
    });
}


function searchCourses() {

    const search =
        document.getElementById("courseSearch")
            .value
            .toLowerCase();

    const filtered = courses.filter(course =>

        String(course.courseId)
            .toLowerCase()
            .includes(search)

        ||

        String(course.courseName)
            .toLowerCase()
            .includes(search)

        ||

        String(course.department)
            .toLowerCase()
            .includes(search)
    );

    displayCourses(filtered);
}


function openCourseForm() {

    document.getElementById("courseForm").reset();

    document.getElementById("courseDbId").value = "";

    document.getElementById("courseModalTitle")
        .textContent = "Add Course";

    document.getElementById("courseModal")
        .classList.add("show");
}


function closeCourseForm() {

    document.getElementById("courseModal")
        .classList.remove("show");
}


document.getElementById("courseForm")
    .addEventListener("submit", async function(event) {

        event.preventDefault();


        const id =
            document.getElementById("courseDbId").value;


        const course = {

            courseId:
                document.getElementById("courseId").value,

            courseName:
                document.getElementById("courseName").value,

            department:
                document.getElementById("courseDepartment").value,

            duration:
                document.getElementById("courseDuration").value,

            description:
                document.getElementById("courseDescription").value

        };


        try {

            const response = await fetch(

                id
                    ? `${COURSE_API}/${id}`
                    : COURSE_API,

                {

                    method: id ? "PUT" : "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(course)

                }

            );


            if (!response.ok) {
                throw new Error("Save failed");
            }


            alert(
                id
                    ? "Course updated successfully"
                    : "Course added successfully"
            );


            closeCourseForm();

            loadCourses();


        } catch (error) {

            console.error(error);

            alert("Unable to save course.");

        }

    });


function editCourse(id) {

    const course =
        courses.find(item => item.id === id);

    if (!course) return;


    document.getElementById("courseDbId").value =
        course.id;

    document.getElementById("courseId").value =
        course.courseId;

    document.getElementById("courseName").value =
        course.courseName;

    document.getElementById("courseDepartment").value =
        course.department;

    document.getElementById("courseDuration").value =
        course.duration;

    document.getElementById("courseDescription").value =
        course.description || "";


    document.getElementById("courseModalTitle")
        .textContent = "Edit Course";


    document.getElementById("courseModal")
        .classList.add("show");
}


async function deleteCourse(id) {

    if (!confirm("Are you sure you want to delete this course?")) {
        return;
    }


    try {

        const response =
            await fetch(`${COURSE_API}/${id}`, {
                method: "DELETE"
            });


        if (!response.ok) {
            throw new Error("Delete failed");
        }


        alert("Course deleted successfully");

        loadCourses();


    } catch (error) {

        console.error(error);

        alert("Unable to delete course.");

    }
}