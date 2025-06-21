CREATE PROCEDURE [dbo].[RET_USER_BY_ID_PR]
@P_ID INT
AS
BEGIN
    SELECT Id, Created, Updated, UserCode, Name, Email, Password, BirthDate, Status
	FROM TBL_User
	WHERE ID=@P_ID;
END