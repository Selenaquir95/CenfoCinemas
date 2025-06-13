
using DataAccess.DAOs;
using System.Diagnostics;

public class Program
{
    public static void Main(string[] args)
    {
        Console.WriteLine("Seleccione la opción deseada");
        Console.WriteLine("1. Crear Usuario");
        Console.WriteLine("2. Consultar usuarios");
        Console.WriteLine("3. Actualizar Usuarios");
        Console.WriteLine("4. Eliminar usuarios");
        Console.WriteLine("6. Crear Pelicula");
        Console.WriteLine("7. Consultar Pelicula");
        Console.WriteLine("8. Actualizar Pelicula");
        Console.WriteLine("9. Eliminar Pelicula");

        var option=Int32.Parse(Console.ReadLine());
        var sqlOperation = new SqlOperation();

        switch (option)
        {
            case 1:
                Console.WriteLine("Digite el código del usuario");
                var userCode=Console.ReadLine();

                Console.WriteLine("Digite el nombre");
                var name = Console.ReadLine();

                Console.WriteLine("Digite el E-MAil");
                var email = Console.ReadLine();

                Console.WriteLine("Digite el Password");
                var password = Console.ReadLine();

                var status = "AC";
                
                break;

        }
    }

}