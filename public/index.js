// connect
const socket = io.connect(window.location.href.toLowerCase());

// get elements
const container = document.getElementById('container')
const input = document.getElementById('input')
const submit = document.getElementById('submit')

/*
  showMessage(message, self)
  gets message:  a string,
  gets self: if the message is from self, true (boolean)
*/
function showMessage (message, self) {

  // message bubble
  const bubble = document.createElement('div');
  bubble.className = `bubble ${self ? 'self' : ''}`;
  bubble.innerText = message;
  container.appendChild(bubble);

  // scroll down to keep recent messages in view
  container.scrollTop = container.scrollHeight;
}

// when a message is recieved
socket.on('message', (data) => {
  showMessage(data.message, false)
});

// when the submit button is clicked
submit.addEventListener('click', () => {
  socket.emit('message', {message: input.value});
  showMessage(input.value, true)
  input.value = ''
})

// on enter
input.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    socket.emit('message', {message: input.value});
    showMessage(input.value, true)
    input.value = ''
  }
})
