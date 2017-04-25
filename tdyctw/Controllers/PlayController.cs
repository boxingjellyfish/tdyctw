using csDelaunay;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace tdyctw.Controllers
{
    public class PlayController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
        
        public ActionResult GenerateFixedMap()
        {
            var points = new List<Vector2f>();

            points.Add(new Vector2f(100, 100));
            points.Add(new Vector2f(200, 300));
            points.Add(new Vector2f(40, 60));
            points.Add(new Vector2f(50, 150));
            points.Add(new Vector2f(256, 123));
            points.Add(new Vector2f(545, 411));

            var bounds = new Rectf(10, 10, 950, 530);

            var voronoi = new Voronoi(points, bounds);

            var diagram = voronoi.VoronoiDiagram();

            return Json(diagram, JsonRequestBehavior.AllowGet);
        }
    }
}