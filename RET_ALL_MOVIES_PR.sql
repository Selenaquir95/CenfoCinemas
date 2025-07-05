CREATE PROCEDURE [dbo].[RET_ALL_MOVIES_PR]
AS
BEGIN
    SELECT Id, Created,  Title, Description, Release, Genre, Director
	FROM TBL_Movie
END
GO