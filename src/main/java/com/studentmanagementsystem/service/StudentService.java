package com.studentmanagementsystem.service;

import com.studentmanagementsystem.entity.Student;
import com.studentmanagementsystem.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    // =========================
    // ADD STUDENT
    // =========================
    public Student saveStudent(Student student) {
        return studentRepository.save(student);
    }

    // =========================
    // GET ALL STUDENTS
    // =========================
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    // =========================
    // UPDATE STUDENT
    // =========================
    public Student updateStudent(Long id, Student student) {

        Optional<Student> existingStudent =
                studentRepository.findById(id);

        if (existingStudent.isEmpty()) {
            return null;
        }

        Student existing = existingStudent.get();

        existing.setStudentId(student.getStudentId());
        existing.setName(student.getName());
        existing.setEmail(student.getEmail());
        existing.setPhone(student.getPhone());
        existing.setGender(student.getGender());
        existing.setDepartment(student.getDepartment());
        existing.setYear(student.getYear());
        existing.setStatus(student.getStatus());

        return studentRepository.save(existing);
    }

    // =========================
    // DELETE STUDENT
    // =========================
    public boolean deleteStudent(Long id) {

        if (!studentRepository.existsById(id)) {
            return false;
        }

        studentRepository.deleteById(id);
        return true;
    }
}