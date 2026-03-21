package com.shopsphere.product.service;

import com.shopsphere.common.exception.ResourceNotFoundException;
import com.shopsphere.product.dto.ProductRequest;
import com.shopsphere.product.dto.ProductResponse;
import com.shopsphere.product.entity.Product;
import com.shopsphere.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository repository;

    public List<ProductResponse> getAllProducts(String search, Boolean active, String sort) {
        Sort sortObj = buildSort(sort);

        List<Product> products;

        boolean hasSearch = search != null && !search.trim().isEmpty();
        boolean hasActive = active != null;

        if (hasSearch && hasActive) {
            products = repository.findByNameContainingIgnoreCaseAndActive(search.trim(), active, sortObj);
        } else if (hasSearch) {
            products = repository.findByNameContainingIgnoreCase(search.trim(), sortObj);
        } else if (hasActive) {
            products = repository.findByActive(active, sortObj);
        } else {
            products = repository.findAll(sortObj);
        }

        return products.stream()
                .map(this::toResponse)
                .toList();
    }

    public ProductResponse getProductById(Long id) {
        return toResponse(findProduct(id));
    }

    public ProductResponse createProduct(ProductRequest request) {
        Product product = Product.builder()
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .stockQuantity(request.getStockQuantity())
                .imageUrl(request.getImageUrl())
                .active(request.getActive())
                .build();

        return toResponse(repository.save(product));
    }

    public ProductResponse updateProduct(Long id, ProductRequest request) {
        Product product = findProduct(id);

        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setStockQuantity(request.getStockQuantity());
        product.setImageUrl(request.getImageUrl());
        product.setActive(request.getActive());

        return toResponse(repository.save(product));
    }

    public void deleteProduct(Long id) {
        repository.delete(findProduct(id));
    }

    private Product findProduct(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found: " + id));
    }

    private ProductResponse toResponse(Product p) {
        return ProductResponse.builder()
                .id(p.getId())
                .name(p.getName())
                .description(p.getDescription())
                .price(p.getPrice())
                .stockQuantity(p.getStockQuantity())
                .imageUrl(p.getImageUrl())
                .active(p.getActive())
                .build();
    }

    private Sort buildSort(String sort) {
        if (sort == null || sort.isBlank()) {
            return Sort.by(Sort.Direction.ASC, "id");
        }

        return switch (sort) {
            case "nameAsc" -> Sort.by(Sort.Direction.ASC, "name");
            case "priceAsc" -> Sort.by(Sort.Direction.ASC, "price");
            case "priceDesc" -> Sort.by(Sort.Direction.DESC, "price");
            default -> Sort.by(Sort.Direction.ASC, "id");
        };
    }
}