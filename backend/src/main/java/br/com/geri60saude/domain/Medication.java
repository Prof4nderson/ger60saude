package br.com.geri60saude.domain;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "medication")
public class Medication {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @ManyToOne(fetch = FetchType.LAZY, optional = false) @JoinColumn(name = "elder_id") private Elder elder;
  @Column(nullable = false, length = 120) private String name;
  @Column(nullable = false, length = 80) private String dose;
  @Column(name = "schedule_time", nullable = false) private LocalTime scheduleTime;
  @Column(name = "stock_quantity", nullable = false) private Integer stockQuantity = 0;
  @Column(name = "stock_expires_on") private LocalDate stockExpiresOn;
  @Column(nullable = false) private boolean active = true;

  public Long getId() { return id; }
  public Elder getElder() { return elder; }
  public void setElder(Elder elder) { this.elder = elder; }
  public String getName() { return name; }
  public void setName(String name) { this.name = name; }
  public String getDose() { return dose; }
  public void setDose(String dose) { this.dose = dose; }
  public LocalTime getScheduleTime() { return scheduleTime; }
  public void setScheduleTime(LocalTime scheduleTime) { this.scheduleTime = scheduleTime; }
  public Integer getStockQuantity() { return stockQuantity; }
  public void setStockQuantity(Integer stockQuantity) { this.stockQuantity = stockQuantity; }
  public LocalDate getStockExpiresOn() { return stockExpiresOn; }
  public void setStockExpiresOn(LocalDate stockExpiresOn) { this.stockExpiresOn = stockExpiresOn; }
  public boolean isActive() { return active; }
  public void setActive(boolean active) { this.active = active; }
}
