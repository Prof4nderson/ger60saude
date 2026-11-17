package br.com.geri60saude.dto;

import br.com.geri60saude.domain.Elder;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public final class ElderDtos {
  private ElderDtos() {}
  public record CreateRequest(@NotBlank String name, @NotNull LocalDate birthDate, String relation, String bloodType, String allergies, String conditions) {}
  public record Response(Long id, String name, LocalDate birthDate, String relation, String bloodType, String allergies, String conditions) {
    public static Response from(Elder elder) { return new Response(elder.getId(), elder.getName(), elder.getBirthDate(), elder.getRelation(), elder.getBloodType(), elder.getAllergies(), elder.getConditions()); }
  }
}
