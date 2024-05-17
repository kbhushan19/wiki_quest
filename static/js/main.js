const chatContainer = document.getElementById('chat-container');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const sendBtnText = document.getElementById('send-btn-text');
const sendLoader = document.getElementById('send-loader');
const errorMessage = document.getElementById('error-message');

// API endpoint URL
const apiUrl = 'http://localhost:8008/path';

sendBtn.addEventListener('click', sendMessage);

userInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    sendMessage();
  }
});

function sendMessage() {
  const userMessage = userInput.value.trim();
  if (userMessage) {
    displayUserMessage(userMessage);
    fetchResponse(userMessage);
    userInput.value = '';
  }
}

function displayUserMessage(message) {
  const userMessageDiv = document.createElement('div');
  userMessageDiv.textContent = message;
  userMessageDiv.classList.add('bg-blue-100', 'text-blue-800', 'p-2', 'rounded-lg', 'mb-2', 'inline-block', 'max-w-full', 'text-right');
  chatContainer.appendChild(userMessageDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function displayResponseMessage(message) {
  const responseMessageDiv = document.createElement('div');
  responseMessageDiv.textContent = message;
  responseMessageDiv.classList.add('bg-gray-100', 'text-gray-800', 'p-2', 'rounded-lg', 'mb-2', 'inline-block', 'max-w-full');
  chatContainer.appendChild(responseMessageDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function fetchResponse(message) {
  sendBtnText.classList.add('hidden');
  sendLoader.classList.remove('hidden');
  errorMessage.classList.add('hidden');

  const formData = new FormData();
  formData.append('message', message);

  fetch(apiUrl, {
    method: 'POST',
    body: formData
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const responseMessage = data.response; // Assuming the API response has a 'response' field
      displayResponseMessage(responseMessage);
    })
    .catch(error => {
      console.error('Error:', error);
      displayResponseMessage('Oops! Something went wrong.');
      errorMessage.textContent = 'An error occurred. Please try again.';
      errorMessage.classList.remove('hidden');
    })
    .finally(() => {
      sendBtnText.classList.remove('hidden');
      sendLoader.classList.add('hidden');
    });
}