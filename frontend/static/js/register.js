document.addEventListener("DOMContentLoaded", function() {
    var alreadymodal = document.getElementById("alreadymodal");

    // 닫기 버튼 클릭 시 모달 닫기
    var closeButton = alreadymodal.querySelector(".close");
    closeButton.addEventListener("click", function() {
        alreadymodal.style.display = "none";
    });

    // 모달 외부 클릭 시 모달 닫기
    window.addEventListener("click", function(event) {
        if (event.target === alreadymodal) {
            alreadymodal.style.display = "none";
        }
    });
});
