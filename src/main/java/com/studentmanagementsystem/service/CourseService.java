package com.studentmanagementsystem.service;

import com.studentmanagementsystem.entity.Course;
import com.studentmanagementsystem.repository.CourseRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseService {

    private final CourseRepository courseRepository;

    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    // Create Course
    public Course saveCourse(Course course) {
        return courseRepository.save(course);
    }

    // Get All Courses
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    // Get Course By ID
    public Optional<Course> getCourseById(Long id) {
        return courseRepository.findById(id);
    }

    // Update Course
    public Course updateCourse(Long id, Course courseDetails) {

        Course course = courseRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Course not found with id: " + id));

        course.setCourseId(courseDetails.getCourseId());
        course.setCourseName(courseDetails.getCourseName());
        course.setDepartment(courseDetails.getDepartment());
        course.setDuration(courseDetails.getDuration());
        course.setDescription(courseDetails.getDescription());

        return courseRepository.save(course);
    }

    // Delete Course
    public void deleteCourse(Long id) {

        Course course = courseRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Course not found with id: " + id));

        courseRepository.delete(course);
    }
}