using System;
using System.Threading.Tasks;
using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(tdyctw.Code.Sandbox.SandboxStartup))]

namespace tdyctw.Code.Sandbox
{
    public class SandboxStartup
    {
        public void Configuration(IAppBuilder app)
        {
            app.MapSignalR();
        }
    }
}
