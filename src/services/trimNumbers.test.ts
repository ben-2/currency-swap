import { trimNumber } from './trimNumbers';

describe('SERVICE trimNumbers - ', () => {
  test('should send 12.33 when passed 12.338475, 2', () => {
    const trimmedNumber = trimNumber(12.338475, 2);

    expect(trimmedNumber).toEqual(12.33);
  });

  test('should send 1.3349882357 when passed 1.33498823573349, 10', () => {
    const trimmedNumber = trimNumber(1.33498823573349, 10);

    expect(trimmedNumber).toEqual(1.3349882357);
  });
});
