import { Module } from '@nestjs/common';
import { WaterService } from './water.service';
import { WaterController } from './water.controller';

@Module({
  providers: [WaterService],
  controllers: [WaterController],
})
export class WaterModule {}
