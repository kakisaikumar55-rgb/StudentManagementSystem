package com.studentmanagementsystem.repository;

import com.studentmanagementsystem.entity.Marks;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MarksRepository extends JpaRepository<Marks, Long> {

}