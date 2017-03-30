namespace NorthLion.Zero.PaginatedModel
{
    public class PaginatedInputDto
    {
        /// <summary>
        /// Simple string to search
        /// </summary>
        public string SearchString { get; set; }
        /// <summary>
        /// Current page number
        /// </summary>
        public int Page { get; set; } = 0;
        /// <summary>
        /// Number of rows per page
        /// </summary>
        public int RowsPerPage { get; set; } = 10;
        /// <summary>
        /// A property flag to order the results
        /// </summary>
        public string Sort { get; set; }
        /// <summary>
        /// The direction of the order, Asc or Desc
        /// </summary>
        public string SortDir { get; set; } //Desc, Asc
        /// <summary>
        /// Property to search into
        /// </summary>
        public string Filter { get; set; }
        public bool GetAll { get; set; }
    }
}
