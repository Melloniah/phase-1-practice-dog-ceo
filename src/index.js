console.log('%c HI', 'color: firebrick');

document.addEventListener("DOMContentLoaded", function () {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";

    // Fetch and display dog images
    fetch(imgUrl)
        .then(response => response.json())
        .then(data => {
            const imageContainer = document.getElementById("dog-image-container");

            data.message.forEach(imgUrl => {
                const img = document.createElement("img");
                img.src = imgUrl;
                img.alt = "A random dog image"; 
                img.style.margin = "10px"; 

                imageContainer.appendChild(img); 
            });
        })
        .catch(error => console.error("Error fetching images:", error)); 

    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    let allBreeds = []; // Store all breeds for filtering

    // Fetch and display dog breeds
    fetch(breedUrl)
        .then(response => response.json())
        .then(data => {
            allBreeds = Object.keys(data.message);
            displayBreeds(allBreeds); // Display all breeds initially
        })
        .catch(error => console.error("Error fetching breeds:", error));

    // Function to display filtered breeds
    function displayBreeds(breeds) {
        const ulList = document.getElementById("dog-breeds");
        ulList.innerHTML = ""; // Clear previous list

        breeds.forEach(breed => {
            const listItem = document.createElement("li");
            listItem.textContent = breed;
            listItem.style.cursor = "pointer";

            listItem.addEventListener("click", function () {
                this.style.color = "blue"; 
            });

            ulList.appendChild(listItem);
        });
    }

    // Add event listener for dropdown filtering
    const dropdown = document.getElementById("breed-dropdown");
    dropdown.addEventListener("change", function (event) {
        const selectedLetter = event.target.value;
        const filteredBreeds = allBreeds.filter(breed => breed.startsWith(selectedLetter));
        displayBreeds(filteredBreeds); // Update the list with filtered breeds
    });
});
