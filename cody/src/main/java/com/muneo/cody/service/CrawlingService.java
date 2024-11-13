package com.muneo.cody.service;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class CrawlingService {

    private static final String LOOKPIN_URL = "https://www.lookpin.co.kr/search/results?keywords=";

    public String searchImageUrl(String keyword) {

        try {
            Document doc = Jsoup.connect(LOOKPIN_URL + keyword).get();

            Elements imgElements = doc.select("img.sc-jXbUNg gdqDRq sc-dhFUGM irzwEr");


            if (!imgElements.isEmpty()) {
                Element firstImage = imgElements.first();
                return firstImage.absUrl("src");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}
