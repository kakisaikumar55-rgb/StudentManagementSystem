package com.studentmanagementsystem.service;

import com.studentmanagementsystem.entity.Department;
import com.studentmanagementsystem.repository.DepartmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DepartmentService {

    private final DepartmentRepository departmentRepository;

    public DepartmentService(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    // Create Department
    public Department saveDepartment(Department department) {
        return departmentRepository.save(department);
    }

    // Get All Departments
    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    // Get Department By ID
    public Optional<Department> getDepartmentById(Long id) {
        return departmentRepository.findById(id);
    }

    // Update Department
    public Department updateDepartment(Long id, Department departmentDetails) {

        Department department = departmentRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Department not found with id: " + id));

        department.setDepartmentId(departmentDetails.getDepartmentId());
        department.setDepartmentName(departmentDetails.getDepartmentName());
        department.setHod(departmentDetails.getHod());
        department.setEmail(departmentDetails.getEmail());
        department.setPhone(departmentDetails.getPhone());

        return departmentRepository.save(department);
    }

    // Delete Department
    public void deleteDepartment(Long id) {

        Department department = departmentRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Department not found with id: " + id));

        departmentRepository.delete(department);
    }
}