package com.techelp.api.controller.employee;

import com.techelp.api.dto.response.ApiResponse;
import com.techelp.api.dto.response.ErrorResponse;
import com.techelp.api.dto.response.SuccessResponse;
import com.techelp.api.model.CategoryModel;
import com.techelp.api.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping("/add")
    public ResponseEntity<ApiResponse> createCategory(@RequestBody CategoryModel category) {
        try {
            CategoryModel createdCategory = categoryService.addCategory(category);
            SuccessResponse<Map<String, Object>> successResponse = new SuccessResponse<>(HttpStatus.OK.value(),
                    "Categoria adiciona!", Optional.of(
                            Map.of("categoryName", createdCategory.getName(), "categoryId", createdCategory.getId())));

            return ResponseEntity.ok(successResponse);
        } catch (Exception e) {
            ErrorResponse errorResponse = new ErrorResponse("Erro de criação", HttpStatus.BAD_REQUEST.value(),
                    Map.of("message", e.getMessage()));
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }

    @GetMapping
    public ResponseEntity<ApiResponse> getAllCategories() {
        List<CategoryModel> categories = categoryService.getAllCategories();

        SuccessResponse<Map<String, List<CategoryModel>>> successResponse = new SuccessResponse<>(HttpStatus.OK.value(),
                "Categorias listadas!", Optional.of(
                        Map.of("deviceCategories", categories)));

        return ResponseEntity.ok(successResponse);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoryModel> getCategoryById(@PathVariable int id) {
        return categoryService.getCategoryById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("edit/{id}")
    public ResponseEntity<CategoryModel> updateCategory(@PathVariable int id,
            @RequestBody CategoryModel categoryDetails) {
        CategoryModel updatedCategory = categoryService.updateCategory(id, categoryDetails);
        return ResponseEntity.ok(updatedCategory);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable int id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.noContent().build();
    }
}
