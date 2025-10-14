import { TskvLogger } from './tskv.logger';

describe('TskvLogger', () => {
  let logger: TskvLogger;
  let stdoutWriteSpy: jest.SpyInstance;
  const fixedTimestamp = '2023-01-01T00:00:00.000Z';

  beforeAll(() => {
    jest.spyOn(Date.prototype, 'toISOString').mockReturnValue(fixedTimestamp);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    stdoutWriteSpy = jest
      .spyOn(process.stdout, 'write')
      .mockImplementation(() => true);
    logger = new TskvLogger('TestContext');
  });

  afterEach(() => {
    stdoutWriteSpy.mockRestore();
  });

  const expectValidTskvLog = (
    expectedLevel: string,
    expectedMessage: any,
    expectedOptionalParams: any[] = [],
  ) => {
    expect(stdoutWriteSpy).toHaveBeenCalledTimes(1);
    const writeArg = stdoutWriteSpy.mock.calls[0][0];
    expect(typeof writeArg).toBe('string');
    expect(writeArg).toMatch(/\n$/);

    const escapedMessage = logger['escapeValue'](expectedMessage);
    const escapedParams = expectedOptionalParams.map((param) =>
      logger['escapeValue'](param),
    );
    const paramsPart =
      escapedParams.length > 0 ? `\tparams=${escapedParams.join('\t')}` : '';
    const expected = `timestamp=${fixedTimestamp}\tlevel=${expectedLevel}\tmessage=${escapedMessage}${paramsPart}\n`;

    expect(writeArg).toBe(expected);
  };

  describe('log', () => {
    it('should log a string message without optional params in TSKV format', () => {
      const message = 'Test log message';
      logger.log(message);
      expectValidTskvLog('log', message);
    });

    it('should log an object message without optional params in TSKV format', () => {
      const message = { key: 'value', number: 42 };
      logger.log(message);
      expectValidTskvLog('log', message);
    });

    it('should log a string message with string and object optional params in TSKV format', () => {
      const message = 'Test log with params';
      const param1 = 'string param';
      const param2 = { nested: 'object' };
      const param3 = 123;
      logger.log(message, param1, param2, param3);
      expectValidTskvLog('log', message, [param1, param2, param3]);
    });

    it('should escape tabs and newlines in message', () => {
      const message = 'Message with\ttab and\nnewline';
      logger.log(message);
      expectValidTskvLog('log', message);
    });

    it('should escape tabs and newlines in optional params', () => {
      const message = 'Test message';
      const param1 = 'Param with\ttab';
      const param2 = 'Param with\nnewline';
      logger.log(message, param1, param2);
      expectValidTskvLog('log', message, [param1, param2]);
    });
  });

  describe('error', () => {
    it('should log an error message in TSKV format with level "error"', () => {
      const message = 'Test error message';
      logger.error(message);
      expectValidTskvLog('error', message);
    });

    it('should log an error with optional params in TSKV format', () => {
      const message = 'Test error with params';
      const param1 = 123;
      const param2 = ['array', 'param'];
      logger.error(message, param1, param2);
      expectValidTskvLog('error', message, [param1, param2]);
    });
  });

  describe('warn', () => {
    it('should log a warn message in TSKV format with level "warn"', () => {
      const message = 'Test warn message';
      logger.warn(message);
      expectValidTskvLog('warn', message);
    });

    it('should log a warn with optional params in TSKV format', () => {
      const message = 'Test warn with params';
      const param1 = 'warn param';
      logger.warn(message, param1);
      expectValidTskvLog('warn', message, [param1]);
    });
  });

  describe('debug', () => {
    it('should log a debug message in TSKV format with level "debug"', () => {
      const message = 'Test debug message';
      logger.debug(message);
      expectValidTskvLog('debug', message);
    });
  });

  describe('verbose', () => {
    it('should log a verbose message in TSKV format with level "verbose"', () => {
      const message = 'Test verbose message';
      logger.verbose(message);
      expectValidTskvLog('verbose', message);
    });
  });
});
