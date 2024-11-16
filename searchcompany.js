document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.querySelector('input[data-company-search="true"]');
  const suggestionsContainer = document.getElementById("suggestions");

  searchInput.addEventListener("input", async function () {
    const query = searchInput.value.trim();
    if (query.length < 1) {
      suggestionsContainer.innerHTML = '';
      return;
    }

    try {
      const apiKey = 'E1LWVJIJFLRA9VWJ';
      const response = await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=${apiKey}`);
      const data = await response.json();

      if (data.bestMatches && data.bestMatches.length > 0) {
        // Display suggestions
        suggestionsContainer.innerHTML = '';
        data.bestMatches.forEach(match => {
          const symbol = match['1. symbol'];
          const name = match['2. name'];

          const suggestionItem = document.createElement("div");
          suggestionItem.classList.add("suggestion-item");
          suggestionItem.innerText = `${name} (${symbol})`;
          suggestionItem.addEventListener("click", function () {
            searchInput.value = symbol;
            suggestionsContainer.innerHTML = ''; // Clear suggestions
            getStockData(symbol); // Fetch and display stock data for selected symbol
          });
          suggestionsContainer.appendChild(suggestionItem);
        });
      } else {
        suggestionsContainer.innerHTML = '<p>No matches found</p>';
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  });
});
