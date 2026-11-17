package br.com.geri60saude.domain;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "elder")
public class Elder {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @Column(nullable = false, length = 140) private String name;
  @Column(name = "birth_date", nullable = false) private LocalDate birthDate;
  private String relation;
  @Column(name = "blood_type") private String bloodType;
  @Column(columnDefinition = "text") private String allergies;
  @Column(columnDefinition = "text") private String conditions;

  public Long getId() { return id; }
  public String getName() { return name; }
  public void setName(String name) { this.name = name; }
  public LocalDate getBirthDate() { return birthDate; }
  public void setBirthDate(LocalDate birthDate) { this.birthDate = birthDate; }
  public String getRelation() { return relation; }
  public void setRelation(String relation) { this.relation = relation; }
  public String getBloodType() { return bloodType; }
  public void setBloodType(String bloodType) { this.bloodType = bloodType; }
  public String getAllergies() { return allergies; }
  public void setAllergies(String allergies) { this.allergies = allergies; }
  public String getConditions() { return conditions; }
  public void setConditions(String conditions) { this.conditions = conditions; }
}
