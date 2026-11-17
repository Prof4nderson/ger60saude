package br.com.geri60saude.domain;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "appointment")
public class Appointment {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
  @ManyToOne(fetch = FetchType.LAZY, optional = false) @JoinColumn(name = "elder_id") private Elder elder;
  @Column(nullable = false, length = 160) private String title;
  private String professional;
  @Column(name = "appointment_type", nullable = false) private String appointmentType;
  @Column(name = "starts_at", nullable = false) private Instant startsAt;
  private String location;
  @Column(length = 500) private String notes;
  public Long getId() { return id; }
  public Elder getElder() { return elder; }
  public void setElder(Elder elder) { this.elder = elder; }
  public String getTitle() { return title; }
  public void setTitle(String title) { this.title = title; }
  public String getProfessional() { return professional; }
  public void setProfessional(String professional) { this.professional = professional; }
  public String getAppointmentType() { return appointmentType; }
  public void setAppointmentType(String appointmentType) { this.appointmentType = appointmentType; }
  public Instant getStartsAt() { return startsAt; }
  public void setStartsAt(Instant startsAt) { this.startsAt = startsAt; }
  public String getLocation() { return location; }
  public void setLocation(String location) { this.location = location; }
  public String getNotes() { return notes; }
  public void setNotes(String notes) { this.notes = notes; }
}
