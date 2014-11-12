using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data.Entity;
using System.Data;
using System.Linq.Expressions;
using System.Data.Objects;
using EMI.Wcf.Model;
using System.Reflection;

namespace Elfec.SisMan.Infraestructura.Repositorios
{
    public class RepositorioBase<TEntity> : IDisposable where TEntity : class
    {

        protected EmiEntities _dbContext = null;

        //public int ObtenerSecuencia(string codigo)
        //{
        //    ObjectParameter v_resp = new ObjectParameter("p_res", typeof(Int32));
        //    _dbContext.P_EE_SECUENCIA(codigo, 0, v_resp);
        //    return Convert.ToInt32(v_resp.Value);
        //}

        /// <summary>
        /// Metodo Constructor
        /// </summary>
        /// <param name="connectionString"></param>
        public RepositorioBase()
        {
            //ObjectParameter v_resp = new ObjectParameter("p_res", typeof(Int32));
            _dbContext = new EmiEntities();
            //el rol se debera obtener forma dinamica de acuerdo al perfil de usuario
            //string sql = "SET ROLE rol_adm IDENTIFIED BY abc";
            //_dbContext.Database.ExecuteSqlCommand(sql);
            //_dbContext.P_MN_ACTIVAR_ROLES_USR("lzerda",v_resp);
        }

        #region Metodos para Crear una nueva entidad ("C"reate)
        /// <summary>
        /// Añade una entidad a la contexto de datos
        /// </summary>
        /// <returns></returns>
        public virtual TEntity Crear(TEntity entity)
        {
            var query = from t in typeof(TEntity).GetProperties() select t;
            //var query1 = from t in typeof(TEntity).;
            //foreach (var columns in query)
            //{
            //    var SelectedColumnValue = columns.GetType().GetProperties().GetValue(0).GetType();
            //}
            foreach (var columns in query)
            {
                var SelectedColumnValue = columns.GetType().GetProperties().GetValue(0).GetType();
            }
            //list.Add(Tuple.Create(ColumnName, ColumnValue));
            //return 1;
            return _dbContext.Set<TEntity>().Add(entity);
        }
        public void GuardarHistorico(TEntity entity, string accion, int ID_TABLA, string login)
        {
            Type myType = entity.GetType();
            DateTime fechaReg = DateTime.Now;
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
                                FECHA = fechaReg,
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

        #endregion

        #region Metodos para Recuperar una entidad o entidades ("R"ead)
        public virtual TEntity BuscarPorId(long id)
        {
            return _dbContext.Set<TEntity>().Find(id);
        }
        public virtual int ObtenerId()
        {
            //var todos = BuscarTodos(x=>x.GetType().);
            //return BuscarTodos().Count() + 1;
            var param = Expression.Parameter(typeof(TEntity), "entity");
            var idProperty = param.GetType().GetGenericArguments().FirstOrDefault();
            var columnnames = (from t in typeof(TEntity).GetProperties() where t.Name.Contains("ID") select t).FirstOrDefault();

            //var res = SelectByKey("Key");
            var propertyExpression1 = Expression.Property(param, columnnames.Name.ToString());

            var mySortExpression = Expression.Lambda<Func<TEntity, Int32>>(propertyExpression1, param);
            return BuscarTodos().Count() > 0 ? BuscarTodos().Max(mySortExpression) + 1 : 1;
            //iQuery = direction == "DESC" ? q.OrderByDescending(mySortExpression) : q.OrderBy(mySortExpression);

        }
        public virtual TEntity BuscarPorCriterio(Expression<Func<TEntity, bool>> criterio = null)
        {
            return BuscarTodos(criterio).FirstOrDefault();
        }

        public virtual IQueryable<TEntity> BuscarTodos(Expression<Func<TEntity, bool>> criterio = null)
        {
            return null != criterio ? _dbContext.Set<TEntity>().Where(criterio) : _dbContext.Set<TEntity>();
        }

        public bool SiExiste(Expression<Func<TEntity, bool>> criterio = null, bool nuevo = true)
        {
            if (nuevo)
            {
                return BuscarPorCriterio(criterio) == null ? true : false;
            }
            else
            {
                return true;
            }
        }

        public IQueryable<T> Set<T>() where T : class
        {
            return _dbContext.Set<T>();
        }

        #endregion

        #region Metodo para Modificar o actualizar una entidad ("U"pdate)
        //public virtual void Modificar(TEntity entity)
        //{
        //    _dbContext.Entry(entity).State = EntityState.Modified;
        //}

        #endregion

        #region Metodos utilizados para eliminar una entidad ("D"elete)
        public virtual void Eliminar(long id)
        {
            var item = _dbContext.Set<TEntity>().Find(id);
            _dbContext.Set<TEntity>().Remove(item);
            
        }

        public virtual void Eliminar(TEntity entity)
        {
            _dbContext.Set<TEntity>().Remove(entity);
        }

        public virtual void Eliminar(Expression<Func<TEntity, bool>> where)
        {
            var objects = _dbContext.Set<TEntity>().Where(where).AsEnumerable();
            foreach (var item in objects)
            {
                _dbContext.Set<TEntity>().Remove(item);
                //_dbContext.SaveChanges();
            }
        }

        //public virtual void GuardarBitacora(int id , string columna , str

        #endregion

        public virtual bool GuardarCambios()
        {
            return 0 < _dbContext.SaveChanges();
            //_dbContext.SaveChanges();
            //return true;
        }

        /// <summary>
        /// Metodo para manejar paginacion
        /// </summary>
        /// <typeparam name="S"></typeparam>
        /// <param name="pageIndex"></param>
        /// <param name="pageCount"></param>
        /// <param name="orderByExpression"></param>
        /// <param name="ascending"></param>
        /// <returns></returns>
        public IQueryable<TEntity> ObtenerElementosPaginados<S>(int pageStart, int pageLimit,
                                                      Expression<Func<TEntity, S>> orderByExpression, bool ascending)
        {
            //Checking arguments for this query
            if (pageStart < 0)
            {
                throw new NotImplementedException();
            }

            if (pageLimit <= 0)
            {
                throw new NotImplementedException();
            }

            if (orderByExpression == (Expression<Func<TEntity, S>>)null)
            {
                throw new NotImplementedException();
            }

            DbSet<TEntity> objectSet = _dbContext.Set<TEntity>();


            return (ascending) ? objectSet.OrderBy(orderByExpression)
                                          .Skip(pageStart)
                                          .Take(pageLimit)
                                          .AsQueryable()
                               : objectSet.OrderByDescending(orderByExpression)
                                          .Skip(pageStart)
                                          .Take(pageLimit)
                                          .AsQueryable();

        }

        public IQueryable<TEntity> ObtenerElementosPaginados(IQueryable<TEntity> q, int maximumRows, int startRowIndex, string sortColumn, string direction)
        {
            try
            {
                var param = Expression.Parameter(typeof(TEntity), "entity");

                var propertyExpression1 = Expression.Property(param, sortColumn);
                IQueryable<TEntity> iQuery;

                if (propertyExpression1.Type == typeof(int))
                {
                    var mySortExpression = Expression.Lambda<Func<TEntity, int>>(propertyExpression1, param);
                    iQuery = direction == "DESC" ? q.OrderByDescending(mySortExpression) : q.OrderBy(mySortExpression);

                }
                else if (propertyExpression1.Type == typeof(int?))
                {
                    var mySortExpression = Expression.Lambda<Func<TEntity, int?>>(propertyExpression1, param);
                    iQuery = direction == "DESC" ? q.OrderByDescending(mySortExpression) : q.OrderBy(mySortExpression);
                }
                else if (propertyExpression1.Type == typeof(DateTime?))
                {
                    var mySortExpression = Expression.Lambda<Func<TEntity, DateTime?>>(propertyExpression1, param);
                    iQuery = direction == "DESC" ? q.OrderByDescending(mySortExpression) : q.OrderBy(mySortExpression);
                }
                else if (propertyExpression1.Type == typeof(DateTime))
                {
                    var mySortExpression = Expression.Lambda<Func<TEntity, DateTime>>(propertyExpression1, param);
                    iQuery = direction == "DESC" ? q.OrderByDescending(mySortExpression) : q.OrderBy(mySortExpression);
                }
                else if (propertyExpression1.Type == typeof(decimal?))
                {
                    var mySortExpression = Expression.Lambda<Func<TEntity, decimal?>>(propertyExpression1, param);
                    iQuery = direction == "DESC" ? q.OrderByDescending(mySortExpression) : q.OrderBy(mySortExpression);
                }
                else if (propertyExpression1.Type == typeof(decimal))
                {
                    var mySortExpression = Expression.Lambda<Func<TEntity, decimal>>(propertyExpression1, param);
                    iQuery = direction == "DESC" ? q.OrderByDescending(mySortExpression) : q.OrderBy(mySortExpression);
                }
                else if (propertyExpression1.Type == typeof(Int16?))
                {
                    var mySortExpression = Expression.Lambda<Func<TEntity, Int16?>>(propertyExpression1, param);
                    iQuery = direction == "DESC" ? q.OrderByDescending(mySortExpression) : q.OrderBy(mySortExpression);
                }
                else if (propertyExpression1.Type == typeof(Int16))
                {
                    var mySortExpression = Expression.Lambda<Func<TEntity, Int16>>(propertyExpression1, param);
                    iQuery = direction == "DESC" ? q.OrderByDescending(mySortExpression) : q.OrderBy(mySortExpression);
                }
                else
                {
                    var mySortExpression = Expression.Lambda<Func<TEntity, object>>(propertyExpression1, param);
                    iQuery = direction == "DESC" ? q.OrderByDescending(mySortExpression) : q.OrderBy(mySortExpression);
                }


                return iQuery.Skip(startRowIndex).Take(maximumRows);
                //                
            }
            catch (Exception)
            {
                IQueryable<TEntity> iQuery;
                var param = Expression.Parameter(typeof(TEntity), "entity");
                var idProperty = param.GetType().GetGenericArguments().FirstOrDefault();
                var columnnames = (from t in typeof(TEntity).GetProperties() where t.Name.Contains("ID") select t).FirstOrDefault();

                //var res = SelectByKey("Key");
                var propertyExpression1 = Expression.Property(param, columnnames.Name.ToString());

                var mySortExpression = Expression.Lambda<Func<TEntity, Int32>>(propertyExpression1, param);
                iQuery = direction == "DESC" ? q.OrderByDescending(mySortExpression) : q.OrderBy(mySortExpression);
                iQuery = iQuery.Skip(startRowIndex).Take(maximumRows);
                //iQuery = Query(startRowIndex, maximumRows);
                return iQuery;
            }
        }

        /// <summary>
        /// Releases all resources used by the Entities
        /// </summary>
        public void Dispose()
        {
            if (null != _dbContext)
            {
                _dbContext.Dispose();
            }
        }

    }
}
