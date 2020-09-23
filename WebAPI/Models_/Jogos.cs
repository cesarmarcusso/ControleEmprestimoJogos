using System;
using System.Collections.Generic;

namespace WebAPI.Models_
{
    public partial class Jogos
    {
        public Jogos()
        {
            Emprestimos = new HashSet<Emprestimos>();
        }

        public long Id { get; set; }
        public string Nomejogo { get; set; }
        public string Genero { get; set; }
        public string Observacao { get; set; }

        public virtual ICollection<Emprestimos> Emprestimos { get; set; }
    }
}
