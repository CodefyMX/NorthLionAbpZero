
/**
 * Table object for table search
 */
export class TableObject {
    getRequest(searchString = "", rowsPerPage = 10, propertyToOrder = "", direction = "Desc", page = 0, searchProperty = "", getAll = true) {
        return {
            searchString,
            rowsPerPage,
            propertyToOrder,
            direction,
            page,
            searchProperty,
            getAll
        }
    }
}