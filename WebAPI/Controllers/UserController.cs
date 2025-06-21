using CoreApp;
using DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace WebAPI.Controllers
{
    //Indicmos la direccion de este controlador
    //sera https://controlador:servidor:puerto/api/user
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        [HttpPost]
        [Route("Create")]
        
        public ActionResult Create(User user)
        {
            try{
                var um = new UserManager();
                um.Create(user);
                return Ok(user);
            }
            catch (Exception ex) 
            {
                return StatusCode(500, ex.Message);
            }
         }
        [HttpGet]
        [Route("RetriveAll")]
        public ActionResult RetrieveAll(User user)
        {
            try
            {
                var um = new UserManager();
                var lstResults = new RetrieveAll();
            }
            catch(Exception ex) 
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet]
        [Route("RetrieveById")]
        public ActionResult RetrieveById()
        {
            try
            {
                var um = new UserManager();
                var lstResults = new RetrieveById();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }


        [HttpGet]
        [Route("RetrieveByUserCode")]
        public ActionResult RetrieveByUserCode(User user)
        {
            try
            {
                var user = new User { UserCode = userCode };
                var result = _crud.RetrieveByUserCode<User>(user);

                if (result == null)
                    return NotFound(new { error = "Usuario no encontrado con ese código." });

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpPut]
        [Route("Update")]
        public ActionResult Update(User user) 
        {

        }



    }
}
