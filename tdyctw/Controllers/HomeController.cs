using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Dapper;
using System.Data.SqlClient;

namespace tdyctw.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            using (var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["tdyctwdb"].ConnectionString))
            {
                conn.Open();
                var result = conn.Query<dynamic>("select paramkey, paramvalue from parameter where paramkey = @ParamKey", new { ParamKey = "appversion" });
                ViewBag.AppVersion = result.FirstOrDefault().paramvalue;
            }
            return View();
        }
    }
}