package br.com.geri60saude.controller;

import br.com.geri60saude.domain.Elder;
import br.com.geri60saude.dto.ElderDtos;
import br.com.geri60saude.repository.ElderRepository;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/elders")
public class ElderController {
  private final ElderRepository repository;
  public ElderController(ElderRepository repository) { this.repository = repository; }

  @GetMapping
  public List<ElderDtos.Response> list() { return repository.findAll().stream().map(ElderDtos.Response::from).toList(); }

  @GetMapping("/{id}")
  public ElderDtos.Response get(@PathVariable Long id) { return repository.findById(id).map(ElderDtos.Response::from).orElseThrow(() -> new IllegalArgumentException("Idoso não encontrado")); }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public ElderDtos.Response create(@Valid @RequestBody ElderDtos.CreateRequest request) {
    var elder = new Elder();
    elder.setName(request.name()); elder.setBirthDate(request.birthDate()); elder.setRelation(request.relation()); elder.setBloodType(request.bloodType()); elder.setAllergies(request.allergies()); elder.setConditions(request.conditions());
    return ElderDtos.Response.from(repository.save(elder));
  }
}
