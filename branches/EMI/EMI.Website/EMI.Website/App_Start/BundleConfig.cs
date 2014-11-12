using System.Web;
using System.Web.Optimization;

namespace EMI.Website
{
    public class BundleConfig
    {
        // Para obtener más información acerca de Bundling, consulte http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new StyleBundle("~/Content/extjs").Include(
               "~/Content/Icons.css",
               "~/Content/print.css",
               "~/Content/extjs42.css",
               "~/Content/Blext.css",
               "~/Content/extensible/css/extensible-all.css"
               ));
            bundles.Add(new ScriptBundle("~/Scripts/extjs/extjs1").Include(
                      "~/Scripts/extjs/shared/include-ext.js"
                //,
                //"~/Scripts/extjs/Shared/options-toolbar.js"

                      ));
        }
    }
}