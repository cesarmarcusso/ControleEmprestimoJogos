USE [DBInvilliaDesafio]
GO

/****** Object:  Table [dbo].[Emprestimos]    Script Date: 09/21/2020 20:11:28 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Emprestimos](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[IdJogo] [bigint] NOT NULL,
	[IdAmigo] [bigint] NOT NULL,
	[DataEmprestimo] [date] NULL,
 CONSTRAINT [PK_Emprestimos] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[Emprestimos]  WITH CHECK ADD  CONSTRAINT [FK_Emprestimos_Amigos] FOREIGN KEY([IdAmigo])
REFERENCES [dbo].[Amigos] ([Id])
GO

ALTER TABLE [dbo].[Emprestimos] CHECK CONSTRAINT [FK_Emprestimos_Amigos]
GO

ALTER TABLE [dbo].[Emprestimos]  WITH CHECK ADD  CONSTRAINT [FK_Emprestimos_Jogos] FOREIGN KEY([IdJogo])
REFERENCES [dbo].[Jogos] ([Id])
GO

ALTER TABLE [dbo].[Emprestimos] CHECK CONSTRAINT [FK_Emprestimos_Jogos]
GO

