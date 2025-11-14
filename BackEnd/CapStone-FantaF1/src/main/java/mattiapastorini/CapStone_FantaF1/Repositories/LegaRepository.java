package mattiapastorini.CapStone_FantaF1.Repositories;

import mattiapastorini.CapStone_FantaF1.Entities.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LegaRepository extends JpaRepository<Lega, Long> {
    Optional<Lega> findByCodiceInvito(String codiceInvito);

    Lega findByPresident(User user);

    Lega findByMembers_Id(Long id);


}
