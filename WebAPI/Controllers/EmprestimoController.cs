using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Classes;
using WebAPI.Models_;


namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController] 
    public class EmprestimoController : ControllerBase
    {
        // GET: api/<EmprestimosController>
        [HttpGet]
        public IEnumerable<Emprestimos> GetTodos()
        {
            using (var db = new DBInvilliaDesafioContext())
            {
                return db.Emprestimos.ToList();
            }
        }

        // GET api/<EmprestimoController>/5
        [HttpGet("{idJogo}")]
        public IEnumerable<Emprestimos> GetEmprestimoPorIdJogo(int idJogo)
        {
            using (var db = new DBInvilliaDesafioContext())
            {
                return db.Emprestimos.ToList().Where(x => x.IdJogo == idJogo).ToList();
            }
        }

        // GET api/<EmprestimoController>/5
        [HttpGet("{idAmigo}")]
        public IEnumerable<Emprestimos> GetEmprestimoPorIdAmigo(int idAmigo)
        {
            using (var db = new DBInvilliaDesafioContext())
            {
                return db.Emprestimos.ToList().Where(x => x.IdAmigo == idAmigo).ToList();
            }
        }

        // GET api/<EmprestimoController>/5
        [HttpGet("{idAmigo}/{idJogo}")]
        public Emprestimos GetEmprestimoPorIdAmigoJogo(int idAmigo, int idJogo)
        {
            using (var db = new DBInvilliaDesafioContext())
            {
                return db.Emprestimos.ToList().Where(x => x.IdAmigo == idAmigo && x.IdJogo == idJogo).FirstOrDefault();
            }
        }

        // POST api/<EmprestimoController>
        /*
        [HttpPost]
        public async Task Post([FromBody] Emprestimos entity)
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
        }*/

        [HttpPost]
        public async Task Post([FromBody] EmprestimoOrigem entity)
        {
            try
            {
                Emprestimos emp = new Emprestimos();
                emp.IdAmigo = entity.IdAmigo;
                emp.IdJogo = entity.IdJogo;
                emp.DataEmprestimo = entity.DataEmprestimo;
                emp.IdAmigoNavigation = new Amigos();
                emp.IdJogoNavigation = new Jogos();
                using (var db = new DBInvilliaDesafioContext())
                {
                    //db.Entry(entity).State = EntityState.Added;
                    //db.Add(emp);
                    //db.SaveChangesAsync();
                    db.Entry(emp).State = EntityState.Added;
                    await db.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.StackTrace);
            }
        }

        // PUT api/<EmprestimoController>/5
        [HttpPut]
        public async Task Put([FromBody] EmprestimoOrigem entity)
        {
            try
            {
                Emprestimos emp = new Emprestimos();
                emp.Id = entity.Id;
                emp.IdAmigo = entity.IdAmigo;
                emp.IdJogo = entity.IdJogo;
                emp.DataEmprestimo = entity.DataEmprestimo;
                emp.IdAmigoNavigation = new Amigos();
                emp.IdJogoNavigation = new Jogos();
                using (var db = new DBInvilliaDesafioContext())
                {
                    //db.Entry(entity).State = EntityState.Modified;
                    db.Entry(emp).State = EntityState.Modified;
                    await db.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.StackTrace);
            }
        }

        /*
        // PUT api/<EmprestimoController>/5
        [HttpPut]
        public async Task Put([FromBody] Emprestimos entity)
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
        */

        // DELETE api/<EmprestimoController>/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            try
            {
                Emprestimos entity;
                using (var db = new DBInvilliaDesafioContext())
                {
                    entity = db.Emprestimos.ToList().Where(x => x.Id == id).FirstOrDefault();
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
