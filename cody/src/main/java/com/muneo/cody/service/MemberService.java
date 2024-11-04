package com.muneo.cody.service;

import com.muneo.cody.dto.MemberDto;
import com.muneo.cody.entity.Member;
import com.muneo.cody.repository.MemberRepository;
import com.muneo.cody.util.JwtUtil;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.regex.Pattern;

@Service
public class MemberService {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private JwtUtil jwtUtil;

    // 비밀번호 해시로
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    private Map<String, String> verificationCodes = new HashMap<>();

    // 비밀번호 조건 ( 8자리 이상, 특수문자 포함 )
    private static final Pattern PASSWORD_PATTERN = Pattern.compile("^(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,}$");

    public void sendVerificationCode(String email) {
        try {
            emailService.sendVerificationEmail(email);
        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send verification email.", e);
        }
    }

    public boolean verifyCode(String email, String code) {
        return emailService.verifyCode(email, code);
    }

    public Member signUp(MemberDto memberDto) {
        // 비밀번호 유효성 검사 (조건)
        if (!PASSWORD_PATTERN.matcher(memberDto.getPassword()).matches()) {
            throw new IllegalArgumentException("비밀번호는 최소 8자리 이상이며 특수문자를 포함해야 합니다.");
        }

        // 비밀번호 암호화
        String encodedPassword = passwordEncoder.encode(memberDto.getPassword());


        Member member = new Member();
        member.setEmail(memberDto.getEmail());
        member.setPassword(encodedPassword);
        member.setNickname(memberDto.getNickname());
        member.setGender(memberDto.getGender());
        member.setAge(memberDto.getAge());
        member.setProvider("local");
        member.setLatitude(memberDto.getLatitude());
        member.setLongitude(memberDto.getLongitude());

        return memberRepository.save(member);
    }

    public Member signUpExternal(MemberDto memberDto) {
        Member member = new Member();
        member.setNickname(memberDto.getNickname());
        member.setGender(memberDto.getGender());
        member.setAge(memberDto.getAge());
        member.setSocialId(memberDto.getSocialId());
        member.setProvider(memberDto.getProvider());
        member.setLatitude(memberDto.getLatitude());
        member.setLongitude(memberDto.getLongitude());

        return memberRepository.save(member);
    }

    public Optional<Member> login(String email, String password) {
        Optional<Member> member = memberRepository.findByEmail(email);

        if (member.isPresent() && passwordMatches(password, member.get().getPassword())) {
            return member;
        }
        return Optional.empty();
    }

    public String createToken(Member member) {
        return jwtUtil.generateToken(member.getEmail());
    }

    private boolean passwordMatches(String rawPassword, String encodedPassword) {
        return new BCryptPasswordEncoder().matches(rawPassword, encodedPassword);
    }

    public MemberDto getUserProfileByEmail(String email) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        return MemberDto.builder()
                .email(member.getEmail())
                .nickname(member.getNickname())
                .gender(member.getGender())
                .age(member.getAge())
                .latitude(member.getLatitude())
                .longitude(member.getLongitude())
                .build();
    }
}
