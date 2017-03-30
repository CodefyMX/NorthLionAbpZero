
/**
 * Table object for table search
 */
export class TableObject {

    constructor(searchString = "", rowsPerPage = 10, propertyToOrder = "", direction = "Desc", page = 0, searchProperty = "") {
        searchString = searchString;
        rowsPerPage = rowsPerPage;
        propertyToOrder = propertyToOrder;
        direction = direction;
        page = page;
        searchProperty = searchProperty;
    }
    updatePage() {
        page = page + 1;
    }
}