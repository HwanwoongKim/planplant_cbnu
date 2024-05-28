// common.js 파일

document.addEventListener("DOMContentLoaded", function() {
    var menuButton = document.getElementById("menu-button");
    var dropdownMenu = document.getElementById("dropdown-menu");

    menuButton.addEventListener("click", function() {
        dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
    });
});
