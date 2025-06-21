CREATE PROCEDURE [dbo].[RET_MOVIE_BY_ID_PR]
@P_ID INT
AS
BEGIN
    SELECT Id, Created,  Title, Description, Release, Genre, Director
	FROM TBL_Movie
	WHERE ID = @P_ID
END