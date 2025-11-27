package mattiapastorini.CapStone_FantaF1.Repositories;

import mattiapastorini.CapStone_FantaF1.Entities.Pilota;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PilotaRepository extends JpaRepository<Pilota, Long> {
}
