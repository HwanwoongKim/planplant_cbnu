document.addEventListener("DOMContentLoaded", function() {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const captureButton = document.getElementById('capture-btn');
    const constraints = {
        video: {
            facingMode: 'environment' // 후면 카메라 사용, 필요에 따라 'user'로 변경
        }
    };

    // 웹캠에서 비디오 스트림 가져오기
    navigator.mediaDevices.getUserMedia(constraints)
        .then(function(stream) {
            video.srcObject = stream;

            // 비디오 메타데이터 로드 후 캔버스 크기 설정
            video.onloadedmetadata = function() {
                // 캔버스 크기를 비디오 스트림 크기로 설정
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
            };
        })
        .catch(function(err) {
            console.error('Error accessing webcam:', err);
            alert('Error accessing webcam: ' + err.message);
        });

    // 사진 찍기 버튼 클릭 이벤트 처리
    captureButton.addEventListener('click', function() {
        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // 캡처된 이미지 데이터를 FormData로 만들기
        const formData = new FormData();
        canvas.toBlob(function(blob) {
            formData.append('image', blob, 'captured_image.png');

            // 서버로 이미지 데이터를 전송
            fetch('/capture-image', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (response.ok) {
                    console.log('Image captured and sent to server successfully.');
                } else {
                    console.error('Failed to send image to server.');
                }
            })
            .catch(error => {
                console.error('Error capturing and sending image:', error);
            });
        });
    });
});
