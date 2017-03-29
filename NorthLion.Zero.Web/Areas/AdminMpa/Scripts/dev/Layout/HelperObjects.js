
/**
 * Table object for table search
 */
class TableObject {
    
    constructor(searchString = "", rowsPerPage = 10, propertyToOrder = "", direction = "Desc", page = 0) {
        this.searchString = searchString;
        this.rowsPerPage = rowsPerPage;
        this.propertyToOrder = propertyToOrder;
        this.direction = direction;
        this.page = page;
    }
    updatePage() {
        page = page + 1;
    }
}