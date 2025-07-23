CREATE PROCEDURE [dbo].[UPD_USER_PR]
	@P_ID    INT,
    @P_UserCode nvarchar(30),
	@P_Name nvarchar(50),
	@P_Email nvarchar(30),
	@P_Password nvarchar(50),
	@P_BirthDate Datetime,
	@P_Status nvarchar(10)
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE dbo.TBL_User
    SET 
        UserCode  = @P_UserCode,
        Name      = @P_Name,
        Email     = @P_Email,
        Password  = @P_Password,
        BirthDate = @P_BirthDate,
        Status    = @P_Status,
        Updated   = GETDATE()    
    WHERE ID = @P_ID;
END
GO