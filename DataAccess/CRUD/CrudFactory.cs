using DataAccess.DAOs;
using DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.CRUD
{

    // Clase padre abstracta de los CRUDS
    //Define como se hacen CRUDs en la aquitectura
    public abstract class CrudFactory
    {
        protected SqlDao _sqlDao;


        //Definir los metodos que formaan parte del contrato
        //C= Create
        //R= Retreive
        //U= Update
        //D= Delete

        public abstract void Create(BaseDTO baseDTO);
        public abstract void Update(BaseDTO baseDTO);
        public abstract void Delete(BaseDTO baseDTO);
        
        public abstract T Retrieve<T>();
        public abstract T RetrieveById<T>(int id);
        public abstract List<T> RetrieveAll<T>();
    }
}
