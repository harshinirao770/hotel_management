/* ================= LOGIN ================= */

function login(event) {

    event.preventDefault();

    const username =
        document.getElementById("username").value;

    const password =
        document.getElementById("password").value;


    if (username === "MAYS" && password === "mays@16") {

        document
            .getElementById("loginPage")
            .classList.add("hidden");

        document
            .getElementById("app")
            .classList.remove("hidden");

    } else {

        alert(
            "Invalid login. Please use the demo credentials shown below the form."
        );

    }
}


/* ================= LOGOUT ================= */

function logout() {

    document
        .getElementById("app")
        .classList.add("hidden");

    document
        .getElementById("loginPage")
        .classList.remove("hidden");

}


/* ================= PAGE NAVIGATION ================= */

function showPage(pageName, button) {

    const pages =
        document.querySelectorAll(".page");

    pages.forEach(page => {
        page.classList.remove("active-page");
    });


    document
        .getElementById(pageName)
        .classList.add("active-page");


    const menuItems =
        document.querySelectorAll(".menu-item");

    menuItems.forEach(item => {
        item.classList.remove("active");
    });


    if (button) {
        button.classList.add("active");
    }


    updatePageTitle(pageName);

}


function showPageByName(pageName) {

    const menuItems =
        document.querySelectorAll(".menu-item");

    let selectedButton = null;

    menuItems.forEach(item => {

        if (
            item.getAttribute("onclick") &&
            item.getAttribute("onclick")
                .includes("'" + pageName + "'")
        ) {

            selectedButton = item;

        }

    });


    showPage(pageName, selectedButton);
}


function updatePageTitle(pageName) {

    const titles = {

        dashboard: [
            "Dashboard",
            "Overview of hotel operations"
        ],

        rooms: [
            "Room Management",
            "Manage hotel rooms and availability"
        ],

        customers: [
            "Customer Management",
            "Manage registered customers"
        ],

        bookings: [
            "Booking Management",
            "Track hotel reservations"
        ],

        payments: [
            "Payment Management",
            "Monitor hotel transactions"
        ],

        frames: [
            "Knowledge Frames",
            "Frame-Based Knowledge Representation"
        ],

        settings: [
            "System Settings",
            "Configure hotel management system"
        ]

    };


    document.getElementById("pageTitle")
        .innerText = titles[pageName][0];

    document.getElementById("pageDescription")
        .innerText = titles[pageName][1];

}


/* ================= DATE ================= */

const dateElement =
    document.getElementById("currentDate");

if (dateElement) {

    dateElement.innerText =
        new Date().toLocaleDateString(
            "en-IN",
            {
                day: "numeric",
                month: "short",
                year: "numeric"
            }
        );

}


/* ================= ROOM DATA ================= */

let rooms = [

    {
        number: 101,
        type: "Single",
        price: 1500,
        status: "Booked",
        facilities: "Wi-Fi, TV"
    },

    {
        number: 102,
        type: "Double",
        price: 2500,
        status: "Booked",
        facilities: "AC, TV, Wi-Fi"
    },

    {
        number: 103,
        type: "Deluxe",
        price: 3500,
        status: "Booked",
        facilities: "AC, TV, Wi-Fi"
    },

    {
        number: 104,
        type: "Suite",
        price: 6000,
        status: "Available",
        facilities: "AC, TV, Pool Access"
    },

    {
        number: 105,
        type: "Deluxe",
        price: 3500,
        status: "Available",
        facilities: "AC, TV, Wi-Fi"
    },

    {
        number: 106,
        type: "Double",
        price: 2500,
        status: "Booked",
        facilities: "AC, TV, Wi-Fi"
    }

];


function displayRooms(data = rooms) {

    const roomGrid =
        document.getElementById("roomGrid");

    roomGrid.innerHTML = "";


    data.forEach(room => {

        const statusClass =
            room.status === "Available"
                ? "success"
                : "danger";


        const button =
            room.status === "Available"
                ? `<button
                    class="book-btn"
                    onclick="bookRoom(${room.number})">
                    Book Room
                   </button>`
                : `<button
                    class="book-btn"
                    disabled>
                    Already Booked
                   </button>`;


        roomGrid.innerHTML += `

            <div class="room-card">

                <div class="room-number">
                    Room ${room.number}
                </div>

                <div class="room-type">
                    ${room.type} Room
                </div>

                <div class="room-price">
                    ${formatCurrency(room.price)} / night
                </div>

                <span class="badge ${statusClass}">
                    ${room.status}
                </span>

                <div class="room-facilities">
                    ${room.facilities}
                </div>

                ${button}

            </div>

        `;

    });

}


/* ================= SEARCH ROOMS ================= */

function searchRooms() {

    const value =
        document.getElementById("roomSearch")
            .value
            .toLowerCase();


    const filtered =
        rooms.filter(room =>
            room.number
                .toString()
                .includes(value) ||

            room.type
                .toLowerCase()
                .includes(value)
        );


    displayRooms(filtered);

}


/* ================= FILTER ROOMS ================= */

function filterRooms(status) {

    if (status === "all") {

        displayRooms(rooms);

        return;
    }


    const filtered =
        rooms.filter(room =>
            room.status.toLowerCase() === status
        );


    displayRooms(filtered);

}


/* ================= BOOK ROOM ================= */

function bookRoom(roomNumber) {

    document.getElementById("bookingRoom")
        .value = roomNumber;

    openModal("bookingModal");

}


/* ================= ADD ROOM ================= */

function addRoom(event) {

    event.preventDefault();


    const number =
        Number(
            document.getElementById(
                "newRoomNumber"
            ).value
        );


    const type =
        document.getElementById(
            "newRoomType"
        ).value;


    const price =
        Number(
            document.getElementById(
                "newRoomPrice"
            ).value
        );


    if (
        rooms.some(
            room => room.number === number
        )
    ) {

        alert("Room already exists.");

        return;

    }


    rooms.push({

        number: number,

        type: type,

        price: price,

        status: "Available",

        facilities: "AC, TV, Wi-Fi"

    });


    displayRooms();

    closeModal("roomModal");


    alert(
        "Room " +
        number +
        " added successfully!"
    );


    document.querySelector(
        "#roomModal form"
    ).reset();

}


/* ================= CUSTOMER DATA ================= */

let customers = [

    {
        id: "C101",
        name: "Rahul Sharma",
        phone: "9876543210",
        room: "103",
        status: "Checked In"
    },

    {
        id: "C102",
        name: "Priya Patel",
        phone: "9123456780",
        room: "102",
        status: "Checked In"
    },

    {
        id: "C103",
        name: "Amit Kumar",
        phone: "9988776655",
        room: "101",
        status: "Reserved"
    },

    {
        id: "C104",
        name: "Sneha Rao",
        phone: "9090909090",
        room: "104",
        status: "Reserved"
    }

];


function displayCustomers(data = customers) {

    const table =
        document.getElementById(
            "customerTable"
        );

    table.innerHTML = "";


    data.forEach(customer => {

        table.innerHTML += `

            <tr>

                <td>
                    <strong>${customer.id}</strong>
                </td>

                <td>
                    ${customer.name}
                </td>

                <td>
                    ${customer.phone}
                </td>

                <td>
                    Room ${customer.room}
                </td>

                <td>

                    <span class="badge success">
                        ${customer.status}
                    </span>

                </td>

            </tr>

        `;

    });

}


/* ================= SEARCH CUSTOMERS ================= */

function searchCustomers() {

    const value =
        document.getElementById(
            "customerSearch"
        ).value
        .toLowerCase();


    const filtered =
        customers.filter(customer =>

            customer.name
                .toLowerCase()
                .includes(value) ||

            customer.id
                .toLowerCase()
                .includes(value) ||

            customer.phone
                .includes(value)

        );


    displayCustomers(filtered);

}


/* ================= ADD CUSTOMER ================= */

function addCustomer(event) {

    event.preventDefault();


    const name =
        document.getElementById(
            "newCustomerName"
        ).value;


    const phone =
        document.getElementById(
            "newCustomerPhone"
        ).value;


    const room =
        document.getElementById(
            "newCustomerRoom"
        ).value;


    const id =
        "C" +
        String(customers.length + 101)
            .padStart(3, "0");


    customers.push({

        id: id,

        name: name,

        phone: phone,

        room: room,

        status: "Reserved"

    });


    displayCustomers();

    closeModal("customerModal");


    alert(
        "Customer added successfully!\n\n" +
        "Customer ID: " + id
    );


    document.querySelector(
        "#customerModal form"
    ).reset();

}


/* ================= BOOKINGS AND PAYMENTS ================= */

let bookings = [
    { id: "BK1001", customer: "Rahul Sharma", room: 103, checkIn: "28 Sep 2026", checkOut: "01 Oct 2026", amount: 7500, status: "Confirmed" },
    { id: "BK1002", customer: "Priya Patel", room: 102, checkIn: "29 Sep 2026", checkOut: "01 Oct 2026", amount: 5000, status: "Confirmed" },
    { id: "BK1003", customer: "Amit Kumar", room: 101, checkIn: "30 Sep 2026", checkOut: "02 Oct 2026", amount: 3000, status: "Pending" }
];

// Demo transactions stay in memory and reset when the page reloads.
let payments = [];
let activeCheckoutBookingId = null;

const formatCurrency = amount => new Intl.NumberFormat("en-IN", {
    style: "currency", currency: "INR", maximumFractionDigits: 0
}).format(Number(amount) || 0);

function formatDate(value) {
    const date = new Date(`${value}T00:00:00`);
    return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString("en-IN", {
        day: "2-digit", month: "short", year: "numeric"
    });
}

function displayBookings() {
    const table = document.getElementById("bookingTable");
    table.innerHTML = bookings.map(booking => {
        const badge = booking.status === "Checked Out" ? "success" : booking.status === "Confirmed" ? "warning" : "danger";
        const amount = typeof booking.amount === "number" ? formatCurrency(booking.amount) : booking.amount;
        return `<tr>
            <td><strong>${booking.id}</strong></td><td>${booking.customer}</td>
            <td>Room ${booking.room}</td><td>${booking.checkIn}</td><td>${booking.checkOut}</td>
            <td>${amount}</td><td><span class="badge ${badge}">${booking.status}</span>
            ${booking.status !== "Checked Out" ? `<button class="checkout-btn" onclick="startCheckout('${booking.id}')">Check out</button>` : ""}</td>
        </tr>`;
    }).join("");
    displayRecentBookings();
    displayPayments();
}

function displayRecentBookings() {
    const table = document.getElementById("recentBookings");
    table.innerHTML = bookings.slice(0, 4).map(booking => `
        <tr><td>${booking.id}</td><td>${booking.customer}</td><td>${booking.room}</td>
        <td><span class="badge ${booking.status === "Checked Out" ? "success" : "warning"}">${booking.status}</span></td></tr>
    `).join("");
}

function addBooking(event) {
    event.preventDefault();
    const customer = document.getElementById("bookingCustomer").value.trim();
    const roomNumber = Number(document.getElementById("bookingRoom").value);
    const checkIn = document.getElementById("checkIn").value;
    const checkOut = document.getElementById("checkOut").value;
    const room = rooms.find(item => item.number === roomNumber);
    if (!room) return alert("Room does not exist.");
    if (room.status === "Booked") return alert("This room is already booked.");

    const start = new Date(`${checkIn}T00:00:00`);
    const end = new Date(`${checkOut}T00:00:00`);
    const nights = Math.ceil((end - start) / 86400000);
    if (!Number.isFinite(nights) || nights < 1) return alert("Check-out must be at least one night after check-in.");

    const id = `BK${String(bookings.length + 1001).padStart(4, "0")}`;
    bookings.unshift({ id, customer, room: roomNumber, checkIn: formatDate(checkIn), checkOut: formatDate(checkOut), amount: room.price * nights, status: "Confirmed" });
    room.status = "Booked";
    displayBookings();
    displayRooms();
    closeModal("bookingModal");
    document.querySelector("#bookingModal form").reset();
}

function startCheckout(bookingId) {
    const booking = bookings.find(item => item.id === bookingId);
    if (!booking || booking.status === "Checked Out") return;
    activeCheckoutBookingId = bookingId;
    document.getElementById("checkoutSummary").textContent = `${booking.customer} | Room ${booking.room} | Balance due ${formatCurrency(booking.amount)}`;
    document.getElementById("checkoutAmount").value = Number(booking.amount) || 0;
    document.getElementById("checkoutAmount").max = Number(booking.amount) || 0;
    openModal("checkoutModal");
}

function completeCheckout(event) {
    event.preventDefault();
    const booking = bookings.find(item => item.id === activeCheckoutBookingId);
    if (!booking) return;
    const amount = Number(document.getElementById("checkoutAmount").value);
    const due = Number(booking.amount) || 0;
    if (!Number.isFinite(amount) || amount !== due) return alert(`Collect the full balance of ${formatCurrency(due)} before completing checkout.`);

    payments.unshift({
        id: `PAY${String(payments.length + 1001).padStart(4, "0")}`,
        bookingId: booking.id, customer: booking.customer, room: booking.room,
        method: document.getElementById("checkoutMethod").value, amount,
        date: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
        status: "Paid"
    });
    booking.status = "Checked Out";
    const room = rooms.find(item => item.number === booking.room);
    if (room) room.status = "Available";
    displayBookings();
    displayRooms();
    closeModal("checkoutModal");
    document.querySelector("#checkoutModal form").reset();
    activeCheckoutBookingId = null;
}

function displayPayments() {
    const table = document.getElementById("paymentTable");
    if (!table) return;
    table.innerHTML = payments.length ? payments.map(payment => `
        <tr><td><strong>${payment.id}</strong></td><td>${payment.bookingId}</td><td>${payment.customer}</td>
        <td>Room ${payment.room}</td><td>${payment.method}</td><td>${formatCurrency(payment.amount)}</td>
        <td>${payment.date}</td><td><span class="badge ${payment.status === "Paid" ? "success" : "warning"}">${payment.status}</span></td></tr>
    `).join("") : `<tr><td colspan="8" class="empty-state">No payments recorded yet. Complete a guest checkout to add a transaction.</td></tr>`;
    const collected = payments.reduce((total, payment) => total + payment.amount, 0);
    const outstanding = bookings.filter(item => item.status !== "Checked Out").reduce((total, item) => total + (Number(item.amount) || 0), 0);
    document.getElementById("collectedAmount").textContent = formatCurrency(collected);
    document.getElementById("outstandingAmount").textContent = formatCurrency(outstanding);
    document.getElementById("transactionCount").textContent = payments.length;
}


/* ================= MODAL ================= */

function openModal(id) {

    document.getElementById(id)
        .style.display = "flex";

}


function closeModal(id) {

    document.getElementById(id)
        .style.display = "none";

}


/* ================= INITIAL LOAD ================= */

displayRooms();

displayCustomers();

displayBookings();
