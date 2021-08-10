using ContactContext.Domain.ValueObjects;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace ContactContext.Tests.ValueObjects
{
    [TestClass]
    public class DocumentTests
    {
        [TestMethod]
        public void ShouldReturnErrorWhenCNPJIsInvalid()
        {
            var doc = new Cnpj("123");
            Assert.IsTrue(doc.Invalid);
        }

        [TestMethod]
        public void ShouldReturnSuccessWhenCNPJIsValid()
        {
            var doc = new Cnpj("34.110.468/0001-50");
            Assert.IsTrue(doc.Valid);
        }

        [TestMethod]
        public void ShouldReturnErrorWhenCPFIsInvalid()
        {
            var doc = new Cpf("123.798");
            Assert.IsTrue(doc.Invalid);
        }

        [TestMethod]
        [DataTestMethod]
        [DataRow("342.255.458-06")]
        [DataRow("541.397.393-47")]
        [DataRow("010.772.846-08")]
        public void ShouldReturnSuccessWhenCPFIsValid(string cpf)
        {
            var doc = new Cpf(cpf);
            Assert.IsTrue(doc.Valid);
        }

    }
}
