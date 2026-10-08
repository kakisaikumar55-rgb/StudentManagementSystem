package com.studentmanagementsystem.controller;

import com.studentmanagementsystem.entity.Marks;
import com.studentmanagementsystem.service.MarksService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/marks")
public class MarksController {

    private final MarksService marksService;

    public MarksController(MarksService marksService) {
        this.marksService = marksService;
    }

    @PostMapping
    public Marks saveMarks(@RequestBody Marks marks) {
        return marksService.saveMarks(marks);
    }

    @GetMapping
    public List<Marks> getAllMarks() {
        return marksService.getAllMarks();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Marks> getMarksById(@PathVariable Long id) {

        return marksService.getMarksById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public Marks updateMarks(
            @PathVariable Long id,
            @RequestBody Marks marks) {

        return marksService.updateMarks(id, marks);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMarks(@PathVariable Long id) {

        marksService.deleteMarks(id);

        return ResponseEntity.ok("Marks deleted successfully");
    }
}