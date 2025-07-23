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
    public class MovieManager : BaseManager
    {
        public async Task Create(Movie movie)
        {
            try
            {
                var mCrud = new MovieCrudFactory();

                // Consulta en la base de datos si existe una película con ese título
                var mExist = mCrud.RetrieveByTitle<Movie>(movie.Title);

                if (mExist == null)
                {
                    mCrud.Create(movie);
                    //Email de pelicula creada
                   // var emailService = new EmailManager();
                    //await emailService.SendEmailMovie(movie);
                }
                else
                {
                    throw new Exception("Ya existe una película con este título registrada.");
                }
            }
            catch (Exception ex)
            {
                ManageException(ex);
            }
        }
        public List<Movie> RetrieveAll()
        {
            var mCrud = new MovieCrudFactory();
            return mCrud.RetrieveAll<Movie>();

        }
        public Movie RetrieveById(int id)
        {
            var mCrud = new MovieCrudFactory();
            return mCrud.RetrieveById<Movie>(id);
        }
        public Movie RetrieveByTitle(string Title)
        {
            var mCrud = new MovieCrudFactory();
            return mCrud.RetrieveByTitle<Movie>(Title);

        }

        public Movie Update(Movie movie)
        {
            var mCrud = new MovieCrudFactory();
            mCrud.Update(movie);
            return RetrieveById(movie.Id);
        }
        public void Delete(int id)
        {
            var uCrud = new MovieCrudFactory();
            uCrud.Delete(new Movie { Id = id });
        }

    }
}
