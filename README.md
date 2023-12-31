# WhatIsYourColor
Let's find your Personal Color!
웹 페이지에서 사진을 찍고 자신의 퍼스널 컬러를 확인해보세요!

## 퍼스널 컬러란?
퍼스널 컬러는 각자의 피부색, 눈색, 머리색 등을 고려하여 어울리는 색상을 말합니다. 이는 의복, 화장품, 헤어 컬러, 액세서리 등을 선택할 때 개인의 특성과 어울리는 색상을 선택하는 데에 도움을 줍니다. 주의할 점은 퍼스널 컬러 분석은 현재까지는 명확하게 기준을 가릴 수 있는 학술적인 근거는 없어 분석 결과는 개인에 따라 다르며, 편견 없이 자연스러운 색상을 찾는 것이 좋습니다.

## 웹 페이지를 활용하기 위한 준비과정
github 페이지에서 code를 누르고 https 환경에서 URL을 복사합니다.
실행하고자 하는 local 폴더를 하나 만들고, 터미널에서 해당 폴더를 열고 git clone 후에 복사한 URL을 입력합니다.
WhatIsYourColor 폴더에 있는 index.html 파일을 실행시키면 웹 페이지가 열립니다.
퍼스널 컬러 판별을 위해서는 카메라 접근 권한이 필요합니다.
WebCam Start 버튼을 누르면 페이지 상단에 카메라 접근 권한을 요청하는 팝업이 생길텐데 권한을 허가해주세요.
화면 중앙에 자신의 화면이 보일텐데, Take a shot 버튼을 누르면 누르는 동시의 카메라 화면을 바탕으로 퍼스널 컬러가 페이지 하단에 나타나게 됩니다.
추가 설명이 필요하다면 Figure out your color 버튼을 누르고 퍼스널 컬러에 대한 추가 설명을 확인해보세요.

## 해당 주제를 선택한 이유
퍼스널 컬러에 대해 설명했던 것처럼, 학술적으로 명확한 기준이 존재하지 않습니다. 그런데 이것을 판별해주는 사람이 테스트 할 때마다 적게는 만 원부터 많게는 십만 원대까지도 받는 것을 보고 너무 돈이 아깝다는 생각을 했습니다. 그래서 직접 테스트기를 만들면 좋을 것 같다는 생각을 하여 해당 주제를 선택하게 되었습니다.

### Teachable machine을 선택한 이유
머신러닝을 직접 구현해볼까도 생각해봤지만, 수업 자료나 외부 자료를 살펴봐도 class를 분류하는 과정이 잘 이해가 가지 않았고, 이 수업이 오픈소스 소프트웨어이니 오픈소스를 찾아서 활용하고 싶었습니다. 여러 소스가 있었지만, 가장 다루기 쉬운 Teachable machine을 선택했습니다. 

## 제작 과정
1. 적절한 Picture Data를 수집한다.
- 제작된 퍼스널 컬러 판별 기기는 총 4개의 class로 각각 봄 웜, 여름 쿨, 가을 웜, 겨울 쿨로 나누었습니다. 일반적으로 계절별로 나누는 경우가 가장 많아서 이렇게 나누었습니다.
- 데이터는 얼굴이 잘 알려지고, 많은 사람들이 해당하는 퍼스널 컬러로 인정하는 연예인을 선택했습니다. 많은 사람들이 인정하는 기준이란, 다소 객관적인 기준은 아니지만 여러 커뮤니티를 확인하면서 해당 연예인의 퍼스널 컬러를 똑같이 판단하는 경우가 많은 연예인을 골랐습니다. 어떤 연예인이 선택되었는지는 scraping.py 프로그램의 cool, warm 각 배열에 저장되어 있어 확인할 수 있습니다.
- 데이터를 가공하는 과정:
    - scraping.py 프로그램을 통해 google에 인물 한 명당 200~250 개의 사진을 크롤링한다.
    - FaceDetect.py 프로그램을 통해 크롤링한 사진에서 인물의 얼굴 주위를 사각형으로 편집하여 저장한다.
    - NotFaceDelete.py 프로그램을 통해 사진에서 얼굴이 확인 가능하면 그대로 두고 아니면 삭제한다.
##### NotFaceDelete.py를 만든 이유
- Teachable machine의 정답 확률이 낮아서 올릴 방법을 생각하다가 데이터를 확인했습니다.
- 사람 얼굴이 아닌 데이터가 너무 많아서 이 프로그램을 제작했습니다.
- 실제로 정답 확률이 소폭 상승한 결과를 얻었습니다.
2. 가공한 데이터를 일치하는 class에 업로드하고 Teachable machine을 사용하여 model을 제작합니다.
- Teachable Machine에 class를 각각 SpringWarm, FallWarm, SummerCool, WinterCool로 나누어서 각각을 저장합니다.
- 학습은 에포크 50, 배치 크기 256, 학습률 0.001로 설정하여 에포크와 학습률을 조금씩 변경하면서 정확도 최대화, 에포크별 손실 최소화가 되도록 만듭니다.
- 목표 수치는 정확도 0.5 이상, 에포크별 손실 2 이하가 되도록 만듭니다.
- 혹시 성별에도 machine에 영향이 있을지도 몰라서 성별 별로도 따로 구해봤지만 비슷한 결과를 얻었습니다.
- 가장 좋은 결과가 나온 에포크 100, 배치 크기 256, 학습률 0.001을 적용한 모델을 다운로드 받습니다.
3. 해당 모델을 정보를 담은 JSON 파일과 js 파일을 원하는 웹 페이지가 나오도록 가공하여 웹 페이지를 완성시킨다.

## 평가
이 페이지에 구현하고 싶은 기능이 너무 많았지만 12월 10일까지 모두 구현하지 못한 것과, 모델의 정확성이 낮은 부분이 아쉽습니다.
그러나 아쉬운 만큼 개선할 수 있는 부분도 더 많이 있고 그만큼 이 페이지가 더 좋아질 수 있는 가능성이 존재한다고 긍정적으로 해석할 수 있을 것 같습니다.
직접 CNN을 구현하여 더 복잡하고 성능이 좋은 모델을 만들고, 더 다양한 기능을 가진 페이지로 업데이트 할 예정입니다.
오픈 소스 소프트웨어 수업은 끝났지만, 해당 페이지는 좀 더 발전할 수 있도록 계속 수정하도록 하겠습니다.
언젠가 이 페이지를 서버에 올려서, 광고 배너를 달 때까지 노력해보겠습니다.

# WhatIsYourColor

Let's find your Personal Color! Take a photo on the web page and discover your personal color!

## What is Personal Color?

Personal Color refers to colors that suit individuals based on their skin tone, eye color, hair color, and other factors. It helps in selecting colors for clothing, makeup, hair dye, accessories, etc., that complement personal characteristics. It's important to note that personal color analysis lacks clear scientific evidence for distinct criteria; therefore, results may vary individually, and it's best to find natural-looking colors without biases.

## Preparation for Utilizing the Web Page

- Click 'code' on the GitHub page and copy the URL in the HTTPS environment.
- Create a new local folder for execution, open it in the terminal, clone it, and enter the copied URL.
- Run the index.html file in the WhatIsYourColor folder to open the web page.
- Camera access permission is required for personal color identification.
- When you click the 'WebCam Start' button, a popup will request camera access at the top of the page. Please grant permission.
- Your camera view will appear in the center of the screen. When you press the 'Take a shot' button, your personal color will be displayed at the bottom of the page based on the captured camera view.
- If further explanations are needed, click the 'Figure out your color' button to check additional information about your personal color.

## Reason for Choosing This Topic

As explained about personal color, I found that people who provide such tests often charge varying amounts, from a few thousand to even hundreds of thousands of won. I thought it might be a good idea to create a testing tool myself instead of spending such amounts.

### Reason for Choosing Teachable Machine

I considered implementing machine learning myself, but I found it challenging to understand the process of classifying classes even after reviewing course materials and external sources. Since this course is open-source software, I wanted to utilize an open-source tool. There were several options, but I chose Teachable Machine because it seemed the easiest to handle.

## Production Process

1. **Collecting Appropriate Picture Data:**
   - The personal color identification device I created divided into four classes: Spring Warm, Fall Warm, Summer Cool, and Winter Cool.
   - Data consists of pictures of celebrities recognized by many people for their personal color.
   - Data Processing Steps:
     - The scraping.py program crawls Google to gather 200-250 pictures per person.
     - The FaceDetect.py program edits the pictures by framing the faces and saves them.
     - The NotFaceDelete.py program keeps the pictures with recognizable faces and deletes the rest.

2. **Upload Processed Data to Teachable Machine:**
   - In Teachable Machine, I divided the classes and set the training epochs, batch size, and learning rate.
   - The target metrics were accuracy above 0.5 and loss per epoch below 2.
   - I downloaded the model using the best settings.

3. **Processing Model and Information into the Web Page:**
   - Created JSON and JavaScript files to complete the web page.

## Evaluation

It's regrettable that I couldn't implement all the desired functions by December 10th and that the model's accuracy is low. However, as much as there are shortcomings, there are more areas for improvement. I plan to create a more complex and higher-performing model by implementing CNN and update the page with more diverse features. Even though the open-source software course is over, I'll continue to edit this page to enhance it further.

I aim to upload this page to a server and even place advertisements on it someday.
