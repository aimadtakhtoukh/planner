package fr.iai.planner.dao;

import fr.iai.planner.beans.Entry;
import org.apache.tomcat.jni.Local;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.time.LocalDate;
import java.util.List;

public interface EntryRepository extends CrudRepository<Entry, Long> {

    List<Entry> findAll();

    List<Entry> findByUserId(Long userId);

    Entry findFirstByUserIdAndDate(Long userId, LocalDate date);

    List<Entry> findByUserIdAndDateBetween(Long userId, LocalDate start, LocalDate end);

    List<Entry> findByDateBetween(LocalDate start, LocalDate end);

}
