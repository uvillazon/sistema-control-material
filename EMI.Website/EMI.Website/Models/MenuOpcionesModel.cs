using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EMI.Website.Models
{
    public class MenuOpcionesModel
    {
        public string text { get; set; }
        public string clase { get; set; }
        public string tooltip { get; set; }
        public string iconCls { get; set; }
        public string estilo { get; set; }
        public List<MenuOpcionesModel> menus { get; set; }
        public bool leaf { get; set; }

        public List<MenuOpcionesModel> MenuDinamico(IList<AutorizacionService.MenuOpcionesModel> menus)
        {
            List<MenuOpcionesModel> result = new List<MenuOpcionesModel>();

            foreach (var item in menus)
            {
                //item.MN_PERFILES_OPCIONES.Single(x=>x.MN_MENU_OPCIONES)

                MenuOpcionesModel menu = new MenuOpcionesModel();
                if (item.ID_PADRE == null)
                {
                    menu.text = item.MENU;
                    menu.tooltip = item.TOOLTIP;
                    menu.clase = item.CLASE;
                    menu.iconCls = item.ICONCCS;
                    menu.estilo = null;
                    if (VericiarHijos(menus, item.ID_MENU))
                    {
                        menu.leaf = false;
                        menu.menus = BuscarHijos(menus, item.ID_MENU);
                    }
                    else
                    {
                        menu.leaf = true;
                        menu.menus = null;
                    }
                    result.Add(menu);
                }


            }

            return result;
        }
        public List<MenuOpcionesModel> BuscarHijos(IList<AutorizacionService.MenuOpcionesModel> menus, int ID_PADRE)
        {
            List<MenuOpcionesModel> result = new List<MenuOpcionesModel>();

            foreach (var item in menus)
            {
                if (item.ID_PADRE == ID_PADRE)
                {

                    MenuOpcionesModel menu = new MenuOpcionesModel()
                    {
                        text = item.MENU,
                        tooltip = item.TOOLTIP,
                        clase = item.CLASE,
                        iconCls = item.ICONCCS,
                        estilo = null,
                        leaf = true
                    };
                    if (VericiarHijos(menus, item.ID_MENU))
                    {
                        menu.leaf = false;
                        menu.menus = BuscarHijos(menus, item.ID_MENU);
                    }
                    else
                    {
                        menu.leaf = true;
                        menu.menus = null;
                    }
                    result.Add(menu);


                }

            }

            return result;
        }
        public bool VericiarHijos(IList<AutorizacionService.MenuOpcionesModel> menus, int ID_PADRE)
        {
            foreach (var item in menus)
            {
                if (item.ID_PADRE == ID_PADRE)
                {
                    return true;
                }
            }
            return false;
        }
    }
}
