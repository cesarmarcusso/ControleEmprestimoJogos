using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Classes
{
    public class EmprestimoOrigem
    {
        public long Id { get; set; }
        public long IdJogo { get; set; }
        public long IdAmigo { get; set; }
        public DateTime? DataEmprestimo { get; set; }
    }
}
