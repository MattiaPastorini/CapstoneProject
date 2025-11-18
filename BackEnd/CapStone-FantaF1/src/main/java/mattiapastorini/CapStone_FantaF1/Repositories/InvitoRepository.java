package mattiapastorini.CapStone_FantaF1.Repositories;

import mattiapastorini.CapStone_FantaF1.Entities.Invito;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InvitoRepository extends JpaRepository<Invito, Long> {
    List<Invito> findByUserIdAndAcceptedFalse(Long userId);
}