using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace tdyctw.Code.Extensions
{
    public static class MiscExtensions
    {
        public static bool IsReleaseBuild()
        {
#if DEBUG
            return false;
#else
    return true;
#endif
        }

        public static string DebugResourceSuffix()
        {
            return IsReleaseBuild() ? "" : DateTime.Now.Ticks.ToString();
        }
    }

}