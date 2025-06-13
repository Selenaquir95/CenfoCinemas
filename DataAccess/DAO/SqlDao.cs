using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;

namespace DataAccess.DAOs
{
    public class SqlDao
    {

        /*
         * Clase u objeto que se encarga de la comunicacion con la
         * base de datos
         * Solo ejectura store procedures
         * 
         * Esta clase implementa un patron conocido como SINGLETON,
         * para asegurar la existencia de una unica instancia
         * del SQL DAO
         */

        //Paso 1: Crear una instancia privada de la misma clase
        private static SqlDao _instance;

        private string _connectionString;

        //Paso 2: Redefinir el constructor default y convertirlo en privado
        private SqlDao()
        {
            _connectionString = @"Data Source=srv-sqldatabase-squiros.database.windows.net;Initial Catalog=cenfocinemas_db;User ID=sysman;Password=Cenfotec123!;Trust Server Certificate=True";
        }

        //Paso 3: Definir el metodo que expone la unica instancia de SqlDao
        public static SqlDao GetInstance()
        {
            if (_instance == null)
            {
                _instance = new SqlDao();
            }
            return _instance;
        }

        //Metodo que permite ejectura un store procedure en la base de datos
        // no genera retorno, solo en caso de excepciones retorna exception

        public void ExecuteProcedure(SqlOperation sqlOperation)
        {
            using (var conn = new SqlConnection(_connectionString))
            {
                using (var command = new SqlCommand(sqlOperation.ProcedureName, conn)
                {
                    CommandType = System.Data.CommandType.StoredProcedure
                })
                {
                    //Set de los parametros
                    foreach (var param in sqlOperation.Parameters)
                    {
                        command.Parameters.Add(param);
                    }
                    //Ejectura el SP
                    conn.Open();
                    command.ExecuteNonQuery();
                }

            }
        }

        // procedimiento para ejectura SP Que retornan un set de datos
        public List<Dictionary<string, object>> ExecuteQueryProcedure(SqlOperation sqlOperation)
        {

            var lstResults = new List<Dictionary<string, object>>();

            using (var conn = new SqlConnection(_connectionString))

            {
                using (var command = new SqlCommand(sqlOperation.ProcedureName, conn)
                {
                    CommandType = System.Data.CommandType.StoredProcedure
                })
                {
                    //Set de los parametros
                    foreach (var param in sqlOperation.Parameters)
                    {
                        command.Parameters.Add(param);
                    }
                    //Ejectura el SP
                    conn.Open();

                    //de aca en adelante la implementacion es distinta con respecto al procedure anterior
                    // sentencia que ejectua el SP y captura el resultado
                    var reader = command.ExecuteReader();

                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {

                            var rowDict = new Dictionary<string, object>();

                            for (var index = 0; index < reader.FieldCount; index++)
                            {
                                var key = reader.GetName(index);
                                var value = reader.GetValue(index);
                                //aca agregamos los valores al diccionario de esta fila
                                rowDict[key] = value;
                            }
                            lstResults.Add(rowDict);
                        }
                    }

                }
            }

            return lstResults;
        }
    }
}
