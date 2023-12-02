import cv2
import os

def FaceDetect(img_path):
    img = cv2.imread(img_path)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
    faces = face_cascade.detectMultiScale(gray, 1.1, 4)

    if len(faces) > 0:
        for i, (x, y, w, h) in enumerate(faces):
            cv2.rectangle(img, (x, y), (x+w, y+h), (0, 255, 255), 2)
            face = img[y:y+h, x:x+w]
            cv2.imwrite(img_path, face)  # 이미지 파일에 얼굴 덮어쓰기

# FaceData 폴더 내에 있는 모든 폴더 가져오기
folder_path = './FaceData/'
folder_list = os.listdir(folder_path)

# 각 폴더 내의 이미지 파일 처리
for folder in folder_list:
    folder_path = os.path.join('./FaceData/', folder)
    if os.path.isdir(folder_path):
        file_list = os.listdir(folder_path)
        for file in file_list:
            file_path = os.path.join(folder_path, file)
            if file.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp')):
                FaceDetect(file_path)
