describe('.env', () => {
  it('loads env before each test', () => {
    expect(process.env.hello).toEqual('world');
  });
});
