package com.muneo.cody.controller;

import com.muneo.cody.dto.MemberDto;
import com.muneo.cody.entity.Member;
import com.muneo.cody.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/member")
@CrossOrigin(origins = "http://localhost:5173")
public class MemberController {

    @Autowired
    private MemberService memberService;

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody MemberDto memberDto) {
        Member member = memberService.signUp(memberDto);
        return ResponseEntity.ok(Map.of("success", true, "memberId", member.getMemberId()));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String password = loginData.get("password");

        Optional<Member> member = memberService.login(email, password);
        if (member.isPresent()) {
            String token = memberService.createToken(member.get());

            HttpHeaders headers = new HttpHeaders();
            headers.add("Set-Cookie", "token=" + token + "; Path=/; Max-Age=86400");

            return ResponseEntity.ok().headers(headers).body(Map.of("success", true, "memberId", member.get().getMemberId()));
        } else {
            return ResponseEntity.status(401).body(Map.of("success", false, "message", "로그인 실패"));
        }
    }

    @GetMapping("/me")
    public ResponseEntity<MemberDto> getCurrentUser(Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        MemberDto memberDto = memberService.getUserProfileByEmail(principal.getName());
        return ResponseEntity.ok(memberDto);
    }

    @PostMapping("/send-code")
    public ResponseEntity<?> sendVerificationCode(@RequestBody Map<String, String> emailData) {
        String email = emailData.get("email");
        memberService.sendVerificationCode(email);
        return ResponseEntity.ok(Map.of("success", true, "message", "인증 코드가 전송되었습니다."));
    }

    @PostMapping("/verify-code")
    public ResponseEntity<?> verifyCode(@RequestBody Map<String, String> verificationData) {
        String email = verificationData.get("email");
        String code = verificationData.get("code");

        System.out.println("Received email: " + email);
        System.out.println("Received code: " + code);

        boolean isValid = memberService.verifyCode(email, code);
        if (isValid) {
            return ResponseEntity.ok(Map.of("success", true, "message", "인증되었습니다."));
        } else {
            return ResponseEntity.status(400).body(Map.of("success", false, "message", "인증 코드가 유효하지 않습니다."));
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String newPassword = request.get("newPassword");
        memberService.resetPassword(email, newPassword);
        return ResponseEntity.ok(Map.of("message", "Password reset successfully"));
    }
}
