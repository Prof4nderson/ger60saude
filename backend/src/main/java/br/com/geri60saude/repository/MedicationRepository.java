package br.com.geri60saude.repository;

import br.com.geri60saude.domain.Medication;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicationRepository extends JpaRepository<Medication, Long> {
  List<Medication> findAllByElderIdAndActiveTrueOrderByScheduleTime(Long elderId);
}
