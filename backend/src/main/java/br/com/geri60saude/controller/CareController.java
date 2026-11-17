package br.com.geri60saude.controller;

import br.com.geri60saude.domain.Appointment;
import br.com.geri60saude.domain.CareActivity;
import br.com.geri60saude.repository.AppointmentRepository;
import br.com.geri60saude.repository.CareActivityRepository;
import java.util.List;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/elders/{elderId}")
public class CareController {
  private final CareActivityRepository activities;
  private final AppointmentRepository appointments;
  public CareController(CareActivityRepository activities, AppointmentRepository appointments) { this.activities = activities; this.appointments = appointments; }
  @GetMapping("/activities")
  public List<CareActivity> activities(@PathVariable Long elderId) { return activities.findAllByElderIdOrderByScheduledAtAsc(elderId); }
  @GetMapping("/appointments")
  public List<Appointment> appointments(@PathVariable Long elderId) { return appointments.findAllByElderIdOrderByStartsAtAsc(elderId); }
}
