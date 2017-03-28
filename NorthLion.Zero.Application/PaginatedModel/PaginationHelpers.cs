using System;

namespace NorthLion.Zero.PaginatedModel
{
    /// <summary>
    /// Helpers to avoid repeated pagination operations... keep it simple please
    /// </summary>
    public static class PaginationHelpers
    {
        /// <summary>
        /// Get the total number of remaining pages
        /// </summary>
        /// <param name="records"></param>
        /// <param name="rows"></param>
        /// <returns></returns>
        public static int GetRemainingPages(int records, int rows)
        {
            return Convert.ToInt32(Math.Ceiling(Convert.ToDouble(records) / rows));
        }
        /// <summary>
        /// Gets the number of rows that will be skiped for the next page
        /// </summary>
        /// <param name="page"></param>
        /// <param name="rows"></param>
        /// <returns></returns>
        public static int GetSkipTotal(int page, int rows)
        {
            return (page * rows);
        }
    }
}
