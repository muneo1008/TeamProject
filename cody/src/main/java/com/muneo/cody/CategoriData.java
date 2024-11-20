package com.muneo.cody;

import com.muneo.cody.entity.Categori;
import com.muneo.cody.repository.CategoriRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CategoriData {

    @Autowired
    private CategoriRepository categoriRepository;

    @PostConstruct
    public void initializeCategories() {
        List<String> predefinedCategories = List.of(
                "캐주얼", "스트릿", "빈티지", "모던", "댄디", "스포티", "꾸안꾸", "꾸꾸꾸"
        );

        for (String categoryName : predefinedCategories) {
            if (!categoriRepository.existsByCategoryName(categoryName)) {
                Categori categori = new Categori();
                categori.setCategoryName(categoryName);
                categoriRepository.save(categori);
            }
        }
    }
}