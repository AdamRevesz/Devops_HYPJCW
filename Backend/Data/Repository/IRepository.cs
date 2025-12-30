namespace Data.Repository
{
    public interface IRepository<T> where T: class
    {
        public IQueryable<T> GetAll();
        public Task<T> GetOne(string id);
        public Task<T> Create(T entity);
        public Task<T> Update(T entity);
        public Task Delete(string id);
    }
}
