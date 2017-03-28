namespace NorthLion.Zero.PaginatedModel
{
    public class PaginatedInputDto
    {
        public string SearchString { get; set; }
        public int Page { get; set; } = 0;
        public int RowsPerPage { get; set; } = 10;
        public string PropertyToOrder { get; set; }
        public string Direction { get; set; } //Desc, Asc
    }
}
