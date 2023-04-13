// window.addEventListener("beforeunload", function () {
//   localStorage.setItem(
//     "activeSection",
//     document.querySelector(".active-section").id
//   );
// });

// console.log(document.querySelector(".active-section").id);

// window.addEventListener("load", function () {
//   var activeSectionId = localStorage.getItem(".activeSection").id;
//   var activeSection = document.getElementById(activeSectionId);
//   console.log(document.getElementById(activeSectionId));
//   console.log(activeSection);

//   if (activeSection) {
//     activeSection.classList.add("active-section");
//   } else {
//     document.getElementById("login").classList.add("active-section");
//   }

//   var inactiveSections = document.querySelectorAll(".inactive-section");
//   inactiveSections.forEach(function (section) {
//     section.classList.remove("active-section");
//   });
// });
