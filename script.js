const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader');


let apiQuotes = [];
// showLoading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}
// hide Loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//show new quote
function newQuote() {
    loading();
    // pick a random quotes from apiQuotes Array
    // change apiQuotes to LocalQuotes to fetch locally
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    // console.log(quote);
    // check if author is blank and replace with ' Unknown'
    if (!quote.author) {
        authorText.textContent = 'Unknown'
    } else {
        authorText.textContent = quote.author;
    }
    // Check Quote length to determine styling
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');

    } else {
        quoteText.classList.remove('long-quote');
    }
    // Set Quote , Hide loader 
    quoteText.textContent = quote.text;
    complete();
}

// https://twitter.com/intent/tweet
//  Get Quotes From API
async function getQuotes() {
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        // console.log(apiQuotes);
        newQuote();
    } catch (e) {
        //Error Handling
        console.log(e);

    }
}
// to Tweet the Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On load
getQuotes();