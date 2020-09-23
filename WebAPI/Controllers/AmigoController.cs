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
    public class AmigoController : ControllerBase
    {
        // GET: api/</AmigoController>
        [HttpGet]
        public IEnumerable<Amigos> GetTodos()
        {
            using (var db = new DBInvilliaDesafioContext())
            {
                var x = db.Amigos.ToList();
                return db.Amigos.ToList();
            }
        }

        // GET api/<AmigoController>/5
        [HttpGet("{id}")]
        public IEnumerable<Amigos> GetAmigoPorId(int id)
        {
            using (var db = new DBInvilliaDesafioContext())
            {
                return db.Amigos.ToList().Where(x => x.Id == id).ToList();
            }
        }

        // POST api/<AmigoController>
        [HttpPost]
        public async Task Post([FromBody] Amigos entity)
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

        // PUT api/<AmigoController>/5
        [HttpPut]
        public async Task Put([FromBody] Amigos entity)
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

        // DELETE api/<AmigoController>/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            try
            {
                Amigos entity;
                using (var db = new DBInvilliaDesafioContext())
                {
                    entity = db.Amigos.ToList().Where(x => x.Id == id).FirstOrDefault();
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
