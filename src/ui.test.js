const initUI = require('./ui')

test('map calls its argument with a non-null argument', () => {
  const initUI = jest.fn();
  [1].map(x => initUI(x));
  expect(initUI).toBeCalledWith(expect.anything());
});
