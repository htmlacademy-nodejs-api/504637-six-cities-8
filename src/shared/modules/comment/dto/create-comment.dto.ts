import { IsNumber, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @MinLength(5, { message: 'Minimum text length is 5' })
  @MaxLength(1024, { message: 'Maximum text length is 1024' })
  public text: string;

  @IsNumber()
  @Min(1, { message: 'Minimum rating is 1' })
  @Max(5, { message: 'Maximum rating is 5' })
  public rating: number;
}

