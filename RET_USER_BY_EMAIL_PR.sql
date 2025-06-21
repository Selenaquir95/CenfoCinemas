CREATE PROCEDURE [dbo].[RET_USER_BY_EMAIL_PR]
@P_EMAIL NVARCHAR(30)
AS
BEGIN
    SELECT Id, Created, Updated, UserCode, Name, Email, Password, BirthDate, Status
	FROM TBL_User
	WHERE Email=@P_EMAIL;
END