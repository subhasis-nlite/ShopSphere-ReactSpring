package com.shopsphere.product.repository;

import com.shopsphere.product.entity.Product;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByNameContainingIgnoreCase(String name);

    List<Product> findByActive(Boolean active);

    List<Product> findByNameContainingIgnoreCaseAndActive(String name, Boolean active);

    List<Product> findByNameContainingIgnoreCase(String name, Sort sort);

    List<Product> findByActive(Boolean active, Sort sort);

    List<Product> findByNameContainingIgnoreCaseAndActive(String name, Boolean active, Sort sort);
}