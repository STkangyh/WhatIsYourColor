from urllib.request import urlretrieve
import os
# selenium의 webdriver를 사용하기 위한 import
from selenium import webdriver
# selenium으로 키를 조작하기 위한 import
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
# 페이지 로딩을 기다리는데에 사용할 time 모듈 import
import time
from selenium.common.exceptions import StaleElementReferenceException

def scraping(name):
    # 크롬드라이버 실행
    driver = webdriver.Chrome()

    #크롬 드라이버에 url 주소 넣고 실행
    driver.get(f'https://www.google.com/search?q={name}&sca_esv=586951263&rlz=1C1JZAP_koKR998KR998&hl=ko&tbm=isch&source=lnms&sa=X&ved=2ahUKEwiE_YbWm-6CAxVbjVYBHQd2BhIQ_AUoAXoECAEQAw&biw=1920&bih=912&dpr=1')

    # 페이지가 완전히 로딩되도록 3초동안 기다림
    time.sleep(3)

    for i in range(70):
        driver.find_element(By.TAG_NAME, 'body').send_keys(Keys.PAGE_DOWN)

    # Get all image elements after scrolling
    images = driver.find_elements(By.CSS_SELECTOR, 'a.FRuiCf.islib.nfEiy img')

    # Collect image URLs
    link_thumbnail = []
    for img in images:
        try:
            src = img.get_attribute('src')
            if src and 'http' in src:
                link_thumbnail.append(src)
        except StaleElementReferenceException:
            pass  # Skip the stale element and continue

    path_folder = f'./Facedata2/{name}/'
    if not os.path.isdir(path_folder):
        os.mkdir(path_folder)

    i = 0

    for link in link_thumbnail:          
        i += 1
        urlretrieve(link, path_folder + f'{i}.jpg')        #link에서 이미지 다운로드, './imgs/'에 파일명은 index와 확장자명으로

cools = [
    [
        #'손예진', '문채원', '김소현', '김고은', '김태리','오마이걸 아린', '김연아', '소녀시대 태연', '서현진', '송지효', '전소미',
        #'샤이니 키', '조인성', '이승기', '강하늘', '주우재', '이도현', '이광수',
    ],
    [
        #'김혜수', '카리나', '트와이스 채영', '현아', '고윤정', '전도연','박신혜', '이민정','이하늬',
        #'차은우', '주원', '강동원', 박해진', '우도환', '이수혁',
    ]
]
warms = [
    [
        #'수지', '윤아', '아이유', '송혜교','트와이스나연', '김유정', '유인나', '오연서','레드벨벳웬디', '전소민',
        #'피오', '이종석', '비투비 육성재', '김선호', '슈퍼주니어규현',
    ],
    [
        #'윤은혜', '미주','민효린', '신세경', '이성경', '제니', '이다희', '공효진', '한소희', '소녀시대 수영', '김희선',
        #'이석훈', '공유', '최강창민', '유승호', '여진구', '이민호',
    ]
]

for spring in warms[0]:
    scraping(spring)
    print(spring+"data 설정")
for fall in warms[1]:
    scraping(fall)
    print(fall+"data 설정")
for summer in cools[0]:
    scraping(summer)
    print(summer+"data 설정")
for winter in cools[1]:
    scraping(winter)
    print(winter+"data 설정")