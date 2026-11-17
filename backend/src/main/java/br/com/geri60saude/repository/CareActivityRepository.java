package br.com.geri60saude.repository;

import br.com.geri60saude.domain.CareActivity;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CareActivityRepository extends JpaRepository<CareActivity, Long> {
  List<CareActivity> findAllByElderIdOrderByScheduledAtAsc(Long elderId);
}
