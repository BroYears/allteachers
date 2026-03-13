package kr.co.allteachers.partner.repository;

import kr.co.allteachers.partner.entity.Partner;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PartnerRepository extends JpaRepository<Partner, Long> {
    List<Partner> findAllByOrderByPriorityAsc();
}
