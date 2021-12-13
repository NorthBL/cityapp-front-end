export class UserDto {
   id: number;
   firstName: string;
   lastName: string;
   email: string;
}

export class LoginRequest {
   email: string;
   password: string;
}

export class RegisterRequest {
   FirstName: string;
   LastName: string;
   Email: string;
   password: string;
}

export class LoginDto{
   message: string;
}
