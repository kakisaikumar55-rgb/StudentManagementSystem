const DEPARTMENT_API = "/api/departments";

let departments = [];


document.addEventListener(
    "DOMContentLoaded",
    loadDepartments
);


async function loadDepartments() {

    try {

        const response =
            await fetch(DEPARTMENT_API);

        if (!response.ok) {
            throw new Error("Failed to load departments");
        }

        departments = await response.json();

        displayDepartments(departments);

    } catch (error) {

        console.error(error);

        alert("Unable to load departments.");

    }
}


function displayDepartments(data) {

    const table =
        document.getElementById("departmentsTable");

    table.innerHTML = "";


    if (data.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="7" style="text-align:center;">
                    No departments found
                </td>
            </tr>
        `;

        return;
    }


    data.forEach(department => {

        table.innerHTML += `
            <tr>

                <td>${department.id}</td>

                <td>${department.departmentId}</td>

                <td>${department.departmentName}</td>

                <td>${department.hod || ""}</td>

                <td>${department.email || ""}</td>

                <td>${department.phone || ""}</td>

                <td>

                    <button
                        class="action-btn edit-btn"
                        onclick="editDepartment(${department.id})">
                        Edit
                    </button>

                    <button
                        class="action-btn delete-btn"
                        onclick="deleteDepartment(${department.id})">
                        Delete
                    </button>

                </td>

            </tr>
        `;
    });
}


function searchDepartments() {

    const search =
        document.getElementById("departmentSearch")
            .value
            .toLowerCase();


    const filtered =
        departments.filter(department =>

            String(department.departmentId)
                .toLowerCase()
                .includes(search)

            ||

            String(department.departmentName)
                .toLowerCase()
                .includes(search)

            ||

            String(department.hod)
                .toLowerCase()
                .includes(search)

        );


    displayDepartments(filtered);
}


function openDepartmentForm() {

    document.getElementById("departmentForm")
        .reset();

    document.getElementById("departmentDbId")
        .value = "";

    document.getElementById("departmentModalTitle")
        .textContent = "Add Department";

    document.getElementById("departmentModal")
        .classList.add("show");
}


function closeDepartmentForm() {

    document.getElementById("departmentModal")
        .classList.remove("show");
}


document.getElementById("departmentForm")
    .addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();


            const id =
                document.getElementById(
                    "departmentDbId"
                ).value;


            const department = {

                departmentId:
                    document.getElementById(
                        "departmentId"
                    ).value,

                departmentName:
                    document.getElementById(
                        "departmentName"
                    ).value,

                hod:
                    document.getElementById(
                        "departmentHod"
                    ).value,

                email:
                    document.getElementById(
                        "departmentEmail"
                    ).value,

                phone:
                    document.getElementById(
                        "departmentPhone"
                    ).value

            };


            try {

                const response = await fetch(

                    id
                        ? `${DEPARTMENT_API}/${id}`
                        : DEPARTMENT_API,

                    {

                        method: id ? "PUT" : "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(department)

                    }

                );


                if (!response.ok) {
                    throw new Error("Save failed");
                }


                alert(
                    id
                        ? "Department updated successfully"
                        : "Department added successfully"
                );


                closeDepartmentForm();

                loadDepartments();


            } catch (error) {

                console.error(error);

                alert(
                    "Unable to save department."
                );

            }

        }
    );


function editDepartment(id) {

    const department =
        departments.find(
            item => item.id === id
        );


    if (!department) return;


    document.getElementById(
        "departmentDbId"
    ).value = department.id;


    document.getElementById(
        "departmentId"
    ).value = department.departmentId;


    document.getElementById(
        "departmentName"
    ).value = department.departmentName;


    document.getElementById(
        "departmentHod"
    ).value = department.hod || "";


    document.getElementById(
        "departmentEmail"
    ).value = department.email || "";


    document.getElementById(
        "departmentPhone"
    ).value = department.phone || "";


    document.getElementById(
        "departmentModalTitle"
    ).textContent = "Edit Department";


    document.getElementById(
        "departmentModal"
    ).classList.add("show");
}


async function deleteDepartment(id) {

    if (
        !confirm(
            "Are you sure you want to delete this department?"
        )
    ) {
        return;
    }


    try {

        const response =
            await fetch(
                `${DEPARTMENT_API}/${id}`,
                {
                    method: "DELETE"
                }
            );


        if (!response.ok) {
            throw new Error("Delete failed");
        }


        alert(
            "Department deleted successfully"
        );

        loadDepartments();


    } catch (error) {

        console.error(error);

        alert(
            "Unable to delete department."
        );

    }
}