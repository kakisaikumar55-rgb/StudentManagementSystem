package com.studentmanagementsystem.service;

import com.studentmanagementsystem.entity.Marks;
import com.studentmanagementsystem.repository.MarksRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MarksService {

    private final MarksRepository marksRepository;

    public MarksService(MarksRepository marksRepository) {
        this.marksRepository = marksRepository;
    }

    public Marks saveMarks(Marks marks) {
        return marksRepository.save(marks);
    }

    public List<Marks> getAllMarks() {
        return marksRepository.findAll();
    }

    public Optional<Marks> getMarksById(Long id) {
        return marksRepository.findById(id);
    }

    public Marks updateMarks(Long id, Marks marksDetails) {

        Marks marks = marksRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Marks not found with id: " + id));

        marks.setStudentId(marksDetails.getStudentId());
        marks.setSubject(marksDetails.getSubject());
        marks.setMarks(marksDetails.getMarks());
        marks.setTotalMarks(marksDetails.getTotalMarks());
        marks.setGrade(marksDetails.getGrade());
        marks.setResult(marksDetails.getResult());

        return marksRepository.save(marks);
    }

    public void deleteMarks(Long id) {

        Marks marks = marksRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Marks not found with id: " + id));

        marksRepository.delete(marks);
    }
}