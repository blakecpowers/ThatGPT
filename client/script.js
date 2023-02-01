import bot from './assets/bot.svg'
import user from './assets/user.svg'

// Get the form and Id (#) chat container 
const form = document.querySelector('form');
const chatContainer = document.querySelector('#chat_container')

let loadInterval;

// Create function to load our message from ChatGPT
// This will be the part of our app that blinks three dots (...) while waiting for the request to be processed.
function loader(element) {
  element.textContent = '';

  // Set Interval will call our function at specified intervals. In this case every 300ms.
  loadInterval = setInterval(() => {
    element.textContent += '.';

    // If the loading counter has reached three dots, then reset it.
    if (element.textContent === '....') {
      element.textContent = '';
    }
  }, 300);
}


// Function to type the text our character by character.
function typeText(element, text) {
  let index = 0;

  // Populate one text character every 20ms.
  let interval = setInterval(() => {
    // Start index at 0. 
    // While index is less than the text length, at the HTML element at that index to be displayed.
    if (index < text.length) {
      element.innerHTML += text.charAt(index);
      index++;
    } else {
      clearInterval(interval);
    }
  }, 20)
}

// Create function to create a unique id.
function generateUniqueId() {
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexadecimalString = randomNumber.toString(16);

  return `id-${timestamp}-${hexadecimalString}`;
}

// Function to decide if it's the AI speaking or us. 
// This is to determine the shade we should display on the text box. 
function chatStripe (isAi, value, uniqueId) {
  return (
    `
    <div class="wrapper ${isAi && 'ai'}">
     <div class="chat">
      <div class="profile">
        <img
          src="${isAi ? bot : user}"
          alt="${isAi ? 'bot' : 'user'}"
        />
      </div>
      <div class="message" id=${uniqueId}>${value}</div>
     </div>
    </div>
    `
  )
}

// Submit function to be triggered to get the AI generated resposne. 
// Async function taking event as parameter.
const handleSubmit = async (e) => {
  // We don't want to refresh browser on submit.
  e.preventDefault();

  // Form parameter is the form being passed from our HTML.
  const data = new FormData(form);

  // Now we want to generate a new Chat Stripe for the user (false in chatStripe param).
  chatContainer.innerHTML += chatStripe(false, data.get('prompt'));

  // Reset the form
  form.reset();

  // Now make the Bot's chatstripe.
  // Generate a uniqueId. Fill the chatContainerHTML with the response from ChatGPT.
  const uniqueId = generateUniqueId();
  chatContainer.innerHTML += chatStripe(true, " ", uniqueId);

  // We want to keep scrolling down to see the message.
  chatContainer.scrollTop = chatContainer.scrollHeight;

  // Find the uniqueId we added onto the HTML.
  const messageDiv = document.getElementById(uniqueId);

  // Turn on loader.
  loader(messageDiv);

  // Fetch data from server to get the bots response.
  const response = await fetch('http://localhost:7050', {
  method: 'POST',
  headers: {
    'Content-Type' : 'application/json'
  },
  body: JSON.stringify({
    prompt: data.get('prompt')
  })
})

  clearInterval(loadInterval);
  messageDiv.innerHTML = '';

  if (response.ok) {
    const data = await response.json();
    const parsedData = data.bot.trim();

    console.log({parsedData})

    typeText(messageDiv, parsedData);
  } else {
    const err = await response.text();

    messageDiv.innerHTML = "Something went wrong";
    alert(err);
  }

}

// Listen for a form being submited. Either by clicking submit or the enter key.
form.addEventListener('sumbit', handleSubmit);
form.addEventListener('keyup', (e) => {
  if (e.keyCode===13) {
    handleSubmit(e);
  }
})

