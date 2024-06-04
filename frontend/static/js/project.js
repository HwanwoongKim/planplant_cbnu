// section2 페이지로 이동
document.getElementById("section2").addEventListener("click", function() {
    navigateToPage("section2"); // 섹션 2 클릭 시 페이지 이동 함수 호출
});

//이벤트핸들러(로그인 여부에따라 section1, camera-button1사용 여부 체크)
document.addEventListener("DOMContentLoaded", function() {
    var section2Button = document.getElementById("section2");
    var cameraButton1 = document.getElementById('camera-button1');

    function handleSectionClick(event, targetUrl) {
        if (!isLoggedIn) {
            alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
            window.location.href = "/login"; // 로그인 페이지로 이동
        } else {
            window.location.href = targetUrl; // 해당 섹션 페이지로 이동
        }
    }
    //section2 확인
    section2Button.addEventListener("click", function(event) {
        handleSectionClick(event, "section2");
    });
    //camera-button1 확인
    cameraButton1.onclick = function() {
        if (!isLoggedIn) {
            alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
            window.location.href = "/login";
        } else {
            document.getElementById('photoFilePlant').click();
        }
    };
});

// 버튼 클릭 시 카메라1 작동
document.getElementById('camera-button1').onclick = function() {
    document.getElementById('photoFilePlant').click();
};

// 사진 선택 후
document.getElementById('photoFilePlant').onchange = function() {
    let filename = this.files[0].name;
    console.log("파일사이즈 : " + this.files[0].size);
    console.log("파일명 : " + filename);

    LoadImgPlant(this);

    // 폼 제출
    uploadImagePlant(this.files[0]);
};
// 선택이미지 미리보기
function LoadImgPlant(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            document.getElementById('photoImg').src = e.target.result;
            document.getElementById('photoImg').style.display = 'block';
        };

        reader.readAsDataURL(input.files[0]);
    }
}
//photoplant 업로드
function uploadImagePlant(file) {
    var formData = new FormData();
    formData.append('file', file);
    formData.append('targetPage', 'section1');

    fetch('/upload', {
        method: 'POST',
        body: formData
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Network response was not ok.');
        }
    }).then(data => {
        console.log('Success:', data);
        window.location.href = '/section1?uploadSuccess=true';
    }).catch(error => {
        console.error('Error:', error);
        window.location.href = '/section1?uploadSuccess=false';
    });
}
// 버튼 클릭 시 카메라2 작동
document.getElementById('camera-button2').onclick = function() {
    document.getElementById('photoFileSoil').click();
};
// 사진 선택 후
document.getElementById('photoFileSoil').onchange = function() {
    let filename = this.files[0].name;
    console.log("파일사이즈 : " + this.files[0].size);
    console.log("파일명 : " + filename);
    LoadImgSoil(this);
    // 폼 제출
    uploadImageSoil(this.files[0]);
};
// 선택이미지 미리보기
function LoadImgSoil(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            document.getElementById('photoImg').src = e.target.result;
            document.getElementById('photoImg').style.display = 'block';
        };
        reader.readAsDataURL(input.files[0]);
    }
}
//photosoil 업로드
function uploadImageSoil(file) {
    var formData = new FormData();
    formData.append('file', file);
    formData.append('targetPage', 'section3');

    fetch('/upload', {
        method: 'POST',
        body: formData
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Network response was not ok.');
        }
    }).then(data => {
        console.log('Success:', data);
        window.location.href = '/section3?uploadSuccess=true' + '&soilResult=' + soilResult;
    }).catch(error => {
        console.error('Error:', error);
        window.location.href = '/section3?uploadSuccess=false';
    });
}
