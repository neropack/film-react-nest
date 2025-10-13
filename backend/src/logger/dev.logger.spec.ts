import { ConsoleLogger } from '@nestjs/common';
import { DevLogger } from './dev.logger';

describe('DevLogger', () => {
  let logger: DevLogger;
  let consoleLogSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(ConsoleLogger.prototype, 'log').mockImplementation(() => {});

    logger = new DevLogger('TestContext');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should call super.log with the provided message and optional params', () => {
    const message = 'Test log message';
    const optionalParam1 = 'param1';
    const optionalParam2 = { key: 'value' };

    logger.log(message, optionalParam1, optionalParam2);

    expect(consoleLogSpy).toHaveBeenCalledWith(message, optionalParam1, optionalParam2);
    expect(consoleLogSpy).toHaveBeenCalledTimes(1);
  });

  it('should handle logging without optional params', () => {
    const message = 'Simple log message';

    logger.log(message);

    expect(consoleLogSpy).toHaveBeenCalledWith(message);
    expect(consoleLogSpy).toHaveBeenCalledTimes(1);
  });
});
