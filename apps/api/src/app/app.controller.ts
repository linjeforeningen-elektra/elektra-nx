// import { AuthLocalAdapter, UserAdapter } from '@elektra-nx/api/auth/feature/adapters';
// import { AuthGuard, AuthService, AuthUser, GetAuth } from '@elektra-nx/api/auth/feature';
// import {
//   CreateMembershipDto,
//   CreateUserDto,
//   LoginWithAuthLocalDto,
//   RegisterWithAuthLocalDto,
//   UpdateUserDto,
// } from '@elektra-nx/shared/models';
// import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';

import { EmailNotConfirmedException } from '@elektra-nx/api/shared/data-access';
import { Controller, Get } from '@nestjs/common';

// import { AppService } from './app.service';

// @UseGuards(AuthGuard)
@Controller()
export class AppController {
  @Get()
  public async test() {
    throw new EmailNotConfirmedException();
  }

  // private auth: AuthService, // private authLocal: AuthLocalAdapter, // private userAdapter: UserAdapter, // private readonly appService: AppService,
  // @UseGuards(AuthGuard)
  // @Post('auth/local/register')
  // public async registerWithAuthLocal(@Body() dto: RegisterWithAuthLocalDto) {
  //   // return this.authLocal(dto);
  // }
  // @Post('auth/local')
  // public async loginWithAuthLocal(@GetAuth() auth: AuthUser, @Body() dto: LoginWithAuthLocalDto) {
  //   return this.authLocal.loginWithAuthLocal(auth, dto);
  // }
  // @UseGuards(AuthGuard)
  // @Get('me')
  // public async getMyUser(@GetAuth() auth: AuthUser) {
  //   console.log(auth);
  // }
  // @Post('user')
  // public async createUser(@Body() dto: CreateUserDto) {
  //   console.log(dto);
  //   // return this.user.create(dto);
  // }
  // @Get('user')
  // public async getUsers(@GetAuth() auth: AuthUser) {
  //   return this.userAdapter.find(auth);
  // }
  // @Get('user/:id')
  // public async getUser(@Param('id') id: string, @GetAuth() auth: AuthUser) {
  //   // console.log(auth);
  //   return this.userAdapter.findOne(auth, id);
  // }
  // @Patch('user/:id')
  // public async updateUser(@GetAuth() auth: AuthUser, @Param('id') id: string, @Body() dto: UpdateUserDto) {
  //   // console.log(auth);
  //   return this.userAdapter.updateOne(auth, id, dto);
  // }
  // @Delete('user/:id')
  // public async deleteUser(@Param('id') id: string, @GetAuth() auth: AuthUser) {
  //   return this.userAdapter.removeOne(auth, id);
  // }
  // @Post('membership')
  // public async createMembership(@Body() dto: CreateMembershipDto) {
  //   console.log(dto);
  // }
}
