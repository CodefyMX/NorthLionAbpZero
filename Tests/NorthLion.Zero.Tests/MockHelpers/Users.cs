using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NorthLion.Zero.Users;
using NorthLion.Zero.Users.Dto;

namespace NorthLion.Zero.Tests.MockHelpers
{
    public static class Users
    {
        public static async Task CreateMockUsers(IUserAppService userAppService)
        {
            await userAppService.CreateUser(
                new CreateUserInput
                {
                    EmailAddress = "alan@lion.com",
                    IsActive = true,
                    Name = "Alan",
                    Surname = "Torres",
                    Password = "123qwe",
                    UserName = "Alan.Torres"
                });
            await userAppService.CreateUser(
                new CreateUserInput
                {
                    EmailAddress = "john@volosoft.com",
                    IsActive = true,
                    Name = "John",
                    Surname = "Nash",
                    Password = "123qwe",
                    UserName = "john.nash"
                });
        }
    }
}
