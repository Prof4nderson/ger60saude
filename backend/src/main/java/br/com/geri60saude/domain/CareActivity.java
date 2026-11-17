package br.com.geri60saude.domain;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "care_activity")
public class CareActivity {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
  @ManyToOne(fetch = FetchType.LAZY, optional = false) @JoinColumn(name = "elder_id") private Elder elder;
  @Column(nullable = false, length = 40) private String category;
  @Column(nullable = false, length = 140) private String title;
  @Column(length = 500) private String detail;
  @Column(name = "scheduled_at") private Instant scheduledAt;
  @Column(name = "completed_at") private Instant completedAt;
  public Long getId() { return id; }
  public Elder getElder() { return elder; }
  public void setElder(Elder elder) { this.elder = elder; }
  public String getCategory() { return category; }
  public void setCategory(String category) { this.category = category; }
  public String getTitle() { return title; }
  public void setTitle(String title) { this.title = title; }
  public String getDetail() { return detail; }
  public void setDetail(String detail) { this.detail = detail; }
  public Instant getScheduledAt() { return scheduledAt; }
  public void setScheduledAt(Instant scheduledAt) { this.scheduledAt = scheduledAt; }
  public Instant getCompletedAt() { return completedAt; }
  public void setCompletedAt(Instant completedAt) { this.completedAt = completedAt; }
}
