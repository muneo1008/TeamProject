import math

from findFacdColor import extract_face_colors

# 유클리드 거리 계산 함수
def color_distance(color1, color2):
    return math.sqrt(
        (color1[0] - color2[0]) ** 2 +
        (color1[1] - color2[1]) ** 2 +
        (color1[2] - color2[2]) ** 2
    )

# 퍼스널 컬러 매칭 함수
def find_personal_color(colors):
    seasonal_palettes = {
        "봄 웜톤": [
            [255, 224, 189], [255, 193, 155], [255, 210, 128], [255, 239, 178],
            [255, 200, 100], [255, 165, 100]
        ],
        "여름 쿨톤": [
            [190, 220, 240], [230, 210, 220], [170, 220, 250], [200, 180, 210],
            [150, 190, 240], [140, 160, 200]
        ],
        "가을 웜톤": [
            [184, 134, 11], [139, 69, 19], [180, 100, 20], [210, 105, 30],
            [139, 101, 8], [128, 82, 45]
        ],
        "겨울 쿨톤": [
            [0, 0, 128], [139, 0, 139], [0, 0, 255], [75, 0, 130],
            [100, 149, 237], [65, 105, 225]
        ]
    }

    # 각 시즌과의 최소 거리 구하기
    min_distance = float('inf')
    best_season = None

    # 추출한 색상 목록에서 색상만 추출
    extracted_colors = [tuple(map(int, color)) for color in colors]

    for season, palette in seasonal_palettes.items():
        for season_color in palette:
            for extracted_color in extracted_colors:
                distance = color_distance(extracted_color, season_color)
                if distance < min_distance:
                    min_distance = distance
                    best_season = season

    return best_season

