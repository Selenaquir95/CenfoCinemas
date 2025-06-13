--SP para crear Movie
CREATE PROCEDURE CRE_MOVIE_PR
(
   @P_Title nvarchar (35),
   @P_Description nvarchar (250),
   @P_Release Datetime,
   @P_Genre nvarchar (20),
   @P_Director nvarchar (30)

)
AS
BEGIN
    INSERT INTO TBL_Movie(Created,  Title, Description, Release, Genre, Director)
	 VALUES (GETDATE(), @P_Title, @P_Description, @P_Release, @P_Genre, @P_Director)
END
GO
