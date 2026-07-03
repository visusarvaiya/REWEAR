// Container for displaying item details
const itemDetails = document.getElementById("itemDetails");

// Get item ID from URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// Load item details
async function loadItem() {

    try {

        const response = await fetch(`/api/items/${id}`);

        const item = await response.json();

        itemDetails.innerHTML = `

        <div class="row">

            <div class="col-md-6">

                <img src="${item.image}" class="img-fluid rounded shadow">

            </div>

            <div class="col-md-6">

                <h2>${item.name}</h2>

                <p><strong>Category:</strong> ${item.category}</p>

                <p><strong>Size:</strong> ${item.size}</p>

                <p><strong>Condition:</strong> ${item.condition}</p>

                <p><strong>Description:</strong> ${item.description}</p>

                <p><strong>Owner:</strong> ${item.owner}</p>

                <a href="edit-item.html?id=${item._id}" class="btn btn-warning">
                    Edit
                </a>

                <button
                    class="btn btn-danger"
                    onclick="deleteItem('${item._id}')">
                    Delete
                </button>

            </div>

        </div>

        `;

    } catch (error) {

        console.log(error);

    }

}

// Delete item
async function deleteItem(id) {

    const confirmDelete = confirm("Are you sure?");

    if (!confirmDelete) return;

    try {

        const response = await fetch(`/api/items/${id}`, {

            method: "DELETE"

        });

        if (response.ok) {

            alert("Item Deleted Successfully");

            window.location.href = "browse.html";

        }

    } catch (error) {

        console.log(error);

    }

}

// Load item on page load
loadItem();