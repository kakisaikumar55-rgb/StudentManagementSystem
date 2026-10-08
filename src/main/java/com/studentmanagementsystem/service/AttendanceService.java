package com.studentmanagementsystem.service;

import com.studentmanagementsystem.entity.Attendance;
import com.studentmanagementsystem.repository.AttendanceRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;

    public AttendanceService(AttendanceRepository attendanceRepository) {
        this.attendanceRepository = attendanceRepository;
    }

    public Attendance saveAttendance(Attendance attendance) {
        return attendanceRepository.save(attendance);
    }

    public List<Attendance> getAllAttendance() {
        return attendanceRepository.findAll();
    }

    public Optional<Attendance> getAttendanceById(Long id) {
        return attendanceRepository.findById(id);
    }

    public Attendance updateAttendance(
            Long id,
            Attendance attendanceDetails) {

        Attendance attendance = attendanceRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Attendance not found with id: " + id));

        attendance.setStudentId(attendanceDetails.getStudentId());
        attendance.setStudentName(attendanceDetails.getStudentName());
        attendance.setSubject(attendanceDetails.getSubject());
        attendance.setDate(attendanceDetails.getDate());
        attendance.setStatus(attendanceDetails.getStatus());

        return attendanceRepository.save(attendance);
    }

    public void deleteAttendance(Long id) {

        Attendance attendance = attendanceRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Attendance not found with id: " + id));

        attendanceRepository.delete(attendance);
    }
}