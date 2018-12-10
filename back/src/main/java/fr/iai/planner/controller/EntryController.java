package fr.iai.planner.controller;

import fr.iai.planner.beans.Entry;
import fr.iai.planner.beans.SecurityUser;
import fr.iai.planner.dao.EntryRepository;
import fr.iai.planner.security.SecurityLevel;
import fr.iai.planner.security.aspect.Secured;
import fr.iai.planner.security.exception.ForbiddenException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/entry/")
public class EntryController {

    private final EntryRepository entryRepository;
    private final SecurityUser securityUser;
    @Value("${SECURITY_ENABLED}")
    private boolean securityEnabled;

    @Autowired
    public EntryController(EntryRepository entryRepository, SecurityUser securityUser) {
        this.entryRepository = entryRepository;
        this.securityUser = securityUser;
    }

    @Secured(SecurityLevel.ANY_USER)
    @GetMapping("all")
    public List<Entry> all(
            @RequestParam(value = "start", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam(value = "end", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end) {
        return entryRepository.findByDateBetween(
                Optional.ofNullable(start).orElse(LocalDate.MAX),
                Optional.ofNullable(end).orElse(LocalDate.MIN)
        );
    }

    @Secured(SecurityLevel.ANY_USER)
    @GetMapping("user/{userId}")
    public List<Entry> entriesByNameBetweenDates(
            @PathVariable Long userId,
            @RequestParam(value = "start", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam(value = "end", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end) throws ForbiddenException {
        return entryRepository.findByUserIdAndDateBetween(
                userId,
                Optional.ofNullable(start).orElse(LocalDate.now()),
                Optional.ofNullable(end).orElse(LocalDate.now().plusWeeks(2))
        );
    }

    @Secured(SecurityLevel.ANY_USER)
    @GetMapping("{id}")
    public Entry get(@PathVariable Long id) {
        return entryRepository.findById(id).orElse(null);
    }

    @Secured(SecurityLevel.ANY_USER)
    @PostMapping("add")
    public void addEntry(@RequestBody Entry entry) throws ForbiddenException {
        if (securityEnabled) {
            if (!securityUser.getUser().getId().equals(entry.getUserId())) {
                throw new ForbiddenException("You can't edit others' data.");
            }
        }
        entryRepository.save(
                new Entry.Builder()
                .clone(entry)
                .id(Optional.ofNullable(
                        entryRepository.findFirstByUserIdAndDate(entry.getUserId(), entry.getDate())
                    )
                        .map(Entry::getId)
                        .orElse(null))
                .build()
        );
    }

    @ExceptionHandler(ForbiddenException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public Map<String, Object> forbidden(ForbiddenException t) {
        Map<String, Object> result = new HashMap<>();
        result.put("code", 403);
        result.put("message", t.getMessage());
        return result;
    }

    @ExceptionHandler(IllegalStateException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public Map<String, Object> exception(IllegalStateException t) {
        Map<String, Object> result = new HashMap<>();
        result.put("code", 500);
        result.put("message", t.getMessage());
        return result;
    }

}
