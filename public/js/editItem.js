// Get item ID from URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const form = document.getElementById("editForm");

// Load existing item
async function loadItem() {

    try {

        const response = await fetch(`/api/items/${id}`);

        const item = await response.json();

        document.getElementById("name").value = item.name;
        document.getElementById("category").value = item.category;
        document.getElementById("size").value = item.size;
        document.getElementById("condition").value = item.condition;
        document.getElementById("description").value = item.description;
        document.getElementById("image").value = item.image;
        document.getElementById("owner").value = item.owner;

    } catch (error) {

        console.log(error);

    }

}

// Update item
form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const updatedItem = {

        name: document.getElementById("name").value,
        category: document.getElementById("category").value,
        size: document.getElementById("size").value,
        condition: document.getElementById("condition").value,
        description: document.getElementById("description").value,
        image: document.getElementById("image").value,
        owner: document.getElementById("owner").value

    };

    try {

        const response = await fetch(`/api/items/${id}`, {

            method: "PUT",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(updatedItem)

        });

        if (response.ok) {

            alert("Item Updated Successfully");

            window.location.href = `item.html?id=${id}`;

        }

    } catch (error) {

        console.log(error);

    }

});

// Load item when page opens
loadItem();