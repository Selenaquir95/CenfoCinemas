using System;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.DAOs
{

    /*
     * clase con instrucciones de lo que tiene que hacer el sql dao
     */

    public class SqlOperation
    {

        public string ProcedureName { get; set; }
        public List<SqlParameter> Parameters { get; set; }
        
        public SqlOperation()
        {
            Parameters = new List<SqlParameter>();
        }

        public void AddStringParameter(string ParamName, string ParamValue)
        {
            Parameters.Add(new SqlParameter(ParamName, ParamValue));
        }

        public void AddIntParam(string paramName, int paramValue)
        {
            Parameters.Add(new SqlParameter(paramName, paramValue));
        }

        public void AddDoubleParam(string paramName, double paramValue)
        {
            Parameters.Add(new SqlParameter(paramName, paramValue));
        }

        public void AddDateTimeParam(string paramName, DateTime paramValue)
        {
            Parameters.Add(new SqlParameter(paramName, paramValue));
        }

    }
}

