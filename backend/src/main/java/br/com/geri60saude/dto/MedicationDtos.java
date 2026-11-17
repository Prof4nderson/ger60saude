package br.com.geri60saude.dto;

import br.com.geri60saude.domain.Medication;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalTime;

public final class MedicationDtos {
  private MedicationDtos() {}
  public record CreateRequest(@NotBlank String name, @NotBlank String dose, @NotNull LocalTime scheduleTime, Integer stockQuantity, LocalDate stockExpiresOn) {}
  public record Response(Long id, Long elderId, String name, String dose, LocalTime scheduleTime, Integer stockQuantity, LocalDate stockExpiresOn, boolean active) {
    public static Response from(Medication medication) { return new Response(medication.getId(), medication.getElder().getId(), medication.getName(), medication.getDose(), medication.getScheduleTime(), medication.getStockQuantity(), medication.getStockExpiresOn(), medication.isActive()); }
  }
}
