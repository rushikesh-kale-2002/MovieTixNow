package com.bookar.entities;

import jakarta.persistence.Embeddable;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

//MovieCast.java
@Embeddable
@Getter
@Setter
public class MovieCast {
 private String name;
 private String photoUrl;
}

