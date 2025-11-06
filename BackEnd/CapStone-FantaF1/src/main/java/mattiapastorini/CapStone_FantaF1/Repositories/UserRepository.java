package mattiapastorini.CapStone_FantaF1.Repositories;

<<<<<<< HEAD
import mattiapastorini.CapStone_FantaF1.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
=======
public interface UserRepository {
>>>>>>> main
}
