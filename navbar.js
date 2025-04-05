const hamburger = document.getElementById("hamburger-icon");
const sidebar = document.querySelector(".sidebar");

hamburger.addEventListener("click", () => {
sidebar.classList.toggle("show");
});
