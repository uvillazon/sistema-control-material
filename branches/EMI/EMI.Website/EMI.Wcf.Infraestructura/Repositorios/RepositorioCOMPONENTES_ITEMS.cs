using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Elfec.SisMan.Infraestructura.Repositorios;
using EMI.Wcf.Model;
using Newtonsoft.Json;

namespace EMI.Wcf.Infraestructura.Repositorios
{
    public class RepositorioCOMPONENTES_ITEMS : RepositorioBase<COMPONENTES_ITEMS>
    {
        public RepositorioCOMPONENTES_ITEMS() : base() { }

        public string GuardarComponentesDetalle(string detalles, ITEMS_ARMAMENTO itemsArmamento)
        {
            if(BuscarTodos(x => x.ID_ITEM == itemsArmamento.ID_ITEM).Count() > 0){
                Eliminar(x => x.ID_ITEM == itemsArmamento.ID_ITEM);
                GuardarCambios();
            }
            if (detalles != "false")
            {
                dynamic det = JsonConvert.DeserializeObject(detalles);
                try
                {
                    foreach (var item in det)
                    {
                        COMPONENTES_ITEMS partes = new COMPONENTES_ITEMS()
                        {
                            ID_CMP = ObtenerId(),
                            ID_ITEM = itemsArmamento.ID_ITEM,
                            NOMBRE = item.NOMBRE,
                            CODIGO = itemsArmamento.NRO_FUSIL
                        };
                        Crear(partes);
                        GuardarCambios();
                        //respuestaSP = _serCmp.SP_GrabarDetalleCompra(detalleCompra, id_usr);
                    }
                    return "1";
                }
                catch (Exception e)
                {
                    return e.ToString();
                }
            }
            else
            {
                return "1";
            }
        }
        /// <summary>
        /// Proceso para cambiar componentes entre un operable y no operable
        /// </summary>
        /// <param name="ID_CMP1">COMPONENTE OPERABLE</param>
        /// <param name="ID_CMP2">COMPONENTE NO OPERABLE</param>
        /// <param name="login">NOMBRE USUARIO</param>
        /// <returns></returns>
        public string CambiarCompomenteArmamento(int ID_CMP1 , int ID_CMP2 ,string login )
        {
            try
            {
                var cmp1Editar = BuscarPorCriterio(x => x.ID_CMP == ID_CMP1);
                var cmp2Editar = BuscarPorCriterio(x => x.ID_CMP == ID_CMP2);
                HISTORICO_CMP hist = new HISTORICO_CMP() { 
                    FECHA = DateTime.Now,
                    ID_ITEM_OPERABLE = cmp1Editar.ID_ITEM,
                    ID_ITEM_NO_OPERABLE = cmp2Editar.ID_ITEM,
                    CMP_OPERABLE = string.Format("{0} - {1}",cmp1Editar.CODIGO , cmp1Editar.NOMBRE),
                    CMP_NO_OPERABLE = string.Format("{0} - {1}", cmp2Editar.CODIGO, cmp2Editar.NOMBRE),
                    LOGIN = login,
                    ID_HIST = _dbContext.HISTORICO_CMP.Count() == 0 ? 1 : _dbContext.HISTORICO_CMP.Max(x=>x.ID_HIST) +1
                };
                _dbContext.HISTORICO_CMP.Add(hist);
                int iditem1 = cmp1Editar.ID_ITEM;
                cmp1Editar.ID_ITEM = cmp2Editar.ID_ITEM;
                cmp2Editar.ID_ITEM = iditem1;
                GuardarCambios();
                return "1";

            }
            catch (Exception e)
            {
                return e.ToString();
            }
        }
        
    }
}
