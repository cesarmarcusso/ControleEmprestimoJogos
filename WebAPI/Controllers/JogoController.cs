using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models_;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JogoController : ControllerBase
    {
        // GET: api/<JogoController>
        [HttpGet]
        public IEnumerable<Jogos> GetTodos()
        {
            using (var db = new DBInvilliaDesafioContext())
            {
                return db.Jogos.ToList();
            }
        }

        // GET api/<JogoController>/5
        [HttpGet("{id}")]
        public IEnumerable<Jogos> GetJogoPorId(int id)
        {
            using (var db = new DBInvilliaDesafioContext())
            {
                return db.Jogos.ToList().Where(x => x.Id == id).ToList();
            }
        }
       
        [HttpGet("getlivres/{livre}")]
        public IEnumerable<Jogos> GetJogosLivres(string livre)
        {
            using (var db = new DBInvilliaDesafioContext())
            {
                List<Emprestimos> lstEmprestimos = db.Emprestimos.ToList();
                List<Jogos> lstJogosLivres = new List<Jogos>();

                foreach (var jogo in db.Jogos.ToList())
                {
                    if(lstEmprestimos != null)
                    {
                        if (lstEmprestimos.Any(x => x.IdJogo == jogo.Id))
                        {
                            continue;
                        }
                    }
                    lstJogosLivres.Add(jogo);
                }
                return lstJogosLivres; 
            }
        }

        // POST api/<JogoController>
        [HttpPost]
        public async Task Post([FromBody] Jogos entity)
        {
            try
            {
                using (var db = new DBInvilliaDesafioContext())
                {
                    db.Entry(entity).State = EntityState.Added;
                    await db.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.StackTrace);
            }
        }

        // PUT api/<JogoController>/5
        [HttpPut]
        public async Task Put([FromBody] Jogos entity)
        {
            try
            {
                using (var db = new DBInvilliaDesafioContext())
                {
                    db.Entry(entity).State = EntityState.Modified;
                    await db.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.StackTrace);
            }
        }

        // DELETE api/<JogoController>/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            try
            {
                Jogos entity;
                using (var db = new DBInvilliaDesafioContext())
                {
                    entity = db.Jogos.ToList().Where(x => x.Id == id).FirstOrDefault();
                    if (entity != null && entity.Id > 0)
                    {
                        db.Entry(entity).State = EntityState.Deleted;
                        await db.SaveChangesAsync();
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.StackTrace);
            }
        }
    }
}
