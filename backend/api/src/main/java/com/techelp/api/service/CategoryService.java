package com.techelp.api.service;

import com.techelp.api.model.CategoryModel;
import com.techelp.api.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public CategoryModel addCategory(CategoryModel category) {
        return categoryRepository.save(category);
    }

    public List<CategoryModel> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Optional<CategoryModel> getCategoryById(int id) {
        return categoryRepository.findById(id);
    }

    public CategoryModel updateCategory(int id, CategoryModel categoryDetails) {
        CategoryModel category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada com o ID: " + id));

        category.setName(categoryDetails.getName());
        category.setIs_active(categoryDetails.getIs_active());

        return categoryRepository.save(category);
    }

    public CategoryModel updateCategoryName(int id, String name) {
        CategoryModel category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada com o ID: " + id));

        category.setName(name);
        return categoryRepository.save(category);
    }
    
    public CategoryModel updateCategoryStatus(int id, boolean isActive) {
        CategoryModel category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada com o ID: " + id));

        category.setIs_active(isActive);
        return categoryRepository.save(category);
    }

    public void deleteCategory(int id) {
        categoryRepository.deleteById(id);
    }
}
