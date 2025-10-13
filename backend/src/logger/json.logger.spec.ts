import { JsonLogger } from './json.logger';

describe('JsonLogger', () => {
  let logger: JsonLogger;
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    logger = new JsonLogger('TestContext');
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  const expectValidJsonLog = (expectedLevel: string, expectedMessage: any, expectedOptionalParams: any[] = []) => {
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    const logArg = consoleSpy.mock.calls[0][0];
    expect(typeof logArg).toBe('string');

    const parsed = JSON.parse(logArg);
    expect(parsed).toEqual({
      timestamp: expect.any(String),
      level: expectedLevel,
      message: expect.any(String),
      optionalParams: expect.any(Array),
    });

    const formattedMessage = typeof expectedMessage === 'string' ? expectedMessage : JSON.stringify(expectedMessage);
    expect(parsed.message).toBe(formattedMessage);

    expect(parsed.optionalParams).toEqual(
      expectedOptionalParams.map(param => 
        typeof param === 'string' ? JSON.stringify(param) : param
      )
    );
  };

  describe('log', () => {
    it('should log a string message without optional params in JSON format', () => {
      const message = 'Test log message';
      logger.log(message);
      expectValidJsonLog('log', message);
    });

    it('should log an object message without optional params in JSON format', () => {
      const message = { key: 'value', number: 42 };
      logger.log(message);
      expectValidJsonLog('log', message);
    });

    it('should log a string message with string and object optional params in JSON format', () => {
      const message = 'Test log with params';
      const param1 = 'string param';
      const param2 = { nested: 'object' };
      logger.log(message, param1, param2);
      expectValidJsonLog('log', message, [param1, param2]);
    });
  });

  describe('error', () => {
    it('should log an error message in JSON format with level "error"', () => {
      const message = 'Test error message';
      logger.error(message);
      expectValidJsonLog('error', message);
    });

    it('should log an error with optional params in JSON format', () => {
      const message = 'Test error with params';
      const param1 = 123;
      const param2 = ['array', 'param'];
      logger.error(message, param1, param2);
      expectValidJsonLog('error', message, [param1, param2]);
    });
  });

  describe('warn', () => {
    it('should log a warn message in JSON format with level "warn"', () => {
      const message = 'Test warn message';
      logger.warn(message);
      expectValidJsonLog('warn', message);
    });
  });

  describe('debug', () => {
    it('should log a debug message in JSON format with level "debug"', () => {
      const message = 'Test debug message';
      logger.debug(message);
      expectValidJsonLog('debug', message);
    });
  });

  describe('verbose', () => {
    it('should log a verbose message in JSON format with level "verbose"', () => {
      const message = 'Test verbose message';
      logger.verbose(message);
      expectValidJsonLog('verbose', message);
    });
  });
});
