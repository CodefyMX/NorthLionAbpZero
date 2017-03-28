namespace NorthLion.Zero.PaginatedModel
{
    public interface IPaginableResult
    {
        string SearchString { get; set; }
        int Page { get; set; }
        int Rows { get; set; }
        int RemainingPages { get; set; }
    }
}
