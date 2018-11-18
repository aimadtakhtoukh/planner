package fr.iai.planner.dao;

import fr.iai.planner.beans.SecurityUser;
import org.springframework.data.repository.CrudRepository;

public interface SecurityRepository extends CrudRepository<SecurityUser, Long> {

    SecurityUser findBySecurityId(String securityId);

}
