const ATTENDANCE_API = "/api/attendance";

let attendanceRecords = [];


document.addEventListener(
    "DOMContentLoaded",
    loadAttendance
);


async function loadAttendance() {

    try {

        const response =
            await fetch(ATTENDANCE_API);


        if (!response.ok) {
            throw new Error(
                "Failed to load attendance"
            );
        }


        attendanceRecords =
            await response.json();


        displayAttendance(
            attendanceRecords
        );


    } catch (error) {

        console.error(error);

        alert(
            "Unable to load attendance."
        );

    }
}


function displayAttendance(data) {

    const table =
        document.getElementById(
            "attendanceTable"
        );


    table.innerHTML = "";


    if (data.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="7"
                    style="text-align:center;">
                    No attendance records found
                </td>
            </tr>
        `;

        return;
    }


    data.forEach(attendance => {

        const statusClass =
            attendance.status === "Present"
                ? "status-present"
                : "status-absent";


        table.innerHTML += `
            <tr>

                <td>${attendance.id}</td>

                <td>${attendance.studentId}</td>

                <td>${attendance.studentName}</td>

                <td>${attendance.subject}</td>

                <td>${attendance.date}</td>

                <td>

                    <span class="status ${statusClass}">
                        ${attendance.status}
                    </span>

                </td>

                <td>

                    <button
                        class="action-btn edit-btn"
                        onclick="editAttendance(${attendance.id})">
                        Edit
                    </button>

                    <button
                        class="action-btn delete-btn"
                        onclick="deleteAttendance(${attendance.id})">
                        Delete
                    </button>

                </td>

            </tr>
        `;
    });
}


function searchAttendance() {

    const search =
        document.getElementById(
            "attendanceSearch"
        )
        .value
        .toLowerCase();


    const filtered =
        attendanceRecords.filter(
            attendance =>

                String(
                    attendance.studentId
                )
                .toLowerCase()
                .includes(search)

                ||

                String(
                    attendance.studentName
                )
                .toLowerCase()
                .includes(search)

                ||

                String(
                    attendance.subject
                )
                .toLowerCase()
                .includes(search)

                ||

                String(
                    attendance.status
                )
                .toLowerCase()
                .includes(search)
        );


    displayAttendance(filtered);
}


function openAttendanceForm() {

    document.getElementById(
        "attendanceForm"
    ).reset();


    document.getElementById(
        "attendanceDbId"
    ).value = "";


    document.getElementById(
        "attendanceModalTitle"
    ).textContent = "Add Attendance";


    document.getElementById(
        "attendanceModal"
    ).classList.add("show");
}


function closeAttendanceForm() {

    document.getElementById(
        "attendanceModal"
    ).classList.remove("show");
}


document.getElementById(
    "attendanceForm"
)
.addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();


        const id =
            document.getElementById(
                "attendanceDbId"
            ).value;


        const attendance = {

            studentId:
                document.getElementById(
                    "attendanceStudentId"
                ).value,

            studentName:
                document.getElementById(
                    "attendanceStudentName"
                ).value,

            subject:
                document.getElementById(
                    "attendanceSubject"
                ).value,

            date:
                document.getElementById(
                    "attendanceDate"
                ).value,

            status:
                document.getElementById(
                    "attendanceStatus"
                ).value

        };


        try {

            const response =
                await fetch(

                    id
                        ? `${ATTENDANCE_API}/${id}`
                        : ATTENDANCE_API,

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
                            JSON.stringify(
                                attendance
                            )

                    }
                );


            if (!response.ok) {
                throw new Error(
                    "Save failed"
                );
            }


            alert(
                id
                    ? "Attendance updated successfully"
                    : "Attendance added successfully"
            );


            closeAttendanceForm();

            loadAttendance();


        } catch (error) {

            console.error(error);

            alert(
                "Unable to save attendance."
            );

        }

    }
);


function editAttendance(id) {

    const attendance =
        attendanceRecords.find(
            item => item.id === id
        );


    if (!attendance) return;


    document.getElementById(
        "attendanceDbId"
    ).value = attendance.id;


    document.getElementById(
        "attendanceStudentId"
    ).value =
        attendance.studentId;


    document.getElementById(
        "attendanceStudentName"
    ).value =
        attendance.studentName;


    document.getElementById(
        "attendanceSubject"
    ).value =
        attendance.subject;


    document.getElementById(
        "attendanceDate"
    ).value =
        attendance.date;


    document.getElementById(
        "attendanceStatus"
    ).value =
        attendance.status;


    document.getElementById(
        "attendanceModalTitle"
    ).textContent =
        "Edit Attendance";


    document.getElementById(
        "attendanceModal"
    ).classList.add("show");
}


async function deleteAttendance(id) {

    if (
        !confirm(
            "Are you sure you want to delete this attendance record?"
        )
    ) {
        return;
    }


    try {

        const response =
            await fetch(
                `${ATTENDANCE_API}/${id}`,
                {
                    method: "DELETE"
                }
            );


        if (!response.ok) {
            throw new Error(
                "Delete failed"
            );
        }


        alert(
            "Attendance deleted successfully"
        );


        loadAttendance();


    } catch (error) {

        console.error(error);

        alert(
            "Unable to delete attendance."
        );

    }
}