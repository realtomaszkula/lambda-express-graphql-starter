describe('.env', () => {
  it('loads env before each test', () => {
    expect(process.env.hello).toEqual('world');
  });

  it('imports matchers', () => {
    expect('that is the question').toBeOrNotToBe();
  });
});
