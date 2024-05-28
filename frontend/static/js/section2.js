// script.js
const categoriesSlider = document.querySelector('.categories-slider');
let scrollAmount = 0;

function nextCategory() {
    scrollAmount += 200; // 스크롤 할 양 조절
    categoriesSlider.scrollTo({
        top: 0,
        left: scrollAmount,
        behavior: 'smooth'
    });
}

function previousCategory() {
    scrollAmount -= 200; // 스크롤 할 양 조절
    categoriesSlider.scrollTo({
        top: 0,
        left: scrollAmount,
        behavior: 'smooth'
    });
}

const plantsSlider = document.querySelector('.plants-slider');
let ScrollAmount = 0;

function nextplant() {
    ScrollAmount += 200; // 스크롤 할 양 조절
    plantsSlider.scrollTo({
        top: 0,
        left: ScrollAmount,
        behavior: 'smooth'
    });
}

function previousplant() {
    ScrollAmount -= 200; // 스크롤 할 양 조절
    plantsSlider.scrollTo({
        top: 0,
        left: ScrollAmount,
        behavior: 'smooth'
    });
}

const calendar = document.querySelector('.calendar');

// 현재 날짜 객체 생성
const currentDate = new Date();
// 현재 년도와 월 구하기
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth();

// 해당 월의 첫 번째 날의 요일 구하기
const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
const startingDayOfWeek = firstDayOfMonth.getDay();

// 해당 월의 마지막 날 구하기
const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
const lastDateOfMonth = lastDayOfMonth.getDate();

// 캘린더에 날짜 채우기
let date = 1;
for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
        const dayCell = document.createElement('div');
        dayCell.classList.add('day-cell');
        
        // 첫 번째 주의 시작 요일 전까지는 빈 셀로 채움
        if (i === 0 && j < startingDayOfWeek) {
            dayCell.textContent = '';
        } else if (date > lastDateOfMonth) {
            break;
        } else {
            dayCell.textContent = date;
            date++;
        }
    }
}

// 현재 월을 가져오는 함수
function getCurrentMonth() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const currentDate = new Date();
    return months[currentDate.getMonth()];
}

// HTML에 현재 월을 표시하는 함수
function displayCurrentMonth() {
    const currentMonthElement = document.getElementById('currentMonth');
    if (currentMonthElement) {
        currentMonthElement.textContent = getCurrentMonth();
    }
}

// 달력 생성 코드 아래에 displayCurrentMonth 함수를 호출하여 실행하도록 추가합니다.
displayCurrentMonth();

// 식물 클릭 시 모달 창을 열도록 JavaScript 코드를 작성합니다.

// 각 식물 요소에 클릭 이벤트 추가
document.querySelectorAll('.plant').forEach(plant => {
    plant.addEventListener('click', function() {
        showModal(this.dataset.info); // 클릭한 식물 정보를 인자로 전달하여 showModal 함수 호출
    });
});

// 모달 창 열기
function showModal(plantInfo) {
    document.getElementById('plantInfo').innerText = 'You clicked on ' + plantInfo;
    document.getElementById('myModal').style.display = 'block';
}

// 모달 창 닫기
function closeModal() {
    document.getElementById('myModal').style.display = 'none';
}

// DOM이 로드될 때 실행되는 함수
document.addEventListener("DOMContentLoaded", function() {
    // "Add Category" 버튼에 클릭 이벤트 리스너 추가
    document.getElementById("add-category-btn").addEventListener("click", function() {
        addCategory();
    });
});

// 카테고리 추가 함수
function addCategory() {
    // 새로운 카테고리 요소 생성
    var newCategory = document.createElement("div");
    newCategory.className = "category";
    newCategory.innerHTML = `
        <h2 class="category-title">New Category</h2>
        <div class="plants-container">
            <div class="plants-slider">
                <div class="plants">
                    </div>
                <button id="add-plant-btn" class="plant-button "onclick="addPlant(this)">+</button>
            </div>
        </div>
    `;

    // 새로운 카테고리를 카테고리 슬라이더에 추가
    var addButton = document.getElementById("add-category-btn");
    addButton.parentNode.insertBefore(newCategory, addButton);

    // 카테고리 제목에 클릭 이벤트 리스너 추가
    var categoryTitle = newCategory.querySelector('.category-title');
    categoryTitle.addEventListener('click', function() {
        selectPlantType(this);
    });
}

// 카테고리 선택 함수
function selectPlantType(categoryTitle) {
    var plantType = prompt("Enter plant type:");
    if (plantType) {
        categoryTitle.textContent = plantType; // 선택한 식물 종류로 카테고리 제목 변경
    }
}


// 식물 추가 함수
function addPlant(button) {
    var plantContainer = button.parentNode;
    var newPlant = document.createElement("div");
    newPlant.className = "plant";
    newPlant.textContent = "Plant " + (plantContainer.childElementCount - 1); // 현재 카테고리의 식물 개수를 이용하여 고유한 식물 이름 생성
    plantContainer.insertBefore(newPlant, button);
    showModal(); // 식물을 추가할 때 모달을 열도록 설정할 수 있습니다.
}


////////////////


