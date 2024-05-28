// project.js

// 페이지 이동 기능
function navigateToPage(sectionId) {
    // 여기에 페이지 이동하는 코드 작성
    switch(sectionId) {
        case "section1":
            window.location.href = "section1"; // 버튼 1를 클릭하면 section1.html로 이동
            break;
        case "section2":
            window.location.href = "section2"; // 버튼 2를 클릭하면 section2.html로 이동
            break;
        case "section3":
            window.location.href = "section3"; // 버튼 3를 클릭하면 section3.html로 이동
            break;    
        case "section4":
            window.location.href = "section4"; // 버튼 4를 클릭하면 section4.html로 이동
            break;
        default:
            console.log("해당하는 페이지가 없습니다.");
    }
}
document.getElementById("section1").addEventListener("click", function() {
    navigateToPage("section1"); // 섹션 1 클릭 시 페이지 이동 함수 호출
});

document.getElementById("section2").addEventListener("click", function() {
    navigateToPage("section2"); // 섹션 2 클릭 시 페이지 이동 함수 호출
});

document.getElementById("section3").addEventListener("click", function() {
    navigateToPage("section3"); // 섹션 3 클릭 시 페이지 이동 함수 호출
});


document.getElementById('menu-button').addEventListener('click', function() {
    var menu = document.getElementById('dropdown-menu');
    menu.classList.toggle('show');
});

document.addEventListener("DOMContentLoaded", function() {
    var section1Button = document.getElementById("section1");
    var section2Button = document.getElementById("section2");

    function handleSectionClick(event, targetUrl) {
        if (!isLoggedIn) {
            alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
            window.location.href = "/login"; // 로그인 페이지로 이동
        } else {
            window.location.href = targetUrl; // 해당 섹션 페이지로 이동
        }
    }

    section1Button.addEventListener("click", function(event) {
        handleSectionClick(event, "section1");
    });

    section2Button.addEventListener("click", function(event) {
        handleSectionClick(event, "section2");
    });
});



