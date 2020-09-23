using System;
using System.Collections.Generic;

namespace WebAPI.Models_
{
    public partial class Amigos
    {
        public Amigos()
        {
            Emprestimos = new HashSet<Emprestimos>();
        }

        public long Id { get; set; }
        public string Nome { get; set; }
        public string Apelido { get; set; }
        public string Observacao { get; set; }

        public virtual ICollection<Emprestimos> Emprestimos { get; set; }
    }
}
