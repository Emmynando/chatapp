// "use strict";

const socket = io("ws://localhost:5050/websocket");

const unorderedList = document.querySelector("ul");
const chatBox = document.querySelector("#chat-box");
const inputz = document.querySelector("textarea");

function sendMessage(e) {
  e.preventDefault();
  //   checking for a truthy input value
  // then send message
  if (inputz.value) {
    socket.emit("message", inputz.value);
    inputz.value = "";
  }
  inputz.focus();
}

document.querySelector(".send-button").addEventListener("click", sendMessage);

socket.on("message", (message) => {
  const sanitizedUL = unorderedList.cloneNode(true);
  const chatList = document.createElement("li");
  chatList.textContent = `${message}`;
  sanitizedUL.appendChild(chatList);
  chatBox.appendChild(sanitizedUL);
});
