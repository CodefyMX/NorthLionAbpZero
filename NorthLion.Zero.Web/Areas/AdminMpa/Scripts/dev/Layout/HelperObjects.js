
/**
 * Table object for table search
 */
class TableObject {

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
class CustomTableAjaxRequest {
    constructor(pageNameProperty = "page",
        rowsPerPageName = "rowsPerPage",
        sortPropName = "propertyToOrder",
        directionPropertyName = "direction",
        searchPropertyName = "searchProperty",
        searchPropertyValueName = "searchString") {
        return {
            "page": pageNameProperty,
            "size": rowsPerPageName,
            "sort": sortPropName,
            "sort_dir": directionPropertyName,
            "filter": searchPropertyName,
            "filter_value":searchPropertyValueName
        }
    }
}