import { Test, TestingModule } from '@nestjs/testing';
import { ElasticprubeaController } from './elasticprubea.controller';

describe('ElasticprubeaController', () => {
  let controller: ElasticprubeaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ElasticprubeaController],
    }).compile();

    controller = module.get<ElasticprubeaController>(ElasticprubeaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
