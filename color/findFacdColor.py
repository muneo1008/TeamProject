import dlib
import cv2
import numpy as np

# dlib 얼굴 랜드마크 예측기 모델 파일 경로
predictor_path = 'C:/Users/HM/Desktop/TeamProject/color/static/shape_predictor_68_face_landmarks.dat'
print(predictor_path)


# 얼굴 랜드마크 예측기 로드
detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor(predictor_path)

def extract_face_colors(image):
    # dlib을 사용하여 얼굴 탐지
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    faces = detector(gray)

    if len(faces) == 0:
        return []

    # 첫 번째 얼굴을 사용
    face = faces[0]

    # 랜드마크 예측
    shape = predictor(gray, face)

    # 랜드마크 좌표를 리스트로 변환
    landmarks = []
    for i in range(68):  # 68개의 얼굴 랜드마크
        landmarks.append((shape.part(i).x, shape.part(i).y))

    # 얼굴 부위에 대한 색상 추출
    # 얼굴 중앙부 (피부)
    face_region = image[face.top():face.bottom(), face.left():face.right()]
    skin_region = face_region[int(face.height() * 0.3):int(face.height() * 0.6), int(face.width() * 0.4):int(face.width() * 0.6)]
    skin_color = cv2.mean(skin_region)[:3]  # 피부 평균 RGB

    # 입술 부위 (하단 중앙부)
    lip_region = face_region[int(face.height() * 0.7):int(face.height() * 0.85), int(face.width() * 0.4):int(face.width() * 0.6)]
    lip_color = cv2.mean(lip_region)[:3]  # 입술 평균 RGB

    # 눈 부위 (상단 중앙부)
    left_eye_region = face_region[int(face.height() * 0.2):int(face.height() * 0.35), int(face.width() * 0.3):int(face.width() * 0.45)]
    right_eye_region = face_region[int(face.height() * 0.2):int(face.height() * 0.35), int(face.width() * 0.55):int(face.width() * 0.7)]
    left_eye_color = cv2.mean(left_eye_region)[:3]  # 왼쪽 눈 평균 RGB
    right_eye_color = cv2.mean(right_eye_region)[:3]  # 오른쪽 눈 평균 RGB

    # 추출된 색상 리스트로 반환
    return [
        tuple(map(int, skin_color)),
        tuple(map(int, lip_color)),
        tuple(map(int, left_eye_color)),
        tuple(map(int, right_eye_color))
    ]
