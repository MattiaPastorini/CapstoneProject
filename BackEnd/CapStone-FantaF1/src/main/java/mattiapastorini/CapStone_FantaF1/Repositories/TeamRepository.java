package mattiapastorini.CapStone_FantaF1.Repositories;

import mattiapastorini.CapStone_FantaF1.Entities.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {
    List<Team> findByPresident(User user);                        // tutte le squadre di uno user

    Team findByPresidentAndLega(User user, Lega lega);            // squadra dello user in una specifica lega

    List<Team> findByLega(Lega lega);                             // tutte le squadre di una lega


}
