using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace NorthLion.Zero.Helpers
{
    public static class StringToSlug
    {
        public static string ToSlug(this string value)
        {
            if (value == null) return string.Empty;
            //Cambia a minusc
            value = value.ToLowerInvariant();

            //Remueve los acent
            var bytes = Encoding.GetEncoding("Cyrillic").GetBytes(value);
            value = Encoding.ASCII.GetString(bytes);

            //Remueve los espacios y agrega -
            value = Regex.Replace(value, @"\s", "-", RegexOptions.Compiled);

            //Remueve caracteres no validos
            value = Regex.Replace(value, @"[^a-z0-9\s-_]", "", RegexOptions.Compiled);

            //Remueve - del fin
            value = value.Trim('-', '_');

            //Remueve - repetidos
            value = Regex.Replace(value, @"([-_]){2,}", "$1", RegexOptions.Compiled);

            return value;
        }
    }
}
