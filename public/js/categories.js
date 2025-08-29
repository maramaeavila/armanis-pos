
document.addEventListener("DOMContentLoaded", function () {
    loadAllCategories();
    console.log('Categories loaded');
});

function loadAllCategories() {
    const categories = {
        "supplements": {
            "id": 1,
            "name": "Supplements",
            "type": "product",
            "icon": "fas fa-capsules",
            "dateAdded": "September 5, 2023",
            "dateUpdated": "Not updated yet"
        },
        "membership_plans": {
            "id": 2,
            "name": "Membership Plans",
            "type": "service",
            "icon": "fas fa-id-card",
            "dateAdded": "September 5, 2023",
            "dateUpdated": "Not updated yet"
        },
        "personal_training": {
            "id": 3,
            "name": "Personal Training",
            "type": "service",
            "icon": "fas fa-dumbbell",
            "dateAdded": "September 5, 2023",
            "dateUpdated": "Not updated yet"
        }
    };

    const categoriesGrid = document.getElementById("categoriesGrid");
    
    if (!categoriesGrid) {
        console.error('Categories grid element not found!');
        return;
    }

    // Create the table structure
    let tableHTML = `
        <table class="table table-striped table-hover">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Icon</th>
                    <th>Date Added</th>
                    <th>Date Updated</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
    `;

    // Add rows for each category
    for (const key in categories) {
        if (categories.hasOwnProperty(key)) {
            const category = categories[key];
            tableHTML += `
                <tr>
                    <td>${category.id}</td>
                    <td>
                        <i class="${category.icon}"></i>
                        ${category.name}
                    </td>
                    <td>
                        <span class="badge ${category.type === 'product' ? 'bg-primary' : 'bg-success'}">
                            ${category.type.charAt(0).toUpperCase() + category.type.slice(1)}
                        </span>
                    </td>
                    <td><i class="${category.icon}"></i></td>
                    <td>${category.dateAdded}</td>
                    <td>${category.dateUpdated}</td>
                    <td>
                        <button class="btn btn-sm btn-warning me-1" onclick="editCategory('${key}')">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="deleteCategory('${key}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        }
    }

    tableHTML += `
            </tbody>
        </table>
    `;

    categoriesGrid.innerHTML = tableHTML;
    console.log('Categories table rendered successfully');
}

// Placeholder functions for edit and delete actions
function editCategory(categoryKey) {
    console.log('Edit category:', categoryKey);
    // TODO: Implement edit functionality
}

function deleteCategory(categoryKey) {
    console.log('Delete category:', categoryKey);
    // TODO: Implement delete functionality
}