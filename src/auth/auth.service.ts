import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: UserRepository,
    ){}

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.userRepository.signUp(authCredentialsDto)
    }

    async signIn(authCredentialsDto:AuthCredentialsDto) {
        const username = await this.userRepository.validationPassword(authCredentialsDto);
        
        if(!username) {
            throw new UnauthorizedException('Invalid Credentials');
        }
    }
}
