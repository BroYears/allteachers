package kr.co.allteachers.company.repository;

import kr.co.allteachers.company.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepository extends JpaRepository<Company, Long> {
}
