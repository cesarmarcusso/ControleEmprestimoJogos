USE [DBInvilliaDesafio]
GO

/****** Object:  Table [dbo].[Usuarios]    Script Date: 09/21/2020 20:13:25 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Usuarios](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Username] [nchar](20) NOT NULL,
	[Usersenha] [nchar](8) NOT NULL,
 CONSTRAINT [PK_Usuarios] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

