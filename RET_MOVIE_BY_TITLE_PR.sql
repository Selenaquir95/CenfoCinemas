CREATE PROCEDURE [dbo].[RET_MOVIE_BY_TITLE_PR]
@P_TITLE nvarchar (35)
AS
BEGIN
    SELECT Id, Created,  Title, Description, Release, Genre, Director
	FROM TBL_Movie
	WHERE Title = @P_TITLE
END
