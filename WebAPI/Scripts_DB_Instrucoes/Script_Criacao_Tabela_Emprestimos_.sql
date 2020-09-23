USE [DBInvilliaDesafio]
GO

/****** Object:  Table [dbo].[Emprestimos_]    Script Date: 09/21/2020 20:12:04 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Emprestimos_](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[IdJogo] [bigint] NOT NULL,
	[IdAmigo] [bigint] NOT NULL,
	[DataEmprestimo] [date] NULL,
 CONSTRAINT [PK_Emprestimos_] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

