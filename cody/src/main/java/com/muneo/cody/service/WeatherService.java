package com.muneo.cody.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class WeatherService {

    @Value("${weather.api.key}")
    private String apiKey;

    @Value("${weather.api.url}")
    private String apiUrl;

    public Map<String, String> fetchWeatherData(Double latitude, Double longitude) throws Exception {
        Map<String, Integer> grid = convertToGrid(latitude, longitude);
        int nx = grid.get("nx");
        int ny = grid.get("ny");
        String baseDate = getBaseDate();
        String baseTime = getClosestBaseTime();
        String serviceKey = URLEncoder.encode(apiKey, "UTF-8");

        String url = apiUrl +
                "?serviceKey=" + serviceKey +
                "&pageNo=1" +
                "&numOfRows=1000" +
                "&dataType=JSON" +
                "&base_date=" + baseDate +
                "&base_time=" + baseTime +
                "&nx=" + nx +
                "&ny=" + ny;

        System.out.println("Requesting weather data with URL: " + url);

        HttpURLConnection conn = (HttpURLConnection) new URL(url).openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-type", "application/json");

        BufferedReader rd;
        if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
            rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        } else {
            rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
        }

        StringBuilder responseBuilder = new StringBuilder();
        String line;
        while ((line = rd.readLine()) != null) {
            responseBuilder.append(line);
        }
        rd.close();
        conn.disconnect();

        System.out.println("Raw weather API response: " + responseBuilder.toString());

        return parseWeatherResponse(responseBuilder.toString());
    }

    private Map<String, Integer> convertToGrid(double lat, double lon) {
        Map<String, Integer> grid = new HashMap<>();
        double RE = 6371.00877;
        double GRID = 5.0;
        double SLAT1 = 30.0;
        double SLAT2 = 60.0;
        double OLON = 126.0;
        double OLAT = 38.0;
        double XO = 43;
        double YO = 136;

        double DEGRAD = Math.PI / 180.0;

        double re = RE / GRID;
        double slat1 = SLAT1 * DEGRAD;
        double slat2 = SLAT2 * DEGRAD;
        double olon = OLON * DEGRAD;
        double olat = OLAT * DEGRAD;

        double sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5);
        sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
        double sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
        sf = Math.pow(sf, sn) * Math.cos(slat1) / sn;
        double ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
        ro = re * sf / Math.pow(ro, sn);

        double ra = Math.tan(Math.PI * 0.25 + lat * DEGRAD * 0.5);
        ra = re * sf / Math.pow(ra, sn);
        double theta = lon * DEGRAD - olon;
        if (theta > Math.PI) theta -= 2.0 * Math.PI;
        if (theta < -Math.PI) theta += 2.0 * Math.PI;
        theta *= sn;

        int nx = (int) Math.floor(ra * Math.sin(theta) + XO + 0.5);
        int ny = (int) Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);

        grid.put("nx", nx);
        grid.put("ny", ny);
        return grid;
    }

    private String getBaseDate() {
        LocalDate now = LocalDate.now();
        if (LocalTime.now().isBefore(LocalTime.of(5, 0))) {
            now = now.minusDays(1);
        }
        return now.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
    }

    private String getClosestBaseTime() {
        LocalTime now = LocalTime.now();
        List<String> baseTimes = List.of("0200", "0500", "0800", "1100", "1400", "1700", "2000", "2300");

        String closestBaseTime = "2300";
        for (String baseTime : baseTimes) {
            LocalTime time = LocalTime.parse(baseTime, DateTimeFormatter.ofPattern("HHmm"));
            if (now.isAfter(time.plusMinutes(10))) {
                closestBaseTime = baseTime;
            }
        }
        return closestBaseTime;
    }

    private Map<String, String> parseWeatherResponse(String response) throws Exception {
        Map<String, String> filteredValues = new HashMap<>();
        ObjectMapper mapper = new ObjectMapper();
        JsonNode root = mapper.readTree(response);

        JsonNode body = root.path("response").path("body");
        String baseDate = body.path("items").path("item").get(0).path("baseDate").asText();

        LocalDate baseLocalDate = LocalDate.parse(baseDate, DateTimeFormatter.ofPattern("yyyyMMdd"));
        String nextDay = baseLocalDate.plusDays(1).format(DateTimeFormatter.ofPattern("yyyyMMdd"));

        JsonNode items = body.path("items").path("item");

        boolean tmxFound = false;
        boolean tmnFound = false;

        Map<String, String> closestValues = new HashMap<>();
        int minDiffTmp = Integer.MAX_VALUE;
        int minDiffSky = Integer.MAX_VALUE;
        int minDiffPty = Integer.MAX_VALUE;

        LocalTime currentTime = LocalTime.now();
        int closestFcstTime = currentTime.getHour() * 100 + (currentTime.getMinute() >= 30 ? 30 : 0);

        for (JsonNode item : items) {
            String fcstDate = item.path("fcstDate").asText();
            String category = item.path("category").asText();
            String fcstTime = item.path("fcstTime").asText();
            String fcstValue = item.path("fcstValue").asText();

            int fcstTimeInt = Integer.parseInt(fcstTime);
            int timeDiff = Math.abs(closestFcstTime - fcstTimeInt);

            if (category.equals("TMP") && fcstDate.equals(baseDate)) {
                if (timeDiff < minDiffTmp) {
                    minDiffTmp = timeDiff;
                    closestValues.put("TMP", fcstValue);
                }
            } else if (category.equals("SKY") && fcstDate.equals(baseDate)) {
                if (timeDiff < minDiffSky) {
                    minDiffSky = timeDiff;
                    closestValues.put("SKY", fcstValue);
                }
            } else if (category.equals("PTY") && fcstDate.equals(baseDate)) {
                if (timeDiff < minDiffPty) {
                    minDiffPty = timeDiff;
                    closestValues.put("PTY", fcstValue);
                }
            } else if (List.of("POP", "WSD").contains(category) && fcstDate.equals(baseDate)) {
                filteredValues.put(category, fcstValue);
            } else if (category.equals("TMX") && fcstDate.equals(baseDate)) {
                filteredValues.put(category, fcstValue);
                tmxFound = true;
            } else if (category.equals("TMN") && fcstDate.equals(baseDate)) {
                filteredValues.put(category, fcstValue);
                tmnFound = true;
            }
        }

        if (!tmxFound || !tmnFound) {
            for (JsonNode item : items) {
                String fcstDate = item.path("fcstDate").asText();
                String category = item.path("category").asText();
                String fcstValue = item.path("fcstValue").asText();

                if (category.equals("TMX") && fcstDate.equals(nextDay) && !filteredValues.containsKey("TMX")) {
                    filteredValues.put("TMX", fcstValue);
                } else if (category.equals("TMN") && fcstDate.equals(nextDay) && !filteredValues.containsKey("TMN")) {
                    filteredValues.put("TMN", fcstValue);
                }
            }
        }

        filteredValues.putAll(closestValues);

        return filteredValues;
    }
}
