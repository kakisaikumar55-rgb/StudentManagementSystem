const API = "/api";

async function loadDashboard() {

    try {

        const studentsResponse = await fetch(`${API}/students`);
        const coursesResponse = await fetch(`${API}/courses`);
        const departmentsResponse = await fetch(`${API}/departments`);
        const marksResponse = await fetch(`${API}/marks`);

        const students = await studentsResponse.json();
        const courses = await coursesResponse.json();
        const departments = await departmentsResponse.json();
        const marks = await marksResponse.json();

        document.getElementById("studentCount").textContent = students.length;
        document.getElementById("courseCount").textContent = courses.length;
        document.getElementById("departmentCount").textContent = departments.length;
        document.getElementById("marksCount").textContent = marks.length;

        displayRecentStudents(students);

    } catch (error) {

        console.error("Dashboard error:", error);

    }
}


function displayRecentStudents(students) {

    const table = document.getElementById("recentStudents");

    table.innerHTML = "";

    const recentStudents = students.slice(-5).reverse();

    if (recentStudents.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="5" style="text-align:center;">
                    No students found
                </td>
            </tr>
        `;

        return;
    }

    recentStudents.forEach(student => {

        const statusClass =
            student.status === "Active"
                ? "status-active"
                : "status-inactive";

        table.innerHTML += `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.department}</td>
                <td>${student.year}</td>
                <td>
                    <span class="status ${statusClass}">
                        ${student.status}
                    </span>
                </td>
            </tr>
        `;
    });
}


document.addEventListener("DOMContentLoaded", loadDashboard);