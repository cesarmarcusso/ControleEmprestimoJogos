using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Models_;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        // GET: api/<UsuarioController>
        [HttpGet]
        public IEnumerable<Usuarios> GetTodos()
        {
            using (var db = new DBInvilliaDesafioContext())
            {
                return db.Usuarios.ToList();
            }
        }

        // GET: api/<UsuarioController/xxxxxx>
        [HttpGet("{username}")]
        public Usuarios GetUsuarioPorLogin(string login)
        {
            using (var db = new DBInvilliaDesafioContext())
            {
                return db.Usuarios.Where(x => x.Username.Trim().Equals(login.Trim())).FirstOrDefault();
            }
        }

        [HttpPost]
        public Usuarios Login([FromBody] Usuarios entity)
        {
            using (var db = new DBInvilliaDesafioContext())
            {
                return db.Usuarios.ToList().Where(x => x.Username.Trim().Equals(entity.Username.Trim()) &&
                                                 x.Usersenha.Trim().Equals(entity.Usersenha.Trim())).FirstOrDefault();
            }
        }
    }

}
