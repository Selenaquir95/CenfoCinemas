
using CoreApp;
using DataAccess.CRUD;
using DataAccess.DAOs;
using DTOs;
using System.Diagnostics;
using System.IO;

public class Program
{
    public static void Main(string[] args)
    {
        Console.WriteLine("Seleccione la opción deseada");
        Console.WriteLine("1. Crear Usuario");
        Console.WriteLine("2. Consultar usuarios");
        Console.WriteLine("3. Actualizar Usuarios");
        Console.WriteLine("4. Eliminar usuarios");
        Console.WriteLine("5. Crear Pelicula");
        Console.WriteLine("6. Consultar Pelicula");
        Console.WriteLine("7. Actualizar Pelicula");
        Console.WriteLine("8. Eliminar Pelicula");

        var option = Int32.Parse(Console.ReadLine());

        switch (option)
        {
            case 1:

                Console.WriteLine("Digite el código del usuario");
                var userCode = Console.ReadLine();

                Console.WriteLine("Digite el nombre");
                var name = Console.ReadLine();

                Console.WriteLine("Digite el E-MAil");
                var email = Console.ReadLine();

                Console.WriteLine("Digite el Password");
                var password = Console.ReadLine();

                var status = "AC";

                Console.WriteLine("Digite la fecha de nacimiento");
                var bdate = DateTime.Parse(Console.ReadLine());

                //Creamos el objeto del usuario a partir de los valores capturados en consola
                var user = new User()
                {
                    UserCode = userCode,
                    Name = name,
                    Email = email,
                    Password = password,
                    Status = status,
                    BirthDate = bdate,
                };
                var um = new UserManager();
                um.Create(user);
                break;

            case 5:
                Console.WriteLine("Ingrese el titulo de la película");
                var title = Console.ReadLine();

                Console.WriteLine("Escriba la descripción de la película");
                var description = Console.ReadLine();

                Console.WriteLine("Escriba la fecha de lanzamiento de la película");
                var release = DateTime.Parse(Console.ReadLine());

                Console.WriteLine("Escriba el género de la película");
                var genre = Console.ReadLine();

                Console.WriteLine("Escriba el nombre del director de la película");
                var director = Console.ReadLine();


                break;

        }
        var sqlDao = SqlDao.GetInstance();
    }

}