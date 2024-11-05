package com.muneo.cody.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Categori {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer categoriId;

    @Column(nullable = false)
    private String categoryName;
}
