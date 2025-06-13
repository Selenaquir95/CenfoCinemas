/****** Object:  Table [dbo].[TBL_Movie]    Script Date: 6/12/2025 7:16:00 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[TBL_Movie](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Created] [datetime] NOT NULL,
	[Updated] [datetime] NULL,
	[Title] [nvarchar](35) NOT NULL,
	[Description] [nvarchar](250) NOT NULL,
	[Release] [datetime] NOT NULL,
	[Genre] [nvarchar](20) NOT NULL,
	[Director] [nvarchar](30) NOT NULL,
 CONSTRAINT [PK_TBL_Movie] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
