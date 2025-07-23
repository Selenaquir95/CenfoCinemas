CREATE PROCEDURE [dbo].[UPD_MOVIE_PR]
   @P_ID INT,
   @P_Title nvarchar (35),
   @P_Description nvarchar (250),
   @P_Release Datetime,
   @P_Genre nvarchar (20),
   @P_Director nvarchar (30)
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE dbo.TBL_Movie
    SET 
        Title = @P_Title,
        Description = @P_Description,
        Release = @P_Release,
        Genre = @P_Genre,
        Director = @P_Director,
        Updated   = GETDATE()    
    WHERE ID = @P_ID;
END
GO