﻿using System;
using System.Collections.Generic;

namespace WebAPI.Models_
{
    public partial class Emprestimos1
    {
        public long Id { get; set; }
        public long IdJogo { get; set; }
        public long IdAmigo { get; set; }
        public DateTime? DataEmprestimo { get; set; }
    }
}
