package com.techelp.api.controller;

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
@RequestMapping("/api")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping("employee/categories/add")
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

    @GetMapping("employee/categories")
    public ResponseEntity<ApiResponse> getAllCategories() {
        List<CategoryModel> categories = categoryService.getAllCategories();

        SuccessResponse<Map<String, List<CategoryModel>>> successResponse = new SuccessResponse<>(HttpStatus.OK.value(),
                "Categorias listadas!", Optional.of(
                        Map.of("deviceCategories", categories)));

        return ResponseEntity.ok(successResponse);
    }

    @GetMapping("employee/categories/{id}")
    public ResponseEntity<CategoryModel> getCategoryById(@PathVariable int id) {
        return categoryService.getCategoryById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("employee/categories/edit/{id}")
    public ResponseEntity<ApiResponse> updateCategory(@PathVariable int id,
            @RequestBody CategoryModel categoryDetails) {
        try {
            CategoryModel updatedCategory = categoryService.updateCategory(id, categoryDetails);
            SuccessResponse<Map<String, Object>> successResponse = new SuccessResponse<>(HttpStatus.OK.value(),
                    "Categoria editada com sucesso!", Optional.of(
                            Map.of("categoryName", updatedCategory.getName(), "categoryId", updatedCategory.getId())));

            return ResponseEntity.ok(successResponse);
        } catch (Exception e) {
            ErrorResponse errorResponse = new ErrorResponse("Erro na edição da categoria",
                    HttpStatus.BAD_REQUEST.value(),
                    Map.of("message", e.getMessage()));
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }

    @PutMapping("employee/categories/edit/name/{id}")
    public ResponseEntity<ApiResponse> updateCategoryName(@PathVariable int id,
            @RequestBody Map<String, String> categoryDetails) {
        try {
            String newName = categoryDetails.get("name");
            CategoryModel updatedCategory = categoryService.updateCategoryName(id, newName);

            SuccessResponse<Map<String, Object>> successResponse = new SuccessResponse<>(HttpStatus.OK.value(),
                    "Nome da categoria editado com sucesso!", Optional.of(
                            Map.of("categoryName", updatedCategory.getName(), "categoryId", updatedCategory.getId())));

            return ResponseEntity.ok(successResponse);
        } catch (Exception e) {
            ErrorResponse errorResponse = new ErrorResponse("Erro na edição do nome da categoria",
                    HttpStatus.BAD_REQUEST.value(),
                    Map.of("message", e.getMessage()));
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }

    @PutMapping("employee/categories/edit/status/{id}")
    public ResponseEntity<ApiResponse> updateCategoryStatus(@PathVariable int id,
            @RequestBody Map<String, Boolean> categoryDetails) {
        try {
            boolean isActive = categoryDetails.get("is_active");
            CategoryModel updatedCategory = categoryService.updateCategoryStatus(id, isActive);

            SuccessResponse<Map<String, Object>> successResponse = new SuccessResponse<>(HttpStatus.OK.value(),
                    "Status da categoria editado com sucesso!", Optional.of(
                            Map.of("categoryId", updatedCategory.getId(), "isActive", updatedCategory.getIs_active())));

            return ResponseEntity.ok(successResponse);
        } catch (Exception e) {
            ErrorResponse errorResponse = new ErrorResponse("Erro na edição do status da categoria",
                    HttpStatus.BAD_REQUEST.value(),
                    Map.of("message", e.getMessage()));
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }

    @DeleteMapping("employee/categories/delete/{id}")
    public ResponseEntity<ApiResponse> deleteCategory(@PathVariable int id) {
        try {
            categoryService.deleteCategory(id);

            SuccessResponse<Map<String, Object>> successResponse = new SuccessResponse<>(HttpStatus.OK.value(),
                    "Categoria deletada com sucesso!", Optional.empty());

            return ResponseEntity.ok(successResponse);
        } catch (Exception e) {
            ErrorResponse errorResponse = new ErrorResponse("Erro na deleção da categoria",
                    HttpStatus.BAD_REQUEST.value(),
                    Map.of("message", e.getMessage()));
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }
}
