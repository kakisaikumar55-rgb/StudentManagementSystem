const MARKS_API = "/api/marks";

let marks = [];


document.addEventListener("DOMContentLoaded", loadMarks);


async function loadMarks() {

    try {

        const response = await fetch(MARKS_API);

        if (!response.ok) {
            throw new Error("Failed to load marks");
        }

        marks = await response.json();

        displayMarks(marks);

    } catch (error) {

        console.error(error);

        alert("Unable to load marks.");

    }
}


function displayMarks(data) {

    const table =
        document.getElementById("marksTable");

    table.innerHTML = "";


    if (data.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="8" style="text-align:center;">
                    No marks records found
                </td>
            </tr>
        `;

        return;
    }


    data.forEach(mark => {

        const resultClass =
            mark.result === "Pass"
                ? "status-pass"
                : "status-fail";


        table.innerHTML += `
            <tr>

                <td>${mark.id}</td>

                <td>${mark.studentId}</td>

                <td>${mark.subject}</td>

                <td>${mark.marks}</td>

                <td>${mark.totalMarks}</td>

                <td>${mark.grade}</td>

                <td>
                    <span class="status ${resultClass}">
                        ${mark.result}
                    </span>
                </td>

                <td>

                    <button
                        class="action-btn edit-btn"
                        onclick="editMarks(${mark.id})">
                        Edit
                    </button>

                    <button
                        class="action-btn delete-btn"
                        onclick="deleteMarks(${mark.id})">
                        Delete
                    </button>

                </td>

            </tr>
        `;
    });
}


function searchMarks() {

    const search =
        document.getElementById("marksSearch")
            .value
            .toLowerCase();


    const filtered =
        marks.filter(mark =>

            String(mark.studentId)
                .toLowerCase()
                .includes(search)

            ||

            String(mark.subject)
                .toLowerCase()
                .includes(search)

        );


    displayMarks(filtered);
}


function openMarksForm() {

    document.getElementById("marksForm")
        .reset();

    document.getElementById("marksDbId")
        .value = "";

    document.getElementById("marksModalTitle")
        .textContent = "Add Marks";

    document.getElementById("marksTotal")
        .value = 100;

    document.getElementById("marksModal")
        .classList.add("show");
}


function closeMarksForm() {

    document.getElementById("marksModal")
        .classList.remove("show");
}


document.getElementById("marksForm")
    .addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();


            const id =
                document.getElementById(
                    "marksDbId"
                ).value;


            const mark = {

                studentId:
                    document.getElementById(
                        "marksStudentId"
                    ).value,

                subject:
                    document.getElementById(
                        "marksSubject"
                    ).value,

                marks:
                    Number(
                        document.getElementById(
                            "marksValue"
                        ).value
                    ),

                totalMarks:
                    Number(
                        document.getElementById(
                            "marksTotal"
                        ).value
                    ),

                grade:
                    document.getElementById(
                        "marksGrade"
                    ).value,

                result:
                    document.getElementById(
                        "marksResult"
                    ).value

            };


            try {

                const response =
                    await fetch(

                        id
                            ? `${MARKS_API}/${id}`
                            : MARKS_API,

                        {

                            method:
                                id
                                    ? "PUT"
                                    : "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify(mark)

                        }
                    );


                if (!response.ok) {
                    throw new Error("Save failed");
                }


                alert(
                    id
                        ? "Marks updated successfully"
                        : "Marks added successfully"
                );


                closeMarksForm();

                loadMarks();


            } catch (error) {

                console.error(error);

                alert(
                    "Unable to save marks."
                );

            }

        }
    );


function editMarks(id) {

    const mark =
        marks.find(
            item => item.id === id
        );


    if (!mark) return;


    document.getElementById(
        "marksDbId"
    ).value = mark.id;


    document.getElementById(
        "marksStudentId"
    ).value = mark.studentId;


    document.getElementById(
        "marksSubject"
    ).value = mark.subject;


    document.getElementById(
        "marksValue"
    ).value = mark.marks;


    document.getElementById(
        "marksTotal"
    ).value = mark.totalMarks;


    document.getElementById(
        "marksGrade"
    ).value = mark.grade;


    document.getElementById(
        "marksResult"
    ).value = mark.result;


    document.getElementById(
        "marksModalTitle"
    ).textContent = "Edit Marks";


    document.getElementById(
        "marksModal"
    ).classList.add("show");
}


async function deleteMarks(id) {

    if (
        !confirm(
            "Are you sure you want to delete this marks record?"
        )
    ) {
        return;
    }


    try {

        const response =
            await fetch(
                `${MARKS_API}/${id}`,
                {
                    method: "DELETE"
                }
            );


        if (!response.ok) {
            throw new Error("Delete failed");
        }


        alert(
            "Marks deleted successfully"
        );

        loadMarks();


    } catch (error) {

        console.error(error);

        alert(
            "Unable to delete marks."
        );

    }
}