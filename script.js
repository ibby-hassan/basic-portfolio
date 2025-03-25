let scrollIcon = document.getElementById("scroll-icon");
let questionSection = document.querySelector(".question-submission");

scrollIcon.addEventListener("click", function() {
    questionSection.scrollIntoView({ behavior: "smooth" });
});