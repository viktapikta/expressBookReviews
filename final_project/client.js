const axios = require("axios");
(async () => {
    await getAllBooksInTheShop();
    await getBookDetails(2);
    await getBookDetailsByAuthor("Unknown");
    await getBookDetailsByTitle("The");
})();



const axios = require("axios");
async function getAllBooksInTheShop() {
    try
    {
        const response = await axios.get('https://viktapikta-5000.theianext-1-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/')
        return response.data;
    }
    catch(error) {
        console.error('Error fetching data:', error);
    };
}

const axios = require("axios");
async function getBookDetails(isbn) {
    try
    {
        const response = await axios.get(`https://viktapikta-5000.theianext-1-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/isbn/${isbn}`)
        return response.data;
    }
    catch (error) {
        console.error('Error fetching data:', error);
    }
}

const axios = require("axios");
async function getBookDetailsByAuthor(author) {
    try
    {
        const response = await axios.get(`https://viktapikta-5000.theianext-1-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/author/${author}`)
        return response.data;
    }
    catch (error) {
        console.error('Error fetching data:', error);
    }
}

const axios = require("axios");
async function getBookDetailsByTitle(title) {
    try
    {
        const response = await axios.get(`https://viktapikta-5000.theianext-1-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/title/${title}`)
        return response.data;
    }
    catch (error) {
        console.error('Error fetching data:', error);
    }
}