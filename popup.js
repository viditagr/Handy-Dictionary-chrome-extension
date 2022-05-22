let wordSearcher = document.getElementById("wordSearcher");
var injectWords = document.getElementById("Definition");



// when the button is clicked 
wordSearcher.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  var wordInput = document.getElementById("wordFinder").value;
  // saving what is written in the textbox then executing the below function to get the API request
  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id, allFrames: true},
      function: displayDefinition(wordInput)
    },
    (injectionResults) => {
      for (const frameResult of injectionResults)
        console.log('Iframe Title: ' + frameResult.result);

  });
})

// The function itself
async function displayDefinition(wordSearcher) {
  try {
    let url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
    url = url.concat(wordSearcher);
    const res = await fetch(url); // API call
    const data = await res.json();
    if(data.title == "No Definitions Found"){
      alert("We were not able to find any definitions.");
    }
    const meanings = data[0].meanings[0].definitions[0].definition;
    var wordsInject = "<p>" + meanings + "</p>";
    injectWords.innerHTML = wordsInject;

  } catch (error) {
    var wordsInject = "<p>Error</p>";
    injectWords.innerHTML = wordsInject;
  }
}
