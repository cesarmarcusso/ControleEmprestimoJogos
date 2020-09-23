using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace WebAPI.Models_
{
    public partial class DBInvilliaDesafioContext : DbContext
    {
        public DBInvilliaDesafioContext()
        {
        }

        public DBInvilliaDesafioContext(DbContextOptions<DBInvilliaDesafioContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Amigos> Amigos { get; set; }
        public virtual DbSet<Emprestimos> Emprestimos { get; set; }
        public virtual DbSet<Emprestimos1> Emprestimos1 { get; set; }
        public virtual DbSet<Jogos> Jogos { get; set; }
        public virtual DbSet<Usuarios> Usuarios { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Data Source=.\\SQLExpress;Initial Catalog=DBInvilliaDesafio;Integrated Security=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Amigos>(entity =>
            {
                entity.Property(e => e.Apelido)
                    .HasMaxLength(50)
                    .IsFixedLength();

                entity.Property(e => e.Nome)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsFixedLength();

                entity.Property(e => e.Observacao).HasColumnType("text");
            });

            modelBuilder.Entity<Emprestimos>(entity =>
            {
                entity.Property(e => e.DataEmprestimo).HasColumnType("date");

                entity.HasOne(d => d.IdAmigoNavigation)
                    .WithMany(p => p.Emprestimos)
                    .HasForeignKey(d => d.IdAmigo)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Emprestimos_Amigos");

                entity.HasOne(d => d.IdJogoNavigation)
                    .WithMany(p => p.Emprestimos)
                    .HasForeignKey(d => d.IdJogo)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Emprestimos_Jogos");
            });

            modelBuilder.Entity<Emprestimos1>(entity =>
            {
                entity.ToTable("Emprestimos_");

                entity.Property(e => e.DataEmprestimo).HasColumnType("date");
            });

            modelBuilder.Entity<Jogos>(entity =>
            {
                entity.Property(e => e.Genero)
                    .HasMaxLength(50)
                    .IsFixedLength();

                entity.Property(e => e.Nomejogo)
                    .IsRequired()
                    .HasMaxLength(150)
                    .IsFixedLength();

                entity.Property(e => e.Observacao).HasColumnType("text");
            });

            modelBuilder.Entity<Usuarios>(entity =>
            {
                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsFixedLength();

                entity.Property(e => e.Usersenha)
                    .IsRequired()
                    .HasMaxLength(8)
                    .IsFixedLength();
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
