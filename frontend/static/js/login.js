document.addEventListener("DOMContentLoaded", function() {
    // Register 버튼 클릭 시 회원가입 페이지로 이동
    document.getElementById("register-btn").addEventListener("click", function() {
        window.location.href = "register";
    });
});

// script.js
document.addEventListener("DOMContentLoaded", function() {
    var modal = document.getElementById("successModal");
    var closeBtn = document.querySelector("#successModal .close");

    // 모달 열기
    modal.style.display = "block";

    // 닫기 버튼 클릭 시 모달 닫기
    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    // 모달 외부 클릭 시 모달 닫기
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});

// JavaScript 코드
document.addEventListener("DOMContentLoaded", function() {
    var loginFailedModal = document.getElementById("loginFailedModal");

    // 닫기 버튼 클릭 시 모달 닫기
    var closeButton = loginFailedModal.querySelector(".close");
    closeButton.addEventListener("click", function() {
        loginFailedModal.style.display = "none";
    });

    // 모달 외부 클릭 시 모달 닫기
    window.addEventListener("click", function(event) {
        if (event.target === loginFailedModal) {
            loginFailedModal.style.display = "none";
        }
    });
});
