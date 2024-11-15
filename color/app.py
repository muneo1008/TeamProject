from flask import Flask, request, jsonify
from flask_cors import CORS
import io
import cv2
import numpy as np

from findFacdColor import extract_face_colors
from findPersonalColor import find_personal_color


app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024
CORS(app, origins="http://localhost:5173", supports_credentials=True)

@app.route('/')
def index():
    return 'flask server'

@app.route('/analyze-color', methods=['POST'])
def analyze_color():
    try:
        # 클라이언트에서 보낸 이미지 파일 받기
        image_file = request.files.get('image')

        if image_file:
            # 파일을 메모리로 읽기
            img_bytes = image_file.read()
            img_array = np.frombuffer(img_bytes, np.uint8)
            image = cv2.imdecode(img_array, cv2.IMREAD_COLOR)

            # 얼굴 색상 추출
            extracted_colors = extract_face_colors(image)
            # 얼굴이 인식되지 않은 경우 처리
            if not extracted_colors:
                return jsonify({'error': '얼굴을 인식할 수 없습니다. 다른 이미지를 시도해 주세요.'}), 400

            print('추출한 얼굴 색상: ',extracted_colors)

            # 퍼스널 컬러 분석
            result = find_personal_color(extracted_colors)
            print('퍼스널 컬러: ',result)
            return jsonify({'personal_color': result})

        return jsonify({'error': 'No image provided'}), 400

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
