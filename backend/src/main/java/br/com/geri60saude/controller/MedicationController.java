package br.com.geri60saude.controller;

import br.com.geri60saude.domain.Medication;
import br.com.geri60saude.dto.MedicationDtos;
import br.com.geri60saude.repository.ElderRepository;
import br.com.geri60saude.repository.MedicationRepository;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/elders/{elderId}/medications")
public class MedicationController {
  private final MedicationRepository medications;
  private final ElderRepository elders;
  public MedicationController(MedicationRepository medications, ElderRepository elders) { this.medications = medications; this.elders = elders; }

  @GetMapping
  public List<MedicationDtos.Response> list(@PathVariable Long elderId) { return medications.findAllByElderIdAndActiveTrueOrderByScheduleTime(elderId).stream().map(MedicationDtos.Response::from).toList(); }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public MedicationDtos.Response create(@PathVariable Long elderId, @Valid @RequestBody MedicationDtos.CreateRequest request) {
    var medication = new Medication();
    medication.setElder(elders.findById(elderId).orElseThrow(() -> new IllegalArgumentException("Idoso não encontrado")));
    medication.setName(request.name()); medication.setDose(request.dose()); medication.setScheduleTime(request.scheduleTime()); medication.setStockQuantity(request.stockQuantity() == null ? 0 : request.stockQuantity()); medication.setStockExpiresOn(request.stockExpiresOn());
    return MedicationDtos.Response.from(medications.save(medication));
  }
}
