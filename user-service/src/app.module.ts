import { Module } from '@nestjs/common';
import { MongooseModule} from '@nestjs/mongoose'
import { DATABASE_CONNECTION } from './app.properties';
import { UserModule } from './user.module';
@Module({
  imports: [UserModule,MongooseModule.forRoot(DATABASE_CONNECTION),
  ] 
})
export class AppModule {}
