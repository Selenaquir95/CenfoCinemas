using DataAccess.CRUD;
using DTOs;
using SendGrid;
using SendGrid.Helpers.Mail;
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
        public async void Create(User user)
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
                            var emailService = new EmailManager();
                            await emailService.SendEmailUser(user);

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

        public List<User> RetrieveAll()
        {
                var uCrud = new UserCrudFactory();
                return uCrud.RetrieveAll<User>();
        }

        public User RetrieveById(int id)
        {
            var uCrud = new UserCrudFactory();
            return uCrud.RetrieveById<User>(id);
        }

        public User RetrieveByUserCode(User user)
        {
            var uCrud = new UserCrudFactory();
            var udto = new User { UserCode = user.UserCode };
            return uCrud.RetrieveByUserCode<User>(user);
        }
        public User RetrieveByEmail(User user)
        {
            var uCrud = new UserCrudFactory();
            var udto = new User { Email = user.Email };
            return uCrud.RetrieveByEmail<User>(user);
        }
        public User Update(User user)
        {
            var uCrud = new UserCrudFactory();
            uCrud.Update(user);
            return RetrieveById(user.Id);
        }
        public void Delete(int id)
        {
            var uCrud = new UserCrudFactory();
            uCrud.Delete(new User { Id = id });
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





