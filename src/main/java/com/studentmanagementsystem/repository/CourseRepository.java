package com.studentmanagementsystem.repository;

import com.studentmanagementsystem.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Long> {

}