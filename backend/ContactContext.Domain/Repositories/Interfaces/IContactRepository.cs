using ContactContext.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ContactContext.Domain.Repositories.Interfaces
{
    public interface IContactRepository<TContact> where TContact : Contact
    {
        Task<IEnumerable<TContact>> GetAll();
        Task<TContact> GetById(Guid id);
        Task<TContact> Create(TContact contact);
        Task<TContact> Update(TContact contact);
    }
}
