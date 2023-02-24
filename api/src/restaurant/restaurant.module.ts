import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost/my-nest-app'),
        MongooseModule.forFeature([
            /** New schemas */
        ]),
    ],
})
export class RestaurantModule { }
