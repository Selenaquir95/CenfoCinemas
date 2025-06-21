CREATE PROCEDURE [dbo].[RET_USER_BY_CODE_PR]
@P_CODE NVARCHAR(30)
AS
BEGIN
    SELECT Id, Created, Updated, UserCode, Name, Email, Password, BirthDate, Status
	FROM TBL_User
	WHERE UserCode=@P_CODE;
END