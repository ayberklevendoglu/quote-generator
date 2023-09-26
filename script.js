const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const newQuoteBtn = document.getElementById("new-quote");
const twitterBtn = document.getElementById("twitter");
const spinner = document.getElementById("loader");

let apiQuotes = [];

function showSpinner() {
  spinner.style.visibility = "visible";
  quoteContainer.hidden = true;
}

function hideSpinner() {
  quoteContainer.hidden = false;
  spinner.style.visibility = "hidden";
}

async function getQuotesFromApi() {
  showSpinner();
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    // console.log(apiQuotes);
    newQuote();
  } catch (error) {
    // catch error here
  }
}

function newQuote() {
  showSpinner();
  // pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // console.log(quote);
  // check if author field is blank and replace it with 'Unknown'
  if (!quote.author) {
    quote.author = "Unknown";
  }
  // check quote length to determine styling
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  // set quote, hide loader
  quoteText.textContent = quote.text;
  authorText.textContent = "- " + quote.author;
  hideSpinner();
}

// tweet quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// event listeners
newQuoteBtn.addEventListener("click", getQuotes);
twitterBtn.addEventListener("click", tweetQuote);
document.addEventListener("DOMContentLoaded", getQuotes);
