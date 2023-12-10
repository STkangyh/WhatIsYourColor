import cv2
import os

def delete_non_face_images_in_folder(folder_path):
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

    for root, dirs, files in os.walk(folder_path):
        for name in dirs:
            current_folder = os.path.join(root, name)
            print(f"Checking images in folder: {current_folder}")
            for filename in os.listdir(current_folder):
                path = os.path.join(current_folder, filename)
                img = cv2.imread(path)
                if img is not None:
                    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
                    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5)
                    if len(faces) == 0:  # If no faces detected, delete the image
                        os.remove(path)
                        print(f"Deleted: {filename} - No face detected")

# FaceData 폴더 경로
main_folder_path = 'FaceData2'

# 얼굴 없는 이미지 삭제
delete_non_face_images_in_folder(main_folder_path)
