using DataAccess.CRUD;
using DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreApp
{
    public class UserManager : BaseManager
    {
        /*
         * Metodo para la creacion de usuario
         * valida que el ususario sea mayor de 18 años
         * valida que el codigo de usuario esté disponible
         * valida que el correo electronico no esté registrado
         * Envia el correo electronico de bienvenida
         */
        public void Create(User user)
        {
            try
            {
                //Validar la edad
                if (IsOver18(user))
                {
                    var uCrud = new UserCrudFactory();

                    //Consultamos en la bd si existe un usuario con ese código
                    var uExist = uCrud.RetrieveByUserCode<User>(user);

                    if (uExist == null)
                    {
                        //Consultamos si en la bd existe un usuario con ese email.
                        uExist = uCrud.RetrieveByEmail<User>(user);

                        if (uExist == null)
                        {
                            uCrud.Create(user);
                            // AQUI VA SIGUE EL ENVIO DE CORREO
                        }
                        else
                        {
                            throw new Exception("Este correo electrónico ya se encuentra registrado.");
                        }
                    }
                    else
                    {
                        throw new Exception("El código de usuario no está disponible.");
                    }
                }
                else
                {
                    throw new Exception("Usuario no cumple con la edad mínima.");
                }
            }
            catch (Exception ex)
            {
                ManageException(ex);
            }
        }

        private bool IsOver18(User user)
        {
            var currentDate = DateTime.Now;
            int age = currentDate.Year - user.BirthDate.Year;

            if (user.BirthDate > currentDate.AddYears(-age).Date)
            {
                age--;
            }

            return age >= 18;

        }
    }
}





