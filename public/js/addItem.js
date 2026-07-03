// Get the form
const form = document.getElementById("itemForm");

// Handle form submission
form.addEventListener("submit", async (e) => {

    e.preventDefault();

    // Create item object
    const item = {

        name: document.getElementById("name").value,

        category: document.getElementById("category").value,

        size: document.getElementById("size").value,

        condition: document.getElementById("condition").value,

        description: document.getElementById("description").value,

        image: document.getElementById("image").value,

        owner: document.getElementById("owner").value
    };

    try {

        const response = await fetch("/api/items", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(item)

        });

        if(response.ok){

            alert("✅ Item Added Successfully");

            window.location.href = "browse.html";

        }else{

            alert("Failed to add item");

        }

    } catch (error) {

        console.log(error);

        alert("Server Error");

    }

});