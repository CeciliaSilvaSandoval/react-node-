import { IsNotEmpty, IsString } from 'class-validator';

export class LogValidator{

    @IsString({message: `Origin must be string`})
    @IsNotEmpty({message: `Origin must be provided`})
    origin?: string;

    @IsString({message: `Status must be string`})
    @IsNotEmpty({message: `Status must be provided`})
    status?: number;

    @IsString({message: `Message must be string`})
    @IsNotEmpty({message: `Message must be provided`})
    message?: string;

}

