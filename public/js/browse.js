// Get the container where items will be displayed
const itemContainer = document.getElementById("itemContainer");

// Fetch all items from the backend
async function loadItems() {
    try {
        const response = await fetch("/api/items");
        const items = await response.json();

        // If no items are found
        if (items.length === 0) {
            itemContainer.innerHTML = `
                <div class="text-center mt-5">
                    <h3>No Items Found</h3>
                    <p>Be the first one to list an item.</p>
                </div>
            `;
            return;
        }

        // Clear existing content
        itemContainer.innerHTML = "";

        // Loop through all items
        items.forEach(item => {

            itemContainer.innerHTML += `
                <div class="col-md-4 mb-4">

                    <div class="card h-100">

                        <img src="${item.image}" class="card-img-top" alt="${item.name}">

                        <div class="card-body">

                            <h5>${item.name}</h5>

                            <p><strong>Category:</strong> ${item.category}</p>

                            <p><strong>Size:</strong> ${item.size}</p>

                            <p><strong>Condition:</strong> ${item.condition}</p>

                            <p><strong>Owner:</strong> ${item.owner}</p>

                            <a href="item.html?id=${item._id}" class="btn btn-success">
                                View Details
                            </a>

                        </div>

                    </div>

                </div>
            `;
        });

    } catch (error) {
        console.log(error);

        itemContainer.innerHTML = `
            <h3 class="text-danger">
                Failed to load items.
            </h3>
        `;
    }
}

// Load items when the page opens
loadItems();