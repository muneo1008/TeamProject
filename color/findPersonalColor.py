import math

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
        "봄 라이트 (Light Spring)": [
            [230, 200, 160], [240, 210, 180], [255, 230, 200]
        ],
        "봄 클리어 (Clear Spring)": [
            [220, 180, 120], [240, 200, 150], [255, 210, 180]
        ],
        "봄 스트롱 (Strong Spring)": [
            [200, 150, 100], [220, 160, 120], [230, 180, 130]
        ],
        "여름 라이트 (Light Summer)": [
            [180, 200, 220], [190, 210, 230], [200, 230, 255]
        ],
        "여름 클리어 (Clear Summer)": [
            [170, 180, 200], [180, 190, 210], [200, 200, 230]
        ],
        "여름 뮤트 (Muted Summer)": [
            [140, 160, 170], [150, 170, 180], [170, 190, 200]
        ],
        "가을 뮤트 (Muted Autumn)": [
            [160, 130, 100], [170, 140, 120], [190, 160, 140]
        ],
        "가을 딥 (Deep Autumn)": [
            [130, 100, 70], [140, 110, 80], [160, 130, 100]
        ],
        "가을 다크 (Dark Autumn)": [
            [100, 80, 60], [110, 90, 70], [130, 110, 90]
        ],
        "겨울 스트롱 (Strong Winter)": [
            [180, 90, 150], [200, 110, 180], [210, 130, 200]
        ],
        "겨울 다크 (Dark Winter)": [
            [90, 50, 80], [100, 70, 110], [120, 90, 130]
        ],
        "겨울 딥 (Deep Winter)": [
            [80, 30, 100], [90, 50, 110], [100, 70, 130]
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
