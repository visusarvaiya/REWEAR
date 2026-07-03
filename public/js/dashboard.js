// ===============================
// Get Logged In User
// ===============================

async function getCurrentUser() {
    try {

        const response = await fetch("/api/auth/me", {
            credentials: "include"
        });

        if (!response.ok) {
            document.getElementById("welcome").innerHTML =
                "Welcome 👋";
            return;
        }

        const data = await response.json();

        document.getElementById("welcome").innerHTML =
            `Welcome, ${data.user.name} 👋`;

    } catch (error) {
        console.log(error);
    }
}

// ===============================
// Load All Items
// ===============================

async function loadItems() {

    try {

        const response = await fetch("/api/items");

        const items = await response.json();

        if (!Array.isArray(items)) {
            return;
        }

        const container = document.getElementById("itemsContainer");

        container.innerHTML = "";

        // Dashboard Statistics
        document.getElementById("itemsCount").innerText = items.length;

        items.forEach(item => {

            container.innerHTML += `

            <div class="item-card">

                <img src="${item.image}" alt="${item.title}">

                <div class="item-info">

                    <h3>${item.title}</h3>

                    <p><strong>Category:</strong> ${item.category}</p>

                    <p><strong>Size:</strong> ${item.size}</p>

                    <p><strong>Condition:</strong> ${item.condition}</p>

                    <div class="buttons">

                        <button class="edit"
                        onclick="editItem('${item._id}')">

                        Edit

                        </button>

                        <button class="delete"
                        onclick="deleteItem('${item._id}')">

                        Delete

                        </button>

                    </div>

                </div>

            </div>

            `;

        });

    } catch (error) {

        console.log(error);

    }

}

// ===============================
// Edit Item
// ===============================

function editItem(id){

    window.location.href =
    `edit-item.html?id=${id}`;

}

// ===============================
// Delete Item
// ===============================

async function deleteItem(id){

    if(!confirm("Delete this item?")) return;

    await fetch(`/api/items/${id}`,{

        method:"DELETE"

    });

    loadItems();

}

// ===============================
// Logout
// ===============================

document
.getElementById("logoutBtn")
.addEventListener("click",async()=>{

    await fetch("/api/auth/logout",{

        method:"POST",
        credentials:"include"

    });

    window.location.href="login.html";

});

// ===============================
// Initial Page Load
// ===============================

getCurrentUser();

loadItems();