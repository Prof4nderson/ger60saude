package br.com.geri60saude.repository;

import br.com.geri60saude.domain.Appointment;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
  List<Appointment> findAllByElderIdOrderByStartsAtAsc(Long elderId);
}
