let isColorChanging = true; // 색상 변경 상태를 추적하는 변수
let seasonalColors = {}; // 계절별 색상 정보를 담을 객체

function toggleColorChange() {
    const stopCheckbox = document.getElementById('stopCheckbox');
    isColorChanging = !stopCheckbox.checked; // 체크 여부에 따라 색상 변경을 제어합니다.
}

function displaySeasonalColors(season, colors) {
    const colorInfo = document.getElementById('colorInfo');
    const colorBoxes = colors.map(color => 
        `<span style="
            display:inline-block; 
            width: 20px; 
            height: 20px; 
            background-color:${color}; 
            margin-right: 5px;
            border: 1px solid black;
        "></span>${color}`);
    colorInfo.innerHTML = `<b>Example ${season.charAt(0).toUpperCase() + season.slice(1)} Colors:</b><br>${colorBoxes.join('<br>')}`;
}

function changeSeason() {
    const background = document.querySelector('#background');
    const seasons = ['spring', 'summer', 'fall', 'winter'];
    let currentSeasonIndex = 0;

    seasonalColors = {
        'spring': ["#FFD700", "#FFA500", "#FF6347", "#FF4500"],
        'summer': ["#87CEEB", "#00BFFF", "#1E90FF", "#4682B4"],
        'fall': ["#FFA500", "#FF8C00", "#FF7F50", "#8B4513"],
        'winter': ["#F0FFFF", "#B0E0E6", "#87CEEB", "#00BFFF"]
    };

    setInterval(() => {
        if (isColorChanging) {
            currentSeasonIndex = (currentSeasonIndex + 1) % seasons.length;
            const currentSeason = seasons[currentSeasonIndex];
            background.className = currentSeason;
            displaySeasonalColors(currentSeason, seasonalColors[currentSeason]); // 색상 정보 업데이트
        }
    }, 3500); // 3.5초마다 계절 변경

    const initialSeason = seasons[currentSeasonIndex];
    displaySeasonalColors(initialSeason, seasonalColors[initialSeason]);
}

function additional(){
    const additionalURL = "https://namu.wiki/w/%ED%8D%BC%EC%8A%A4%EB%84%90%20%EC%BB%AC%EB%9F%AC";
    window.location.href = additionalURL;
}

// 페이지 로드 시 초기 계절 설정 및 색상 정보 표시
window.onload = function() {
    changeSeason(); // 계절 변경 시작
};