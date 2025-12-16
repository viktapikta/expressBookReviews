const axios = require("axios");

// Base URL for API endpoints
const BASE_URL = 'https://viktapikta-5000.theianext-1-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai';

// Main execution function
(async () => {
    try {
        console.log("Fetching all books...");
        const allBooks = await getAllBooksInTheShop();
        console.log("All books:", allBooks);

        console.log("\nFetching book details for ISBN 2...");
        const bookByIsbn = await getBookDetails(2);
        console.log("Book details:", bookByIsbn);

        console.log("\nFetching books by author 'Unknown'...");
        const booksByAuthor = await getBookDetailsByAuthor("Unknown");
        console.log("Books by author:", booksByAuthor);

        console.log("\nFetching books by title containing 'The'...");
        const booksByTitle = await getBookDetailsByTitle("The");
        console.log("Books by title:", booksByTitle);
    } catch (error) {
        console.error("Error in main execution:", error.message);
    }
})();

/**
 * Retrieves all books available in the shop
 * @returns {Promise<Object>} An object containing all books in the shop
 * @throws {Error} If the API request fails
 */
async function getAllBooksInTheShop() {
    try {
        const response = await axios.get(`${BASE_URL}/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching all books:', error.message);
        throw new Error(`Failed to fetch all books: ${error.message}`);
    }
}

/**
 * Retrieves details for a specific book by ISBN
 * @param {number} isbn - The ISBN number of the book
 * @returns {Promise<Object>} Book details for the specified ISBN
 * @throws {Error} If the API request fails or book is not found
 */
async function getBookDetails(isbn) {
    try {
        const response = await axios.get(`${BASE_URL}/isbn/${isbn}`);
        console.log("Book details retrieved:", response.data);
        return response.data;
    } catch (error) {
        console.error(`Error fetching book with ISBN ${isbn}:`, error.message);
        throw new Error(`Failed to fetch book details for ISBN ${isbn}: ${error.message}`);
    }
}

/**
 * Retrieves all books written by a specific author
 * @param {string} author - The name of the author
 * @returns {Promise<Object>} All books by the specified author
 * @throws {Error} If the API request fails or no books are found
 */
async function getBookDetailsByAuthor(author) {
    try {
        const response = await axios.get(`${BASE_URL}/author/${author}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching books by author '${author}':`, error.message);
        throw new Error(`Failed to fetch books by author '${author}': ${error.message}`);
    }
}

/**
 * Retrieves all books matching a title search query
 * @param {string} title - The title or partial title to search for
 * @returns {Promise<Object>} All books matching the title search
 * @throws {Error} If the API request fails or no books are found
 */
async function getBookDetailsByTitle(title) {
    try {
        const response = await axios.get(`${BASE_URL}/title/${title}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching books with title '${title}':`, error.message);
        throw new Error(`Failed to fetch books with title '${title}': ${error.message}`);
    }
}
