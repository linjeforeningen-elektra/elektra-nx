export const RepositoryMock = () => ({
  find: jest.fn(),
  findBy: jest.fn(),
  findOne: jest.fn(),
  findOneBy: jest.fn(),
  save: jest.fn((e) => e),
  createQueryBuilder: jest.fn(),
  remove: jest.fn(),
});
