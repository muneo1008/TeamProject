package com.muneo.cody.repository;

import com.muneo.cody.entity.WeatherData;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;

public interface WeatherDataRepository extends JpaRepository<WeatherData, Long> {
    Optional<WeatherData> findFirstByDateAndNxAndNyOrderByIdAsc(LocalDate date, int nx, int ny);
}