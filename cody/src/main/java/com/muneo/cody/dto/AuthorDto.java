package com.muneo.cody.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class AuthorDto {
    private Long id;
    private String nickname; // 작성자 닉네임
    private String profileImageUrl; // 작성자 프로필 이미지 URL
    private String personalColor;
}
