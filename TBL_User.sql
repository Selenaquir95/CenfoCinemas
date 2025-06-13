SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[TBL_User](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Created] [datetime] NOT NULL,
	[Updated] [datetime] NULL,
	[UserCode] [nvarchar](30) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Email] [nvarchar](30) NOT NULL,
	[Password] [nvarchar](50) NOT NULL,
	[BirthDate] [datetime] NOT NULL,
	[Status] [nvarchar](10) NOT NULL,
 CONSTRAINT [PK_TBL_User] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO