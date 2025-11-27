package mattiapastorini.CapStone_FantaF1.Repositories;

import mattiapastorini.CapStone_FantaF1.Entities.Invito;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface InvitoRepository extends JpaRepository<Invito, Long> {
    List<Invito> findByUserIdAndAcceptedFalse(Long userId);

    // Trova l'invito specifico
    Optional<Invito> findByLegaIdAndUserIdAndAcceptedFalse(Long legaId, Long userId);
}