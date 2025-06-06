using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.DAO
{

    /*
     *Clase u objeto que se encarga de la comunicacion con la base de datos
     *solo se ejecuta Store Procedures
     *
     *Esta clase implementa el Patron del Singleton
     *para asegurar la existencia de una unica instancia de este objeto
     */
    public class SqlDao
    {
        //Paso 1: crear una instancia privada de la misma clase
        private static SqlDao _instance;
        private string _connectionString;

        //Paso 2:Redefinir el constructor defaulty convertirlo en privado
        private SqlDao() 
        {
          _connectionString = string.Empty;
        }

        public static SqlDao GetInstance() {
            if (_instance == null)
            {
                _instance = new SqlDao();
            }
            return _instance;
        }

        //Metodo para la ejecución SP sin retorno
        public void ExecuteProcedure(SqlOperation operation)
        {
            //Conectarse a la base de datos
            //Ejecutar el Sp
        }

        //Metodo para la ejcución Sp con retorno de datos
        public List<Dictionary<String, object>> ExecuteQueryProcedure(SqlOperation operation) {
            //Conectarse a la base de datos
            //Ejecutar el SP
            //Capturar los resultados
            //Convertir en DTOs

            var list = new List<Dictionary<String, object>>();
            return list;
        }
            
        
    }
}
