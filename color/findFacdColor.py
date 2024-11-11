import cv2
import dlib

# 얼굴 인식 및 색상 추출 함수
def extract_face_colors(image):
    if image is None:
        raise ValueError("Invalid image data received.")
    # Dlib의 얼굴 탐지기 로드
    detector = dlib.get_frontal_face_detector()
    faces = detector(image)

    # 얼굴 영역의 색상 평균 계산
    face_colors = []
    for face in faces:
        # 얼굴 영역 추출
        x1, y1, x2, y2 = (face.left(), face.top(), face.right(), face.bottom())
        face_region = image[y1:y2, x1:x2]

        # 얼굴 영역의 평균 색상 계산
        average_color = cv2.mean(face_region)[:3]  # BGR에서 RGB로 변환
        face_colors.append(average_color)
    return face_colors


