package fr.iai.planner.beans;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
public class Entry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long userId;
    @Column(columnDefinition = "DATE")
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate date;
    private String dispo;

    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public LocalDate getDate() {
        return date;
    }

    public String getDispo() {
        return dispo;
    }

    @Override
    public String toString() {
        return "Entry{" +
                "id=" + id +
                ", userId=" + userId +
                ", date=" + date +
                ", dispo='" + dispo + '\'' +
                '}';
    }

    public static class Builder {
        private Entry entry;

        public Builder() {
            entry = new Entry();
        }

        public Entry build() {
            return entry;
        }

        public Builder id(Long id) {
            entry.id = id;
            return this;
        }

        public Builder userId(Long userId) {
            entry.userId = userId;
            return this;
        }

        public Builder date(LocalDate date) {
            entry.date = date;
            return this;
        }

        public Builder dispo(String dispo) {
            entry.dispo = dispo;
            return this;
        }

        public Builder clone(Entry e) {
            entry.id = e.id;
            entry.dispo = e.dispo;
            entry.date = e.date;
            entry.userId = e.userId;
            return this;
        }


    }
}
