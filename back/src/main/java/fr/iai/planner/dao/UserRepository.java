package fr.iai.planner.dao;

import fr.iai.planner.beans.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserRepository extends CrudRepository<User, Long>{

    List<User> findAll();

    User findByName(String name);
}
