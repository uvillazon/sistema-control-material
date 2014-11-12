using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Elfec.SisMan.Infraestructura.Repositorios;
using EMI.Wcf.Model;

namespace EMI.Wcf.Infraestructura.Repositorios
{
    public class RepositorioITEMS_VERIFICACIONES : RepositorioBase<ITEMS_VERIFICACIONES>
    {
        public RepositorioITEMS_VERIFICACIONES() : base() { }

        public string GuardarItemVerificacion(ITEMS_VERIFICACIONES item, string login)
        {
            try
            {
                //vamos a verificar que la hora no sea mayor
                //var horaanterio = _dbContext.ITEMS_MAT_LOGISTICOS.Where(x => x.ID_ITEM == item.ID_ITEM).FirstOrDefault().;


                var veri = BuscarTodos(x => x.ID_ITEM == item.ID_ITEM);
                
                if (veri.Count() > 0)
                {
                    var itemsTmp = veri.OrderByDescending(x => x.ID_VERIFICACION).FirstOrDefault();
                    item.VALOR_ANTERIOR = itemsTmp.VALOR_NUEVO;
                    item.ID_VERIFICACION = ObtenerId();
                    item.LOGIN = login;
                    item.FECHA_REG = DateTime.Now;
                    Crear(item);
                    GuardarHistorico(item, "CREACION", item.ID_ITEM, login);
                    if (item.VALOR_NUEVO == "0") {
                        var itemLogistico = _dbContext.ITEMS_MAT_LOGISTICOS.Where(x => x.ID_ITEM == item.ID_ITEM).FirstOrDefault();
                        itemLogistico.ESTADO = "NO OPERABLE";
                        itemLogistico.FECHA_BAJA = item.FECHA;
                        itemLogistico.LOGIN_BAJA = login;
                        itemLogistico.OBSERVACION_BAJA = item.OBSERVACION;
                        GuardarHistoricoItem(itemLogistico, "BAJA", itemLogistico.ID_ITEM, login);
                    }
                }
                else
                {
                    var itemTmp = _dbContext.ITEMS_MAT_LOGISTICOS.Where(x => x.ID_ITEM == item.ID_ITEM).FirstOrDefault();
                    item.VALOR_ANTERIOR = itemTmp.MAT_LOGISTICOS.HORA_VIDA.ToString();
                    item.ID_VERIFICACION = ObtenerId();
                    item.LOGIN = login;
                    item.FECHA_REG = DateTime.Now;
                    Crear(item);
                    GuardarHistorico(item, "CREACION", item.ID_ITEM, login);
                }
                GuardarCambios();
                return item.ID_VERIFICACION.ToString();
            }
            catch (Exception e)
            {
                return e.ToString();
            }
        }

        public void GuardarHistoricoItem(ITEMS_MAT_LOGISTICOS entity, string accion, int ID_TABLA, string login)
        {
            Type myType = entity.GetType();
            IList<PropertyInfo> props = new List<PropertyInfo>(myType.GetProperties());
            string tabla = myType.Name;
            foreach (PropertyInfo prop in props)
            {
                if (prop.PropertyType.Name != "ICollection`1")
                {
                    var name = prop.Name;
                    object propValue = prop.GetValue(entity, null);
                    if (propValue != null)
                    {
                        int id = _dbContext.BITACORAS.Count() > 0 ? _dbContext.BITACORAS.Max(x => x.ID_HIST) + 1 : 1;
                        try
                        {
                            BITACORAS hist = new BITACORAS()
                            {
                                ID_HIST = id,
                                ACCION = accion,
                                COLUMNA = name,
                                FECHA = DateTime.Now,
                                ID_TABLA = ID_TABLA,
                                VALOR = propValue.ToString(),
                                LOGIN = login,
                                TABLA = tabla

                            };
                            _dbContext.BITACORAS.Add(hist);
                            GuardarCambios();
                        }
                        catch (Exception)
                        {

                            continue;
                        }
                    }
                }
            }
        }
    }
}
