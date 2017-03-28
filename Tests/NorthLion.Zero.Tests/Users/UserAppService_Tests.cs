using System.Collections.Generic;
using NorthLion.Zero.PaginatedModel;
using NorthLion.Zero.Users;
using NorthLion.Zero.Users.Dto;
using Shouldly;
using System.Data.Entity;
using System.Linq;
using System.Linq.Dynamic;
using System.Threading.Tasks;
using Xunit;

namespace NorthLion.Zero.Tests.Users
{
    public class UserAppService_Tests : ZeroTestBase
    {
        private readonly IUserAppService _userAppService;
        private readonly UserManager userManager;
        public UserAppService_Tests()
        {
            _userAppService = Resolve<IUserAppService>();
            userManager = Resolve<UserManager>();
        }

        [Fact]
        public async Task GetUsers_Test()
        {
            //Act
            var output = await _userAppService.GetUsers(new PaginatedInputDto());

            //Assert
            output.Users.Count.ShouldBeGreaterThan(0);
        }

        [Fact]
        public async Task CreateUser_Test()
        {
            //Act
            await MockHelpers.Users.CreateMockUsers(_userAppService);

            await UsingDbContextAsync(async context =>
            {
                var johnNashUser = await context.Users.FirstOrDefaultAsync(u => u.UserName == "john.nash");
                johnNashUser.ShouldNotBeNull();
            });
        }

        [Fact]
        public async Task ProhibitPermission_Test()
        {
            await MockHelpers.Users.CreateMockUsers(_userAppService);
            await ProhibitPermission();
        }

        private async Task ProhibitPermission()
        {
            await UsingDbContextAsync(async context =>
            {
                var johnNashUser = await context.Users.FirstOrDefaultAsync(u => u.UserName == "john.nash");
                await _userAppService.ProhibitPermission(new ProhibitPermissionInput()
                {
                    PermissionName = "Pages",
                    UserId = johnNashUser.Id
                });

                var permissions = await userManager.GetGrantedPermissionsAsync(johnNashUser);

                permissions.FirstOrDefault(a => a.Name == "Pages").ShouldBeNull();

            });
        }

        [Fact]
        public async Task GrantPermission_Test()
        {
            await MockHelpers.Users.CreateMockUsers(_userAppService);
            //Let us remove the permission
            await ProhibitPermission();
            await UsingDbContextAsync(async context =>
            {
                var johnNashUser = await context.Users.FirstOrDefaultAsync(u => u.UserName == "john.nash");
                await _userAppService.SetUserSpecialPermissions(new SetUserSpecialPermissionsInput()
                {
                    AssignedPermissions = new List<UserAssignedPermission>()
                    {
                        new UserAssignedPermission(){ Name  = "Pages",Granted = true},
                        
                    },
                    UserId = johnNashUser.Id
                });
                var permissions = await userManager.GetGrantedPermissionsAsync(johnNashUser);
                permissions.FirstOrDefault(a => a.Name == "Pages").ShouldNotBeNull();
            });
        }
    }
}
