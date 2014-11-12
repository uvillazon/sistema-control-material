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
    public class RepositorioMOV_MUNICIONES_UNIDADES : RepositorioBase<MOV_MUNICIONES_UNIDADES>
    {
        public RepositorioMOV_MUNICIONES_UNIDADES() : base() { }
        public string ActualizarMovimiento(MOV_MUNICIONES_UNIDADES mov)
        {
            int saldo = 0;
            try
            {
                if (BuscarTodos(x => x.ID_MUNICION_UNIDAD == mov.ID_MUNICION_UNIDAD && x.FECHA < mov.FECHA).Count() == 0)
                {
                    saldo = 0;
                }
                else
                {
                    saldo = BuscarTodos(x => x.ID_MUNICION_UNIDAD == mov.ID_MUNICION_UNIDAD && x.FECHA < mov.FECHA).OrderByDescending(y => y.FECHA).ThenByDescending(z => z.ID_MOV).FirstOrDefault().SALDO;
                }
                var movimientos = BuscarTodos(x => x.ID_MUNICION_UNIDAD == mov.ID_MUNICION_UNIDAD && x.FECHA >= mov.FECHA).OrderBy(y => y.FECHA).ThenBy(z => z.ID_MOV);
                foreach (var item in movimientos)
                {
                    saldo = saldo + item.ENTRADA - item.SALIDA;
                    item.SALDO = saldo;
                }
                var matBelico = _dbContext.MUNICIONES_UNIDADES.Where(x => x.ID_MUNICION_UNIDAD == mov.ID_MUNICION_UNIDAD).FirstOrDefault();
                matBelico.CANTIDAD_DISPONIBLE = saldo;
                GuardarCambios();
                GuardarHistoricoUnidades(matBelico, "MODIFICACION", matBelico.ID_MUNICION_UNIDAD, mov.LOGIN);
                return "1";
            }
            catch (Exception e)
            {

                return e.ToString();
            }

        }
        public string GuardarMovimiento(MOV_MUNICIONES_UNIDADES mov, string login)
        {
            mov.ID_MOV = ObtenerId();
            mov.LOGIN = login;
            try
            {
                Crear(mov);
                GuardarCambios();
                GuardarHistorico(mov, "CREACION", mov.ID_MOV, login);
                return ActualizarMovimiento(mov);
            }
            catch (Exception e)
            {
                return e.ToString();
            }
        }
        public void GuardarHistoricoUnidades(MUNICIONES_UNIDADES entity, string accion, int ID_TABLA, string login)
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
